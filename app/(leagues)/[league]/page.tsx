import Link from "next/link";
import { TrendingUp, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { articles, leagues, socialPosts, leagueAccent } from "@/lib/data";

import { FeaturedDrop } from "@/components/leagues/featured-drop";
import { SocialCard } from "@/components/leagues/social-card";
import { ArticleCard } from "@/components/leagues/article-card";

import { RandomBanner } from "@/components/promo/random-banner";
import { PromoBanner } from "@/components/promo/promo-banner";
import { PartnershipBanner } from "@/components/promo/partnership-banner";
import { MerchBanner } from "@/components/promo/merch-banner";
import { MerchMainPage } from "@/components/merch/merch-main-page";
import { FaInstagram } from "react-icons/fa";

interface Params {
  params: Promise<{
    league: string;
  }>;
}

export default async function LeaguePage({ params }: Params) {
  const resolvedParams = await params;
  const leagueParam = resolvedParams.league.toLowerCase();

  // 1. INTERCEPT FOR MERCH PAGE
  if (leagueParam === "merch") {
    return <MerchMainPage />;
  }

  // 2. Validate the league
  const currentLeague = leagues.find((l) => l.toLowerCase() === leagueParam);

  if (!currentLeague) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h1 className="text-2xl font-bold text-muted-foreground">
          League not found.
        </h1>
      </div>
    );
  }

  // 3. Filter data for this specific league
  const leagueArticles = articles.filter((a) => a.league === currentLeague);
  const featuredArticle = leagueArticles[0] || articles[0];

  let otherArticles = leagueArticles.slice(1);
  if (otherArticles.length < 4) {
    const filler = articles.filter(
      (a) =>
        a.id !== featuredArticle.id &&
        !otherArticles.find((oa) => oa.id === a.id),
    );
    otherArticles = [...otherArticles, ...filler].slice(0, 4);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
        <h1
          className={`font-display text-4xl font-black uppercase tracking-tight ${leagueAccent(currentLeague)}`}
        >
          {currentLeague} News
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 flex flex-col gap-10">
          {featuredArticle && <FeaturedDrop article={featuredArticle} />}

          <RandomBanner
            banners={[
              <PromoBanner key="promo" />,
              <PartnershipBanner key="partner" />,
            ]}
          />

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-6 text-primary" />
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-foreground">
                Latest Drops
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="rounded-2xl bg-card/40 p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
                <FaInstagram  className="size-6 text-primary" />
              <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                ON THE GRAM
              </h3>
            </div>
            <div className="flex flex-col gap-6">
              {socialPosts.slice(0, 3).map((post) => (
                <SocialCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          <div className="sticky top-6">
            <MerchBanner />
          </div>
        </aside>
      </div>
    </div>
  );
}
