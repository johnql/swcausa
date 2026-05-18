import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  // Save submission to DB
  await db.contactSubmission.create({ data: { name, email, message } });

  // Email forwarding is non-fatal — submission already saved
  try {
    await resend.emails.send({
      from: "SWCA Contact <no-reply@swcausa.org>",
      to: ["info@swcausa.org"],
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
  } catch {
    // non-fatal
  }

  return NextResponse.json({ ok: true });
}
