import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password | SWCA",
  description: "Reset your SWCA account password.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>
        </div>
        <ForgotPasswordForm />
        <p className="text-center text-base text-gray-500 mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-teal-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
