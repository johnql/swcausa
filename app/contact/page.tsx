import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | SWCA",
  description: "Get in touch with the Senior Women's Christian Association.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/imgs/contact.png"
          alt="Contact SWCA"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/65" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-teal-100 mt-2">We&apos;d love to hear from you.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left — contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Get In Touch</h2>
            <p className="text-gray-600 leading-relaxed">
              Have a question, want to learn more about our programs, or just want to say
              hello? Send us a message and we&apos;ll get back to you soon.
            </p>
          </div>

          {/* Contact cards */}
          <div className="space-y-4">
            {[
              {
                icon: "/imgs/email.jpg",
                label: "Email",
                value: "hello@swcausa.org",
                href: "mailto:hello@swcausa.org",
              },
              {
                icon: "/imgs/phone.jpg",
                label: "Phone",
                value: "(617) 555-0100",
                href: "tel:+16175550100",
              },
              {
                icon: "/imgs/address.jpg",
                label: "Service Area",
                value: "MA · NH · RI · VT",
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-teal-50">
                  <Image
                    src={icon}
                    alt={label}
                    fill
                    className="object-cover object-center"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium text-gray-900 hover:text-teal-600 transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-900">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Community image */}
          <div className="relative h-56 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/imgs/Community.png"
              alt="SWCA Community"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Send a Message</h2>
          <ContactForm />
        </div>

      </div>
    </div>
  );
}
