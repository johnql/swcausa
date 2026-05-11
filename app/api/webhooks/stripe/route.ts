import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;
      if (!orderId) break;
      await db.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: "paid",
          stripePaymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : null,
        },
      });
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const piId = typeof charge.payment_intent === "string" ? charge.payment_intent : null;
      if (!piId) break;
      await db.order.updateMany({
        where: { stripePaymentIntentId: piId },
        data: { paymentStatus: "refunded" },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
