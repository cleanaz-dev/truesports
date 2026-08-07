import { ArticleFeed } from "@/components/site/article-feed";
import { HeroFeature } from "@/components/site/hero-feature";
import { Scoreboard } from "@/components/site/scoreboard";
import { SocialFeed } from "@/components/site/site-feed";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

import { fetchAllScores } from "@/lib/sports-api"

export const revalidate = 30

export default async function HomePage() {
  const initialGames = await fetchAllScores()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Scoreboard initialGames={initialGames} />
        <HeroFeature />
        <ArticleFeed />
        <SocialFeed />
      </main>
      <SiteFooter />
    </div>
  )
}
