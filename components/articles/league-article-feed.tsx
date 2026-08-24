import Link from "next/link"
import { Clock } from "lucide-react"
import { getRelativeTime } from "@/lib/utils"
import type { LeagueArticle } from "@/lib/actions/get-leagure-articles"

export function LeagueArticleCard({ article }: { article: LeagueArticle }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/20 p-6 transition-all duration-300 hover:translate-x-1 hover:border-primary/40 hover:bg-card/60 hover:shadow-xl"
    >
      {/* Subtle left hover accent line to differentiate from the homepage ArticleCard */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex h-full flex-col gap-4">
        <h3 className="text-balance font-display text-xl font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
          {article.author?.name && (
            <>
              <span className="text-foreground/80">{article.author.name}</span>
              <span aria-hidden className="size-1 rounded-full bg-border" />
            </>
          )}
          <span>{getRelativeTime(article.createdAt)}</span>
          <span aria-hidden className="size-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1.5 text-foreground/60">
            <Clock className="size-3" strokeWidth={2.5} />
            5m
          </span>
        </div>
      </div>
    </Link>
  )
}

export function LeagueArticleFeed({ articles }: { articles: LeagueArticle[] }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex min-h-[20vh] items-center justify-center rounded-2xl border border-dashed border-border/60 bg-card/10">
        <p className="text-sm font-medium text-muted-foreground">
          No stories yet for this league.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {articles.map((article) => (
        <LeagueArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}