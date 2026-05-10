// TODO: add social links and newsletter signup
export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 flex flex-col md:flex-row justify-between gap-6 text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-900">Senior Women&apos;s Christian Association</p>
          <p className="mt-1">A Community of Care, Wellness, and Friendship</p>
          <p className="mt-1">Serving MA · NH · RI · VT</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="font-medium text-gray-900 mb-2">Links</p>
            <ul className="space-y-1">
              <li><a href="/about">About Us</a></li>
              <li><a href="/classes">Wellness Classes</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900 mb-2">Legal</p>
            <ul className="space-y-1">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t text-center text-xs text-gray-400 py-4">
        © {new Date().getFullYear()} Senior Women&apos;s Christian Association. All rights reserved.
      </div>
    </footer>
  );
}
