import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us | SWCA",
  description: "Learn about the Senior Women's Christian Association — our mission, history, and the community we serve.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-4xl">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SWCA</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Serving senior women across New England with care, wellness, and community.
          </p>
        </div>

        <div className="bg-teal-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Mission</h2>
          <blockquote className="text-lg text-gray-700 italic border-l-4 border-teal-400 pl-6">
            &ldquo;Inspired by the legacy of the YWCA, the Senior Women&apos;s Christian Association
            was established to serve the unique needs of senior women — fostering a compassionate
            environment where every woman feels valued, empowered, and deeply cared for.&rdquo;
          </blockquote>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Serve</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            SWCA supports senior women across four states — <strong>Massachusetts, New Hampshire,
            Rhode Island, and Vermont</strong>. We address the distinct physical, emotional,
            social, and economic challenges that senior women face, and we do it through community.
          </p>
          <p className="text-gray-700 leading-relaxed">
            In 2024, U.S. life expectancy reached 79 years — 81.4 for women. We believe those
            years should be lived with vitality and purpose. Our programs go beyond symptom
            management to build the true foundations of lasting health: nutrition, physical activity,
            stress management, and restorative sleep.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspired by Super Agers</h2>
          <p className="text-gray-700 leading-relaxed">
            We are inspired by <strong>&ldquo;super agers&rdquo;</strong> — people who maintain
            extraordinary cognitive and physical vitality well into old age. They are proof that
            aging does not mean decline. With the right community, habits, and support, every
            woman can thrive at any age.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Wellness & Physical Health", desc: "Six wellness classes including Tai Chi, Yoga, Fitness, Table Tennis, Dance, and Singing — all designed for senior women." },
              { title: "Social & Community Events", desc: "Regular gatherings that build genuine friendships and a sense of belonging in your local neighborhood." },
              { title: "Advocacy", desc: "We advocate for the housing, healthcare, and financial security that every senior woman deserves." },
              { title: "Education & Enrichment", desc: "Lifelong learning opportunities that keep the mind engaged, curious, and growing." },
            ].map((item) => (
              <div key={item.title} className="border rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/join" className={cn(buttonVariants({ size: "lg" }), "bg-teal-600 hover:bg-teal-700 text-white")}>
            Join the SWCA Community
          </Link>
        </div>

      </div>
    </div>
  );
}
