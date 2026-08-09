// app/(leagues)/[league]/game/[gameId]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchGameStats } from "@/lib/sports-api";
import { League } from "@/lib/data";
import { MlbBoxScore } from "@/components/leagues/mlb-boxscore";
import { NbaBoxScore } from "@/components/leagues/nba-boxscore";

// Import our new sport-specific components (we will make these in Step 2)


interface Params {
  params: Promise<{ league: string; gameId: string }>;
}

export default async function GameStatsPage({ params }: Params) {
  const resolvedParams = await params;
  const leagueParam = resolvedParams.league.toUpperCase() as League;
  const gameId = resolvedParams.gameId;

  const gameData = await fetchGameStats(leagueParam, gameId);

  if (!gameData) return <div>Game not found.</div>;

  const homeTeam = gameData.boxscore?.teams?.find((t: any) => t.homeAway === 'home');
  const awayTeam = gameData.boxscore?.teams?.find((t: any) => t.homeAway === 'away');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link href={`/${leagueParam.toLowerCase()}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="size-4" /> Back to {leagueParam}
      </Link>

      {/* UNIVERSAL HEADER (Works for all sports) */}
      <div className="bg-card/40 rounded-2xl p-8 shadow-sm border border-border mb-8">
        <div className="flex justify-between items-center text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-display font-black">{awayTeam?.team?.displayName}</h2>
            <span className="text-sm text-muted-foreground">Away</span>
          </div>
          <div className="flex flex-col items-center px-8">
            <div className="text-5xl font-black font-display tracking-tighter">
              {gameData.header?.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'away')?.score || "0"}
              {" - "}
              {gameData.header?.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'home')?.score || "0"}
            </div>
            <div className="text-sm font-medium mt-2 text-primary uppercase">
              {gameData.header?.competitions[0]?.status?.type?.detail || "Scheduled"}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-display font-black">{homeTeam?.team?.displayName}</h2>
            <span className="text-sm text-muted-foreground">Home</span>
          </div>
        </div>
      </div>

      {/* SPORT-SPECIFIC BOX SCORES */}
      <div className="mt-8">
        {leagueParam === "NBA" && <NbaBoxScore boxscore={gameData.boxscore} />}
        {leagueParam === "MLB" && <MlbBoxScore boxscore={gameData.boxscore} />}
        {/* Add NFL and Soccer when you are ready! */}
        {/* {leagueParam === "NFL" && <NflBoxScore boxscore={gameData.boxscore} />} */}
      </div>
    </div>
  );
}