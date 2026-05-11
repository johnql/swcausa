import { ReactNode } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

type Props = {
  title: string;
  children: ReactNode;
};

export default async function DashboardLayout({ title, children }: Props) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard top bar */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-teal-700">SWCA</Link>
            <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-gray-600">
              <Link href="/profile" className="hover:text-teal-600">Profile</Link>
              <Link href="/orders" className="hover:text-teal-600">My Orders</Link>
              <Link href="/classes" className="hover:text-teal-600">Classes</Link>
              <Link href="/store" className="hover:text-teal-600">Store</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {user && <span className="hidden md:block truncate max-w-xs">{user.email}</span>}
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}
