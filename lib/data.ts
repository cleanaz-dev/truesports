export type League = "NBA" | "NFL" | "MLB" | "Soccer"
export const leagues: League[] = ["NBA", "NFL", "MLB", "Soccer"]
export type GameStatus = "live" | "final" | "upcoming"
export type Team = {
  id?: string
  name: string
  abbr: string
  logo?: string
  color?: string
  score?: number
  record?: string
  hasPossession?: boolean
}

export type Game = {
  id: string
  league: League
  status: GameStatus
  clock?: string
  startTime?: string
  home: Team
  away: Team
  link?: string
  seriesSummary?: string // e.g., "LAL leads 2-1"
}
export type Article = {
  id: string
  slug: string
  league: League
  title: string
  excerpt: string
  author: string
  timeAgo: string
  readMinutes: number
  image: string
  featured?: boolean
}

export type SocialPost = {
  id: string
  handle: string
  caption: string
  image: string
  likes: string
  timeAgo: string
}

export const featuredArticle: Article = {
  id: "a-hero",
  slug: "celtics-statement-win",
  league: "NBA",
  title: "Celtics Send a Message: Boston Looks Playoff-Ready in Statement Win",
  excerpt:
    "Behind a suffocating third-quarter run, Boston flexed the depth and defense that could carry them back to the Finals. Here's what the tape says.",
  author: "Marcus Bell",
  timeAgo: "32 min ago",
  readMinutes: 5,
  image: "/images/hero-nba.png",
  featured: true,
}

export const articles: Article[] = [
  {
    id: "a-1",
    slug: "qb-mvp-race",
    league: "NFL",
    title: "The MVP Race Just Got Complicated After Another Primetime Masterclass",
    excerpt: "Three quarterbacks, one trophy, and a final stretch that will decide it all.",
    author: "Dana Cross",
    timeAgo: "1 hr ago",
    readMinutes: 4,
    image: "/images/article-nfl.png",
  },
  {
    id: "a-2",
    slug: "mlb-wild-card-chase",
    league: "MLB",
    title: "October Is Calling: Inside the Wildest Wild Card Chase in Years",
    excerpt: "Five teams, two spots, and a schedule that could break hearts across the league.",
    author: "Theo Ramirez",
    timeAgo: "2 hr ago",
    readMinutes: 6,
    image: "/images/article-mlb.png",
  },
  {
    id: "a-3",
    slug: "title-race-europe",
    league: "Soccer",
    title: "A Two-Horse Race No More: The Title Picture Blows Wide Open",
    excerpt: "A dramatic weekend reshuffled the table and put a new contender in the mix.",
    author: "Priya Nair",
    timeAgo: "3 hr ago",
    readMinutes: 5,
    image: "/images/article-soccer.png",
  },
  {
    id: "a-4",
    slug: "rookie-watch-nba",
    league: "NBA",
    title: "Rookie Watch: The First-Year Star Nobody Is Talking About Yet",
    excerpt: "The numbers are quietly historic. The hype hasn't caught up — but it will.",
    author: "Marcus Bell",
    timeAgo: "4 hr ago",
    readMinutes: 3,
    image: "/images/feed-nba-2.png",
  },
  {
    id: "a-5",
    slug: "derby-day-drama",
    league: "Soccer",
    title: "Derby Day Delivers: Late Winner Sparks Chaos and a Manager on the Brink",
    excerpt: "Ninety minutes of tension boiled over in stoppage time. Nobody saw it coming.",
    author: "Priya Nair",
    timeAgo: "5 hr ago",
    readMinutes: 4,
    image: "/images/feed-soccer-2.png",
  },
]

export const socialPosts: SocialPost[] = [
  {
    id: "ig-1",
    handle: "@thepressbox",
    caption: "Fresh heat dropped on the hardwood tonight. Rate the fit 1-10 👟",
    image: "/images/ig-1.png",
    likes: "24.1k",
    timeAgo: "1h",
  },
  {
    id: "ig-2",
    handle: "@thepressbox",
    caption: "Primetime under the lights. Who's taking it home this weekend?",
    image: "/images/ig-2.png",
    likes: "18.7k",
    timeAgo: "3h",
  },
  {
    id: "ig-3",
    handle: "@thepressbox",
    caption: "Web gem of the night. Absolutely robbed a home run 🧤",
    image: "/images/ig-3.png",
    likes: "31.5k",
    timeAgo: "6h",
  },
  {
    id: "ig-4",
    handle: "@thepressbox",
    caption: "Top corner. No chance. Goal of the week candidate ⚽️",
    image: "/images/ig-4.png",
    likes: "42.9k",
    timeAgo: "9h",
  },
]

export function leagueAccent(league: League): string {
  switch (league) {
    case "NBA":
      return "text-nba"
    case "NFL":
      return "text-nfl"
    case "MLB":
      return "text-mlb"
    case "Soccer":
      return "text-soccer"
  }
}
