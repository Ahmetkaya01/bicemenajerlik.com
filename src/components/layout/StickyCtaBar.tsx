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
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  const whatsappUrl = getMarketingWhatsAppUrl("sticky-bar");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gold/15 bg-night/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "sticky-bar" })}
          className="flex flex-col items-center gap-1 py-3 text-[#25D366] hover:bg-white/5 transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-[11px] font-medium">{t("stickyWhatsapp")}</span>
        </a>
        <Link
          href="/basvuru"
          onClick={() => trackEvent("apply_click", { location: "sticky-bar" })}
          className="flex flex-col items-center gap-1 py-3 text-gold hover:bg-white/5 transition-colors"
        >
          <FileText size={20} />
          <span className="text-[11px] font-medium">{t("stickyApply")}</span>
        </Link>
        <Link
          href="/#is-ilanlari"
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
