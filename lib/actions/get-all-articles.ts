import { prisma } from "../prisma";

export async function getAllArticles() {
    const articles = await prisma.article.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true

                }
            }
        },
        take: 20
    })

    return articles
}

// Type of the resolved array
export type Articles = Awaited<ReturnType<typeof getAllArticles>>;

// Type of a single article (element type of the array)
export type Article = Articles[number];