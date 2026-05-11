import type { Metadata } from "next";
import Image from "next/image";
import MembershipForm from "@/components/MembershipForm";

export const metadata: Metadata = {
  title: "Join Us | SWCA",
  description: "Become a member of the Senior Women's Christian Association.",
};

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — welcome panel */}
        <div className="lg:sticky lg:top-24">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg mb-6">
            <Image
              src="/imgs/JoinUs.png"
              alt="Join SWCA"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold">Join SWCA</h1>
              <p className="text-teal-100 mt-1 text-sm">Membership is free — your community is waiting.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="font-semibold text-gray-900 text-lg">What happens after you sign up?</h2>
            <div className="space-y-3">
              {[
                { step: "1", text: "A local convener from your neighborhood will personally call to welcome you." },
                { step: "2", text: "You'll be connected with wellness classes available in your state." },
                { step: "3", text: "You'll receive your welcome email with everything you need to get started." },
              ].map(({ step, text }) => (
                <div key={step} className="flex gap-3 items-start">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {step}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>

            {/* Delicious Nutritious Program Badge */}
            <div className="pt-4 border-t">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src="/imgs/SMALL DELICIOUS NUTRITIOUS LOGO.jpg"
                    alt="Delicious Nutritious"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Members also get access to our <strong className="text-gray-700">Delicious &amp; Nutritious</strong> cooking
                  and nutrition program.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <p className="text-gray-500 text-sm mb-6">Fill in the form below. All fields marked with * are required.</p>
          <MembershipForm />
        </div>
      </div>
    </div>
  );
}
