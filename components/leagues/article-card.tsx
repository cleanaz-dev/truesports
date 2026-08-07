import Link from "next/link"
import { Clock } from "lucide-react"
import { type Article, leagueAccent } from "@/lib/data"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link 
      href={`/${article.league.toLowerCase()}/${article.slug}`}
      className="group flex flex-col gap-4 rounded-xl border border-transparent p-2 transition-all hover:bg-muted/30 hover:border-border"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted shadow-sm">
        <img 
          src={article.image} 
          alt={article.title}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle overlay to make it look premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
          <span className={`${leagueAccent(article.league)}`}>
            {article.league}
          </span>
          <span className="size-1 rounded-full bg-border" />
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {article.timeAgo}
          </span>
        </div>

        <h4 className="font-display text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
          {article.title}
        </h4>
        
        {/* Author */}
        <div className="mt-1 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span>By {article.author}</span>
        </div>
      </div>
    </Link>
  )
}