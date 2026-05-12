"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white font-sans">
        <p className="text-5xl font-bold text-teal-600 mb-4">500</p>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Critical error</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          Something went seriously wrong. Please refresh the page or try again later.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
        >
          Refresh
        </button>
      </body>
    </html>
  );
}
