import { prisma } from "@/lib/prisma";
import { SystemTask, SystemTaskStatus } from "@/lib/generated/prisma/client";
import { z } from "zod";

// 1. Define the Zod Schema based on the Lambda's response
const StoryWebhookPayloadSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("COMPLETED"),
    article: z.string().min(10, "Article content is too short"),
    sources: z.array(z.string().url()).default([]),
  }),
  z.object({
    status: z.literal("FAILED"),
    error_details: z.string().default("Unknown Lambda Error"),
  }),
]);

export async function handlerGeneratedStory(task: SystemTask, rawData: unknown) {
  // Extract storyId from the task metadata (safer than relying on webhook payload)
  const metadata = task.metadata as Record<string, any> | null;
  const storyId = metadata?.storyId;

  if (!storyId) {
    console.error("Webhook Error: No storyId found in system task metadata");
    await prisma.systemTask.update({
      where: { id: task.id },
      data: { status: SystemTaskStatus.FAILED }
    });
    return;
  }

  // 2. Safely parse the incoming data
  const parsed = StoryWebhookPayloadSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error("Zod Validation Failed:", z.flattenError(parsed.error));
    
    await prisma.$transaction([
      prisma.systemTask.update({
        where: { id: task.id },
        data: {
          status: SystemTaskStatus.FAILED,
          metadata: {
            ...(metadata || {}),
            error: "Invalid webhook payload structure",
            validationErrors: z.flattenError(parsed.error),
          },
        },
      }),
      prisma.sportStory.update({
        where: { id: storyId },
        data: {
          status: "failed",
          errorMessage: "Invalid webhook payload structure from AI generation",
        }
      })
    ]);
    return;
  }

  const data = parsed.data;

  // 3. Handle Lambda Failure
  if (data.status === "FAILED") {
    await prisma.$transaction([
      prisma.systemTask.update({
        where: { id: task.id },
        data: {
          status: SystemTaskStatus.FAILED,
          metadata: {
            ...(metadata || {}),
            error: data.error_details,
          },
        },
      }),
      prisma.sportStory.update({
        where: { id: storyId },
        data: {
          status: "failed",
          errorMessage: data.error_details,
        }
      })
    ]);
    return;
  }

  // 4. Handle Lambda Success (COMPLETED)
  await prisma.$transaction([
    prisma.systemTask.update({
      where: { id: task.id },
      data: { 
        status: SystemTaskStatus.COMPLETED, 
        completedAt: new Date() 
      },
    }),
    prisma.sportStory.update({
      where: { id: storyId },
      data: {
        status: "completed",
        article: data.article,
        sources: data.sources, // Prisma handles JSON conversion automatically
        // publishedAt could also be set here if you want it live immediately
      }
    })
  ]);

  console.log(`Successfully generated and saved story: ${storyId}`);
}