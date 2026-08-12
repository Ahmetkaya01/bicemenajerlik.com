"use client";

import { useEffect } from "react";

const GOOGLE_ANALYTICS_ID = "G-D93Y3NKKSZ";
const GOOGLE_ADS_ID = "AW-18231553251";
const STORAGE_KEY = "bice-cookie-consent";

let bootPromise: Promise<void> | null = null;

function ensureGtagStub() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  }
}

function whenIdle(timeoutMs: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve(), { timeout: timeoutMs });
      return;
    }
    window.setTimeout(resolve, Math.min(timeoutMs, 2000));
  });
}

function loadExternalScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function grantConsent() {
  window.gtag?.("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
  });
}

async function bootGoogleTags(signal: { cancelled: boolean }) {
  if (localStorage.getItem(STORAGE_KEY) !== "granted") return;
  if (signal.cancelled) return;

  grantConsent();
  await whenIdle(3500);
  if (signal.cancelled) return;

  try {
    await loadExternalScript(
      `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
    );
  } catch {
    return;
  }
  if (signal.cancelled) return;

  window.gtag?.("js", new Date());
  window.gtag?.("config", GOOGLE_ADS_ID);

  await whenIdle(8000);
  if (signal.cancelled) return;
  window.gtag?.("config", GOOGLE_ANALYTICS_ID, { send_page_view: true });
}

/**
 * No gtag until cookie consent. Then idle → Ads tag (~150KiB) → later GA4.
 * Keeps third-party off the critical path for LCP / TBT.
 */
export function GoogleAdsTag() {
  useEffect(() => {
    ensureGtagStub();
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });

    const signal = { cancelled: false };

    const scheduleBoot = () => {
      if (!bootPromise) {
        bootPromise = bootGoogleTags(signal).finally(() => {
          bootPromise = null;
        });
      }
      return bootPromise;
    };

    void scheduleBoot();

    const onConsent = () => {
      void scheduleBoot();
    };

    window.addEventListener("bice-cookie-consent", onConsent);
    window.addEventListener("storage", onConsent);

    return () => {
      signal.cancelled = true;
      window.removeEventListener("bice-cookie-consent", onConsent);
      window.removeEventListener("storage", onConsent);
    };
  }, []);

  return null;
}
