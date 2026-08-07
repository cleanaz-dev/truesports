// app/page.tsx (with proper spacing adjustment)
import CloutSection from "@/components/ui/landing-page/clout-section";
import FooterSection from "@/components/ui/landing-page/footer-section";
import HeroSection from "@/components/ui/landing-page/hero-section";
import MediaPartners from "@/components/ui/landing-page/media-partners";
import Navigation from "@/components/ui/landing-page/navigation";

export default function Home() {
  return (
    <div>
      {" "}
      {/* Add padding to prevent content from being hidden behind the nav */}
      <Navigation />
      <HeroSection />
      <MediaPartners />
      <CloutSection />
      <FooterSection />
    </div>
  );
}
