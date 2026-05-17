import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { serviceStates } from "@/data/states";

export const metadata: Metadata = { title: "My Profile | SWCA" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const member = await db.member.findUnique({
    where: { email: user.email! },
    include: {
      rsvps: {
        include: { session: { include: { class: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!member) redirect("/join");

  const stateLabelMap = Object.fromEntries(serviceStates.map((s) => [s.value, s.label]));

  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-3xl">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {member.firstName}
            </h1>
            <p className="text-gray-500 mt-1">{member.email}</p>
          </div>
          <Link href="/profile/edit" className={cn(buttonVariants({ variant: "outline" }))}>
            Edit Profile
          </Link>
        </div>

        {/* Personal Info */}
        <section className="bg-white border rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            <div><dt className="text-gray-500">Full Name</dt><dd className="font-medium mt-0.5">{member.firstName} {member.lastName}</dd></div>
            <div><dt className="text-gray-500">Phone</dt><dd className="font-medium mt-0.5">{member.primaryPhone}</dd></div>
            <div><dt className="text-gray-500">Gender</dt><dd className="font-medium mt-0.5">{member.gender}</dd></div>
            <div><dt className="text-gray-500">State</dt><dd className="font-medium mt-0.5">{stateLabelMap[member.state] ?? member.state}</dd></div>
            <div><dt className="text-gray-500">Member Since</dt><dd className="font-medium mt-0.5">{new Date(member.joinedAt).toLocaleDateString()}</dd></div>
          </dl>
        </section>

        {/* Emergency Contact */}
        <section className="bg-white border rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            <div><dt className="text-gray-500">Name</dt><dd className="font-medium mt-0.5">{member.emergencyContactName}</dd></div>
            <div><dt className="text-gray-500">Phone</dt><dd className="font-medium mt-0.5">{member.emergencyContactPhone}</dd></div>
            <div><dt className="text-gray-500">Relationship</dt><dd className="font-medium mt-0.5">{member.emergencyContactRelationship}</dd></div>
          </dl>
        </section>

        {/* Insurance */}
        {(member.insuranceProvider || member.insurancePolicyNumber) && (
          <section className="bg-white border rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Insurance (Emergency Reference)</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
              {member.insuranceProvider && (
                <div><dt className="text-gray-500">Provider</dt><dd className="font-medium mt-0.5">{member.insuranceProvider}</dd></div>
              )}
              {member.insurancePolicyNumber && (
                <div><dt className="text-gray-500">Policy Number</dt><dd className="font-medium mt-0.5">{member.insurancePolicyNumber}</dd></div>
              )}
            </dl>
          </section>
        )}

        {/* Upcoming RSVPs */}
        <section className="bg-white border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Class RSVPs</h2>
            <Link href="/classes" className="text-base text-teal-600 hover:underline">Browse classes →</Link>
          </div>
          {member.rsvps.length === 0 ? (
            <p className="text-gray-500 text-base">
              You haven&apos;t registered for any classes yet.{" "}
              <Link href="/classes" className="text-teal-600 hover:underline">Explore wellness classes</Link>
            </p>
          ) : (
            <ul className="divide-y">
              {member.rsvps.map((rsvp) => (
                <li key={rsvp.id} className="py-4 flex items-center justify-between text-base">
                  <div>
                    <p className="font-medium">{rsvp.session.class.name}</p>
                    <p className="text-gray-500">{rsvp.session.dayOfWeek} · {rsvp.session.time} · {rsvp.session.location}</p>
                  </div>
                  <Badge variant="secondary">{rsvp.session.state}</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </div>
  );
}
