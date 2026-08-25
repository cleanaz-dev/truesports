"use server"

import { prisma } from "../prisma";
import { articleSchema, ArticleFormValues } from "@/lib/schemas/article";

export async function createArticleAction(data: ArticleFormValues) {
  const parsed = articleSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "Invalid form data." };
  }

  const authorId = "REPLACE_WITH_REAL_AUTHOR_ID";

  try {
    await prisma.article.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        league: parsed.data.league,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        readMinutes: parsed.data.readMinutes,
        featured: parsed.data.featured,
        image: parsed.data.image || "https://placehold.co/600x400/png",
        originalUrl: parsed.data.originalUrl || null,
        status: "DRAFT",
        authorId,
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to create article:", error);
    return { success: false, error: "Failed to save article to database." };
  }
}