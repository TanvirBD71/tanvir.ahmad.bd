import type { MetadataRoute } from "next";
import { gallery, site } from "@/lib/content";

// Update this date whenever the page content in lib/content.ts changes,
// so search engines know when the page was last meaningfully modified.
const lastModified = new Date("2026-11-03");

export default function sitemap(): MetadataRoute.Sitemap {
  const images = [
    `${site.website}${site.headshotSrc}`,
    ...gallery.items
      .map((item) => item.imageSrc)
      .filter((src): src is string => Boolean(src))
      .map((src) => `${site.website}${src}`),
  ];

  return [
    {
      url: `${site.website}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images,
    },
  ];
}
