"use client";

import Link from "next/link";
import { ArrowRight, Banknote, CheckCircle2, Home, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { RoundCarousel } from "@/components/ui/RoundCarousel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SALARY_RANGE } from "@/lib/constants";
import {
  FEATURED_JOB_CARDS,
  getLandingPage,
  type LandingPageConfig,
} from "@/lib/landing-pages";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function JobCard({ page }: { page: LandingPageConfig }) {
  const { t, locale } = useLanguage();
  const title = locale === "en" ? page.titleEn : page.titleTr;

  return (
    <Link
      href={`/ilanlar/${page.slug}`}
      onClick={() => trackEvent("job_listings_click", { slug: page.slug })}
      className="group flex h-full flex-col glass rounded-2xl p-5 border border-white/5 hover:border-gold/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading font-semibold text-foreground group-hover:text-gold transition-colors leading-snug">
          {title}
        </h3>
        <ShieldCheck size={18} className="text-gold/70 shrink-0" aria-hidden />
      </div>

      <p className="text-silver text-sm mb-4 line-clamp-3 flex-1">
        {locale === "en" ? page.introEn : page.introTr}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">
          <Banknote size={12} />
          {SALARY_RANGE.min.toLocaleString(locale === "en" ? "en-US" : "tr-TR")}–
          {SALARY_RANGE.max.toLocaleString(locale === "en" ? "en-US" : "tr-TR")} ₺
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/5 text-silver border border-white/10">
          <Home size={12} />
          {t("jobListingAccommodation")}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/5 text-silver border border-white/10">
          <CheckCircle2 size={12} />
          {t("jobListingVerified")}
        </span>
      </div>

      <span className="text-gold text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {t("jobListingView")}
        <ArrowRight size={16} />
      </span>
    </Link>
  );
}

export function JobListingsSection() {
  const { t } = useLanguage();

  const cards = FEATURED_JOB_CARDS.map((card) => {
    const page = getLandingPage(card.slug);
    return page ? { page, card } : null;
  }).filter(Boolean) as {
    page: LandingPageConfig;
    card: (typeof FEATURED_JOB_CARDS)[number];
  }[];

  return (
    <section id="is-ilanlari" className="py-20 sm:py-24 scroll-mt-24 section-glow-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("jobListingsBadge")}
          title={
            <>
              {t("jobListingsTitle1")}{" "}
              <span className="text-gold-gradient">{t("jobListingsTitle2")}</span>
            </>
          }
          description={t("jobListingsDesc")}
        />

        <div className="mb-8 -mx-4 sm:mx-0">
          <RoundCarousel
            itemWidth={280}
            itemHeight={340}
            spacing={2}
            speed={4}
            tilt={-6}
            perspective={2600}
            cornerRadius={18}
            items={cards.map(({ page }) => (
              <JobCard key={page.slug} page={page} />
            ))}
          />
        </div>

        <div className="text-center">
          <Button href="/ilanlar" size="lg">
            {t("jobListingsViewAll")}
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}
