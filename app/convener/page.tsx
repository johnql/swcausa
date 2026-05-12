import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { serviceStates } from "@/data/states";

export const metadata: Metadata = { title: "Convener Dashboard | SWCA" };

export default async function ConvenerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const convener = await db.member.findUnique({ where: { email: user.email! } });
  if (!convener) redirect("/join");
  if (!convener.isConvener && !convener.isAdmin) redirect("/");

  const assignedMembers = await db.member.findMany({
    where: { convenerAssigned: user.email, state: convener.state },
    orderBy: { joinedAt: "desc" },
  });

  const stateLabelMap = Object.fromEntries(serviceStates.map((s) => [s.value, s.label]));

  return (
    <DashboardLayout title={`Convener Dashboard — ${stateLabelMap[convener.state] ?? convener.state}`}>
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <p className="font-medium text-gray-900">Members in Your Area</p>
          <Badge variant="secondary">{assignedMembers.length} members</Badge>
        </div>

        {assignedMembers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No members assigned to your area yet. New sign-ups in your neighborhood will appear here.
          </div>
        ) : (
          <div className="divide-y">
            {assignedMembers.map((member) => (
              <div key={member.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-gray-900">{member.firstName} {member.lastName}</p>
                  <p className="text-sm text-gray-500">{member.email} · {member.primaryPhone}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Emergency: {member.emergencyContactName} ({member.emergencyContactRelationship})</p>
                  <p>{member.emergencyContactPhone}</p>
                  <p className="text-xs mt-1">Joined {new Date(member.joinedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
