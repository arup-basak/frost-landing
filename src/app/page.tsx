"use client";

import { FaqSection } from "@/components/faq-section";
import { FeaturesSection } from "@/components/features-section";
import { FrostDials } from "@/components/frost-dials";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingSection } from "@/components/pricing-section";
import { ProblemSection } from "@/components/problem-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { UseCasesSection } from "@/components/use-cases-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FrostDials />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
