"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { COMPANY_LEGAL, NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

const LEGAL_LINKS = [
  { href: "/gizlilik-politikasi", key: "privacyPolicy" as const },
  { href: "/kullanim-sartlari", key: "termsOfService" as const },
  { href: "/cerez-politikasi", key: "cookiePolicy" as const },
] as const;

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-night/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-silver text-sm leading-relaxed mb-5">{t("footerDesc")}</p>
            <div>
              <p className="text-xs font-heading font-semibold tracking-wide text-silver/70 mb-3">
                {t("footerSocial")}
              </p>
              <SocialLinks />
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wide">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver hover:text-gold transition-colors text-sm"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wide">
              {t("legalHeading")}
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-silver hover:text-gold transition-colors text-sm"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wide">
              {t("footerContact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-silver text-sm">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneRaw}`}>{SITE_CONFIG.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-silver text-sm">
                <Mail size={16} className="text-gold shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
              </li>
              <li className="flex items-center gap-3 text-silver text-sm">
                <MapPin size={16} className="text-gold shrink-0" />
                {SITE_CONFIG.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <Link
            href="/#kurumsal"
            className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-gold/15 bg-gold/[0.04] px-5 py-4 hover:border-gold/30 hover:bg-gold/[0.07] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 shrink-0">
                <ShieldCheck className="text-gold" size={18} aria-hidden />
              </div>
              <div>
                <p className="text-foreground text-sm font-semibold">{t("footerCorporate")}</p>
                <p className="text-silver/60 text-xs mt-0.5">
                  {t("footerTaxId")}: {COMPANY_LEGAL.taxId} · {COMPANY_LEGAL.taxOffice}
                </p>
              </div>
            </div>
            <span className="text-gold text-xs font-semibold tracking-wide group-hover:underline underline-offset-4">
              {t("corporateHeroBadgeCta")} →
            </span>
          </Link>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-silver/60 text-sm text-center sm:text-left">
              © {currentYear} {SITE_CONFIG.name}. {t("allRights")}
            </p>
            <p className="text-silver/40 text-xs">{t("footerTagline")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
