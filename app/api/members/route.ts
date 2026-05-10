import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { resend } from "@/lib/resend";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  primaryPhone: z.string().min(1),
  gender: z.enum(["Male", "Female", "Other"]),
  state: z.enum(["MA", "NH", "RI", "VT"]),
  emergencyContactName: z.string().min(1),
  emergencyContactPhone: z.string().min(1),
  emergencyContactRelationship: z.string().min(1),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const data = parsed.data;

  const existing = await db.member.findUnique({ where: { email: data.email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const member = await db.member.create({ data });

  await resend.emails.send({
    from: "SWCA <no-reply@swcausa.org>",
    to: [member.email],
    subject: "Welcome to SWCA!",
    text: `Hi ${member.firstName},\n\nWelcome to the Senior Women's Christian Association! A local convener from your neighborhood will be in touch soon.\n\nWith care,\nThe SWCA Team`,
  });

  return NextResponse.json({ ok: true, id: member.id }, { status: 201 });
}
