import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | SWCA",
  description: "Learn about the Senior Women's Christian Association — our mission, history, and the community we serve.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="/imgs/aboutus.jpg"
          alt="SWCA Community"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-3">About SWCA</h1>
          <p className="text-teal-100 text-lg max-w-xl">
            Serving senior women across New England with care, wellness, and community.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">

        {/* ── Mission ───────────────────────────────────────────────────── */}
        <div className="bg-teal-50 rounded-2xl p-8 mb-16 text-center max-w-3xl mx-auto">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Our Mission</span>
          <blockquote className="mt-4 text-xl text-gray-700 italic leading-relaxed">
            &ldquo;Inspired by the legacy of the YWCA, the Senior Women&apos;s Christian Association
            was established to serve the unique needs of senior women — fostering a compassionate
            environment where every woman feels valued, empowered, and deeply cared for.&rdquo;
          </blockquote>
        </div>

        {/* ── Who We Serve ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2 mb-4">Senior Women Across New England</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              SWCA supports senior women across four states — <strong>Massachusetts, New Hampshire,
              Rhode Island, and Vermont</strong>. We address the distinct physical, emotional,
              social, and economic challenges that senior women face, and we do it through community.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In 2024, U.S. life expectancy reached 79 years — <strong>81.4 for women</strong>. We believe
              those years should be lived with vitality and purpose. Our programs build the true
              foundations of lasting health: nutrition, physical activity, stress management,
              and restorative sleep.
            </p>
          </div>
          <div className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/imgs/Community.png"
              alt="SWCA Members"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* ── Super Agers ────────────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <Image
            src="/imgs/SWCAGroupDance.png"
            alt="Active seniors"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-teal-900/70" />
          <div className="relative z-10 p-10 text-white max-w-2xl">
            <span className="text-teal-300 font-semibold text-sm uppercase tracking-wider">Inspired By</span>
            <h2 className="text-2xl font-bold mt-2 mb-3">Super Agers</h2>
            <p className="text-teal-100 leading-relaxed">
              We are inspired by <strong className="text-white">&ldquo;super agers&rdquo;</strong> — people who
              maintain extraordinary cognitive and physical vitality well into old age. They are
              proof that aging does not mean decline. With the right community, habits, and
              support, every woman can thrive at any age.
            </p>
          </div>
        </div>

        {/* ── What We Do ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Programs</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Wellness & Physical Health",
                desc: "Six wellness classes — Tai Chi, Yoga, Fitness, Table Tennis, Dance, and Singing — all designed for senior women.",
                image: "/imgs/SWCAFitnessProgram.png",
              },
              {
                title: "Social & Community Events",
                desc: "Regular gatherings that build genuine friendships and a sense of belonging in your local neighborhood.",
                image: "/imgs/SWCASingingParty.png",
              },
              {
                title: "Advocacy",
                desc: "We advocate for the housing, healthcare, and financial security that every senior woman deserves.",
                image: "/imgs/handshaking.jpg",
              },
              {
                title: "Education & Enrichment",
                desc: "Lifelong learning opportunities that keep the mind engaged, curious, and growing.",
                image: "/imgs/Advisors.png",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 border rounded-xl p-5 hover:border-teal-200 transition-colors">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Advisors ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Our Advisors</h2>
          </div>
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/imgs/Advisors.png"
              alt="SWCA Advisors"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <Link
            href="/join"
            className={cn(buttonVariants({ size: "lg" }), "bg-teal-600 hover:bg-teal-700 text-white")}
          >
            Join the SWCA Community
          </Link>
        </div>

      </div>
    </div>
  );
}
