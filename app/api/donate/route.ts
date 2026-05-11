import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const { amount } = await request.json();

  if (!amount || typeof amount !== "number" || amount < 1) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation to SWCA",
            description: "Senior Women's Christian Association — Thank you for your support.",
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { type: "donation", amount: String(amount) },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate`,
  });

  return NextResponse.json({ url: session.url });
}
