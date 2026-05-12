"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const PRESETS = [10, 25, 50, 100];

export default function DonationForm() {
  const [selected, setSelected] = useState<number | null>(25);
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const amount = custom ? parseFloat(custom) : selected;

  async function handleDonate() {
    if (!amount || amount < 1) {
      setError("Please enter a valid amount (minimum $1).");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-8 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Make a Donation</h2>
      <p className="text-sm text-gray-500 mb-6">
        Your generosity helps SWCA provide wellness programs and community support to senior women across New England.
      </p>

      {/* Preset amounts */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => { setSelected(p); setCustom(""); }}
            className={cn(
              "py-2 rounded-lg border text-sm font-medium transition-colors",
              selected === p && !custom
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-700 border-gray-200 hover:border-teal-400"
            )}
          >
            ${p}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="relative mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
        <input
          type="number"
          min="1"
          placeholder="Other amount"
          value={custom}
          onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
          className="w-full border rounded-lg pl-7 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Total */}
      {amount && amount > 0 && (
        <p className="text-center text-sm text-gray-600 mb-4">
          Donating <span className="font-semibold text-gray-900">${amount.toFixed(2)}</span>
        </p>
      )}

      {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

      <button
        onClick={handleDonate}
        disabled={loading || amount === null}
        className={cn(buttonVariants({ variant: "default" }), "w-full")}
      >
        {loading ? "Redirecting to payment…" : `Donate${amount && amount > 0 ? ` $${amount.toFixed(2)}` : ""}`}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Payments are processed securely via Stripe. SWCA is a 501(c)(3) organization.
      </p>
    </div>
  );
}
