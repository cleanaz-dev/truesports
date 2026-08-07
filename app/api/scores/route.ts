import { NextResponse } from "next/server"
import { fetchAllScores } from "@/lib/sports-api"

// GET /api/scores
// Proxies ESPN's scoreboard endpoints server-side so the client can poll
// this route without hitting CORS issues or exposing the upstream URLs.
export async function GET() {
  const games = await fetchAllScores()
  return NextResponse.json(
    { games },
    {
      headers: {
        // Match the revalidate window used in sports-api.ts
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
      },
    },
  )
}