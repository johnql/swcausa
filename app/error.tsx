"use client";

import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <p className="text-5xl font-bold text-teal-600 mb-4">Oops</p>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        An unexpected error occurred. Please try again, or contact us if the problem persists.
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className={cn(buttonVariants({ variant: "default" }))}>
          Try Again
        </button>
        <a href="/contact" className={cn(buttonVariants({ variant: "outline" }))}>
          Contact Us
        </a>
      </div>
    </div>
  );
}
