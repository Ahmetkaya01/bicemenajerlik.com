"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { TranslationKey } from "@/lib/i18n/translations";

const MESSAGE_KEYS = [
  "aboutFamilyP1",
  "aboutFamilyP2",
  "aboutFamilyP3",
  "aboutFamilyP4",
  "aboutFamilyP5",
  "aboutFamilyP6",
  "aboutFamilyClosing1",
  "aboutFamilyClosing2",
] as const satisfies readonly TranslationKey[];

function MessageBlock({
  t,
  idPrefix,
}: {
  t: (key: TranslationKey) => string;
  idPrefix: string;
}) {
  return (
    <div className="space-y-5 px-1">
      {MESSAGE_KEYS.map((key) => {
        const isClosing =
          key === "aboutFamilyClosing1" || key === "aboutFamilyClosing2";
        return (
          <p
            key={`${idPrefix}-${key}`}
            className={
              isClosing
                ? "text-gold-light/95 text-sm sm:text-[15px] leading-relaxed font-medium"
                : "text-silver/90 text-sm sm:text-[15px] leading-relaxed"
            }
          >
            {t(key)}
          </p>
        );
      })}
    </div>
  );
}

export function HeroThankYouScroll() {
  const { t } = useLanguage();

  return (
    <aside
      className="relative w-full lg:max-w-md lg:justify-self-end"
      aria-label={t("aboutFamilyBadge")}
    >
      <div className="glass rounded-2xl border border-gold/15 overflow-hidden h-[220px] sm:h-[260px] lg:h-[min(520px,62svh)]">
        <div className="absolute inset-x-0 top-0 z-10 px-4 sm:px-5 pt-3.5 pb-2 bg-gradient-to-b from-night/95 via-night/80 to-transparent pointer-events-none">
          <p className="text-gold text-[11px] sm:text-xs font-heading font-semibold tracking-[0.18em] uppercase">
            {t("aboutFamilyBadge")}
          </p>
        </div>

        <div
          className="hero-thankyou-mask relative h-full overflow-hidden pt-10 pb-6"
          aria-hidden="true"
        >
          <div className="hero-thankyou-track flex flex-col gap-8 px-4 sm:px-5 will-change-transform">
            <MessageBlock t={t} idPrefix="a" />
            <MessageBlock t={t} idPrefix="b" />
          </div>
        </div>

        {/* Accessible static copy for screen readers / reduced motion readers */}
        <div className="sr-only">
          <p>{t("aboutFamilyTitle")}</p>
          {MESSAGE_KEYS.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </div>
      </div>
    </aside>
  );
}
