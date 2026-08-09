// app/api/scores/route.ts
import { NextResponse } from "next/server";
import { fetchAllScores } from "@/lib/sports-api";

export async function GET(request: Request) {
  // Read the date from the URL (e.g., /api/scores?date=20231025)
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date") || undefined;

  const games = await fetchAllScores(dateStr);
  
  return NextResponse.json({ games }, {
    headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" },
  });
}