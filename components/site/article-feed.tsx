import Link from "next/link"
import { Clock } from "lucide-react"

const LEAGUE_ORDER = ["NBA", "NFL", "MLB", "SOCCER", "NHL"]

function getRelativeTime(dateString: string) {
  if (!dateString) return "Just now"
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 3600000

  if (diffInHours < 1) {
    const mins = Math.floor(diffInHours * 60)
    return `${mins || 1}m ago`
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  }
  return `${Math.floor(diffInHours / 24)}d ago`
}

function groupByLeague(articles: any[]) {
  const groups = new Map<string, any[]>()

  for (const a of articles) {
    const key = (a.league || "OTHER").toUpperCase()
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(a)
  }

  return Array.from(groups.entries()).sort(([a], [b]) => {
    const ai = LEAGUE_ORDER.indexOf(a)
    const bi = LEAGUE_ORDER.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

function ArticleCard({ a }: { a: any }) {
  // Use the ID from your Prisma model to route dynamically
  const articleUrl = `/articles/${a.id}`

  return (
    <Link
      href={articleUrl}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Subtle hover accent line at the top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex h-full flex-col gap-4">
        <h3 className="text-balance font-display text-xl font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
          {a.title}
        </h3>

        {/* Fallback to 'content' if 'excerpt' doesn't exist on your schema yet */}
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {a.excerpt || a.content}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
          {a.author && (
            <>
              {/* Adjust a.author depending on if it's a string or relation object like a.author.name */}
              <span className="text-foreground/80">
                {typeof a.author === 'string' ? a.author : a.author.name}
              </span>
              <span aria-hidden className="size-1 rounded-full bg-border" />
            </>
          )}
          {/* Support createdAt if you are directly passing prisma models */}
          <span>{getRelativeTime(a.createdAt || a.date)}</span>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5 text-foreground/60">
            <Clock className="size-3" strokeWidth={2.5} />
            3m
          </span>
        </div>
      </div>
    </Link>
  )
}

function LeagueSection({ league, articles }: { league: string; articles: any[] }) {
  return (
    <div className="relative isolate flex flex-col gap-6 pt-10 pb-8 sm:pt-16">
      {/* LOUDER: Massive Background Text with a left-to-right fade */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-4 top-0 select-none bg-gradient-to-r from-foreground/[0.07] to-transparent bg-clip-text text-[8rem] font-black uppercase leading-none tracking-tighter text-transparent sm:-left-8 sm:text-[12rem] md:text-[16rem]">
          {league}
        </div>
      </div>

      <div className="flex items-end justify-between px-2">
        <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
          {league}
        </h2>
        <span className="mb-1 font-display text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          {articles.length} {articles.length === 1 ? "story" : "stories"}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.id} a={a} />
        ))}
      </div>
    </div>
  )
}

export function ArticleFeed({ articles }: { articles: any[] }) {
  if (!articles || articles.length === 0) {
    return null
  }

  const grouped = groupByLeague(articles)

  return (
    <section className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-4">
        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground">
          Latest <span className="text-primary">Buzz</span>
        </h2>
        <a
          href="#"
          className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </a>
      </div>

      <div className="flex flex-col gap-8 sm:gap-12">
        {grouped.map(([league, leagueArticles]) => (
          <LeagueSection key={league} league={league} articles={leagueArticles} />
        ))}
      </div>
    </section>
  )
}