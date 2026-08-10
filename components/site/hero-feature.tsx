import { Clock } from "lucide-react"
import { leagueAccent } from "@/lib/data" // Removed mock articles

// Same helper we used in the ArticleFeed to make dates look like "2h ago"
function getRelativeTime(dateString: string) {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 3600000;

  if (diffInHours < 1) {
    const mins = Math.floor(diffInHours * 60);
    return `${mins || 1}m ago`;
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`;
  }
  return `${Math.floor(diffInHours / 24)}d ago`;
}

export function HeroFeature({ articles }: { articles: any[] }) {
  // If the API fails or there are no articles, don't crash, just hide the section
  if (!articles || articles.length === 0) {
    return null; 
  }

  // The #1 newest article is the main feature
  const featuredArticle = articles[0];
  
  // Articles #2, #3, and #4 are the secondary list
  const secondary = articles.slice(1, 4);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Main feature */}
        <a
          href={featuredArticle.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
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
              <span className={`rounded-sm px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground ${leagueAccent(featuredArticle.league) || "bg-primary"}`}>
                {featuredArticle.league}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-foreground/70">
                Featured
              </span>
            </div>
            <h1 className="max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {featuredArticle.title}
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base line-clamp-2">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground/70">
              <span className="font-medium text-foreground">{featuredArticle.author}</span>
              <span aria-hidden>·</span>
              <span>{getRelativeTime(featuredArticle.date)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                5 min read
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
              <a 
                key={a.id} 
                href={a.link || "#"}
                target="_blank"
                rel="noopener noreferrer" 
                className="group flex gap-3 py-3 first:pt-0"
              >
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
                  <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground group-hover:text-primary line-clamp-2">
                    {a.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{getRelativeTime(a.date)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}