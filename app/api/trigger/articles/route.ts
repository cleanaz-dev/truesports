// app/api/trigger/articles/route.ts
import { lambda, createCommand } from "@/lib/aws/lambda";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { fetchLeagueNews } from "@/lib/sports-api";

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.AI_NEWS_API_KEY;
        const headerStore = await headers();
        const authHeader = headerStore.get("x-api-key");

        // 👇 TEMP DEBUG
        console.log("Incoming request URL:", request.url);
        console.log("x-api-key received:", authHeader ? `"${authHeader}"` : "MISSING");
        console.log("Expected AI_NEWS_API_KEY set:", apiKey ? `yes (len ${apiKey.length})` : "MISSING/undefined");
        console.log("All headers:", Object.fromEntries(headerStore.entries()));

        if (!authHeader || authHeader !== apiKey) {
            console.log("Auth failed — mismatch or missing header");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const searchParams = request.nextUrl.searchParams;
        const league = searchParams.get("league") || "NBA";

        // 1. Fetch raw articles from ESPN
        const espnArticles = await fetchLeagueNews(league);
        if (!espnArticles || espnArticles.length === 0) {
             return NextResponse.json({ message: "No news found right now." });
        }

        // Get an array of just the URLs ESPN gave us
        const espnLinks = espnArticles.map((a: any) => a.link);

        // ==========================================
        // CHECK 1: Are these already finished in the DB?
        // ==========================================
        const existingArticles = await prisma.article.findMany({
            where: { originalUrl: { in: espnLinks } },
            select: { originalUrl: true }
        });
        const finishedUrls = existingArticles.map(a => a.originalUrl);

        // ==========================================
        // CHECK 2: Are these currently PENDING in a task?
        // ==========================================
        const pendingTasks = await prisma.systemTask.findMany({
            where: { 
                status: "PENDING", 
                type: "GENERATE_ARTICLES" 
            },
            select: { metadata: true }
        });
        
        // Extract URLs from the metadata of all pending tasks
        const pendingUrls = pendingTasks.flatMap(task => {
            const meta = task.metadata as any;
            return meta?.espnUrls || [];
        });

        // ==========================================
        // FILTER: Keep only truly NEW articles
        // ==========================================
        const urlsToSkip = new Set([...finishedUrls, ...pendingUrls]);
        
        const newArticles = espnArticles.filter(
            (a: any) => !urlsToSkip.has(a.link)
        );

        if (newArticles.length === 0) {
            return NextResponse.json({ message: `No new articles for ${league}. AI budget saved!` });
        }

        // Take up to 3 of the genuinely NEW articles
        const articlesToProcess = newArticles.slice(0, 3).map((article: any) => ({
            espnId: article.id,
            title: article.title,
            link: article.link,
            league: league
        }));

        // Create the System Task and save the URLs in metadata for Check 2
        const systemTask = await prisma.systemTask.create({
            data: {
                status: "PENDING",
                type: "GENERATE_ARTICLES",
                initiator: "AI",
                metadata: {
                    league: league,
                    articlesSent: articlesToProcess.length,
                    espnUrls: articlesToProcess.map((a: any) => a.link)
                }
            },
        });

        const baseUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
        const webhookUrl = `${baseUrl}/api/webhooks/system-tasks/${systemTask.id}`;

        // Send to Lambda
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
            message: `Sent ${articlesToProcess.length} new articles to Lambda`, 
            systemTaskId: systemTask.id 
        });
        
    } catch (error) {
        console.error("Failed to trigger article generation:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}