import type { MetadataRoute } from "next";
import { siteMeta } from "@/lib/site-meta";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMeta.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
