import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/checkout/route";

// ── Mocks ──────────────────────────────────────────────────────────────────
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/db", () => ({
  db: {
    member: { findUnique: vi.fn() },
    product: { findUnique: vi.fn() },
    order: { create: vi.fn() },
  },
}));

vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/test-session" }),
      },
    },
  },
}));

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

// ── Helpers ────────────────────────────────────────────────────────────────
const mockUser = { email: "jane@example.com", id: "user-123" };
const mockMember = { id: "member-1", email: "jane@example.com" };
const mockProduct = { id: "prod-1", productName: "SWCA T-Shirt", price: 25.0, description: "A shirt", inStock: true };
const mockOrder = { id: "order-1", memberId: "member-1", productId: "prod-1", quantity: 1, paymentStatus: "pending" };

function mockAuth(user: typeof mockUser | null) {
  vi.mocked(createClient).mockResolvedValue({
    auth: { getUser: vi.fn().mockResolvedValue({ data: { user } }) },
  } as never);
}

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ── Tests ──────────────────────────────────────────────────────────────────
describe("POST /api/checkout", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 when not authenticated", async () => {
    mockAuth(null);
    const res = await POST(makeRequest({ productId: "prod-1" }));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toMatch(/unauthorized/i);
  });

  it("returns 404 when member profile not found", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(null);
    const res = await POST(makeRequest({ productId: "prod-1" }));
    expect(res.status).toBe(404);
  });

  it("returns 404 when product not found", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.product.findUnique).mockResolvedValue(null);
    const res = await POST(makeRequest({ productId: "prod-1" }));
    expect(res.status).toBe(404);
  });

  it("returns 404 when product is out of stock", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.product.findUnique).mockResolvedValue({ ...mockProduct, inStock: false } as never);
    const res = await POST(makeRequest({ productId: "prod-1" }));
    expect(res.status).toBe(404);
  });

  it("returns Stripe checkout URL on success", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.product.findUnique).mockResolvedValue(mockProduct as never);
    vi.mocked(db.order.create).mockResolvedValue(mockOrder as never);

    const res = await POST(makeRequest({ productId: "prod-1" }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("https://checkout.stripe.com/test-session");
  });

  it("creates a pending order before calling Stripe", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.product.findUnique).mockResolvedValue(mockProduct as never);
    vi.mocked(db.order.create).mockResolvedValue(mockOrder as never);

    await POST(makeRequest({ productId: "prod-1", quantity: 2 }));

    expect(db.order.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ paymentStatus: "pending", quantity: 2 }),
      })
    );
  });

  it("passes correct unit_amount (price × 100) to Stripe", async () => {
    mockAuth(mockUser);
    vi.mocked(db.member.findUnique).mockResolvedValue(mockMember as never);
    vi.mocked(db.product.findUnique).mockResolvedValue(mockProduct as never);
    vi.mocked(db.order.create).mockResolvedValue(mockOrder as never);

    await POST(makeRequest({ productId: "prod-1" }));

    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 2500 }),
          }),
        ]),
      })
    );
  });
});
