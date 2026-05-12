import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/webhooks/stripe/route";

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
}));

vi.mock("@/lib/db", () => ({
  db: {
    order: {
      update: vi.fn().mockResolvedValue({}),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
  },
}));

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

function makeRequest(body: string, signature?: string) {
  return new NextRequest("http://localhost:3000/api/webhooks/stripe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(signature ? { "stripe-signature": signature } : {}),
    },
    body,
  });
}

describe("POST /api/webhooks/stripe", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 400 when stripe-signature header is missing", async () => {
    const res = await POST(makeRequest("{}"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/missing signature/i);
  });

  it("returns 400 when signature is invalid", async () => {
    vi.mocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error("Webhook signature verification failed");
    });
    const res = await POST(makeRequest("{}", "bad-signature"));
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toMatch(/invalid signature/i);
  });

  it("marks order as paid on checkout.session.completed", async () => {
    const event = {
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: { orderId: "order-123" },
          payment_intent: "pi_test_123",
        },
      },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const res = await POST(makeRequest("{}", "valid-sig"));
    expect(res.status).toBe(200);
    expect(db.order.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "order-123" },
        data: expect.objectContaining({
          paymentStatus: "paid",
          stripePaymentIntentId: "pi_test_123",
        }),
      })
    );
  });

  it("does not update order if orderId missing from metadata", async () => {
    const event = {
      type: "checkout.session.completed",
      data: { object: { metadata: {}, payment_intent: "pi_test_123" } },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const res = await POST(makeRequest("{}", "valid-sig"));
    expect(res.status).toBe(200);
    expect(db.order.update).not.toHaveBeenCalled();
  });

  it("marks order as refunded on charge.refunded", async () => {
    const event = {
      type: "charge.refunded",
      data: { object: { payment_intent: "pi_test_456" } },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const res = await POST(makeRequest("{}", "valid-sig"));
    expect(res.status).toBe(200);
    expect(db.order.updateMany).toHaveBeenCalledWith({
      where: { stripePaymentIntentId: "pi_test_456" },
      data: { paymentStatus: "refunded" },
    });
  });

  it("returns received:true for unknown event types (no-op)", async () => {
    const event = {
      type: "payment_intent.created",
      data: { object: {} },
    };
    vi.mocked(stripe.webhooks.constructEvent).mockReturnValue(event as never);

    const res = await POST(makeRequest("{}", "valid-sig"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.received).toBe(true);
    expect(db.order.update).not.toHaveBeenCalled();
    expect(db.order.updateMany).not.toHaveBeenCalled();
  });
});
