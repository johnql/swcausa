import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const schema = z.object({
  dayOfWeek: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  state: z.enum(["MA", "NH", "RI", "VT"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const existing = await db.classSession.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const updated = await db.classSession.update({ where: { id }, data: parsed.data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const existing = await db.classSession.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  await db.classSession.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
