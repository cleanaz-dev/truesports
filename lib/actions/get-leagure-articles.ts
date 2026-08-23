// in your actions/prisma file
import { prisma } from "../prisma";
import { League } from "../generated/prisma/enums";

export async function getLeagueArticles(league: League, excludeId: string) {
  return await prisma.article.findMany({
    where: {
      league,
      id: {
        not: excludeId, // Don't show the article they are currently reading!
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });
}