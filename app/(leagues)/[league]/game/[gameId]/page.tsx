// app/(leagues)/[league]/game/[gameId]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchGameStats } from "@/lib/sports-api";
import { League } from "@/lib/data";

interface Params {
  params: Promise<{
    league: string;
    gameId: string;
  }>;
}

export default async function GameStatsPage({ params }: Params) {
  const resolvedParams = await params;
  const leagueParam = resolvedParams.league.toUpperCase() as League;
  const gameId = resolvedParams.gameId;

  // Fetch the detailed stats for this specific game
  const gameData = await fetchGameStats(leagueParam, gameId);

  if (!gameData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-muted-foreground">Game not found.</h1>
      </div>
    );
  }

  // Extract useful info from the ESPN summary payload
  const homeTeam = gameData.boxscore?.teams?.find((t: any) => t.homeAway === 'home');
  const awayTeam = gameData.boxscore?.teams?.find((t: any) => t.homeAway === 'away');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link 
        href={`/${leagueParam.toLowerCase()}`}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to {leagueParam}
      </Link>

      {/* Game Header (Scores) */}
      <div className="bg-card/40 rounded-2xl p-8 shadow-sm border border-border mb-8">
        <div className="flex justify-between items-center text-center">
          {/* Away Team */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-display font-black">{awayTeam?.team?.displayName}</h2>
            <span className="text-sm text-muted-foreground">Away</span>
          </div>

          {/* Score */}
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

          {/* Home Team */}
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-display font-black">{homeTeam?.team?.displayName}</h2>
            <span className="text-sm text-muted-foreground">Home</span>
          </div>
        </div>
      </div>

      {/* Team Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-card/40 p-6 rounded-2xl border border-border">
           <h3 className="text-xl font-bold font-display uppercase border-b border-border pb-4 mb-4">Team Stats</h3>
           {/* ESPN returns an array of stats. You can map through them here */}
           <ul className="space-y-3">
             {homeTeam?.statistics?.slice(0, 5).map((stat: any, index: number) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{stat.displayValue}</span>
                  <span className="font-medium">{stat.label}</span>
                  <span className="text-muted-foreground">{awayTeam?.statistics?.[index]?.displayValue}</span>
                </li>
             ))}
           </ul>
        </div>
        
        {/* Placeholder for Box Score / Player Stats */}
        <div className="bg-card/40 p-6 rounded-2xl border border-border flex items-center justify-center text-muted-foreground text-center">
           <p>Player Box Score goes here.<br/>(Map through `gameData.boxscore.players`)</p>
        </div>
      </div>
    </div>
  );
}