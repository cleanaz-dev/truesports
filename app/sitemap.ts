import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await prisma.article.findMany({
    select: { id: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  const articleUrls: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `https://www.truesportslive.com/articles/${article.id}`,
    lastModified: article.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

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
    ...articleUrls,
  ];
}