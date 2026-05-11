import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SWCA — Senior Women's Christian Association",
    template: "%s | SWCA",
  },
  description:
    "A Community of Care, Wellness, and Friendship serving senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.",
  metadataBase: new URL("https://swcausa.org"),
  openGraph: {
    siteName: "Senior Women's Christian Association",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
