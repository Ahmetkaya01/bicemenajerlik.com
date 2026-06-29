import type { Metadata } from "next";
import { CorporateTrustSection } from "@/components/sections/CorporateTrustSection";
import { Hero } from "@/components/sections/Hero";
import { KonsBanner } from "@/components/sections/KonsBanner";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Services } from "@/components/sections/Services";
import { SalaryScale } from "@/components/sections/SalaryScale";
import { CitiesCoverage } from "@/components/sections/CitiesCoverage";
import { WhyUs } from "@/components/sections/WhyUs";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { homeMetadata } from "@/lib/metadata";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSteps />
      <KonsBanner />
      <CorporateTrustSection />
      <Services />
      <SalaryScale />
      <CitiesCoverage />
      <WhyUs />
      <FAQ />
      <CTA />
    </>
  );
}
