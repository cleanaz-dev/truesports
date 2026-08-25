import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Edit, PlusCircle, Users } from "lucide-react";

export default async function Page() {
  return (
    <main className="h-full bg-background">
      <AdminPageHeader
        title="Profile"
        description="Edit, manage, your profile here."
        icon={Users}
        buttons={
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        }
      />

      <header>profile page</header>
    </main>
  );
}
