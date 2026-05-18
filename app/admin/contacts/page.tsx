import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Contact Messages | Admin | SWCA" };

export default async function AdminContactsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const submissions = await db.contactSubmission.findMany({
    orderBy: { submittedAt: "desc" },
  });

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <DashboardLayout title="Contact Messages">
      <div className="space-y-4">
        <p className="text-base text-gray-500">
          {submissions.length} total · {unreadCount} unread
        </p>

        {submissions.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center text-gray-400 text-base">
            No contact messages yet.
          </div>
        ) : (
          submissions.map((s) => (
            <div
              key={s.id}
              className={`bg-white border rounded-2xl p-6 ${!s.read ? "border-teal-200 bg-teal-50/30" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{s.name}</p>
                  <a
                    href={`mailto:${s.email}`}
                    className="text-teal-600 hover:underline text-base"
                  >
                    {s.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {!s.read && (
                    <Badge variant="secondary" className="bg-teal-50 text-teal-700">New</Badge>
                  )}
                  <span className="text-sm text-gray-400">
                    {new Date(s.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
