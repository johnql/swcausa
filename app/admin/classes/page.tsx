import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import ClassSessionManager from "@/components/ClassSessionManager";

export const metadata: Metadata = { title: "Classes | Admin | SWCA" };

export default async function AdminClassesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const classes = await db.wellnessClass.findMany({
    include: {
      sessions: {
        include: {
          rsvps: {
            include: {
              member: {
                select: { id: true, firstName: true, lastName: true, email: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: [{ state: "asc" }, { dayOfWeek: "asc" }],
      },
    },
    orderBy: { name: "asc" },
  });

  const totalSessions = classes.reduce((n, c) => n + c.sessions.length, 0);
  const totalRsvps = classes.reduce((n, c) => n + c.sessions.reduce((m, s) => m + s.rsvps.length, 0), 0);

  return (
    <DashboardLayout title="Wellness Classes">
      <p className="text-base text-gray-500 mb-6">
        {classes.length} classes · {totalSessions} sessions · {totalRsvps} total RSVPs
      </p>

      {classes.length === 0 && (
        <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">
          No classes found. Run <code className="bg-gray-100 px-1 rounded">npx prisma db seed</code> to load the 6 wellness classes.
        </div>
      )}

      <div className="space-y-6">
        {classes.map((cls) => {
          const totalClassRsvps = cls.sessions.reduce((n, s) => n + s.rsvps.length, 0);
          return (
            <div key={cls.id} className="bg-white border rounded-2xl overflow-hidden">
              {/* Class header */}
              <div className="p-5 border-b bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                    <p className="text-sm text-gray-500 italic mt-0.5">{cls.origin}</p>
                    <p className="text-base text-gray-600 mt-2 leading-relaxed">{cls.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {cls.benefits.map((b) => (
                        <span key={b} className="text-sm bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant="secondary">{cls.sessions.length} session{cls.sessions.length !== 1 ? "s" : ""}</Badge>
                    <span className="text-sm text-gray-400">{totalClassRsvps} RSVP{totalClassRsvps !== 1 ? "s" : ""}</span>
                  </div>
                </div>
              </div>

              {/* Session manager */}
              <div className="p-5">
                <ClassSessionManager
                  classId={cls.id}
                  sessions={cls.sessions.map((s) => ({
                    id: s.id,
                    dayOfWeek: s.dayOfWeek,
                    time: s.time,
                    location: s.location,
                    state: s.state,
                    rsvps: s.rsvps,
                  }))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
