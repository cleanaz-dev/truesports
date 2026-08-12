import { ArticleFeed } from "@/components/site/article-feed";
import { HeroFeature } from "@/components/site/hero-feature";
import { Scoreboard } from "@/components/site/scoreboard";
import { SocialFeed } from "@/components/site/site-feed";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSpotlight } from "@/lib/actions/get-spotlight";

import { fetchAllScores, fetchAllNews } from "@/lib/sports-api"

export const revalidate = 30

export default async function HomePage() {
  const [initialGames, allArticles] = await Promise.all([
    fetchAllScores(),
    fetchAllNews()
  ])

    const spotlight = await getSpotlight();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader spotlight={spotlight}/>
      <main className="flex-1">
        <Scoreboard initialGames={initialGames} />
        
        {/* Pass all articles to the Hero */}
        <HeroFeature articles={allArticles} />
        
        {/* Pass the leftovers (skipping the first 4) to the Feed */}
        <ArticleFeed articles={allArticles.slice(4)} />
        
        <SocialFeed />
      </main>
      <SiteFooter />
    </div>
  )
}