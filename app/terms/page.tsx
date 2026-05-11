import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SWCA",
  description: "Terms and conditions for using the SWCA website and member services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 prose prose-gray">
        <h1>Terms of Service</h1>
        <p className="text-gray-500 text-sm">Last updated: May 2026</p>

        <h2>1. Acceptance</h2>
        <p>
          By accessing or using swcausa.org, you agree to be bound by these Terms of Service
          and our <a href="/privacy">Privacy Policy</a>. If you do not agree, please do not use the site.
        </p>

        <h2>2. Membership</h2>
        <p>
          Membership in SWCA is open to women who wish to participate in our wellness programs
          and community activities. By registering, you confirm that the information you provide
          is accurate and complete. You are responsible for maintaining the security of your
          account credentials.
        </p>

        <h2>3. Payments & Refunds</h2>
        <p>
          All payments for memberships, merchandise, and donations are processed securely via Stripe.
          Membership fees are non-refundable except at the discretion of SWCA administration.
          Merchandise purchases may be returned within 30 days of delivery in unused condition.
          Donations are non-refundable. For payment issues, contact{" "}
          <a href="mailto:admin@swcausa.org">admin@swcausa.org</a>.
        </p>

        <h2>4. Class RSVPs</h2>
        <p>
          Members may RSVP for wellness sessions through their profile. We ask that you cancel
          your RSVP at least 24 hours in advance if you are unable to attend, so we can
          accommodate other members.
        </p>

        <h2>5. Code of Conduct</h2>
        <p>
          SWCA is a community grounded in Christian values of care, respect, and friendship.
          Members are expected to treat all participants, instructors, and staff with dignity
          and respect. SWCA reserves the right to suspend or terminate any account for conduct
          that is disruptive, abusive, or contrary to our community values.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          SWCA provides wellness programs for community enrichment purposes. Participants should
          consult their physician before beginning any new exercise program. SWCA is not liable
          for any injury, loss, or damage arising from participation in our programs or use of
          this website.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the site after changes
          are posted constitutes acceptance of the updated terms.
        </p>

        <h2>8. Contact</h2>
        <p>
          Questions about these terms? Contact us at{" "}
          <a href="mailto:admin@swcausa.org">admin@swcausa.org</a>.
        </p>
      </div>
    </main>
  );
}
