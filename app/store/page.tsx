import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "SWCA Store | Merchandise & Support for Senior Women's Programs",
  description:
    "Shop SWCA merchandise and support senior women's wellness programs across New England. Every purchase helps fund free classes and community outreach in Massachusetts, New Hampshire, Rhode Island, and Vermont.",
  keywords: [
    "SWCA store",
    "senior women association merchandise",
    "buy SWCA shirt",
    "support senior women New England",
    "senior wellness merchandise",
    "SWCA products",
  ],
  openGraph: {
    title: "SWCA Store — Shop & Support Senior Women's Wellness",
    description:
      "Merchandise and products that support free wellness programs for senior women in MA, NH, RI, and VT.",
    url: "https://swcausa.org/store",
    images: [{ url: "/imgs/TShirts.png", width: 1200, height: 630, alt: "SWCA Store" }],
  },
  alternates: { canonical: "https://swcausa.org/store" },
};

export default async function StorePage() {
  const products = await db.product.findMany({ where: { inStock: true } });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/imgs/TShirts.png"
          alt="SWCA Store"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">SWCA Store</h1>
          <p className="text-teal-100 mt-2">
            Support the association — shop merchandise, renew your membership, and register for events.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {products.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center text-gray-500">
            No products available right now. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                {p.imageUrl ? (
                  <div className="relative h-48">
                    <Image
                      src={p.imageUrl}
                      alt={p.productName}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-teal-50 flex items-center justify-center">
                    <svg className="w-16 h-16 text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-semibold text-gray-900 text-lg">{p.productName}</h2>
                  {p.description && (
                    <p className="mt-2 text-base text-gray-500 flex-1 leading-relaxed">{p.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-gray-900">${p.price.toFixed(2)}</span>
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">In Stock</span>
                  </div>
                  <BuyButton productId={p.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
