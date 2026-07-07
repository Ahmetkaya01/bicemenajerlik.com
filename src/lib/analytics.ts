export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "apply_click"
  | "quick_apply_submit"
  | "form_submit"
  | "job_listings_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, {
    event_category: "conversion",
    ...params,
  });

  const conversionLabel = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;
  const adsId = process.env.NEXT_PUBLIC_GADS_ID ?? "AW-18231553251";

  if (
    conversionLabel &&
    (event === "form_submit" ||
      event === "quick_apply_submit" ||
      event === "whatsapp_click")
  ) {
    window.gtag?.("event", "conversion", {
      send_to: `${adsId}/${conversionLabel}`,
    });
  }
}

export function updateConsent(granted: boolean) {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  });
}
