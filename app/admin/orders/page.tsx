import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Orders | Admin | SWCA" };

const statusColor: Record<string, string> = {
  pending: "secondary",
  paid: "default",
  refunded: "outline",
  failed: "destructive",
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const self = await db.member.findUnique({ where: { email: user.email! } });
  if (!self?.isAdmin) redirect("/");

  const orders = await db.order.findMany({
    include: { member: true, product: true },
    orderBy: { orderDate: "desc" },
  });

  return (
    <DashboardLayout title="Orders">
      <div className="bg-white border rounded-2xl overflow-hidden">
        <div className="p-4 border-b">
          <p className="text-sm text-gray-500">{orders.length} total orders</p>
        </div>
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No orders yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  {["Member", "Product", "Qty", "Status", "Date"].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{o.member.firstName} {o.member.lastName}</td>
                    <td className="px-4 py-3 text-gray-600">{o.product.productName}</td>
                    <td className="px-4 py-3 text-gray-600">{o.quantity}</td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColor[o.paymentStatus] as "default" | "secondary" | "outline" | "destructive"}>
                        {o.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(o.orderDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
