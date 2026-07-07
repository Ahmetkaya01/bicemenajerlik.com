"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CATEGORY_PAGES, CITY_PAGES } from "@/lib/landing-pages";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function IlanlarHubContent() {
  const { t, locale } = useLanguage();

  return (
    <article className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("jobListingsBadge")}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-4">
            {t("ilanlarHubTitle")}
          </h1>
          <p className="text-silver max-w-2xl mx-auto">{t("ilanlarHubDesc")}</p>
        </header>

        <section className="mb-12">
          <h2 className="font-heading font-semibold text-lg mb-4">{t("ilanlarCategories")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORY_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/ilanlar/${page.slug}`}
                className="glass rounded-xl p-4 border border-white/5 hover:border-gold/30 transition-colors group"
              >
                <span className="font-medium text-foreground group-hover:text-gold transition-colors">
                  {locale === "en" ? page.titleEn : page.titleTr}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="font-heading font-semibold text-lg mb-4">{t("ilanlarCities")}</h2>
          <div className="flex flex-wrap gap-2">
            {CITY_PAGES.map((page) => (
              <Link
                key={page.slug}
                href={`/ilanlar/${page.slug}`}
                className="px-4 py-2 rounded-full text-sm border border-white/10 text-silver hover:border-gold/30 hover:text-gold transition-colors"
              >
                {page.nameTr}
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Button href="/basvuru" size="lg">
            {t("applyNow")}
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </article>
  );
}
