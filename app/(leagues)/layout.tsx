// app/(leagues)/layout.tsx

import { SiteHeader } from "@/components/site/site-header";

export default function LeagueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  flex-col min-h-screen">
      <SiteHeader />
      <main className="container mx-auto max-w-7xlflex-1">{children}</main>
    </div>
  );
}
