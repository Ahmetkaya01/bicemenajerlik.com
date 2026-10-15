import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { homeMetadata } from "@/lib/metadata";

const JobListingsSection = nextDynamic(() =>
  import("@/components/sections/JobListingsSection").then(
    (mod) => mod.JobListingsSection
  )
);
const ProcessSteps = nextDynamic(() =>
  import("@/components/sections/ProcessSteps").then((mod) => mod.ProcessSteps)
);
const KonsBanner = nextDynamic(() =>
  import("@/components/sections/KonsBanner").then((mod) => mod.KonsBanner)
);
const CorporateTrustSection = nextDynamic(() =>
  import("@/components/sections/CorporateTrustSection").then(
    (mod) => mod.CorporateTrustSection
  )
);
const Services = nextDynamic(() =>
  import("@/components/sections/Services").then((mod) => mod.Services)
);
const SalaryScale = nextDynamic(() =>
  import("@/components/sections/SalaryScale").then((mod) => mod.SalaryScale)
);
const CitiesCoverage = nextDynamic(() =>
  import("@/components/sections/CitiesCoverage").then(
    (mod) => mod.CitiesCoverage
  )
);
const MekanbulBanner = nextDynamic(() =>
  import("@/components/sections/MekanbulBanner").then(
    (mod) => mod.MekanbulBanner
  )
);
const WhyUs = nextDynamic(() =>
  import("@/components/sections/WhyUs").then((mod) => mod.WhyUs)
);
const FAQ = nextDynamic(() =>
  import("@/components/sections/FAQ").then((mod) => mod.FAQ)
);
const CTA = nextDynamic(() =>
  import("@/components/sections/CTA").then((mod) => mod.CTA)
);

export const metadata: Metadata = homeMetadata;

/** Marketing homepage: fully static / CDN-cacheable (no cookies, no request data). */
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <Hero />
      <JobListingsSection />
      <ProcessSteps />
      <KonsBanner />
      <CorporateTrustSection />
      <Services />
      <SalaryScale />
      <CitiesCoverage />
      <MekanbulBanner />
      <WhyUs />
      <FAQ />
      <CTA />
    </>
  );
}
