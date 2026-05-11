import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/profile/", "/orders/", "/convener/", "/api/"],
    },
    sitemap: "https://swcausa.org/sitemap.xml",
  };
}
