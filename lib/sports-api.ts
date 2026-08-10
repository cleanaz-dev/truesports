// lib/sports-api.ts
import type { Game, GameStatus, League, Team } from "@/lib/data"

// Single source of truth: league -> ESPN sport/league path
const ESPN_SPORT_PATHS: Record<League, string> = {
  NBA: "basketball/nba",
  NFL: "football/nfl",
  MLB: "baseball/mlb",
  SOCCER: "soccer/eng.1",
  NHL: "hockey/nhl",
}

// Derived from ESPN_SPORT_PATHS so the two maps can't drift out of sync
const ESPN_ENDPOINTS: Record<League, string> = Object.fromEntries(
  Object.entries(ESPN_SPORT_PATHS).map(([league, path]) => [
    league,
    `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard`,
  ])
) as Record<League, string>

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

async function fetchLeagueScores(league: League, dateStr?: string): Promise<Game[]> {
  try {
    let url = ESPN_ENDPOINTS[league];
    if (dateStr) {
      // Append the date query parameter based on the docs!
      url += `?dates=${dateStr}`;
    }
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) return [];
    const data: { events: EspnEvent[] } = await res.json();
    return data.events.map((event) => normalizeEvent(event, league));
  } catch (error) {
    return [];
  }
}

export async function fetchAllScores(dateStr?: string): Promise<Game[]> {
  const leagues: League[] = ["NBA", "NFL", "MLB", "SOCCER", "NHL"];
  const results = await Promise.all(leagues.map(l => fetchLeagueScores(l, dateStr)));
  return sortGames(results.flat());
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

export async function fetchLeagueNews(league: string) {
  // Ensure the league matches our keys (e.g., "NBA" not "nba")
  const upperLeague = league.toUpperCase() as League;
  const path = ESPN_SPORT_PATHS[upperLeague];

  if (!path) return [];

  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/news`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!res.ok) return [];

    const data = await res.json();

    // Map ESPN's structure to match your standard 'Article' format
    return data.articles.map((article: any) => ({
      id: String(article.id || article.dataSourceIdentifier),
      title: article.headline,
      excerpt: article.description,
      // Fallback to a placeholder if ESPN doesn't provide an image
      image: article.images?.[0]?.url || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop",
      league: upperLeague,
      author: article.byline || "True Sports Staff",
      date: article.published,
      // Optional: Pass the real ESPN link if you want them to click through,
      // or keep it internal to your site
      link: article.links?.web?.href,
    }));
  } catch (error) {
    console.error(`Failed to fetch ${league} news:`, error);
    return []; // Return empty array on failure so we can trigger the static fallback
  }
}

export async function fetchLeagueStandings(league: League) {
  const path = ESPN_SPORT_PATHS[league];
  // Note: Soccer requires a specific league code in the path like eng.1
  const url = `https://site.api.espn.com/apis/site/v2/sports/${path}/standings`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.children || []; // Returns conferences/divisions
  } catch (e) {
    return [];
  }
}

export async function fetchAllNews() {
  const leagues: League[] = ["NBA", "NFL", "MLB", "SOCCER", "NHL"];
  
  // Fetch news for all leagues in parallel
  const results = await Promise.all(leagues.map(l => fetchLeagueNews(l)));
  
  // Flatten the array of arrays into a single array
  const allArticles = results.flat();

  // Sort by published date (newest first)
  const sortedArticles = allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Return the top 9 latest articles (fits perfectly in a 3-column grid)
  return sortedArticles.slice(0, 9);
}