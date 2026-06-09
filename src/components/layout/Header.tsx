"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { HEADER_NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2" : "py-3 md:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between gap-3 rounded-2xl border transition-all duration-300 ${
              scrolled
                ? "glass py-2.5 px-4 sm:px-5 shadow-lg shadow-black/25 border-gold/10"
                : "bg-transparent py-2 px-1 sm:px-2 border-transparent"
            }`}
          >
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 group"
              aria-label="Bice Menajerlik"
            >
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg sm:text-xl text-gold-gradient font-bold tracking-wide">
                  BICE
                </span>
                <span className="hidden sm:block text-[10px] text-silver/60 font-heading uppercase tracking-[0.2em] group-hover:text-silver/80 transition-colors">
                  Menajerlik
                </span>
              </div>
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
                className="p-2 rounded-full text-silver hover:text-gold hover:bg-white/5 transition-colors"
                aria-label={t("contactPhone")}
              >
                <Phone size={18} />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
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
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gold hover:bg-gold/10 transition-colors"
                aria-label={t("whatsapp")}
              >
                <MessageCircle size={20} />
              </a>
              <LanguageSwitcher />
              <button
                type="button"
                className="p-2 rounded-full text-silver hover:text-gold hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? t("close") : t("menu")}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm glass border-l border-gold/10 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <span className="font-display text-xl text-gold-gradient font-bold">
                  BICE
                </span>
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
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-silver hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <Phone size={18} className="text-gold shrink-0" />
                    <span className="text-sm">{SITE_CONFIG.phone}</span>
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-silver hover:bg-white/5 hover:text-gold transition-colors"
                  >
                    <MessageCircle size={18} className="text-gold shrink-0" />
                    <span className="text-sm">{t("contactWhatsapp")}</span>
                  </a>
                </div>
              </div>

              <div className="p-5 border-t border-white/5">
                <Button href="/basvuru" className="w-full" size="lg">
                  {t("applyNow")}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
