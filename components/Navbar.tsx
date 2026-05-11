import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import LogoutButton from "@/components/LogoutButton";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/classes", label: "Wellness Classes" },
  { href: "/events", label: "Schedule" },
  { href: "/store", label: "Store" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="border-b bg-white sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <Image
            src="/imgs/SWCAlogoO.png"
            alt="SWCA Logo"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex gap-5 text-sm font-medium text-gray-700">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-teal-600 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth controls */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Link
                href="/profile"
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                {user.email}
              </Link>
              <Link
                href="/orders"
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                Orders
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                Log in
              </Link>
              <Link
                href="/join"
                className={cn(buttonVariants({ variant: "default" }), "text-sm")}
              >
                Join Us
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
