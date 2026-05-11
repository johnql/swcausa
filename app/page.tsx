import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WellnessClassCard from "@/components/WellnessClassCard";
import { wellnessClasses } from "@/data/classes";

const programs = [
  {
    title: "Wellness & Physical Health",
    description: "Six weekly classes including Tai Chi, Yoga, Fitness, Table Tennis, Dance, and Singing.",
    image: "/imgs/SWCAFitnessProgram.png",
  },
  {
    title: "Social & Community",
    description: "Regular gatherings that build genuine friendships and a sense of belonging.",
    image: "/imgs/Community.png",
  },
  {
    title: "Advocacy",
    description: "Support for housing, healthcare, and financial security for every senior woman.",
    image: "/imgs/handshaking.jpg",
  },
  {
    title: "Education & Enrichment",
    description: "Lifelong learning and cognitive engagement that keeps the mind sharp and curious.",
    image: "/imgs/aboutus.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden">
        <Image
          src="/imgs/SWCATitleNew.jpg"
          alt="SWCA Community"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 via-teal-800/70 to-teal-700/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <Image
              src="/imgs/SWCAlogoO.png"
              alt="SWCA"
              width={200}
              height={80}
              className="mb-8 h-20 w-auto object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              A Community of Care,<br />Wellness &amp; Friendship
            </h1>
            <p className="mt-5 text-teal-100 text-lg max-w-lg leading-relaxed">
              The Senior Women&apos;s Christian Association inspires vitality, connection,
              and purpose for senior women across Massachusetts, New Hampshire, Rhode Island,
              and Vermont.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className={cn(buttonVariants({ size: "lg" }), "bg-white text-teal-800 hover:bg-teal-50 font-semibold")}
              >
                Join Us Today
              </Link>
              <Link
                href="/classes"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "border-white text-white hover:bg-white/10")}
              >
                Explore Wellness Classes
              </Link>
            </div>
          </div>

          {/* Right side — community photo */}
          <div className="hidden lg:block">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/20">
              <Image
                src="/imgs/Community.png"
                alt="SWCA Members"
                fill
                className="object-cover object-center"
                sizes="40vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────── */}
      <section className="bg-teal-700 text-white py-6">
        <div className="mx-auto max-w-5xl px-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { stat: "4", label: "States Served" },
            { stat: "6", label: "Wellness Classes" },
            { stat: "100%", label: "Community-Led" },
            { stat: "Free", label: "to Join" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold">{stat}</p>
              <p className="text-teal-200 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/imgs/aboutus.jpg"
              alt="About SWCA"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-5">About SWCA</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Inspired by the legacy of the YWCA, SWCA was established to serve the unique
              needs of senior women — fostering a compassionate environment where every woman
              feels valued, empowered, and deeply cared for.
            </p>
            <div className="bg-teal-50 rounded-xl p-5 mb-5">
              <p className="text-gray-600 text-sm leading-relaxed">
                U.S. women live an average of <strong className="text-teal-800">81.4 years</strong>.
                SWCA believes those years should be filled with strength, joy, and community.
                Our foundations: <strong>nutrition · physical activity · stress management · restorative sleep</strong>.
              </p>
            </div>
            <Link href="/about" className="text-teal-600 font-semibold hover:underline">
              Learn more about our mission →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Four Program Areas ────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Our Four Program Areas</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="relative h-40">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-teal-900/30" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wellness Classes Preview ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Stay Active</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Wellness Classes</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Six carefully chosen activities that nurture your body, sharpen your mind,
              and connect you with a caring community.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessClasses.map((cls) => (
              <WellnessClassCard key={cls.slug} cls={{ ...cls, id: cls.slug }} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/events" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              View Class Schedule
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonial / Quote ───────────────────────────────────────── */}
      <section className="relative py-24 px-4 overflow-hidden">
        <Image
          src="/imgs/SWCAGroupDance.png"
          alt="Group activity"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/75" />
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <svg className="w-12 h-12 mx-auto mb-6 text-teal-300 opacity-70" fill="currentColor" viewBox="0 0 32 32">
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
          </svg>
          <p className="text-2xl md:text-3xl font-light italic leading-relaxed">
            Aging does not mean decline. With the right community, habits, and support,
            every woman can thrive at any age.
          </p>
          <p className="mt-6 text-teal-300 font-semibold">— SWCA Mission</p>
        </div>
      </section>

      {/* ── Join CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Get Started</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sign up today and a local convener from your neighborhood will personally
              call to welcome you and connect you with classes in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/join"
                className={cn(buttonVariants({ size: "lg" }), "bg-teal-600 hover:bg-teal-700 text-white")}
              >
                Become a Member
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
              >
                Contact Us First
              </Link>
            </div>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/imgs/JoinUs.png"
              alt="Join SWCA"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
