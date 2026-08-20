"use client";

import { useEffect } from "react";
import { updateConsent } from "@/lib/analytics";

const STORAGE_KEY = "bice-cookie-consent";

/**
 * Applies stored cookie choice to Consent Mode after the HTML gtag snippet.
 * Does not inject a second gtag.js (that hid G-D93Y3NKKSZ from GA's detector).
 */
export function GoogleAdsTag() {
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      updateConsent(true);
    } else if (stored === "denied") {
      updateConsent(false);
    }

    const onConsent = () => {
      updateConsent(localStorage.getItem(STORAGE_KEY) === "granted");
    };

    window.addEventListener("bice-cookie-consent", onConsent);
    window.addEventListener("storage", onConsent);

    return () => {
      window.removeEventListener("bice-cookie-consent", onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  return null;
}
