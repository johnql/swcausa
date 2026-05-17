import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SWCA",
  description: "How the Senior Women's Christian Association collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray prose-lg">
        <h1>Privacy Policy</h1>
        <p className="text-gray-500 text-base">Last updated: May 2026</p>

        <h2>1. Who We Are</h2>
        <p>
          The Senior Women&apos;s Christian Association (SWCA) is a non-profit community organization
          serving senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.
          This policy explains how we collect, use, and protect your personal information
          when you use our website at <strong>swcausa.org</strong>.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect only the minimum information necessary to provide our services:</p>
        <ul>
          <li><strong>Name, phone, and email</strong> — for member identification and communications</li>
          <li><strong>State of residence</strong> — to connect you with your local convener</li>
          <li><strong>Gender</strong> — for program eligibility</li>
          <li><strong>Emergency contact</strong> — name, phone, and relationship — for member safety</li>
          <li><strong>Insurance provider and policy number</strong> (optional) — for emergency reference only</li>
          <li><strong>Payment information</strong> — processed by Stripe; we do not store card details</li>
        </ul>
        <p>
          <strong>We do not collect</strong> medical history, diagnoses, prescriptions, disability status,
          or any other clinical or health records.
        </p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To manage your membership and profile</li>
          <li>To connect you with local wellness classes and events</li>
          <li>To process payments for store orders and donations</li>
          <li>To send transactional emails (registration confirmations, receipts)</li>
          <li>To send newsletter updates if you opt in</li>
          <li>For emergency contact purposes only (emergency contact information)</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>We do not sell your personal information. We share data only with:</p>
        <ul>
          <li><strong>Supabase</strong> — secure database and authentication hosting</li>
          <li><strong>Stripe</strong> — payment processing (subject to Stripe&apos;s Privacy Policy)</li>
          <li><strong>Resend</strong> — transactional email delivery</li>
          <li><strong>Vercel</strong> — web hosting and infrastructure</li>
          <li>Your assigned local <strong>convener</strong>, who may see your name, phone, and email to offer community support</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>
          We retain your personal information for as long as your membership is active.
          You may request deletion of your account and data at any time by contacting us at{" "}
          <a href="mailto:admin@swcausa.org">admin@swcausa.org</a>.
        </p>

        <h2>6. Security</h2>
        <p>
          We use industry-standard security measures including encrypted data transmission (HTTPS),
          secure password hashing via Supabase Auth, and role-based access controls to protect your information.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information via your profile settings</li>
          <li>Request deletion of your account</li>
          <li>Opt out of newsletter communications at any time</li>
        </ul>

        <h2>8. Contact Us</h2>
        <p>
          For any privacy questions or requests, contact us at{" "}
          <a href="mailto:admin@swcausa.org">admin@swcausa.org</a> or through our{" "}
          <a href="/contact">contact form</a>.
        </p>
      </div>
    </main>
  );
}
