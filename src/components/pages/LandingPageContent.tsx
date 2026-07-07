"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/sections/FAQ";
import { SALARY_RANGE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import type { LandingPageConfig } from "@/lib/landing-pages";
import { CATEGORY_PAGES, CITY_PAGES } from "@/lib/landing-pages";
import { getMarketingWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface LandingPageContentProps {
  page: LandingPageConfig;
}

export function LandingPageContent({ page }: LandingPageContentProps) {
  const { t, locale } = useLanguage();
  const h1 = locale === "en" ? page.h1En : page.h1Tr;
  const intro = locale === "en" ? page.introEn : page.introTr;
  const whatsappUrl = getMarketingWhatsAppUrl(`ilanlar-${page.slug}`);

  const related =
    page.type === "city"
      ? CATEGORY_PAGES.slice(0, 4)
      : CITY_PAGES.filter((c) =>
          ["istanbul", "antalya", "izmir", "samsun"].includes(c.slug)
        );

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("jobListingsBadge")}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-5 leading-tight">
            {h1}
          </h1>
          <p className="text-silver text-lg leading-relaxed">{intro}</p>
        </header>

        <section className="glass rounded-2xl p-6 sm:p-8 mb-8 border border-gold/10">
          <h2 className="font-heading font-semibold text-xl mb-4">{t("jobSalaryBand")}</h2>
          <p className="text-gold text-2xl font-bold mb-4">
            {SALARY_RANGE.min.toLocaleString(locale === "en" ? "en-US" : "tr-TR")} –{" "}
            {SALARY_RANGE.max.toLocaleString(locale === "en" ? "en-US" : "tr-TR")} ₺ /{" "}
            {t("salaryPerDay")}
          </p>
          <ul className="space-y-2 text-silver text-sm mb-6">
            <li>• {t("jobListingDaily")}</li>
            <li>• {t("jobListingAccommodation")}</li>
            <li>• {t("jobListingVerified")}</li>
            <li>• {t("highlight2")}</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button href="/basvuru" size="lg" onClick={() => trackEvent("apply_click", { location: page.slug })}>
              {t("landingApplyCta")}
              <ArrowRight size={18} />
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { location: page.slug })}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 text-gold px-6 py-3 font-semibold hover:bg-gold/10 transition-colors"
            >
              <MessageCircle size={18} />
              {t("landingWhatsappCta")}
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-heading font-semibold text-xl mb-4">{t("landingRelatedTitle")}</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/ilanlar/${item.slug}`}
                className="px-4 py-2 rounded-full text-sm border border-white/10 text-silver hover:border-gold/30 hover:text-gold transition-colors"
              >
                {locale === "en" ? item.titleEn : item.titleTr}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <FAQ />
    </article>
  );
}
