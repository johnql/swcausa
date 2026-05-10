import type { Metadata } from "next";
import MembershipForm from "@/components/MembershipForm";

export const metadata: Metadata = {
  title: "Join Us | SWCA",
  description: "Become a member of the Senior Women's Christian Association.",
};

export default function JoinPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join SWCA</h1>
          <p className="text-gray-600 text-lg">
            Fill out the form below to become a member. After you sign up, a local
            convener from your neighborhood will personally call to welcome you.
          </p>
        </div>
        <MembershipForm />
      </div>
    </div>
  );
}
