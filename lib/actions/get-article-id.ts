import { prisma } from "../prisma";

export async function getArticleById(id: string) {
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return article;
}


// Type of the resolved array
export type ArticleWithAuthorProps = Awaited<ReturnType<typeof getArticleById>>;