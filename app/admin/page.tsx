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

  const [memberCount, classCount, orderCount] = await Promise.all([
    db.member.count(),
    db.wellnessClass.count(),
    db.order.count(),
  ]);

  const recentMembers = await db.member.findMany({
    orderBy: { joinedAt: "desc" },
    take: 5,
  });

  const stats = [
    { label: "Total Members", value: memberCount, href: "/admin/members" },
    { label: "Wellness Classes", value: classCount, href: "/admin/classes" },
    { label: "Orders", value: orderCount, href: "/admin/orders" },
  ];

  return (
    <DashboardLayout title="Admin Dashboard">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:border-teal-400 transition-colors cursor-pointer">
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
              <div className="text-gray-500 text-right">
                <p>{member.state} · {member.gender}</p>
                <p>{new Date(member.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </DashboardLayout>
  );
}
