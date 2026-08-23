import { ArticleFeed } from "@/components/site/article-feed";
import { HeroFeature } from "@/components/site/hero-feature";
import { Scoreboard } from "@/components/site/scoreboard";
import { SocialFeed } from "@/components/site/site-feed";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getAllArticles } from "@/lib/actions/get-all-articles";
import { getSpotlight } from "@/lib/actions/get-spotlight";
import { fetchAllScores } from "@/lib/sports-api"

export const revalidate = 30

export default async function HomePage() {
  const [initialGames, articles] = await Promise.all([
    fetchAllScores(),
    getAllArticles()
  ])

  const spotlight = await getSpotlight();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader spotlight={spotlight}/>
      <main className="flex-1">
        <Scoreboard initialGames={initialGames} />
        
        <HeroFeature articles={articles} />
        <ArticleFeed articles={articles.slice(4, 16)} />
        
        <SocialFeed />
      </main>
      <SiteFooter />
    </div>
  )
}