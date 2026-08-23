import { getArticleById } from "@/lib/actions/get-article-id";
import { notFound } from "next/navigation";
import { SingleArticlePage } from "@/components/articles/single-article-page";
import { getLeagueArticles } from "@/lib/actions/get-leagure-articles";

interface Params {
  params: Promise<{
    articleId: string;
  }>;
}

export default async function Page({ params }: Params) {
  const { articleId } = await params;

  // 1. Fetch the main article
  const article = await getArticleById(articleId);

  if (!article) {
    return notFound();
  }

  // 2. Fetch the sidebar articles using the league from the main article
  const sidebarArticles = await getLeagueArticles(article.league || "OTHER", article.id);

  // 3. Pass both to the UI
  return <SingleArticlePage article={article} sidebarArticles={sidebarArticles} />;
}