"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-night/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <Logo size="lg" />
            </div>
            <p className="text-silver text-sm leading-relaxed">{t("footerDesc")}</p>
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

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-silver/60 text-sm">
            © {currentYear} {SITE_CONFIG.name}. {t("allRights")}
          </p>
          <p className="text-silver/40 text-xs">{t("footerTagline")}</p>
        </div>
      </div>
    </footer>
  );
}
