// lib/sports-api.ts
import type { Game, GameStatus, League, Team } from "@/lib/data"

const ESPN_ENDPOINTS: Record<League, string> = {
  NBA: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
  NFL: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  MLB: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
  Soccer: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
}


// Add this helper to map your leagues to ESPN's URL structure for the summary endpoint
const ESPN_SPORT_PATHS: Record<League, string> = {
  NBA: "basketball/nba",
  NFL: "football/nfl",
  MLB: "baseball/mlb",
  Soccer: "soccer/eng.1",
};

// Expanded types to match the richer data we are pulling
type EspnCompetitor = {
  id: string
  homeAway: "home" | "away"
  score?: string
  team: {
    abbreviation: string
    displayName: string
    logo?: string
    color?: string
  }
  records?: { summary: string }[]
}

type EspnEvent = {
  id: string
  date: string
  status: {
    type: { state: "pre" | "in" | "post"; shortDetail: string; detail: string }
  }
  competitions: {
    competitors: EspnCompetitor[]
    series?: { summary: string }
    situation?: { possession?: string }
  }[]
  links?: { href: string }[]
}

function mapStatus(state: EspnEvent["status"]["type"]["state"]): GameStatus {
  if (state === "in") return "live"
  if (state === "post") return "final"
  return "upcoming"
}

function toTeam(competitor: EspnCompetitor | undefined, possessionId?: string): Team {
  return {
    id: competitor?.id,
    name: competitor?.team.displayName ?? "TBD",
    abbr: competitor?.team.abbreviation ?? "TBD",
    logo: competitor?.team.logo,
    color: competitor?.team.color ? `#${competitor.team.color}` : undefined,
    score: competitor?.score !== undefined ? Number(competitor.score) : undefined,
    record: competitor?.records?.[0]?.summary,
    hasPossession: competitor?.id === possessionId,
  }
}

function normalizeEvent(event: EspnEvent, league: League): Game {
  const comp = event.competitions[0]
  const competitors = comp?.competitors ?? []
  const home = competitors.find((c) => c.homeAway === "home")
  const away = competitors.find((c) => c.homeAway === "away")
  const status = mapStatus(event.status.type.state)

  return {
    id: event.id,
    league,
    status,
    clock: status !== "upcoming" ? event.status.type.shortDetail : undefined,
    startTime: status === "upcoming" ? event.status.type.shortDetail : undefined,
    seriesSummary: comp?.series?.summary,
    link: event.links?.[0]?.href,
    home: toTeam(home, comp?.situation?.possession),
    away: toTeam(away, comp?.situation?.possession),
  }
}

// Intelligent Sorting: Live > Upcoming > Final
function sortGames(games: Game[]): Game[] {
  const statusOrder = { live: 0, upcoming: 1, final: 2 }
  return games.sort((a, b) => {
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }
    return (a.startTime || "").localeCompare(b.startTime || "")
  })
}

async function fetchLeagueScores(league: League): Promise<Game[]> {
  try {
    const res = await fetch(ESPN_ENDPOINTS[league], { next: { revalidate: 30 } })
    if (!res.ok) return []
    const data: { events: EspnEvent[] } = await res.json()
    return data.events.map((event) => normalizeEvent(event, league))
  } catch (error) {
    return []
  }
}

export async function fetchAllScores(): Promise<Game[]> {
  const leagues: League[] = ["NBA", "NFL", "MLB", "Soccer"]
  const results = await Promise.all(leagues.map(fetchLeagueScores))
  return sortGames(results.flat())
}

export async function fetchGameStats(league: League, gameId: string) {
  const path = ESPN_SPORT_PATHS[league];
  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/summary?event=${gameId}`;

  try {
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return null;
    
    // The summary endpoint returns a MASSIVE object. 
    // It includes boxscore, plays, drives, win probabilities, etc.
    const data = await res.json();
    
    return {
      header: data.header,       // Basic game info, score, status
      boxscore: data.boxscore,   // Player stats, team stats
      plays: data.plays,         // Play-by-play (if live or final)
      leaders: data.leaders,     // Top performers
    };
  } catch (error) {
    console.error("Failed to fetch game stats:", error);
    return null;
  }
}