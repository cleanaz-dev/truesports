import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ArticlesPage } from "@/components/admin/articles/articles-page";
import { Button } from "@/components/ui/button";
import { getUserArticles } from "@/lib/actions/get-user-articles";
import { getUserId } from "@/lib/auth-session";
import { Plus, Swords } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link"; // Import Link

export default async function Page() {
  const userId = await getUserId();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch articles. Fallback to an empty array just in case it returns null/undefined
  const articles = await getUserArticles(userId) || [];

  return (
    <main className="h-full bg-background">
      <AdminPageHeader
        title="Articles"
        description="Manage, post, edit articles here."
        icon={Swords}
        buttons={
          <Link href="articles/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Article
            </Button>
          </Link>
        }
      />

      <section className="p-6">
        <ArticlesPage userArticles={articles} />
      </section>
    </main>
  );
}