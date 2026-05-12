import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { serviceStates } from "@/data/states";

export const metadata: Metadata = { title: "Members | Admin | SWCA" };

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const members = await db.member.findMany({ orderBy: { joinedAt: "desc" } });
  const stateLabelMap = Object.fromEntries(serviceStates.map((s) => [s.value, s.label]));

  return (
    <DashboardLayout title="All Members">
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-4 border-b">
          <p className="text-sm text-gray-500">{members.length} total members</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                {["Name", "Email", "Phone", "State", "Emergency Contact", "Joined"].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{m.firstName} {m.lastName}</td>
                  <td className="px-4 py-3 text-gray-600">{m.email}</td>
                  <td className="px-4 py-3 text-gray-600">{m.primaryPhone}</td>
                  <td className="px-4 py-3"><Badge variant="secondary">{stateLabelMap[m.state] ?? m.state}</Badge></td>
                  <td className="px-4 py-3 text-gray-600">{m.emergencyContactName} · {m.emergencyContactPhone}</td>
                  <td className="px-4 py-3 text-gray-500">{new Date(m.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
