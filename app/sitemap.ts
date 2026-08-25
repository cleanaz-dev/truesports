// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.truesportslive.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.truesportslive.com/merch",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
     {
      url: "https://www.truesportslive.com/work-with-us",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
    // add real article/league URLs here, ideally generated dynamically
    // from your DB (Article.slug, league pages, etc.) rather than hardcoded
  ];
}