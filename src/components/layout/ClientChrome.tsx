"use client";

import dynamic from "next/dynamic";

const FloatingContact = dynamic(
  () =>
    import("@/components/layout/FloatingContact").then(
      (mod) => mod.FloatingContact
    ),
  { ssr: false }
);

const StickyCtaBar = dynamic(
  () =>
    import("@/components/layout/StickyCtaBar").then((mod) => mod.StickyCtaBar),
  { ssr: false }
);

const CookieConsent = dynamic(
  () =>
    import("@/components/layout/CookieConsent").then(
      (mod) => mod.CookieConsent
    ),
  { ssr: false }
);

/** Below-fold chrome deferred to client so root layout stays a Server Component. */
export function ClientChrome() {
  return (
    <>
      <FloatingContact />
      <StickyCtaBar />
      <CookieConsent />
    </>
  );
}
