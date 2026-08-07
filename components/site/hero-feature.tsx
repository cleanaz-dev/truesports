import { Clock } from "lucide-react"
import { articles, featuredArticle, leagueAccent } from "@/lib/data"

export function HeroFeature() {
  const secondary = articles.slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Main feature */}
        <a
          href="#"
          className="group relative col-span-1 flex min-h-80 flex-col justify-end overflow-hidden rounded-xl border border-border lg:col-span-2 lg:min-h-[30rem]"
        >
          <img
            src={featuredArticle.image || "/placeholder.svg"}
            alt={featuredArticle.title}
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="relative flex flex-col gap-3 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="rounded-sm bg-primary px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground">
                {featuredArticle.league}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-foreground/70">
                Featured
              </span>
            </div>
            <h1 className="max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {featuredArticle.title}
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground/70">
              <span className="font-medium text-foreground">{featuredArticle.author}</span>
              <span aria-hidden>·</span>
              <span>{featuredArticle.timeAgo}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                {featuredArticle.readMinutes} min read
              </span>
            </div>
          </div>
        </a>

        {/* Secondary stories */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Top Stories
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {secondary.map((a) => (
              <a key={a.id} href="#" className="group flex gap-3 py-3 first:pt-0">
                <div className="size-20 shrink-0 overflow-hidden rounded-md border border-border">
                  <img
                    src={a.image || "/placeholder.svg"}
                    alt={a.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span
                    className={`font-display text-[11px] font-bold uppercase tracking-widest ${leagueAccent(a.league)}`}
                  >
                    {a.league}
                  </span>
                  <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                    {a.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{a.timeAgo}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
