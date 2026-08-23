import Image from "next/image"
import { Clock } from "lucide-react"
import { leagueAccent } from "@/lib/data"

function getPlaceholderImage(league: string | null | undefined): string {
  const map: Record<string, string> = {
    nba: "/images/placeholders/nba.png",
    nfl: "/images/placeholders/nfl.png",
    mlb: "/images/placeholders/mlb.png",
    nhl: "/images/placeholders/nhl.png",
    soccer: "/images/placeholders/soccer.png",
  }

  const key = (league || "").toLowerCase().trim()
  return map[key] || "/placeholder.svg"
}

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

export function HeroFeature({ articles }: { articles: any[] }) {
  if (!articles || articles.length === 0) {
    return null
  }

  const featured = articles[0]
  const secondary = articles.slice(1, 4)

  // Always use the league placeholder image — never a remote/CMS image
  const imageSrc = getPlaceholderImage(featured.league)

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Main feature */}
        <a
          href={featured.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative col-span-1 flex min-h-80 flex-col justify-end overflow-hidden rounded-xl border border-border lg:col-span-2 lg:min-h-[30rem]"
        >
          <Image
            src={imageSrc}
            alt={featured.title}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="relative flex flex-col gap-3 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-sm px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground ${leagueAccent(featured.league) || "bg-primary"}`}
              >
                {featured.league}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-foreground/70">
                Featured
              </span>
            </div>
            <h1 className="max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {featured.title}
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base line-clamp-2">
              {featured.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground/70">
              <span className="font-medium text-foreground">{featured.author}</span>
              <span aria-hidden>·</span>
              <span>{getRelativeTime(featured.date)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                5 min read
              </span>
            </div>
          </div>
        </a>

        {/* Secondary stories — no images */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Top Stories
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {secondary.map((a) => (
              <a
                key={a.id}
                href={a.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-4 first:pt-0"
              >
                <span
                  className={`self-start font-display text-[11px] font-bold uppercase tracking-widest ${leagueAccent(a.league)}`}
                >
                  {a.league}
                </span>
                <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground group-hover:text-primary line-clamp-2">
                  {a.title}
                </h3>
                <span className="text-xs text-muted-foreground">{getRelativeTime(a.date)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}