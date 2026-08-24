import Link from "next/link"
import { Clock } from "lucide-react"

import type { Article } from "@/lib/actions/get-all-articles"

const LEAGUE_ORDER = ["NBA", "NFL", "MLB", "SOCCER", "NHL"]

function getRelativeTime(value: Date | string | null | undefined) {
  if (!value) return "Just now"

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Just now"
  }

  const diffInMs = Math.max(0, Date.now() - date.getTime())
  const diffInMinutes = Math.floor(diffInMs / 60_000)
  const diffInHours = Math.floor(diffInMs / 3_600_000)
  const diffInDays = Math.floor(diffInMs / 86_400_000)

  if (diffInMinutes < 60) {
    return `${Math.max(1, diffInMinutes)}m ago`
  }

  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  }

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

    if (indexA === -1 && indexB === -1) {
      return leagueA.localeCompare(leagueB)
    }

    if (indexA === -1) return 1
    if (indexB === -1) return -1

    return indexA - indexB
  })
}

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
                {article.author.name}
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

function LeagueSection({
  league,
  articles,
}: {
  league: string
  articles: Article[]
}) {
  return (
    <section className="relative isolate min-w-0 overflow-hidden py-8 sm:py-12">
      {/* Keep the decorative text inside each league section. */}
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
          {groupedArticles.map(([league, leagueArticles]) => (
            <LeagueSection
              key={league}
              league={league}
              articles={leagueArticles}
            />
          ))}
        </div>
      </div>
    </section>
  )
}