import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Newsletter strip */}
      <div className="border-b border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <div>
            <p className="font-semibold text-white text-lg">Stay Connected</p>
            <p className="text-base text-gray-400">Get SWCA news, class updates, and community events in your inbox.</p>
          </div>
          <div className="w-full md:w-96">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <p className="font-bold text-white text-xl mb-3">SWCA</p>
          <p className="text-gray-400 leading-relaxed text-base">
            Senior Women&apos;s Christian Association<br />
            A Community of Care, Wellness, and Friendship
          </p>
          <p className="mt-3 text-gray-500 text-sm">Serving MA · NH · RI · VT</p>

          {/* Social links */}
          <div className="flex gap-3 mt-4">
            <a
              href="https://facebook.com/swcausa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/swcausa"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="font-semibold text-white text-base mb-4">Programs</p>
          <ul className="space-y-3 text-gray-400 text-base">
            <li><Link href="/classes" className="hover:text-white transition-colors">Wellness Classes</Link></li>
            <li><Link href="/events" className="hover:text-white transition-colors">Class Schedule</Link></li>
            <li><Link href="/join" className="hover:text-white transition-colors">Become a Member</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white text-base mb-4">Organization</p>
          <ul className="space-y-3 text-gray-400 text-base">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/store" className="hover:text-white transition-colors">Store</Link></li>
            <li><Link href="/donate" className="hover:text-white transition-colors">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white text-base mb-4">Legal</p>
          <ul className="space-y-3 text-gray-400 text-base">
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm text-gray-500 py-5">
        © {new Date().getFullYear()} Senior Women&apos;s Christian Association. All rights reserved.
      </div>
    </footer>
  );
}
