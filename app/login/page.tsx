import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | SWCA",
  description: "Sign in to your SWCA member account.",
};

export default function LoginPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your SWCA member account.</p>
        </div>
        <LoginForm />
        <p className="text-center text-base text-gray-500 mt-6">
          Not a member yet?{" "}
          <Link href="/join" className="text-teal-600 hover:underline font-medium">
            Join SWCA
          </Link>
        </p>
      </div>
    </div>
  );
}
