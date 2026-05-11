import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Thank You | SWCA" };

export default function DonateSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">🙏</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
        <p className="text-gray-600 mb-2">
          Your generous donation supports wellness programs and community care for senior women across New England.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          A receipt has been sent to your email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
            Back to Home
          </Link>
          <Link href="/classes" className={cn(buttonVariants({ variant: "outline" }))}>
            Explore Classes
          </Link>
        </div>
      </div>
    </main>
  );
}
