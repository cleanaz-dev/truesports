import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { Button } from "@/components/ui/button";
import { Cog } from "lucide-react";

export default async function Page() {
  return (
    <main className="h-full bg-background">
       <AdminPageHeader
             title="Settings"
             description="Update, manage, your settings here."
             icon={Cog}
            //  buttons={
            //    <Button>
            //      <Edit className="mr-2 h-4 w-4" />
            //      Edit Profile
            //    </Button>
            //  }
           />
     
        <header>
        settings page
        </header>

        
    </main>
  );
}
