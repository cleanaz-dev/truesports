import parse from "html-react-parser"
import { Calendar, Clock, Share2 } from "lucide-react"
import { ArticleWithAuthorProps } from "@/lib/actions/get-article-id"
import { MiniArticleFeed } from "./mini-article-feed" // Adjust import path as needed

export function SingleArticlePage({
  article,
  sidebarArticles,
}: {
  article: NonNullable<ArticleWithAuthorProps>
  sidebarArticles: any[]
}) {
  const title = article.title || "Untitled Article"
  const content = article.content || "<p>No content available.</p>"
  const league = article.league || "Buzz"
  const authorName = article.author?.name || "Staff Writer"
  const authorInitials = authorName.substring(0, 2).toUpperCase()
  
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(article.createdAt || Date.now()))

  const plainText = content.replace(/<[^>]+>/g, "")
  const wordCount = plainText.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <main className="min-h-screen bg-background pb-20 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* CSS GRID: Main article on the left, Sidebar on the right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* LEFT SIDE: MAIN ARTICLE (Spans 8 columns on large screens) */}
          <article className="lg:col-span-8 xl:col-span-9">
            <header className="mb-12 flex flex-col gap-6 sm:mb-16">
              <div className="flex items-center gap-3">
                <span className="rounded bg-primary/10 px-2.5 py-1 font-display text-xs font-black uppercase tracking-widest text-primary">
                  {league}
                </span>
              </div>

              <h1 className="text-balance font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
                {title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-y border-border/50 py-5">
                <div className="flex items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted font-display text-sm font-bold text-muted-foreground">
                    {article.author?.image ? (
                      <img 
                        src={article.author.image} 
                        alt={authorName} 
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      authorInitials
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
                      {authorName}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-primary" />
                    {readTime} Min Read
                  </span>
                  <div className="h-4 w-px bg-border" />
                  <button className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
                    <Share2 className="size-3.5" />
                    Share
                  </button>
                </div>
              </div>
            </header>

            <div 
              className="
                text-lg leading-relaxed text-foreground/80 sm:text-xl sm:leading-loose
                [&>p]:mb-8 last:[&>p]:mb-0
                [&>h3]:mb-4 [&>h3]:mt-14 [&>h3]:font-display [&>h3]:text-2xl [&>h3]:font-black [&>h3]:uppercase [&>h3]:tracking-tight [&>h3]:text-foreground 
                [&>strong]:font-bold [&>strong]:text-foreground
                [&>ul]:mb-8 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2
                [&>ol]:mb-8 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2
              "
            >
              {parse(content)}
            </div>
          </article>

          {/* RIGHT SIDE: SIDEBAR FEED (Spans 4 columns on large screens) */}
          <aside className="lg:col-span-4 xl:col-span-3">
            {/* sticky top-24 makes it stick to the screen as you scroll past the header! */}
            <div className="sticky top-24">
              <MiniArticleFeed league={league} articles={sidebarArticles} />
            </div>
          </aside>

        </div>
      </div>
    </main>
  )
}