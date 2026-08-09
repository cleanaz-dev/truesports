// app/api/webhooks/system-tasks/[systemTaskId]/route.ts
import { NextResponse } from "next/server";
import { SystemTaskType } from "@/lib/generated/prisma/client"; // Adjust path if needed
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { handleGeneratedArticles } from "@/lib/handlers/handle-generated-articles";


interface Params {
  params: Promise<{
    systemTaskId: string;
  }>;
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { systemTaskId } = await params;

    // 1. Security Check: Verify the webhook secret
    const headerStore = await headers();
    const webhookSecret = headerStore.get("x-webhook-secret");
    
    if (webhookSecret !== process.env.WEBHOOK_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Fetch the Task
    const task = await prisma.systemTask.findUnique({
      where: { id: systemTaskId },
    });

    if (!task) {
      return NextResponse.json({ error: "System task not found" }, { status: 404 });
    }

    const data = await request.json();

    switch (task.type) {
      case SystemTaskType.GENERATE_ARTICLES: 
        await handleGeneratedArticles(task, data);
        break;

      default:
        return NextResponse.json({ error: "Unknown system task type" }, { status: 400 });
    }

    return NextResponse.json({ message: `Successfully processed system task ID: ${systemTaskId}` });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error processing webhook" }, { status: 500 });
  }
}