import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WellnessClassCard from "@/components/WellnessClassCard";
import ProgramCard from "@/components/ProgramCard";
import { wellnessClasses } from "@/data/classes";

const programs = [
  { title: "Wellness & Physical Health", description: "Classes and activities supporting strength, balance, and vitality.", icon: "🌿" },
  { title: "Social & Community", description: "Events that build meaningful friendships and belonging.", icon: "🤝" },
  { title: "Advocacy", description: "Support for housing, healthcare, and financial security.", icon: "📢" },
  { title: "Education & Enrichment", description: "Lifelong learning and cognitive engagement opportunities.", icon: "📚" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-teal-50 py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-900 leading-tight">
            A Community of Care,<br />Wellness, and Friendship
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            The Senior Women&apos;s Christian Association supports senior women across
            Massachusetts, New Hampshire, Rhode Island, and Vermont — inspiring
            vitality, connection, and purpose at every age.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className={cn(buttonVariants({ size: "lg" }), "bg-teal-600 hover:bg-teal-700 text-white")}>
              Join Us Today
            </Link>
            <Link href="/classes" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              Explore Wellness Classes
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">About SWCA</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Inspired by the legacy of the YWCA, the Senior Women&apos;s Christian Association
            was established to serve the unique needs of senior women — fostering a compassionate
            environment where every woman feels valued, empowered, and deeply cared for.
          </p>
          <div className="mt-6 bg-teal-50 rounded-2xl p-6 text-center">
            <p className="text-gray-600 text-sm">
              U.S. women live an average of <strong>81.4 years</strong>. SWCA believes those years
              should be filled with strength, joy, and community — not just managed with medication.
              Our foundations: <strong>nutrition · physical activity · stress management · restorative sleep</strong>.
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link href="/about" className="text-teal-600 font-medium hover:underline">
              Learn more about our story →
            </Link>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Four Program Areas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p) => (
              <ProgramCard key={p.title} program={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Classes Preview */}
      <section id="classes" className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Wellness Classes</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Six carefully chosen activities that nurture your body, sharpen your mind, and connect you with others.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessClasses.map((cls) => (
              <WellnessClassCard key={cls.slug} cls={{ ...cls, id: cls.slug }} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/classes" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              View All Classes &amp; Schedules
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-teal-700 py-20 px-4 text-white text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-teal-100 text-lg mb-8">
            Sign up today and a local convener from your neighborhood will personally call to welcome you.
          </p>
          <Link href="/join" className={cn(buttonVariants({ size: "lg" }), "bg-white text-teal-700 hover:bg-teal-50")}>
            Become a Member
          </Link>
        </div>
      </section>
    </>
  );
}
