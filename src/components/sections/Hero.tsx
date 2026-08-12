"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, ChevronDown, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroTrustBadge } from "@/components/sections/HeroTrustBadge";
import { HeroHighlights } from "@/components/sections/HeroHighlights";
import { HeroThankYouScroll } from "@/components/sections/HeroThankYouScroll";
import { trackEvent } from "@/lib/analytics";
import { getMarketingWhatsAppUrl } from "@/lib/whatsapp";
import { IMAGE_ALTS } from "@/lib/image-placeholders";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import heroPhoto from "../../../public/images/hero.jpg";

const QUICK_LINKS = [
  { href: "/ilanlar", key: "jobListings" as const },
  { href: "/#maas", key: "salary" as const },
  { href: "/#kurumsal", key: "corporateNav" as const },
] as const;

export function Hero() {
  const { t } = useLanguage();
  const whatsappUrl = getMarketingWhatsAppUrl();

  return (
    <section className="relative min-h-0 md:min-h-[92svh] flex flex-col hero-gradient overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image
          src={heroPhoto}
          alt={IMAGE_ALTS.hero}
          fill
          priority
          fetchPriority="high"
          quality={40}
          sizes="(max-width: 768px) 100vw, 1024px"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
      </div>

      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 md:pt-28 md:pb-8 w-full">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] gap-6 lg:gap-10 lg:items-center">
          <div className="flex flex-col justify-center max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 w-fit">
              <Globe size={16} className="text-gold" />
              <span className="text-silver text-sm">{t("heroBadge")}</span>
            </div>

            {/* No fade-in: opacity:0 + fill-mode both delays FCP/LCP for the headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-4">
              {t("heroTitle1")}
              <span className="block text-gold-gradient whitespace-nowrap">
                {t("heroTitle2")}
                {t("heroTitle3") ? ` ${t("heroTitle3")}` : ""}
              </span>
            </h1>

            <p className="text-silver text-base sm:text-lg leading-relaxed mb-5">
              {t("heroDesc")}
            </p>

            <HeroTrustBadge />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#20bd5a] transition-colors"
              >
                {t("whatsappApply")}
              </a>
              <Button
                href="/basvuru"
                size="lg"
                className="w-full"
                onClick={() => trackEvent("apply_click", { location: "hero" })}
              >
                {t("applyNow")}
                <ArrowRight size={20} />
              </Button>
              <Button
                href="/#is-ilanlari"
                variant="outline"
                size="lg"
                className="w-full sm:col-span-2 sm:justify-self-start sm:w-auto"
                onClick={() =>
                  trackEvent("job_listings_click", { location: "hero" })
                }
              >
                <Briefcase size={18} />
                {t("viewJobListings")}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-silver/50 text-xs mr-1 self-center">
                {t("heroExplore")}:
              </span>
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-silver hover:border-gold/40 hover:text-gold transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          <div className="order-last lg:order-none mt-2 lg:mt-0">
            <HeroThankYouScroll />
          </div>
        </div>

        <HeroHighlights />
      </div>

      <a
        href="/#nasil-calisir"
        className="relative z-10 pb-4 hidden md:flex justify-center text-silver/40 hover:text-gold transition-colors"
        aria-label={t("heroScroll")}
      >
        <ChevronDown size={26} className="animate-bounce" />
      </a>
    </section>
  );
}
