import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";

const schema = z.object({
  email: z.string().email({ message: "Valid email required" }),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { email } = result.data;

  // Save or reactivate subscriber in DB
  await db.newsletterSubscriber.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  });

  try {
    await Promise.all([
      // Welcome email to subscriber
      resend.emails.send({
        from: "SWCA <hello@swcausa.org>",
        to: email,
        subject: "You're subscribed to SWCA updates!",
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
            <h2 style="color:#0f766e">Welcome to the SWCA Community!</h2>
            <p>Thank you for subscribing to our newsletter. You'll be the first to hear about:</p>
            <ul>
              <li>New wellness classes and schedules</li>
              <li>Community events and gatherings</li>
              <li>SWCA news and updates</li>
            </ul>
            <p>We're so glad you're part of our family.</p>
            <p style="color:#6b7280;font-size:13px">
              If you didn't subscribe, you can ignore this email.
              <br>Senior Women's Christian Association · Serving MA · NH · RI · VT
            </p>
          </div>
        `,
      }),
      // Admin notification
      resend.emails.send({
        from: "SWCA Site <hello@swcausa.org>",
        to: "admin@swcausa.org",
        subject: "New Newsletter Subscriber",
        html: `<p>New subscriber: <strong>${email}</strong></p>`,
      }),
    ]);
  } catch {
    // Email failure is non-fatal — subscriber is already saved
  }

  return NextResponse.json({ success: true });
}
