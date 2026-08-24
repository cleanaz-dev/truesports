import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { leagueAccent } from "@/lib/data";
import { getPlaceholderImage, getRelativeTime } from "@/lib/utils";
import type { Article } from "@/lib/actions/get-all-articles";

export function HeroFeature({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const featured = articles[0];
  const secondary = articles.slice(1, 4);

  const featuredLeague = featured.league || "OTHER";

  // Always use the league placeholder image — never a remote/CMS image
  const imageSrc = getPlaceholderImage(featuredLeague);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Main feature */}
        <Link
          href={`/articles/${featured.id}`}
          className="group relative col-span-1 flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border border-border lg:col-span-2 lg:aspect-auto lg:min-h-[30rem]"
        >
          <Image
            src={imageSrc}
            alt={featured.title}
            fill
            priority
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="relative flex flex-col gap-3 p-5 sm:p-7">
            <div className="flex items-center gap-3">
              <span
                className={`rounded-sm px-2 py-0.5 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground ${
                  leagueAccent(featuredLeague) || "bg-primary"
                }`}
              >
                {featuredLeague}
              </span>
              <span className="font-display text-xs font-semibold uppercase tracking-wide text-foreground/70">
                Featured
              </span>
            </div>
            <h1 className="max-w-2xl text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {featured.title}
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-foreground/80 sm:text-base line-clamp-2">
              {featured.excerpt || featured.content}
            </p>
            <div className="flex items-center gap-3 text-xs text-foreground/70">
              {featured.author && (
                <>
                  <span className="font-medium text-foreground">
                    {/* {featured.author.name} */} True Sports Staff
                  </span>
                  <span aria-hidden>·</span>
                </>
              )}
              <span>{getRelativeTime(featured.createdAt)}</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />5 min read
              </span>
            </div>
          </div>
        </Link>

        {/* Secondary stories — no images */}
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Top Stories
          </h2>
          <div className="flex flex-col divide-y divide-border">
            {secondary.map((a) => {
              const aLeague = a.league || "OTHER";

              return (
                <Link
                  key={a.id}
                  href={`/articles/${a.id}`}
                  className="group flex flex-col gap-2 py-4 first:pt-0"
                >
                  <span
                    className={`self-start font-display text-[11px] font-bold uppercase tracking-widest ${leagueAccent(
                      aLeague
                    )}`}
                  >
                    {aLeague}
                  </span>
                  <h3 className="text-pretty text-sm font-semibold leading-snug text-foreground group-hover:text-primary line-clamp-2">
                    {a.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {getRelativeTime(a.createdAt)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}