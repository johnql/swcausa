import type { MetadataRoute } from "next";

const base = "https://swcausa.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "monthly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${base}/classes`,     lastModified: new Date(), changeFrequency: "weekly",   priority: 0.9 },
    { url: `${base}/events`,      lastModified: new Date(), changeFrequency: "weekly",   priority: 0.9 },
    { url: `${base}/store`,       lastModified: new Date(), changeFrequency: "weekly",   priority: 0.7 },
    { url: `${base}/donate`,      lastModified: new Date(), changeFrequency: "monthly",  priority: 0.6 },
    { url: `${base}/join`,        lastModified: new Date(), changeFrequency: "monthly",  priority: 0.8 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "monthly",  priority: 0.5 },
    { url: `${base}/privacy`,     lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
    { url: `${base}/terms`,       lastModified: new Date(), changeFrequency: "yearly",   priority: 0.3 },
  ];
}
