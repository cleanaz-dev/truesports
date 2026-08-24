import { prisma } from "../prisma";
import { League } from "../generated/prisma/enums";

export async function getLeagueArticles(league: League, excludeId?: string) {
  return await prisma.article.findMany({
    where: {
      league,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    include: {
      author: true
    },
    orderBy: { createdAt: "desc" },
    take: 7,
  });
}

// Type of the array the function resolves to
export type LeagueArticles = Awaited<ReturnType<typeof getLeagueArticles>>;

// Type of a single article in that array — this is what
// FeaturedDrop / ArticleCard should actually type their props as,
// instead of the old static `Article` type from lib/data
export type LeagueArticle = LeagueArticles[number];