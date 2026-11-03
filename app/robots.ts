import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The contact API route is for form submissions, not for indexing.
      disallow: "/api/",
    },
    sitemap: `${site.website}/sitemap.xml`,
    host: site.website,
  };
}
