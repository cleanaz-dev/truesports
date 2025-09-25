// app/(public)/layout.tsx
import Navigation from "@/components/ui/landing-page/navigation";
import FooterSection from "@/components/ui/landing-page/footer-section";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <Navigation />

      {/* Page Content */}
      <main className="flex-1">{children}</main>

    </div>
  );
}
