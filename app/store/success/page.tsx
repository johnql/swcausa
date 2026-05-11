import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Order Confirmed | SWCA" };

export default function StoreSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. A receipt has been sent to your email address.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders" className={cn(buttonVariants({ variant: "default" }))}>
            View My Orders
          </Link>
          <Link href="/store" className={cn(buttonVariants({ variant: "outline" }))}>
            Back to Store
          </Link>
        </div>
      </div>
    </main>
  );
}
