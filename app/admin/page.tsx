import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Admin Dashboard | SWCA" };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const [memberCount, classCount, orderCount, subscriberCount, unreadContactCount] = await Promise.all([
    db.member.count(),
    db.wellnessClass.count(),
    db.order.count(),
    db.newsletterSubscriber.count({ where: { active: true } }),
    db.contactSubmission.count({ where: { read: false } }),
  ]);

  const [recentMembers, recentContacts] = await Promise.all([
    db.member.findMany({ orderBy: { joinedAt: "desc" }, take: 5 }),
    db.contactSubmission.findMany({ orderBy: { submittedAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { label: "Total Members", value: memberCount, href: "/admin/members" },
    { label: "Wellness Classes", value: classCount, href: "/admin/classes" },
    { label: "Orders", value: orderCount, href: "/admin/orders" },
    { label: "Newsletter Subscribers", value: subscriberCount, href: "/admin/newsletter" },
    { label: "Unread Messages", value: unreadContactCount, href: "/admin/contacts" },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:border-teal-400 transition-colors cursor-pointer h-full">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-gray-500">{s.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Members */}
        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <p className="font-medium text-gray-900">Recent Members</p>
            <Link href="/admin/members" className="text-sm text-teal-600 hover:underline">View all →</Link>
          </div>
          <div className="divide-y">
            {recentMembers.map((member) => (
              <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <div>
                  <p className="font-medium text-gray-900">{member.firstName} {member.lastName}</p>
                  <p className="text-gray-500">{member.email}</p>
                </div>
                <div className="text-gray-500 text-right shrink-0">
                  <p>{member.state} · {member.gender}</p>
                  <p>{new Date(member.joinedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Contact Messages */}
        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <p className="font-medium text-gray-900">Recent Messages</p>
            <Link href="/admin/contacts" className="text-sm text-teal-600 hover:underline">View all →</Link>
          </div>
          {recentContacts.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">No messages yet.</div>
          ) : (
            <div className="divide-y">
              {recentContacts.map((c) => (
                <div key={c.id} className={`p-4 text-sm ${!c.read ? "bg-teal-50/40" : ""}`}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900">{c.name}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      {!c.read && (
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">New</span>
                      )}
                      <span className="text-gray-400 text-xs">{new Date(c.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mb-1">{c.email}</p>
                  <p className="text-gray-600 line-clamp-2">{c.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </DashboardLayout>
  );
}
