import { Clock } from "lucide-react"
import { leagueAccent } from "@/lib/data" 
// Removed mock 'articles' import

// Helper to calculate "2h ago", "1d ago", etc.
function getRelativeTime(dateString: string) {
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

// Define the shape of our props based on what fetchLeagueNews returns
export function ArticleFeed({ articles }: { articles: any[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
          Latest <span className="text-primary">Buzz</span>
        </h2>
        <a
          href="#"
          className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          View all
        </a>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <a
            key={a.id}
            href={a.link || "#"} // Fallback to # if no link is provided
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={a.image || "/placeholder.svg"}
                alt={a.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute left-3 top-3 rounded-sm bg-background/85 px-2 py-0.5 font-display text-[11px] font-bold uppercase tracking-widest backdrop-blur ${leagueAccent(
                  a.league,
                )}`}
              >
                {a.league}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <h3 className="text-pretty font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary">
                {a.title}
              </h3>
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              <div className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{a.author}</span>
                <span aria-hidden>·</span>
                {/* Dynamically calculate time ago based on ESPN's publish date */}
                <span>{getRelativeTime(a.date)}</span>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3" />
                  {/* ESPN API doesn't give read time, so we static set ~3m as visual filler for now */}
                  3m
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}