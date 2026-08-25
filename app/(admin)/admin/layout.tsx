import { AdminSidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}