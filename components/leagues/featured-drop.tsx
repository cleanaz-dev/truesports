import Link from "next/link"
import { Clock } from "lucide-react"
import { type Article, leagueAccent } from "@/lib/data" // Adjust path if needed

export function FeaturedDrop({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.league.toLowerCase()}/${article.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10"
    >
      {/* Background Image Container */}
      <div className="relative h-[450px] w-full overflow-hidden sm:h-[550px] lg:h-[600px]">
        {/* The Image (Slow zoom on hover) */}
        <img
          src={article.image}
          alt={article.title}
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Dark Gradients to make the white text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-700 group-hover:bg-transparent" />
      </div>

      {/* Text Content (Anchored to the bottom left) */}
      <div className="absolute bottom-0 left-0 flex w-full flex-col justify-end p-6 sm:p-10 lg:w-3/4 lg:p-12">
        
        {/* Badges */}
        <div className="mb-5 flex items-center gap-3">
          <span 
            className={`rounded bg-foreground/10 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${leagueAccent(article.league)}`}
          >
            {article.league}
          </span>
          {article.featured && (
            <span className="rounded bg-primary/20 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur-md">
              Featured Drop
            </span>
          )}
        </div>

        {/* Headline */}
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl lg:text-6xl">
          {article.title}
        </h2>

        {/* Excerpt (Hidden on tiny mobile screens to save space) */}
        <p className="mt-4 hidden max-w-3xl text-sm leading-relaxed text-white/80 drop-shadow sm:block sm:text-base lg:text-lg">
          {article.excerpt}
        </p>

        {/* Article Metadata (Author, Time, Read Length) */}
        <div className="mt-6 flex items-center gap-4 text-xs font-medium text-white/60 sm:text-sm">
          <div className="flex items-center gap-2">
            {/* Placeholder for author avatar */}
            <div className="flex size-6 items-center justify-center rounded-full bg-white/20 text-[10px] text-white">
              {article.author.charAt(0)}
            </div>
            <span className="text-white/90">{article.author}</span>
          </div>
          
          <span className="size-1 rounded-full bg-white/30" />
          
          <span>{article.timeAgo}</span>
          
          <span className="size-1 rounded-full bg-white/30" />
          
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{article.readMinutes} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}