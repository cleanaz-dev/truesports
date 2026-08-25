import { ArticlesByUser } from "@/lib/actions/get-user-articles";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Trash2, Clock, Star } from "lucide-react";
import Link from "next/link";

interface ArticlesPageProps {
  userArticles: ArticlesByUser;
}

export function ArticlesPage({ userArticles }: ArticlesPageProps) {
  
  // 1. Handle Empty State
  if (!userArticles || userArticles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed rounded-lg border-muted-foreground/25 bg-muted/10">
        <FileText className="w-12 h-12 mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-semibold tracking-tight">No articles found</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm text-center">
          You haven't written any articles yet. Create your first post to start sharing your thoughts!
        </p>
        <Link href="/articles/new">
          <Button>Create Your First Article</Button>
        </Link>
      </div>
    );
  }

  // 2. Handle Populated State
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {userArticles.map((article) => (
        <Card key={article.id} className="flex flex-col overflow-hidden group">
          
          {/* Handles images if you eventually add them */}
          {article.image && article.image.length > 0 && (
            <div className="w-full h-48 bg-muted overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2">
                <Badge variant="secondary" className="font-semibold">
                  {article.league}
                </Badge>
                {article.featured && (
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                  </Badge>
                )}
              </div>
            </div>
            <CardTitle className="line-clamp-2 leading-tight">
              {article.title}
            </CardTitle>
            <CardDescription className="flex items-center gap-3 mt-1">
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {article.readMinutes} min read
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t p-4 mt-auto bg-muted/20">
            <Link href={`/articles/${article.slug}`} className="text-sm font-medium hover:underline">
              View live
            </Link>

            <div className="flex gap-2">
              <Link href={`/articles/${article.id}/edit`}>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}