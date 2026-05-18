import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { serviceStates } from "@/data/states";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Wellness Class Schedule | Senior Fitness Classes Near You | SWCA",
  description:
    "Find SWCA weekly wellness class schedules for senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont. Browse Tai Chi, Yoga, Fitness, and more — then RSVP as a member.",
  keywords: [
    "senior wellness class schedule Massachusetts",
    "tai chi class schedule New England",
    "yoga classes for seniors near me",
    "senior fitness class locations New England",
    "RSVP wellness classes seniors",
    "weekly senior fitness classes",
    "senior women class schedule",
    "free senior social event in MA",
    "free senior social event in NH",
    "free senior social event in RI",
    "free senior social event in VT",
    "free senior social meetup in MA",
    "free senior social meetup in NH",
    "free senior social meetup in RI",
    "free senior social meetup in VT",
    "senior wellness program in MA",
  ],
  openGraph: {
    title: "Class Schedule — Senior Wellness Classes Near You | SWCA",
    description:
      "Weekly Tai Chi, Yoga, Fitness, and more for senior women in MA, NH, RI, and VT. Browse times and locations.",
    url: "https://swcausa.org/events",
  },
  alternates: { canonical: "https://swcausa.org/events" },
};

export default async function EventsPage() {
  const sessions = await db.classSession.findMany({
    include: { class: true },
    orderBy: [{ state: "asc" }, { dayOfWeek: "asc" }],
  });

  const byState = serviceStates.map((s) => ({
    ...s,
    sessions: sessions.filter((sess) => sess.state === s.value),
  }));

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
          <p className="mt-2 text-gray-600 max-w-xl">
            Weekly wellness sessions across all four service states. Sign in to reserve your spot.
          </p>
        </div>

        {/* State sections */}
        <div className="space-y-10">
          {byState.map(({ value, label, sessions: stateSessions }) => (
            <div key={value}>
              <h2 className="text-xl font-semibold text-teal-700 mb-4 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-800 text-sm font-bold px-3 py-1 rounded-full">{value}</span>
                {label}
              </h2>

              {stateSessions.length === 0 ? (
                <p className="text-base text-gray-400 pl-2">No sessions scheduled yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stateSessions.map((s) => (
                    <div
                      key={s.id}
                      className="bg-white border rounded-2xl p-6 flex flex-col gap-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{s.class.name}</p>
                        <p className="text-sm text-gray-400 italic mt-1">{s.class.origin}</p>
                      </div>
                      <div className="text-base text-gray-600 space-y-2">
                        <p>📅 {s.dayOfWeek}</p>
                        <p>🕐 {s.time}</p>
                        <p>📍 {s.location}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {s.class.benefits.slice(0, 3).map((b) => (
                          <span
                            key={b}
                            className="text-sm bg-teal-50 text-teal-700 px-3 py-1 rounded-full"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to join a session?</h3>
          <p className="text-gray-600 mb-5 max-w-md mx-auto">
            Members can RSVP for sessions through their profile. Not a member yet? Join today — it only takes a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/profile" className={cn(buttonVariants({ variant: "default" }))}>
              RSVP in My Profile
            </Link>
            <Link href="/join" className={cn(buttonVariants({ variant: "outline" }))}>
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
