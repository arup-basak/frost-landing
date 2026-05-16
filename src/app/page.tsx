import { ComparisonSection } from "@/components/comparison-section";
import { DeveloperNote } from "@/components/developer-note";
import { FaqSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { FrostDials } from "@/components/frost-dials";
import { FrostOverlay } from "@/components/frost-overlay";
import { HeroSection } from "@/components/hero-section";
import { MacosSection } from "@/components/macos-section";
import { NoiseSection } from "@/components/noise-section";
import { PricingSection } from "@/components/pricing-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UseCasesSection } from "@/components/use-cases-section";
import { WristShake } from "@/components/wrist-shake";

export default function Home() {
  return (
    <>
      <FrostOverlay />
      <SiteHeader />
      <main>
        <HeroSection />
        <NoiseSection />
        <FeaturesSection />
        <FrostDials />
        <WristShake />
        <UseCasesSection />
        <ComparisonSection />
        <MacosSection />
        <PricingSection />
        <FaqSection />
        <DeveloperNote />
      </main>
      <SiteFooter />
    </>
  );
}
