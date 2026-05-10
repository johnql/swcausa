// TODO: implement full nav with mobile sheet menu and auth state
export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <span className="font-bold text-lg">SWCA</span>
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><a href="/about">About Us</a></li>
          <li><a href="/classes">Wellness Classes</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/store">Store</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <a href="/join" className="text-sm font-medium bg-teal-600 text-white px-4 py-2 rounded-md">
          Join Us
        </a>
      </div>
    </nav>
  );
}
