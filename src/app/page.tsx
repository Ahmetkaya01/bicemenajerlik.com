import { Hero } from "@/components/sections/Hero";
import { KonsBanner } from "@/components/sections/KonsBanner";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Services } from "@/components/sections/Services";
import { SalaryScale } from "@/components/sections/SalaryScale";
import { CitiesCoverage } from "@/components/sections/CitiesCoverage";
import { WhyUs } from "@/components/sections/WhyUs";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessSteps />
      <KonsBanner />
      <Services />
      <SalaryScale />
      <CitiesCoverage />
      <WhyUs />
      <CTA />
    </>
  );
}
