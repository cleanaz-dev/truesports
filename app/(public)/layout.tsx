// app/(public)/layout.tsx

import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getSpotlight } from "@/lib/actions/get-spotlight";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const spotlight = await getSpotlight();
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader spotlight={spotlight} />

      {/* Page Content */}
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
