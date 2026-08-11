// lib/spotlight/select.ts

import { prisma } from "./prisma";

const BDL_BASE = 'https://api.balldontlie.io/v1';

interface BdlGame {
  id: number;
  date: string;
  status: string;
  home_team: { id: number; abbreviation: string; full_name: string };
  visitor_team: { id: number; abbreviation: string; full_name: string };
  time: string; // e.g. "7:30 pm ET"
}

interface BdlOdds {
  game_id: number;
  spread: number; // absolute value, home favorite negative etc — normalize below
  total: number;
}

interface BdlStanding {
  team_id: number;
  wins: number;
  losses: number;
}

interface ScoredGame {
  game: BdlGame;
  score: number;
  reason: {
    spread: number | null;
    primetime: boolean;
    standingsGap: number | null;
  };
}
// Helper to parse BDL time (e.g., "7:30 pm ET") combined with the game date
function parseGameDateTime(dateStr: string, timeStr: string): Date {
  if (!timeStr || timeStr.toLowerCase() === 'tbd') {
    // Fallback to 7PM UTC if time is missing
    return new Date(`${dateStr}T19:00:00Z`);
  }
  // This is a basic parser assuming Eastern Time. 
  // It converts "7:30 pm ET" -> Date object
  const [time, modifier] = timeStr.toLowerCase().split(' pm');
  const isPM = timeStr.toLowerCase().includes('pm');
  let [hours, minutes] = timeStr.replace(/[^0-9:]/g, '').split(':').map(Number);
  
  if (isPM && hours < 12) hours += 12;
  if (!isPM && hours === 12) hours = 0;

  // Assuming BDL date is YYYY-MM-DD
  const dateObj = new Date(`${dateStr}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00.000-05:00`); // -05:00 for EST
  return dateObj;
}


async function bdlFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BDL_BASE}${path}`, {
    headers: { Authorization: process.env.BDL_API_KEY! },
  });
  if (!res.ok) {
    throw new Error(`BDL fetch failed: ${path} — ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

function scoreGame(
  game: BdlGame,
  odds: BdlOdds | undefined,
  standings: Map<number, BdlStanding>
): ScoredGame {
  let score = 0;
  const reason: ScoredGame['reason'] = { spread: null, primetime: false, standingsGap: null };

  // closer spread = more competitive = better spotlight candidate
  if (odds) {
    const absSpread = Math.abs(odds.spread);
    reason.spread = absSpread;
    // inverse scoring: spread of 0 → 40 pts, spread of 15+ → ~0 pts
    score += Math.max(0, 40 - absSpread * 2.5);
  }

  // primetime window (7pm–10pm local slot string check — adjust to your TZ handling)
  const isPrimetime = /\b([7-9]|10):\d{2}\s?pm/i.test(game.time ?? '');
  reason.primetime = isPrimetime;
  if (isPrimetime) score += 25;

  // standings proximity — smaller win% gap between teams = more meaningful matchup
  const home = standings.get(game.home_team.id);
  const away = standings.get(game.visitor_team.id);
  if (home && away) {
    const homePct = home.wins / Math.max(1, home.wins + home.losses);
    const awayPct = away.wins / Math.max(1, away.wins + away.losses);
    const gap = Math.abs(homePct - awayPct);
    reason.standingsGap = gap;
    // smaller gap = more points, max 35
    score += Math.max(0, 35 - gap * 100);
  }

  return { game, score, reason };
}

export async function selectSpotlightGame(league: 'nba' = 'nba') {
  const today = new Date().toISOString().split('T')[0];

  const games = await bdlFetch<BdlGame[]>(`/games?dates[]=${today}`);
  if (!games.length) {
    return null; // nothing scheduled today, cron just no-ops
  }

  const [oddsData, standingsData] = await Promise.all([
    bdlFetch<BdlOdds[]>(`/odds?dates[]=${today}`),
    bdlFetch<BdlStanding[]>('/standings'),
  ]);

  const oddsByGame = new Map(oddsData.map((o) => [o.game_id, o]));
  const standingsByTeam = new Map(standingsData.map((s) => [s.team_id, s]));

  const scored = games.map((g) =>
    scoreGame(g, oddsByGame.get(g.id), standingsByTeam)
  );

  scored.sort((a, b) => b.score - a.score);
  const winner = scored[0];

  const realGameTime = parseGameDateTime(today, winner.game.time);


  const spotlight = await prisma.dailySpotlight.create({
    data: {
      date: new Date(today),
      league,
      gameId: String(winner.game.id),
      bdlGameId: String(winner.game.id),
      homeTeam: winner.game.home_team.full_name,
      awayTeam: winner.game.visitor_team.full_name,
      selectionMode: 'auto',
      selectionScore: winner.score,
      selectionReason: winner.reason,
      requestBudget: 10,
      requestsUsed: 0,
      gameStartTime: realGameTime
    },
  });

  return spotlight;
}

/////////////////////////////
////////////////////////////
function computePhaseWindows(gameStartTime: Date) {
  return [
    { phase: 'pregame', scheduledFor: new Date(gameStartTime.getTime() - 60 * 60 * 1000) },
    { phase: 'live',    scheduledFor: new Date(gameStartTime.getTime() + 70 * 60 * 1000) },  // ~halftime
    { phase: 'live',    scheduledFor: new Date(gameStartTime.getTime() + 140 * 60 * 1000) }, // mid-late
    { phase: 'live',    scheduledFor: new Date(gameStartTime.getTime() + 190 * 60 * 1000) }, // clutch window
    { phase: 'postgame',scheduledFor: new Date(gameStartTime.getTime() + 210 * 60 * 1000) }, // ~3.5hr after tip
  ] as const;
}

export async function enqueueStoryGeneratorTasks(spotlight: { id: string; league: string }, gameStartTime: Date) {
  const windows = computePhaseWindows(gameStartTime);

  await prisma.sportStory.createMany({
    data: windows.map((w) => ({
      spotlightId: spotlight.id,
      league: spotlight.league,
      phase: w.phase,
      audience: 'stats',
      tone: 'editorial',
      status: 'pending',
      scheduledFor: w.scheduledFor,
    })),
  });
}