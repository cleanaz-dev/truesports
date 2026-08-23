import Link from "next/link"

function getRelativeTime(date: Date | string) {
  if (!date) return "Just now"
  const d = new Date(date)
  const now = new Date()
  const diffInHours = Math.abs(now.getTime() - d.getTime()) / 3600000

  if (diffInHours < 1) {
    const mins = Math.floor(diffInHours * 60)
    return `${mins || 1}m ago`
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  }
  return `${Math.floor(diffInHours / 24)}d ago`
}

export function MiniArticleFeed({ league, articles }: { league: string; articles: any[] }) {
  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col rounded-2xl border border-border/40 bg-card/20 p-5 shadow-2xl backdrop-blur-md sm:p-6">
      
      {/* Header of the widget */}
      <div className="mb-6 flex items-center border-b border-border/50 pb-4">
        <h2 className="font-display text-base font-black uppercase tracking-widest text-foreground">
          More from <span className="text-primary">{league}</span>
        </h2>
      </div>

      {/* List of articles with divide lines */}
      <div className="flex flex-col divide-y divide-border/40">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.id}`}
            className="group flex flex-col gap-2 py-5 first:pt-0 last:pb-0"
          >
            <h3 className="text-pretty font-display text-sm font-normal leading-snug text-foreground transition-colors group-hover:text-primary">
              {a.title}
            </h3>
            <span className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
              {getRelativeTime(a.createdAt || a.date)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}