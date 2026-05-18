import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WellnessClassCard from "@/components/WellnessClassCard";
import { wellnessClasses } from "@/data/classes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Wellness Classes for Senior Women | Tai Chi, Yoga & More | SWCA",
  description:
    "Explore SWCA's six free wellness classes for senior women: Tai Chi, Yoga, Fitness Exercises, Table Tennis, Group Dance, and Singing. Classes available across Massachusetts, New Hampshire, Rhode Island, and Vermont — designed for health, balance, and community.",
  keywords: [
    "tai chi for senior women",
    "yoga for seniors New England",
    "senior women fitness classes Massachusetts",
    "free senior fitness classes",
    "group dance for seniors",
    "table tennis seniors",
    "singing class seniors",
    "wellness classes elderly women New England",
    "low-impact exercise seniors",
    "balance classes for seniors",
  ],
  openGraph: {
    title: "Free Wellness Classes for Senior Women — Tai Chi, Yoga & More | SWCA",
    description:
      "Six free classes — Tai Chi, Yoga, Fitness, Table Tennis, Group Dance, and Singing — for senior women in MA, NH, RI, and VT.",
    url: "https://swcausa.org/classes",
    images: [{ url: "/imgs/SWCAFitnessProgram.png", width: 1200, height: 630, alt: "SWCA Wellness Classes" }],
  },
  alternates: { canonical: "https://swcausa.org/classes" },
};

export default function ClassesPage() {
  return (
    <div className="bg-white">
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <Image
          src="/imgs/SWCAFitnessProgram.png"
          alt="Wellness Classes"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-3">Wellness Classes</h1>
          <p className="text-teal-100 text-lg max-w-xl">
            Six activities chosen to nurture your body, sharpen your mind, and deepen
            your connection with a caring community.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        {/* Class Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wellnessClasses.map((cls) => (
            <WellnessClassCard key={cls.slug} cls={{ ...cls, id: cls.slug }} />
          ))}
        </div>

        {/* Schedule CTA */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-teal-50 rounded-2xl overflow-hidden">
          <div className="relative h-60 lg:h-full min-h-60">
            <Image
              src="/imgs/SWCATaiChiClass.png"
              alt="Tai Chi class"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="p-8">
            <h2 className="text-xl font-bold text-teal-900 mb-3">See the Full Schedule</h2>
            <p className="text-gray-600 mb-5">
              Sessions are available weekly across Massachusetts, New Hampshire, Rhode Island,
              and Vermont. Browse available times and locations in your state.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/events" className={cn(buttonVariants({ variant: "default" }))}>
                View Class Schedule
              </Link>
              <Link href="/join" className={cn(buttonVariants({ variant: "outline" }))}>
                Join to RSVP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
