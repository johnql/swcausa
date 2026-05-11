import type { Metadata } from "next";
import { db } from "@/lib/db";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = { title: "Store | SWCA" };

export default async function StorePage() {
  const products = await db.product.findMany({ where: { inStock: true } });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SWCA Store</h1>
          <p className="mt-2 text-gray-600">
            Support the association — shop merchandise, renew your membership, and register for events.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center text-gray-500">
            No products available right now. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white border rounded-2xl overflow-hidden flex flex-col">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.productName} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-teal-50 flex items-center justify-center">
                    <span className="text-4xl text-teal-200">🛍</span>
                  </div>
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-semibold text-gray-900 text-lg">{p.productName}</h2>
                  {p.description && (
                    <p className="mt-1 text-sm text-gray-500 flex-1">{p.description}</p>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${p.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <BuyButton productId={p.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
