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
    default: "SWCA — Senior Women's Christian Association | New England",
    template: "%s | SWCA",
  },
  description:
    "The Senior Women's Christian Association (SWCA) offers free wellness classes — Tai Chi, Yoga, Fitness, Table Tennis, Dance, and Singing — plus community programs and personal support for senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.",
  keywords: [
    "senior women's association",
    "SWCA",
    "senior women wellness New England",
    "wellness classes for senior women",
    "tai chi for seniors Massachusetts",
    "yoga for seniors New England",
    "senior women community",
    "Christian senior women association",
    "free wellness classes seniors",
    "senior fitness classes Massachusetts",
    "senior women New Hampshire",
    "senior women Rhode Island",
    "senior women Vermont",
    "senior women organization New England",
    "senior women fitness programs",
    "elderly women wellness programs",
    "community for senior women",
    "senior women's club Massachusetts",
    "free senior social event in MA",
    "free senior social event in NH",
    "free senior social event in RI",
    "free senior social event in VT",
    "free senior social meetup in MA",
    "free senior social meetup in NH",
    "free senior social meetup in RI",
    "free senior social meetup in VT",
    "senior wellness program in MA",
  ],
  metadataBase: new URL("https://swcausa.org"),
  openGraph: {
    siteName: "Senior Women's Christian Association",
    type: "website",
    locale: "en_US",
    url: "https://swcausa.org",
    title: "SWCA — Free Wellness Classes & Community for Senior Women",
    description:
      "Free Tai Chi, Yoga, Fitness, and community programs for senior women in Massachusetts, New Hampshire, Rhode Island, and Vermont. Join SWCA today.",
    images: [
      {
        url: "/imgs/SWCATitleNew.jpg",
        width: 1200,
        height: 630,
        alt: "Senior Women's Christian Association — Community of Care, Wellness & Friendship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWCA — Free Wellness Classes for Senior Women in New England",
    description:
      "Tai Chi, Yoga, Fitness, and community for senior women in MA, NH, RI, and VT. Free membership.",
    images: ["/imgs/SWCATitleNew.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Senior Women's Christian Association", url: "https://swcausa.org" }],
  creator: "Senior Women's Christian Association",
  publisher: "Senior Women's Christian Association",
  category: "Non-Profit Community Organization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Senior Women's Christian Association",
    "alternateName": "SWCA",
    "url": "https://swcausa.org",
    "logo": "https://swcausa.org/imgs/SWCAlogoO.png",
    "image": "https://swcausa.org/imgs/SWCATitleNew.jpg",
    "description": "A Community of Care, Wellness, and Friendship serving senior women across Massachusetts, New Hampshire, Rhode Island, and Vermont.",
    "areaServed": [
      { "@type": "State", "name": "Massachusetts" },
      { "@type": "State", "name": "New Hampshire" },
      { "@type": "State", "name": "Rhode Island" },
      { "@type": "State", "name": "Vermont" },
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-416-830-0685",
      "contactType": "customer service",
      "email": "hello@swcausa.org",
      "availableLanguage": "English",
    },
    "sameAs": [
      "https://facebook.com/swcausa",
      "https://instagram.com/swcausa",
    ],
    "knowsAbout": [
      "Tai Chi for seniors",
      "Yoga for seniors",
      "Senior wellness",
      "Senior women community",
      "Fitness for elderly women",
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
