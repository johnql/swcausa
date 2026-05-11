import type { Metadata } from "next";
import Image from "next/image";
import DonationForm from "@/components/DonationForm";

export const metadata: Metadata = {
  title: "Donate | SWCA",
  description: "Support the Senior Women's Christian Association with a one-time donation.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src="/imgs/handshaking.jpg"
          alt="Support SWCA"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">Support Our Mission</h1>
          <p className="text-teal-100 mt-2 max-w-lg">
            Your generosity helps SWCA provide wellness programs and community support to senior women across New England.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — impact + image */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Gift Makes a Difference</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Every dollar you contribute directly funds wellness classes, community outreach,
            and programs that enrich the lives of senior women across four states.
          </p>

          {/* Impact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { amount: "$10", impact: "Covers materials for one wellness session" },
              { amount: "$25", impact: "Sponsors a member's monthly class access" },
              { amount: "$50", impact: "Funds a community outreach visit" },
            ].map(({ amount, impact }) => (
              <div key={amount} className="bg-white border rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-teal-600">{amount}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{impact}</p>
              </div>
            ))}
          </div>

          {/* Community image */}
          <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/imgs/Community.png"
              alt="SWCA Community"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/50 to-transparent" />
            <p className="absolute bottom-4 left-4 text-white font-semibold text-sm">
              A Community of Care, Wellness &amp; Friendship
            </p>
          </div>
        </div>

        {/* Right — donation form */}
        <div>
          <DonationForm />
        </div>

      </div>
    </div>
  );
}
