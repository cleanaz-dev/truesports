import { createCommand, lambda } from "@/lib/aws/lambda";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// app/api/cron/dispatch-stories/route.ts
export async function GET(req: Request) {
  if (req.headers.get("x-api-key") !== process.env.STORY_GEN_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const due = await prisma.sportStory.findMany({
    where: { status: "pending", scheduledFor: { lte: new Date() } },
    include: { spotlight: true },
  });

  for (const story of due) {
    if (story.spotlight.requestsUsed >= story.spotlight.requestBudget) {
      await prisma.sportStory.update({
        where: { id: story.id },
        data: { status: "failed", errorMessage: "Daily budget exhausted" },
      });
      continue;
    }

    const task = await prisma.systemTask.create({
      data: {
        type: "STORY_GENERATOR",
        status: "PENDING",
        initiator: "AI",
        metadata: {
          storyId: story.id,
          gameId: story.spotlight.bdlGameId,
          phase: story.phase,
          audience: story.audience,
          tone: story.tone,
          homeTeam: story.spotlight.homeTeam,
          awayTeam: story.spotlight.awayTeam,
        },
      },
    });

    const lambdaPayload = {
      storyId: story.id,
      taskId: task.id, // Good to pass this so webhook can update the task
      gameId: story.spotlight.bdlGameId,
      homeTeam: story.spotlight.homeTeam,
      awayTeam: story.spotlight.awayTeam,
      phase: story.phase,
      audience: story.audience,
      tone: story.tone,
      webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/system-tasks/${task.id}`,
    };

    const command = createCommand({
      functionName: "truesports-generate-story-prod",
      invocationType: "Event",
      payload: lambdaPayload,
    });

    await lambda.send(command);

    await prisma.sportStory.update({
      where: { id: story.id },
      data: { status: "generating", taskId: task.id },
    });

    // 👈 ADD THIS: Increment the budget
    await prisma.dailySpotlight.update({
      where: { id: story.spotlight.id },
      data: { requestsUsed: { increment: 1 } },
    });
  }

  return NextResponse.json({ dispatched: due.length });
}
