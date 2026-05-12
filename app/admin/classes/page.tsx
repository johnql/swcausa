import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Classes | Admin | SWCA" };

export default async function AdminClassesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const classes = await db.wellnessClass.findMany({
    include: { sessions: true },
    orderBy: { name: "asc" },
  });

  return (
    <DashboardLayout title="Wellness Classes">
      <div className="grid grid-cols-1 gap-4">
        {classes.length === 0 && (
          <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">
            No classes yet. Run the seed script to load the 6 wellness classes.
          </div>
        )}
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                <p className="text-xs text-gray-500 italic">{cls.origin}</p>
              </div>
              <Badge variant="secondary">{cls.sessions.length} sessions</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">{cls.description}</p>
            <div className="flex flex-wrap gap-1">
              {cls.benefits.map((b) => (
                <span key={b} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{b}</span>
              ))}
            </div>
            {cls.sessions.length > 0 && (
              <div className="mt-4 divide-y border rounded-lg overflow-hidden">
                {cls.sessions.map((s) => (
                  <div key={s.id} className="px-3 py-2 text-xs flex gap-4 text-gray-600">
                    <span className="font-medium">{s.state}</span>
                    <span>{s.dayOfWeek}</span>
                    <span>{s.time}</span>
                    <span>{s.location}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
