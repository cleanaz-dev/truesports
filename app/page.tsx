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
  const [initialGames, articles, spotlight] = await Promise.all([
    fetchAllScores(),
    getAllArticles(),
    getSpotlight(),
  ])

  const heroArticles = articles.slice(0, 4)
  const feedArticles = articles.slice(4)

  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-background">
      <SiteHeader spotlight={spotlight} />

      <main className="min-w-0 flex-1">
        <Scoreboard initialGames={initialGames} />
        <HeroFeature articles={heroArticles} />
        <ArticleFeed articles={feedArticles} />
        <SocialFeed />
      </main>

      <SiteFooter />
    </div>
  )
}