"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { HEADER_NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { getMarketingWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function isLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return pathname === "/";
  return pathname === href;
}

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let raf = 0;
    const sync = () => {
      ticking = false;
      raf = 0;
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(sync);
    };
    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinkClass = (href: string) => {
    const active = isLinkActive(href, pathname);
    return `relative text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
      active ? "text-gold" : "text-silver hover:text-gold"
    } after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all ${
      active ? "after:w-full" : "after:w-0 hover:after:w-full"
    }`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between gap-3 rounded-2xl border py-2.5 px-4 sm:px-5 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
              scrolled
                ? "glass shadow-lg shadow-black/25 border-gold/10"
                : "bg-transparent border-transparent shadow-none"
            }`}
          >
            <Link
              href="/"
              className="shrink-0 group transition-opacity hover:opacity-90"
              aria-label="Bice Menajerlik"
            >
              <Logo size="md" />
            </Link>

            <div className="hidden lg:flex flex-1 items-center justify-center gap-5 xl:gap-7 px-4">
              {HEADER_NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {t(link.key)}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                onClick={() => trackEvent("phone_click", { location: "header" })}
                className="p-2 rounded-full text-silver hover:text-gold hover:bg-white/5 transition-colors"
                aria-label={t("contactPhone")}
              >
                <Phone size={18} />
              </a>
              <a
                href={getMarketingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "header" })}
                className="p-2 rounded-full text-silver hover:text-gold hover:bg-white/5 transition-colors"
                aria-label={t("whatsapp")}
              >
                <MessageCircle size={18} />
              </a>
              <LanguageSwitcher />
              <Button href="/basvuru" size="sm">
                {t("applyNow")}
              </Button>
            </div>

            <div className="flex lg:hidden items-center gap-1 shrink-0">
              <a
                href={getMarketingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "header-mobile" })}
                className="p-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-gold hover:bg-gold/10 transition-colors touch-manipulation"
                aria-label={t("whatsapp")}
              >
                <MessageCircle size={20} />
              </a>
              <LanguageSwitcher />
              <button
                type="button"
                className="p-2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-silver hover:text-gold hover:bg-white/5 transition-colors touch-manipulation"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? t("close") : t("menu")}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {mobileOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label={t("close")}
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass border-l border-gold/10 lg:hidden flex flex-col animate-fade-in">
            <div className="flex items-center justify-between p-5 border-b border-white/5">
              <Logo size="sm" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-2 text-silver hover:text-gold transition-colors"
                aria-label={t("close")}
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <nav className="flex flex-col gap-1">
                {HEADER_NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isLinkActive(link.href, pathname)
                        ? "bg-gold/10 text-gold"
                        : "text-silver hover:bg-white/5 hover:text-gold"
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  onClick={() => trackEvent("phone_click", { location: "mobile-menu" })}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-silver hover:bg-white/5 hover:text-gold transition-colors"
                >
                  <Phone size={18} className="text-gold shrink-0" />
                  <span className="text-sm">{SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={getMarketingWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "mobile-menu" })}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-silver hover:bg-white/5 hover:text-gold transition-colors"
                >
                  <MessageCircle size={18} className="text-gold shrink-0" />
                  <span className="text-sm">{t("contactWhatsapp")}</span>
                </a>
              </div>
            </div>

            <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-white/5">
              <Button href="/basvuru" className="w-full" size="lg">
                {t("applyNow")}
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
