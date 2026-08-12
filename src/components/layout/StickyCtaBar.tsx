"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, FileText, Briefcase } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getMarketingWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function StickyCtaBar() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let raf = 0;
    const sync = () => {
      ticking = false;
      raf = 0;
      const next = window.scrollY > 320;
      setVisible((prev) => (prev === next ? prev : next));
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

  const whatsappUrl = getMarketingWhatsAppUrl();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-gold/15 bg-night/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden transition-transform duration-300 ease-out will-change-transform ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          onClick={() => trackEvent("whatsapp_click", { location: "sticky-bar" })}
          className="flex flex-col items-center gap-1 py-3 text-[#25D366] hover:bg-white/5 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[11px] font-medium">{t("stickyWhatsapp")}</span>
        </a>
        <Link
          href="/basvuru"
          tabIndex={visible ? 0 : -1}
          onClick={() => trackEvent("apply_click", { location: "sticky-bar" })}
          className="flex flex-col items-center gap-1 py-3 text-gold hover:bg-white/5 transition-colors"
        >
          <FileText size={20} />
          <span className="text-[11px] font-medium">{t("stickyApply")}</span>
        </Link>
        <Link
          href="/#is-ilanlari"
          tabIndex={visible ? 0 : -1}
          onClick={() => trackEvent("job_listings_click", { location: "sticky-bar" })}
          className="flex flex-col items-center gap-1 py-3 text-silver hover:text-gold hover:bg-white/5 transition-colors"
        >
          <Briefcase size={20} />
          <span className="text-[11px] font-medium">{t("stickyJobs")}</span>
        </Link>
      </div>
    </div>
  );
}
