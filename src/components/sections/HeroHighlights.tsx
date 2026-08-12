"use client";

import Link from "next/link";
import {
  MapPin,
  Banknote,
  Clock,
  Headphones,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { HERO_HIGHLIGHTS, SALARY_RANGE } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Banknote,
  Clock,
  Headphones,
};

export function HeroHighlights() {
  const { t, locale } = useLanguage();

  const formatSalary = (n: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-TR" : "tr-TR").format(n);

  const getValue = (item: (typeof HERO_HIGHLIGHTS)[number]) => {
    if ("value" in item && item.value) return item.value;
    if ("valueType" in item && item.valueType === "salary") {
      return `${formatSalary(SALARY_RANGE.min)}–${formatSalary(SALARY_RANGE.max)} ₺`;
    }
    if ("valueType" in item && item.valueType === "review") return t("heroCardReview");
    return "";
  };

  return (
    <div className="w-full mt-12 lg:mt-16">
      <div className="flex items-center justify-between gap-4 mb-4 px-1">
        <p className="text-gold text-xs sm:text-sm font-heading font-semibold tracking-widest uppercase">
          {t("heroCardTitle")}
        </p>
        <span className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-gold/30 to-transparent" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {HERO_HIGHLIGHTS.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col h-full glass rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-gold/30 hover:bg-gold/[0.04] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-silver/30 group-hover:text-gold transition-colors shrink-0"
                />
              </div>

              <p className="font-display text-xl sm:text-2xl font-bold text-gold-gradient leading-none mb-1.5">
                {getValue(item)}
              </p>
              <p className="text-silver/80 text-xs sm:text-sm leading-snug mb-2">
                {t(item.labelKey)}
              </p>
              <span className="mt-auto text-[11px] sm:text-xs text-silver/70 group-hover:text-gold transition-colors">
                {t("highlightGoTo")} {t(item.sectionKey)} →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
