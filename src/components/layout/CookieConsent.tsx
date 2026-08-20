"use client";

import { useEffect, useState } from "react";
import { updateConsent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STORAGE_KEY = "bice-cookie-consent";
/** Keep banner off first paint so hero image/headline can win LCP. */
const SHOW_DELAY_MS = 2500;

export function CookieConsent() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      updateConsent(stored === "granted");
      return;
    }

    updateConsent(false);

    let shown = false;
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const show = () => {
      if (shown) return;
      shown = true;
      setVisible(true);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener("load", arm);
      window.removeEventListener("scroll", show);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("keydown", show);
    };

    const arm = () => {
      if (shown) return;
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(show, { timeout: SHOW_DELAY_MS });
      } else {
        timeoutId = setTimeout(show, SHOW_DELAY_MS);
      }
    };

    // After load + idle so hero can win LCP; interaction freezes LCP earlier.
    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }
    window.addEventListener("scroll", show, { once: true, passive: true });
    window.addEventListener("pointerdown", show, { once: true });
    window.addEventListener("keydown", show, { once: true });

    return () => {
      shown = true;
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener("load", arm);
      window.removeEventListener("scroll", show);
      window.removeEventListener("pointerdown", show);
      window.removeEventListener("keydown", show);
    };
  }, []);

  const handleChoice = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    updateConsent(granted);
    window.dispatchEvent(new Event("bice-cookie-consent"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))]"
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
