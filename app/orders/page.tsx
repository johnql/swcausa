import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "My Orders | SWCA" };

const statusColor: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  paid: "default",
  refunded: "outline",
  failed: "destructive",
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const member = await db.member.findUnique({ where: { email: user.email! } });
  if (!member) redirect("/join");

  const orders = await db.order.findMany({
    where: { memberId: member.id },
    include: { product: true },
    orderBy: { orderDate: "desc" },
  });

  return (
    <DashboardLayout title="My Orders">
      {orders.length === 0 ? (
        <div className="bg-white border rounded-2xl p-10 text-center">
          <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/store" className={cn(buttonVariants({ variant: "default" }))}>
            Visit the Store
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-2xl overflow-hidden">
          <div className="p-4 border-b">
            <p className="text-sm text-gray-500">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  {["Product", "Qty", "Amount", "Status", "Date"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{o.product.productName}</td>
                    <td className="px-4 py-3 text-gray-600">{o.quantity}</td>
                    <td className="px-4 py-3 text-gray-600">
                      ${(o.product.price * o.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColor[o.paymentStatus]}>
                        {o.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(o.orderDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
