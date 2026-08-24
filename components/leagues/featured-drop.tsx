import { Clock } from "lucide-react"
import { articles, leagueAccent } from "@/lib/data"
import { getPlaceholderImage, getRelativeTime } from "@/lib/utils"
import type { LeagueArticle } from "@/lib/actions/get-leagure-articles"

export function FeaturedDrop({ article }: { article: LeagueArticle }) {
  const imageSrc = getPlaceholderImage(article.league)

  return (
    <a
      href={`/articles/${article.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10"
    >
      {/* Top Section: Image */}
      <div className="relative h-[250px] w-full overflow-hidden sm:h-[350px] lg:h-[450px]">
        <img
          src={imageSrc}
          alt={article.title}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Bottom Section: Solid Background & Text Details */}
      <div className="flex flex-col p-6 sm:p-8 lg:p-10">
        {/* Badges */}
        <div className="mb-4 flex items-center gap-3">
          <span
            className={`rounded bg-secondary px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest ${leagueAccent(article.league)}`}
          >
            {article.league}
          </span>
          {article.featured && (
            <span className="rounded bg-primary/10 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-primary">
              Featured Drop
            </span>
          )}
        </div>

        {/* Headline */}
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-4xl lg:text-5xl">
          {article.title}
        </h2>

        {/* Excerpt */}
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
          {article.excerpt}
        </p>

        {/* Article Metadata (Author, Time, Read Length) */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-muted-foreground sm:text-sm">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-foreground">
              {article.authorId?.charAt(0) ?? "?"}
            </div>
            <span className="text-foreground">{article.author.name}</span>
          </div>

          <span className="size-1 rounded-full bg-border" />

          <span>{getRelativeTime(article.createdAt)}</span>

          <span className="size-1 rounded-full bg-border" />

          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </a>
  )
}