"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { SERVICE_CITIES } from "@/lib/constants";
import { citySlug } from "@/lib/landing-pages";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function CitiesCoverage() {
  const { t } = useLanguage();

  return (
    <section id="sehirler" className="section-glow-top py-20 sm:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("citiesBadge")}
          title={
            <>
              <span className="text-gold-gradient">{t("citiesTitle1")}</span>{" "}
              {t("citiesTitle2")}
            </>
          }
          description={t("citiesDesc")}
        />

        <div className="glass rounded-3xl p-8 sm:p-10">
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin size={20} className="text-gold" />
            <p className="text-silver text-sm">{t("citiesListLabel")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_CITIES.map((city) => (
              <Link
                key={city}
                href={`/ilanlar/${citySlug(city)}`}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-silver hover:border-gold/30 hover:text-gold transition-colors"
              >
                {city}
              </Link>
            ))}
            <Link
              href="/ilanlar"
              className="px-4 py-2 rounded-full text-sm font-medium bg-gold/10 border border-gold/30 text-gold hover:bg-gold/15 transition-colors"
            >
              {t("citiesMore")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
