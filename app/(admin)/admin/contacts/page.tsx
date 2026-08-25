import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Edit, PersonStanding } from "lucide-react";

export default async function Page() {
  return (
    <main className="h-full bg-background ">
      <AdminPageHeader
        title="Contacits"
        description="View all contacts, subscribers heres."
        icon={PersonStanding}
        buttons={
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Contact
          </Button>
        }
      />

      <header>contacts page</header>
    </main>
  );
}
