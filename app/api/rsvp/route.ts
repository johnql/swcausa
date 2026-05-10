import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const schema = z.object({ sessionId: z.string().min(1) });

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const member = await db.member.findUnique({ where: { email: user.email! } });
  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  const rsvp = await db.classRsvp.upsert({
    where: { memberId_sessionId: { memberId: member.id, sessionId: parsed.data.sessionId } },
    create: { memberId: member.id, sessionId: parsed.data.sessionId },
    update: {},
  });

  return NextResponse.json(rsvp, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });

  const member = await db.member.findUnique({ where: { email: user.email! } });
  if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  await db.classRsvp.deleteMany({
    where: { memberId: member.id, sessionId },
  });

  return NextResponse.json({ ok: true });
}
