"use client";

import { ArrowUpRight, MapPin, MessageSquareQuote, Store } from "lucide-react";
import { MEKANBUL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const FEATURES = [
  { key: "mekanbulFeature1", icon: MapPin },
  { key: "mekanbulFeature2", icon: MessageSquareQuote },
  { key: "mekanbulFeature3", icon: Store },
] as const;

export function MekanbulBanner() {
  const { t } = useLanguage();

  return (
    <section
      id="mekanbul"
      className="pb-20 sm:pb-24 scroll-mt-24"
      aria-labelledby="mekanbul-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/[0.08] via-night to-accent-purple/[0.08] p-6 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-gold text-xs font-heading font-semibold tracking-widest uppercase">
                {t("mekanbulBadge")}
              </span>
              <h2
                id="mekanbul-heading"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-3"
              >
                {t("mekanbulTitle1")}{" "}
                <span className="text-gold-gradient">{MEKANBUL.name}</span>
              </h2>
              <p className="text-silver leading-relaxed max-w-2xl">{t("mekanbulDesc")}</p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FEATURES.map(({ key, icon: Icon }) => (
                  <li
                    key={key}
                    className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2.5 text-sm text-foreground"
                  >
                    <Icon size={16} className="text-gold shrink-0" aria-hidden />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-stretch sm:items-start lg:items-center gap-3">
              <a
                href={MEKANBUL.url}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-full gold-gradient px-7 py-4 text-base font-semibold text-night shadow-lg shadow-gold/20 transition-shadow hover:shadow-gold/40"
              >
                {t("mekanbulCta")}
                <ArrowUpRight size={18} aria-hidden />
              </a>
              <p className="text-silver/70 text-xs text-center">{t("mekanbulNote")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
