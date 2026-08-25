import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Mail, PlusCircle } from "lucide-react";

export default async function Page() {
  return (
    <main className="h-full bg-background ">
       <AdminPageHeader
        title="Emails"
        description="Create, manage, emails here."
        icon={Mail}
        buttons={
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Email
          </Button>
        }
      />

        <header>
        email page
        </header>

    </main>
  );
}
