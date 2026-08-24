import Link from "next/link"
import { Clock, Zap } from "lucide-react"
import React from "react"
import type { Article } from "@/lib/actions/get-all-articles"

const LEAGUE_ORDER = ["NBA", "NFL", "MLB", "SOCCER", "NHL"]

// 1. Define the dynamic banner content for each league
const BANNER_THEMES: Record<string, { gradient: string, title: string, subtitle: string, text: string }> = {
  NBA: { 
    gradient: "from-orange-500/20 via-orange-950/20 to-zinc-950", 
    text: "text-orange-500",
    title: "Hardwood Action", 
    subtitle: "The biggest stories around the Association." 
  },
  NFL: { 
    gradient: "from-blue-600/20 via-blue-950/20 to-zinc-950", 
    text: "text-blue-500",
    title: "Gridiron Greatness", 
    subtitle: "Breaking down every snap, score, and trade." 
  },
  MLB: { 
    gradient: "from-red-600/20 via-red-950/20 to-zinc-950", 
    text: "text-red-500",
    title: "Around The Horn", 
    subtitle: "Step up to the plate for the latest majors news." 
  },
  SOCCER: { 
    gradient: "from-emerald-500/20 via-emerald-950/20 to-zinc-950", 
    text: "text-emerald-500",
    title: "The Global Pitch", 
    subtitle: "Coverage of the beautiful game, worldwide." 
  },
  NHL: { 
    gradient: "from-sky-500/20 via-sky-950/20 to-zinc-950", 
    text: "text-sky-500",
    title: "On The Ice", 
    subtitle: "Top shelf news from around the rink." 
  },
  OTHER: { 
    gradient: "from-primary/20 via-primary/5 to-zinc-950", 
    text: "text-primary",
    title: "More Sports", 
    subtitle: "Everything else happening in the sports world." 
  }
}


// 2. Create the Banner Component
function DynamicBanner({ league }: { league: string }) {
  const theme = BANNER_THEMES[league] || BANNER_THEMES.OTHER

  return (
    <div className="relative my-4 flex w-full flex-col justify-center overflow-hidden rounded-2xl bg-zinc-950 p-6 sm:p-8 border border-white/5 shadow-lg">
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient}`} />
      
      {/* Abstract Background Icon */}
      <Zap className={`absolute -right-6 -top-6 size-40 opacity-5 -rotate-12 ${theme.text}`} />
      
      <div className="relative z-10 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className={`font-display text-[10px] font-bold uppercase tracking-widest ${theme.text}`}>
            Up Next: {league}
          </span>
          <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight text-white sm:text-3xl mt-1">
            {theme.title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            {theme.subtitle}
          </p>
        </div>
        
        {/* THIS IS THE FIX: Dynamically link to /[league] and lowercase it */}
        <Link 
          href={`/${league.toLowerCase()}`} 
          className="mt-4 sm:mt-0 group/btn flex w-fit items-center gap-2 rounded-sm bg-white/10 px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
        >
          View {league}
        </Link>
      </div>
    </div>
  )
}

function getRelativeTime(value: Date | string | null | undefined) {
  if (!value) return "Just now"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Just now"

  const diffInMs = Math.max(0, Date.now() - date.getTime())
  const diffInMinutes = Math.floor(diffInMs / 60_000)
  const diffInHours = Math.floor(diffInMs / 3_600_000)
  const diffInDays = Math.floor(diffInMs / 86_400_000)

  if (diffInMinutes < 60) return `${Math.max(1, diffInMinutes)}m ago`
  if (diffInHours < 24) return `${diffInHours}h ago`
  return `${diffInDays}d ago`
}

function groupByLeague(articles: Article[]) {
  const groups = new Map<string, Article[]>()

  for (const article of articles) {
    const league = article.league?.trim().toUpperCase() || "OTHER"
    const group = groups.get(league) ?? []
    group.push(article)
    groups.set(league, group)
  }

  return Array.from(groups.entries()).sort(([leagueA], [leagueB]) => {
    const indexA = LEAGUE_ORDER.indexOf(leagueA)
    const indexB = LEAGUE_ORDER.indexOf(leagueB)

    if (indexA === -1 && indexB === -1) return leagueA.localeCompare(leagueB)
    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
}

// Your EXACT original ArticleCard
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-xl sm:p-6 sm:hover:-translate-y-1"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex h-full min-w-0 flex-col gap-3 sm:gap-4">
        <h3 className="break-words font-display text-lg font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
          {article.title}
        </h3>

        <p className="line-clamp-3 break-words text-sm leading-relaxed text-muted-foreground">
          {article.excerpt || article.content}
        </p>

        <div className="mt-auto flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 pt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 sm:gap-x-3 sm:pt-4 sm:text-[11px] sm:tracking-widest">
          {article.author && (
            <>
              <span className="max-w-full truncate text-foreground/80">
                True Sports Staff
              </span>
              <span
                aria-hidden="true"
                className="size-1 shrink-0 rounded-full bg-border"
              />
            </>
          )}

          <span className="whitespace-nowrap">
            {getRelativeTime(article.createdAt)}
          </span>

          <span
            aria-hidden="true"
            className="size-1 shrink-0 rounded-full bg-border"
          />

          <span className="inline-flex shrink-0 items-center gap-1.5 text-foreground/60">
            <Clock className="size-3" strokeWidth={2.5} />
            3m
          </span>
        </div>
      </div>
    </Link>
  )
}

// Your EXACT original LeagueSection
function LeagueSection({
  league,
  articles,
}: {
  league: string
  articles: Article[]
}) {
  return (
    <section className="relative isolate min-w-0 overflow-hidden py-8 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-2 top-0 max-w-full select-none truncate bg-gradient-to-r from-foreground/[0.07] to-transparent bg-clip-text text-7xl font-black uppercase leading-none tracking-tighter text-transparent sm:-left-6 sm:text-[10rem] lg:text-[14rem]">
          {league}
        </div>
      </div>

      <div className="mb-5 flex min-w-0 items-end justify-between gap-3 px-1 sm:mb-6 sm:px-2">
        <h2 className="min-w-0 truncate font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
          {league}
        </h2>

        <span className="shrink-0 font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px] sm:tracking-widest">
          {articles.length} {articles.length === 1 ? "story" : "stories"}
        </span>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export function ArticleFeed({ articles }: { articles: Article[] }) {
  if (!articles?.length) {
    return null
  }

  const groupedArticles = groupByLeague(articles)

  return (
    <section className="w-full min-w-0 overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-2 flex items-center justify-between gap-4 border-b border-border/50 pb-4">
          <h2 className="font-display text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
            Latest <span className="text-primary">Buzz</span>
          </h2>

          <Link
            href="/articles"
            className="shrink-0 font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:text-xs sm:tracking-widest"
          >
            View all
          </Link>
        </div>

        <div className="flex min-w-0 flex-col">
          {/* 3. Inject the banner between sections */}
          {groupedArticles.map(([league, leagueArticles], index) => {
            const nextLeague = groupedArticles[index + 1]?.[0]

            return (
              <React.Fragment key={league}>
                <LeagueSection league={league} articles={leagueArticles} />
                
                {/* Render banner before the next league section */}
                {nextLeague && (
                  <DynamicBanner league={nextLeague} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}