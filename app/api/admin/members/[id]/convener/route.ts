import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

const schema = z.object({
  convenerEmail: z.string().email().nullable(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const target = await db.member.findUnique({ where: { id } });
  if (!target) return NextResponse.json({ error: "Member not found" }, { status: 404 });

  if (parsed.data.convenerEmail !== null) {
    const convener = await db.member.findUnique({ where: { email: parsed.data.convenerEmail } });
    if (!convener?.isConvener) {
      return NextResponse.json({ error: "Assigned user is not a convener" }, { status: 422 });
    }
  }

  const updated = await db.member.update({
    where: { id },
    data: { convenerAssigned: parsed.data.convenerEmail },
  });

  return NextResponse.json({ ok: true, convenerAssigned: updated.convenerAssigned });
}
