"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to subscribe");
      setStatus("success");
      setMessage("You're subscribed! Check your inbox for a welcome email.");
      setEmail("");
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-teal-300">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 px-3 py-2 text-sm rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-2 text-sm font-medium bg-teal-500 hover:bg-teal-400 text-white rounded-lg transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs text-red-300 mt-1 w-full">{message}</p>}
    </form>
  );
}
