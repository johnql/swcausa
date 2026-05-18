import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const schema = z.object({
  classId: z.string().min(1),
  dayOfWeek: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  state: z.enum(["MA", "NH", "RI", "VT"]),
});

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const cls = await db.wellnessClass.findUnique({ where: { id: parsed.data.classId } });
  if (!cls) return NextResponse.json({ error: "Class not found" }, { status: 404 });

  const session = await db.classSession.create({ data: parsed.data });
  return NextResponse.json(session, { status: 201 });
}
