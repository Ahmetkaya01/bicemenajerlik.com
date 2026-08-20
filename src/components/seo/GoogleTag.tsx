import Script from "next/script";

const GOOGLE_ANALYTICS_ID = "G-D93Y3NKKSZ";
const GOOGLE_ADS_ID = "AW-18231553251";

/**
 * Official gtag snippet in the HTML so GA/Ads setup wizards can detect
 * G-D93Y3NKKSZ. Consent Mode stays denied until the cookie banner grants it.
 */
export function GoogleTag() {
  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID}');
gtag('config', '${GOOGLE_ADS_ID}');
try {
  if (localStorage.getItem('bice-cookie-consent') === 'granted') {
    gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
        `}
      </Script>
    </>
  );
}
