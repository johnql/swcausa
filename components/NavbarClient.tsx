"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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

interface Props {
  userEmail?: string | null;
  isAdmin?: boolean;
  isConvener?: boolean;
}

export default function NavbarClient({ userEmail, isAdmin, isConvener }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white sticky top-0 z-40 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/imgs/SWCAlogoO.png"
            alt="SWCA Logo"
            width={140}
            height={56}
            className="h-14 w-auto object-contain"
            priority
          />
          <span className="font-bold text-xl text-teal-800 leading-tight hidden sm:block">SWCA</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex gap-6 text-base font-medium text-gray-700">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="py-2 px-1 hover:text-teal-600 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth controls — desktop */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {userEmail ? (
            <>
              {isAdmin && (
                <Link href="/admin" className="text-base font-medium text-teal-700 hover:text-teal-900 transition-colors">
                  Admin
                </Link>
              )}
              {(isConvener || isAdmin) && (
                <Link href="/convener" className="text-base font-medium text-teal-700 hover:text-teal-900 transition-colors">
                  Convener
                </Link>
              )}
              <Link href="/profile" className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors">
                {userEmail}
              </Link>
              <Link href="/orders" className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Orders
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-base font-medium text-gray-700 hover:text-teal-600 transition-colors">
                Log in
              </Link>
              <Link href="/join" className={cn(buttonVariants({ variant: "default" }))}>
                Join Us
              </Link>
            </>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t bg-white px-4 pb-6">
          <ul className="flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 flex flex-col gap-1">
            {userEmail ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block py-3 px-4 rounded-lg text-base font-medium text-teal-700 hover:bg-teal-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                {(isConvener || isAdmin) && (
                  <Link
                    href="/convener"
                    className="block py-3 px-4 rounded-lg text-base font-medium text-teal-700 hover:bg-teal-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Convener Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="block py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-3 px-4 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>
                <div className="px-4 pt-2">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <div className="flex gap-3 pt-2 px-1">
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/join"
                  className={cn(buttonVariants({ variant: "default" }), "flex-1")}
                  onClick={() => setOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
