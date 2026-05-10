import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full flex flex-col">
      <div className="h-48 bg-gray-100 rounded-t-lg" />
      <CardHeader>
        <CardTitle className="text-base">{product.productName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-3">
        {product.description && (
          <p className="text-sm text-gray-600">{product.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          <Button size="sm" disabled={!product.inStock}>
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
