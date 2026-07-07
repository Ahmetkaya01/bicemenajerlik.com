"use client";

import { useEffect, useState } from "react";
import { updateConsent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STORAGE_KEY = "bice-cookie-consent";

export function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      updateConsent(false);
    } else {
      updateConsent(stored === "granted");
    }
  }, []);

  const handleChoice = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl glass rounded-2xl border border-gold/20 p-5 sm:p-6 shadow-2xl shadow-black/40">
        <h2
          id="cookie-consent-title"
          className="font-heading font-semibold text-foreground mb-2"
        >
          {t("cookieTitle")}
        </h2>
        <p className="text-silver text-sm leading-relaxed mb-4">{t("cookieDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => handleChoice(true)}
            className="flex-1 rounded-full gold-gradient px-5 py-2.5 text-sm font-semibold text-night"
          >
            {t("cookieAccept")}
          </button>
          <button
            type="button"
            onClick={() => handleChoice(false)}
            className="flex-1 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-silver hover:border-gold/40 hover:text-gold transition-colors"
          >
            {t("cookieReject")}
          </button>
        </div>
      </div>
    </div>
  );
}
