import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Newsletter Subscribers | Admin | SWCA" };

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const subscribers = await db.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });

  const activeCount = subscribers.filter((s) => s.active).length;

  return (
    <DashboardLayout title="Newsletter Subscribers">
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <p className="text-base text-gray-500">
            {subscribers.length} total · {activeCount} active
          </p>
        </div>
        {subscribers.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-base">
            No subscribers yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead className="bg-gray-50 text-left">
                <tr>
                  {["Email", "Subscribed", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{s.email}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(s.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {s.active ? (
                        <Badge variant="secondary" className="bg-green-50 text-green-700">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-400">Unsubscribed</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
