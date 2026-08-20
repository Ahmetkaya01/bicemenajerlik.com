"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Locale } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  const toggle = () => {
    const next: Locale = locale === "tr" ? "en" : "tr";
    setLocale(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 min-h-11 px-3 py-2 rounded-full text-xs font-semibold border border-white/15 text-silver hover:border-gold/40 hover:text-gold transition-colors touch-manipulation"
      aria-label={locale === "tr" ? "Switch to English" : "Türkçe'ye geç"}
    >
      <span className={locale === "tr" ? "text-gold" : "text-silver/50"}>
        TR
      </span>
      <span className="text-white/20">|</span>
      <span className={locale === "en" ? "text-gold" : "text-silver/50"}>
        EN
      </span>
    </button>
  );
}
