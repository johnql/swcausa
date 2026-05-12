import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-6xl font-bold text-teal-600 mb-4">404</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        Sorry, we couldn&apos;t find the page you were looking for. It may have moved or no longer exists.
      </p>
      <div className="flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "default" }))}>
          Back to Home
        </Link>
        <Link href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
          Contact Us
        </Link>
      </div>
    </div>
  );
}
