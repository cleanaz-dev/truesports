// lib/handlers/handle-generated-articles.ts
import { prisma } from "@/lib/prisma";
import { SystemTask, SystemTaskStatus, League } from "@/lib/generated/prisma/client";
import { z } from "zod";

// 1. Define your Zod Schemas
const ArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().default(""),
  content: z.string().min(10, "Content is too short"),
  league: z.enum(League),
  readMinutes: z.coerce.number().int().default(3), // coerce turns "3" (string) into 3 (number)
  originalUrl: z.url().optional(),
});

// Use a discriminated union based on the "status" field your Python Lambda sends
const WebhookPayloadSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("COMPLETED"),
    articles: z.array(ArticleSchema).default([]),
  }),
  z.object({
    status: z.literal("FAILED"),
    error_details: z.string().default("Unknown Lambda Error"),
  }),
]);

function generateSlug(title: string) {
  const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${baseSlug}-${randomSuffix}`;
}

// Notice we keep data as `unknown` or `any` because Zod will validate it
export async function handleGeneratedArticles(task: SystemTask, rawData: unknown) {
  // 2. Safely parse the incoming data
  const parsed = WebhookPayloadSchema.safeParse(rawData);

  if (!parsed.success) {
    // If Zod validation fails, log it and mark the task as FAILED
    console.error("Zod Validation Failed:", parsed.error.format());
    await prisma.systemTask.update({
      where: { id: task.id },
      data: {
        status: SystemTaskStatus.FAILED,
        metadata: {
          ...(task.metadata as object || {}),
          error: "Invalid webhook payload structure",
          validationErrors: parsed.error.flatten(),
        },
      },
    });
    return;
  }

  const data = parsed.data;

  // 3. Handle Lambda Failure
  if (data.status === "FAILED") {
    await prisma.systemTask.update({
      where: { id: task.id },
      data: {
        status: SystemTaskStatus.FAILED,
        metadata: {
          ...(task.metadata as object || {}),
          error: data.error_details,
        },
      },
    });
    return;
  }

  const articles = data.articles;

  if (articles.length === 0) {
    await prisma.systemTask.update({
      where: { id: task.id },
      data: { status: SystemTaskStatus.COMPLETED, completedAt: new Date() },
    });
    return;
  }

  // 4. Ensure an "AI Writer" exists
  const AI_EMAIL = "ai@truesports.com";
  let aiAuthor = await prisma.user.findUnique({
    where: { email: AI_EMAIL },
  });

  if (!aiAuthor) {
    aiAuthor = await prisma.user.create({
      data: {
        id: "ai-system-author",
        name: "True Sports AI",
        email: AI_EMAIL,
        emailVerified: true,
        role: "ADMIN",
        image: "https://api.dicebear.com/9.x/bottts/svg?seed=TrueSports",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // 5. Format the articles for Prisma
  // (TypeScript now knows exact types for `article.title`, `article.league`, etc.)
 const articlesToInsert = articles.map((article: any) => ({
    slug: generateSlug(article.title),
    league: article.league as League,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    readMinutes: article.readMinutes || 3,
    image: `gradient:${article.league}`, 
    authorId: aiAuthor.id,
    
    // 👇 ADD THIS LINE SO THE CRON CAN FIND IT LATER 👇
    originalUrl: article.originalUrl, 
  }));

  // 6. Insert everything in one database transaction
  await prisma.$transaction(async (tx) => {
    await tx.article.createMany({
      data: articlesToInsert,
      skipDuplicates: true, 
    });

    await tx.systemTask.update({
      where: { id: task.id },
      data: { 
        status: SystemTaskStatus.COMPLETED,
        completedAt: new Date(),
        metadata: {
          ...(task.metadata as object || {}),
          articlesInserted: articlesToInsert.length
        }
      },
    });
  });

  console.log(`Successfully generated and inserted ${articlesToInsert.length} articles!`);
}