import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId, quantity = 1 } = await request.json();

  const member = await db.member.findUnique({ where: { email: user.email! } });
  if (!member) return NextResponse.json({ error: "Member profile not found" }, { status: 404 });

  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product || !product.inStock) {
    return NextResponse.json({ error: "Product unavailable" }, { status: 404 });
  }

  const order = await db.order.create({
    data: { memberId: member.id, productId: product.id, quantity, paymentStatus: "pending" },
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: user.email!,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName,
            ...(product.description ? { description: product.description } : {}),
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity,
      },
    ],
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
  });

  return NextResponse.json({ url: session.url });
}
