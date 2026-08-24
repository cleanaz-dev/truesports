"use client";

import Link from "next/link";
import { Clock, TrendingUp, Zap, Activity } from "lucide-react";
import type { Article } from "@/lib/actions/get-all-articles";
import { cn } from "@/lib/utils";

const LEAGUE_ORDER = ["NBA", "NFL", "MLB", "SOCCER", "NHL"];

// 1. Define distinct visual themes for each league
const LEAGUE_THEMES: Record<
  string,
  {
    gradient: string;
    text: string;
    bg: string;
    border: string;
    icon: React.ElementType;
  }
> = {
  NBA: {
    gradient: "from-orange-500/30 via-orange-600/10 to-transparent",
    text: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50",
    icon: Zap,
  },
  NFL: {
    gradient: "from-blue-600/30 via-indigo-600/10 to-transparent",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    icon: Activity,
  },
  MLB: {
    gradient: "from-red-600/30 via-rose-600/10 to-transparent",
    text: "text-red-500",
    bg: "bg-red-500/10",
    border: "group-hover:border-red-500/50",
    icon: TrendingUp,
  },
  SOCCER: {
    gradient: "from-emerald-500/30 via-green-600/10 to-transparent",
    text: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    icon: Activity,
  },
  NHL: {
    gradient: "from-sky-400/30 via-blue-500/10 to-transparent",
    text: "text-sky-400",
    bg: "bg-sky-400/10",
    border: "group-hover:border-sky-400/50",
    icon: Zap,
  },
  OTHER: {
    gradient: "from-zinc-500/30 via-zinc-600/10 to-transparent",
    text: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "group-hover:border-zinc-500/50",
    icon: TrendingUp,
  },
};

function getRelativeTime(value: Date | string | null | undefined) {
  if (!value) return "Just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";

  const diffInMs = Math.max(0, Date.now() - date.getTime());
  const diffInMinutes = Math.floor(diffInMs / 60_000);
  const diffInHours = Math.floor(diffInMs / 3_600_000);
  const diffInDays = Math.floor(diffInMs / 86_400_000);

  if (diffInMinutes < 60) return `${Math.max(1, diffInMinutes)}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${diffInDays}d ago`;
}

function groupByLeague(articles: Article[]) {
  const groups = new Map<string, Article[]>();
  for (const article of articles) {
    const league = article.league?.trim().toUpperCase() || "OTHER";
    const group = groups.get(league) ?? [];
    group.push(article);
    groups.set(league, group);
  }
  return Array.from(groups.entries()).sort(([leagueA], [leagueB]) => {
    const indexA = LEAGUE_ORDER.indexOf(leagueA);
    const indexB = LEAGUE_ORDER.indexOf(leagueB);
    if (indexA === -1 && indexB === -1) return leagueA.localeCompare(leagueB);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

// 2. Revamped Article Card with Faux Visuals and Featured states
function ArticleCard({
  article,
  league,
  featured = false,
}: {
  article: Article;
  league: string;
  featured?: boolean;
}) {
  const theme = LEAGUE_THEMES[league] || LEAGUE_THEMES.OTHER;
  const Icon = theme.icon;

  return (
    <Link
      href={`/articles/${article.id}`}
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-500 hover:bg-card/80 hover:shadow-2xl hover:-translate-y-1",
        theme.border,
        // Make the first card span 2 columns on larger screens to break the grid
        featured ? "md:col-span-2 md:flex-row" : "col-span-1 flex-col",
      )}
    >
      {/* Visual Faux "Image" Banner */}
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
          theme.gradient,
          featured
            ? "h-48 w-full md:h-auto md:w-2/5 md:shrink-0"
            : "h-40 w-full",
        )}
      >
        {/* Giant Watermark Text */}
        <span className="absolute -right-4 -top-8 select-none font-display text-[8rem] font-black leading-none text-white/[0.03] transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6">
          {league}
        </span>

        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_120%)] opacity-40" />
        <Icon
          className={cn(
            "size-12 opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-40",
            theme.text,
          )}
        />

        <div
          className={cn(
            "absolute left-4 top-4 rounded-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest",
            theme.bg,
            theme.text,
          )}
        >
          {league}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-center gap-3 p-5 sm:gap-4 sm:p-6 md:p-8">
        <h3
          className={cn(
            "break-words font-display font-extrabold leading-snug transition-colors sm:text-xl",
            featured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg",
            `group-hover:${theme.text}`,
          )}
        >
          {article.title}
        </h3>

        <p
          className={cn(
            "break-words text-sm leading-relaxed text-muted-foreground",
            featured ? "line-clamp-4" : "line-clamp-3",
          )}
        >
          {article.excerpt || article.content}
        </p>

        <div className="mt-auto flex min-w-0 flex-wrap items-center gap-x-2 gap-y-2 pt-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 sm:gap-x-3 sm:text-[11px] sm:tracking-widest">
          <span className="max-w-full truncate text-foreground/80">
            True Sports Staff
          </span>
          <span
            aria-hidden="true"
            className="size-1 shrink-0 rounded-full bg-border"
          />
          <span className="whitespace-nowrap">
            {getRelativeTime(article.createdAt)}
          </span>
          <span
            aria-hidden="true"
            className="size-1 shrink-0 rounded-full bg-border"
          />
          <span className="inline-flex shrink-0 items-center gap-1.5 text-foreground/60">
            <Clock className="size-3" strokeWidth={2.5} />
            3m
          </span>
        </div>
      </div>
    </Link>
  );
}

function LeagueSection({
  league,
  articles,
}: {
  league: string;
  articles: Article[];
}) {
  const theme = LEAGUE_THEMES[league] || LEAGUE_THEMES.OTHER;

  return (
    <section className="relative isolate min-w-0 overflow-hidden py-10 sm:py-16">
      {/* Background ambient glow based on league */}
      <div
        className={cn(
          "absolute -left-40 top-0 -z-20 h-96 w-96 rounded-full blur-[120px] opacity-20",
          theme.bg,
        )}
      />

      {/* Giant League Text Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-2 top-0 max-w-full select-none truncate bg-gradient-to-b from-foreground/[0.04] to-transparent bg-clip-text text-7xl font-black uppercase leading-none tracking-tighter text-transparent sm:-left-6 sm:text-[10rem] lg:text-[16rem]">
          {league}
        </div>
      </div>

      <div className="mb-6 flex min-w-0 items-end justify-between gap-3 px-1 sm:mb-8 sm:px-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "h-8 w-1.5 rounded-full bg-gradient-to-b",
              theme.gradient.replace("to-transparent", "to-current"),
              theme.text,
            )}
          />
          <h2 className="min-w-0 truncate font-display text-3xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
            {league}
          </h2>
        </div>

        <span className="shrink-0 font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground sm:text-[11px] sm:tracking-widest">
          {articles.length} {articles.length === 1 ? "story" : "stories"}
        </span>
      </div>

      {/* Bento Grid / Featured Layout */}
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
        {articles.map((article, i) => (
          <ArticleCard
            key={article.id}
            article={article}
            league={league}
            featured={i === 0} // Makes the first article huge
          />
        ))}
      </div>
    </section>
  );
}

export function ArticleFeed({ articles }: { articles: Article[] }) {
  if (!articles?.length) return null;

  const groupedArticles = groupByLeague(articles);

  return (
    <section className="w-full min-w-0 overflow-hidden">
      <div className="mx-auto w-full max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-border/20 pb-6">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground sm:text-3xl">
            Latest <span className="text-primary">Buzz</span>
          </h2>

          <Link
            href="/articles"
            className="group flex items-center gap-2 shrink-0 font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground sm:text-xs sm:tracking-widest"
          >
            View all
            <TrendingUp className="size-3.5 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </Link>
        </div>

        <div className="flex min-w-0 flex-col divide-y divide-border/10">
          {groupedArticles.map(([league, leagueArticles]) => (
            <LeagueSection
              key={league}
              league={league}
              articles={leagueArticles}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
