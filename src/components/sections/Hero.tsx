"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, ChevronDown, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroHighlights } from "@/components/sections/HeroHighlights";
import { HeroThankYouScroll } from "@/components/sections/HeroThankYouScroll";
import { HeroTrustBadge } from "@/components/sections/HeroTrustBadge";
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
          preload
          quality={50}
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 md:pt-28 md:pb-8 w-full">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] gap-6 lg:gap-10 lg:items-center">
          <div className="flex flex-col justify-center max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-4 w-fit animate-fade-in">
              <Globe size={16} className="text-gold" />
              <span className="text-silver text-sm">{t("heroBadge")}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-4 animate-fade-in">
              {t("heroTitle1")}{" "}
              <span className="text-gold-gradient">{t("heroTitle2")}</span>
              {t("heroTitle3") ? ` ${t("heroTitle3")}` : ""}
            </h1>

            <p className="text-silver text-base sm:text-lg leading-relaxed mb-5 animate-fade-in">
              {t("heroDesc")}
            </p>

            <HeroTrustBadge />

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5 animate-fade-in">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#20bd5a] transition-colors"
              >
                {t("whatsappApply")}
              </a>
              <Button
                href="/basvuru"
                size="lg"
                onClick={() => trackEvent("apply_click", { location: "hero" })}
              >
                {t("applyNow")}
                <ArrowRight size={20} />
              </Button>
              <Button
                href="/#is-ilanlari"
                variant="outline"
                size="lg"
                onClick={() =>
                  trackEvent("job_listings_click", { location: "hero" })
                }
              >
                <Briefcase size={18} />
                {t("viewJobListings")}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 animate-fade-in">
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

          <div className="animate-fade-in order-last lg:order-none mt-2 lg:mt-0">
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
