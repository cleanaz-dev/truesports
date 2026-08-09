"use client"

import { useState } from "react"
import useSWR from "swr"
import { motion, AnimatePresence } from "framer-motion"
import { leagues, type Game, type League } from "@/lib/data"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link";

const tabs: (League | "All")[] = ["All", ...leagues]

// Standard SWR Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json()).then(data => data.games)

function StatusBadge({ game }: { game: Game }) {
  if (game.status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-semibold uppercase tracking-wide text-red-500">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
        </span>
        {game.clock}
      </span>
    )
  }
  return (
    <span className="font-display text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
      {game.status === "final" ? game.clock : game.startTime}
    </span>
  )
}

function TeamRow({ team, winner, upcoming }: { team: Game["home"]; winner: boolean; upcoming: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {/* Team Logo */}
        {team.logo ? (
          <img src={team.logo} alt={team.abbr} className="size-5 object-contain" />
        ) : (
           <div className="size-5 rounded-full bg-muted" />
        )}
        
        <span className={`font-display text-sm font-bold uppercase ${winner ? "text-foreground" : "text-foreground/80"}`}>
          {team.abbr}
        </span>

        {/* Possession Indicator */}
        {team.hasPossession && (
          <span className="size-1.5 rounded-full bg-amber-500" title="Has possession" />
        )}

        <span className="truncate text-xs text-muted-foreground">{team.record}</span>
      </div>
      
      {!upcoming && (
        <span className={`font-display text-base font-bold tabular-nums ${winner ? "text-foreground" : "text-muted-foreground"}`}>
          {team.score}
        </span>
      )}
    </div>
  )
}

function GameCard({ game }: { game: Game }) {
  const upcoming = game.status === "upcoming";
  const homeWins = !upcoming && (game.home.score ?? 0) > (game.away.score ?? 0);
  const awayWins = !upcoming && (game.away.score ?? 0) > (game.home.score ?? 0);

  return (

    <Link
      href={`/${game.league.toLowerCase()}/game/${game.id}`}
      className="flex w-52 shrink-0 flex-col gap-2.5 rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {game.league}
        </span>
        <StatusBadge game={game} />
      </div>

      <div className="flex flex-col gap-1.5">
        <TeamRow team={game.away} winner={awayWins} upcoming={upcoming} />
        <TeamRow team={game.home} winner={homeWins} upcoming={upcoming} />
      </div>

      {game.seriesSummary && (
        <div className="mt-1 border-t border-border pt-1.5 text-center text-[10px] text-muted-foreground uppercase tracking-wide">
          {game.seriesSummary}
        </div>
      )}
    </Link>
  );
}

// Skeleton loaders to show while fetching
function SkeletonCard() {
  return (
    <div className="flex w-52 shrink-0 flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="flex justify-between items-center h-3">
        <div className="w-8 h-2 bg-muted rounded animate-pulse" />
        <div className="w-12 h-2 bg-muted rounded animate-pulse" />
      </div>
      <div className="flex flex-col gap-2.5">
        {[1, 2].map(i => (
          <div key={i} className="flex justify-between items-center h-5">
            <div className="flex gap-2 items-center">
              <div className="size-5 bg-muted rounded-full animate-pulse"/>
              <div className="w-10 h-2.5 bg-muted rounded animate-pulse"/>
            </div>
            <div className="w-4 h-4 bg-muted rounded animate-pulse"/>
          </div>
        ))}
      </div>
    </div>
  )
}

// Accept initialGames so we can hybrid-render (fetch on server, poll on client)
export function Scoreboard({ initialGames = [] }: { initialGames?: Game[] }) {
  const [active, setActive] = useState<(typeof tabs)[number]>("All")

  // SWR replaces useEffect/setInterval. It handles background polling, focus-refresh, etc.
  const { data: games = [], error, isLoading } = useSWR<Game[]>("/api/scores", fetcher, {
    fallbackData: initialGames,
    refreshInterval: 30000, 
    revalidateOnFocus: true,
  })

  const filtered = active === "All" ? games : games.filter((g) => g.league === active)

  return (
    <section aria-label="Live scores" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
        {/* Tabs */}
        <div className="mb-3 flex items-center gap-1.5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 font-display text-xs font-semibold uppercase tracking-wide transition-colors ${
                active === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Error State */}
        {error && !games.length && (
          <p className="pb-3 text-xs text-muted-foreground">Couldn't load live scores right now.</p>
        )}
        
        {/* Empty State */}
        {!isLoading && !error && filtered.length === 0 && (
          <p className="pb-3 text-xs text-muted-foreground">No games scheduled.</p>
        )}

        {/* Scoreboard List */}
         <ScrollArea className="w-full whitespace-nowrap">
          <AnimatePresence mode="wait">
            <motion.div 
              key={active} // Animates whenever the active tab changes
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.15 }}
              className="flex gap-3 pb-3"
            >
              {isLoading && !games.length ? (
                [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              ) : (
                filtered.map((game) => <GameCard key={game.id} game={game} />)
              )}
            </motion.div>
          </AnimatePresence>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </div>
    </section>
  )
}