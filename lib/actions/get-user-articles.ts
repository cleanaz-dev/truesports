import { prisma } from "../prisma";

export async function getUserArticles(userId: string) {
  const articles = await prisma.article.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return articles;
}
export type ArticlesByUser = Awaited<ReturnType<typeof getUserArticles>>

export type ArticleByUser = ArticlesByUser[number];


