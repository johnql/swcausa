import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | SWCA",
  description: "Get in touch with the Senior Women's Christian Association.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600">
            Have a question or want to learn more? Send us a message and we&apos;ll
            get back to you soon.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
