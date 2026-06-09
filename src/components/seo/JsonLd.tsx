import { PROVINCE_COUNT, SITE_CONFIG } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "@id": `${SITE_CONFIG.domain}/#organization`,
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.domain,
  logo: `${SITE_CONFIG.domain}/opengraph-image`,
  image: `${SITE_CONFIG.domain}/opengraph-image`,
  description:
    `Türkiye genelinde ${PROVINCE_COUNT} ilde fuar hostesi ve organizasyon kadrosu sağlayan güvenilir menajerlik ajansı.`,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  areaServed: {
    "@type": "Country",
    name: "Türkiye",
  },
  serviceType: [
    "Organizasyon kadrosu",
    "Fuar hostesi",
    "Davet organizasyon personeli",
    "Karşılama personeli",
    "Menajerlik hizmeti",
  ],
  sameAs: [`https://wa.me/${SITE_CONFIG.whatsapp}`],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.domain}/#website`,
  url: SITE_CONFIG.domain,
  name: SITE_CONFIG.name,
  description:
    "Güvenilir profesyonel organizasyon kadrosu ile menajerlik hizmeti.",
  publisher: {
    "@id": `${SITE_CONFIG.domain}/#organization`,
  },
  inLanguage: "tr-TR",
};

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
