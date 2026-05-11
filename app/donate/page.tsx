import type { Metadata } from "next";
import DonationForm from "@/components/DonationForm";

export const metadata: Metadata = {
  title: "Donate | SWCA",
  description: "Support the Senior Women's Christian Association with a one-time donation. Every gift helps fund wellness programs and community care.",
};

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Support Our Mission</h1>
          <p className="mt-3 text-gray-600">
            Your donation directly funds wellness classes, community events, and outreach programs
            that enrich the lives of senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.
          </p>
        </div>

        {/* Donation form */}
        <DonationForm />

        {/* Impact section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
          {[
            { amount: "$10", impact: "Covers materials for one wellness session" },
            { amount: "$25", impact: "Sponsors a member's monthly class access" },
            { amount: "$50", impact: "Funds a community outreach visit" },
          ].map(({ amount, impact }) => (
            <div key={amount} className="bg-white border rounded-2xl p-5">
              <p className="text-2xl font-bold text-teal-600">{amount}</p>
              <p className="text-sm text-gray-600 mt-1">{impact}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
