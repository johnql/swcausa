import type { Metadata } from "next";
import WellnessClassCard from "@/components/WellnessClassCard";
import { wellnessClasses } from "@/data/classes";

export const metadata: Metadata = {
  title: "Wellness Classes | SWCA",
  description: "Explore SWCA wellness classes including Tai Chi, Yoga, Fitness, Table Tennis, Group Dance, and Singing — designed for senior women.",
};

export default function ClassesPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Wellness Classes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Six activities chosen to nurture your body, sharpen your mind, and deepen
            your connection with a caring community.
          </p>
        </div>

        {/* Class Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wellnessClasses.map((cls) => (
            <WellnessClassCard key={cls.slug} cls={{ ...cls, id: cls.slug }} />
          ))}
        </div>

        {/* Schedule note */}
        <div className="mt-16 bg-teal-50 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-teal-900 mb-2">Class Schedules Coming Soon</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Schedules by state and neighborhood are being added. Join as a member and your
            local convener will share class times available in your area.
          </p>
        </div>

      </div>
    </div>
  );
}
