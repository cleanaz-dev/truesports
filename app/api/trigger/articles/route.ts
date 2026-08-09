// app/api/trigger/articles/route.ts
import { lambda, createCommand } from "@/lib/aws/lambda";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server"; // Note: Added NextRequest
import { fetchLeagueNews } from "@/lib/sports-api";

// Changed to GET (but you can literally copy-paste this and export it as POST too)
export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.AI_NEWS_API_KEY;
        const headerStore = await headers();
        
        // Note: If using Vercel Cron, Vercel actually passes an "Authorization: Bearer <CRON_SECRET>"
        // But if you are using your own custom x-api-key, this works perfectly.
        const authHeader = headerStore.get("x-api-key");
        
        if (!authHeader || authHeader !== apiKey) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 1. Get the league from the URL query params instead of the body
        // Example: /api/trigger/articles?league=NFL
        const searchParams = request.nextUrl.searchParams;
        const league = searchParams.get("league") || "NBA"; // Default to NBA

        // 2. FETCH THE ACTUAL ESPN NEWS
        const espnArticles = await fetchLeagueNews(league);

        if (!espnArticles || espnArticles.length === 0) {
             return NextResponse.json({ message: "No news found right now." });
        }

        // 3. Take top 3 latest articles
        const articlesToProcess = espnArticles.slice(0, 3).map((article: any) => ({
            espnId: article.id,
            title: article.title,
            link: article.link,
            league: league
        }));

        // 4. Create the System Task
        const systemTask = await prisma.systemTask.create({
            data: {
                status: "PENDING",
                type: "GENERATE_ARTICLES",
                initiator: "AI",
                metadata: {
                    league: league,
                    articlesSent: articlesToProcess.length,
                    espnIds: articlesToProcess.map((a: any) => a.espnId)
                }
            },
        });

        const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
        const webhookUrl = `${baseUrl}/api/webhooks/system-tasks/${systemTask.id}`;

        // 5. PASS THE DATA TO LAMBDA
        const payload = {
            systemTaskId: systemTask.id,
            webhookUrl: webhookUrl,
            articles: articlesToProcess
        };

        const command = createCommand({
            functionName: process.env.AWS_LAMBDA_NEWS_WORKER_NAME || "your-lambda-function-name",
            payload: payload,
            invocationType: "Event",
        });

        await lambda.send(command);

        return NextResponse.json({ 
            message: `Sent ${articlesToProcess.length} articles to Lambda for processing`, 
            systemTaskId: systemTask.id 
        });
        
    } catch (error) {
        console.error("Failed to trigger article generation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}