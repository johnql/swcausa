import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/donate/route";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/donate-session" }),
      },
    },
  },
}));

import { stripe } from "@/lib/stripe";

function makeRequest(body: object) {
  return new NextRequest("http://localhost:3000/api/donate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/donate", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when amount is missing", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("returns 400 for amount less than 1", async () => {
    const res = await POST(makeRequest({ amount: 0 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for negative amount", async () => {
    const res = await POST(makeRequest({ amount: -10 }));
    expect(res.status).toBe(400);
  });

  it("returns 400 for non-numeric amount", async () => {
    const res = await POST(makeRequest({ amount: "fifty" }));
    expect(res.status).toBe(400);
  });

  it("returns Stripe URL on valid amount", async () => {
    const res = await POST(makeRequest({ amount: 25 }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.url).toBe("https://checkout.stripe.com/donate-session");
  });

  it("converts dollar amount to cents for Stripe (×100)", async () => {
    await POST(makeRequest({ amount: 50 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 5000 }),
          }),
        ]),
      })
    );
  });

  it("sets metadata type to donation", async () => {
    await POST(makeRequest({ amount: 25 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({ type: "donation" }),
      })
    );
  });

  it("works with decimal amounts (e.g. $12.50)", async () => {
    await POST(makeRequest({ amount: 12.5 }));
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 1250 }),
          }),
        ]),
      })
    );
  });
});
