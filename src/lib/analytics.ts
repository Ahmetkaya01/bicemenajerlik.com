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

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID ?? "AW-18231553251";

const CONVERSION_LABELS: Partial<Record<AnalyticsEvent, string | undefined>> = {
  whatsapp_click: process.env.NEXT_PUBLIC_GADS_WHATSAPP_LABEL,
  form_submit: process.env.NEXT_PUBLIC_GADS_FORM_LABEL,
  quick_apply_submit: process.env.NEXT_PUBLIC_GADS_FORM_LABEL,
  phone_click: process.env.NEXT_PUBLIC_GADS_PHONE_LABEL,
};

const LEGACY_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GADS_CONVERSION_LABEL;

function getConversionLabel(event: AnalyticsEvent): string | undefined {
  const label = CONVERSION_LABELS[event];
  if (label) return label;

  if (
    LEGACY_CONVERSION_LABEL &&
    (event === "whatsapp_click" ||
      event === "form_submit" ||
      event === "quick_apply_submit")
  ) {
    return LEGACY_CONVERSION_LABEL;
  }

  return undefined;
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

  const conversionLabel = getConversionLabel(event);
  if (conversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${GADS_ID}/${conversionLabel}`,
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
