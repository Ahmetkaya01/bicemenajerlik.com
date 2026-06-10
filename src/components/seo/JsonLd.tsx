import {
  PROVINCE_COUNT,
  SALARY_RANGE,
  SERVICE_CITIES,
  SITE_CONFIG,
} from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/faq";

const ORG_ID = `${SITE_CONFIG.domain}/#organization`;
const WEBSITE_ID = `${SITE_CONFIG.domain}/#website`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EmploymentAgency", "LocalBusiness", "Organization"],
  "@id": ORG_ID,
  name: SITE_CONFIG.name,
  alternateName: "bicemenajerlik",
  url: SITE_CONFIG.domain,
  logo: `${SITE_CONFIG.domain}/opengraph-image`,
  image: `${SITE_CONFIG.domain}/opengraph-image`,
  description: `Türkiye genelinde ${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli sağlayan güvenilir menajerlik ajansı. Günlük yevmiye, konaklama koordinasyonu ve 7/24 destek.`,
  slogan: "Türkiye Geneli Güvenilir Menajerlik Hizmeti",
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "Ücretsiz başvuru",
  currenciesAccepted: "TRY",
  address: {
    "@type": "PostalAddress",
    addressCountry: "TR",
    addressRegion: "Türkiye Geneli",
  },
  areaServed: SERVICE_CITIES.map((city) => ({
    "@type": "City",
    name: city,
  })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE_CONFIG.phone,
      contactType: "customer service",
      availableLanguage: ["Turkish", "English"],
      areaServed: "TR",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
  knowsAbout: [
    "Gazino personeli istihdamı",
    "Gece kulübü personeli istihdamı",
    "Personel yerleştirme",
    "Menajerlik hizmeti",
    "Günlük yevmiyeli iş",
  ],
  knowsLanguage: ["tr", "en"],
  sameAs: [`https://wa.me/${SITE_CONFIG.whatsapp}`],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_CONFIG.domain,
  name: SITE_CONFIG.name,
  description: `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları ve güvenilir menajerlik hizmeti.`,
  publisher: { "@id": ORG_ID },
  inLanguage: "tr-TR",
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_CONFIG.domain}/#service`,
  name: "Gazino ve Gece Kulübü Personel Yerleştirme",
  serviceType: "Personel yerleştirme ve menajerlik hizmeti",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Türkiye" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: `${SITE_CONFIG.domain}/basvuru`,
    servicePhone: SITE_CONFIG.phone,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Menajerlik Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "İş İlanları",
          description: `Türkiye genelinde ${PROVINCE_COUNT} ilde deneyimli veya deneyimsiz adaylar için günlük yevmiye ile iş eşleştirmesi.`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gazino & Night Club Yerleştirme",
          description:
            "Türkiye genelinde seçkin gazino, bar ve night club mekanlarında güvenilir yerleştirme.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hızlı İş Başı",
          description:
            "Başvuru onayından sonra aynı gün veya ertesi gün iş başı imkânı; konaklama mekan koordinasyonu ile sağlanır.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Günlük Ödeme",
          description:
            "Sözleşme zorunluluğu olmadan günlük yevmiye veya yarıcı çalışma seçenekleri.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_CONFIG.domain}/#faq`,
  mainEntity: FAQ_ITEMS.tr.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

function SchemaScript({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLd() {
  return (
    <>
      <SchemaScript schema={organizationSchema} />
      <SchemaScript schema={websiteSchema} />
      <SchemaScript schema={servicesSchema} />
      <SchemaScript schema={faqSchema} />
    </>
  );
}

/** Breadcrumb schema for inner pages. Pass items in order, home is prepended. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Ana Sayfa", path: "/" },
      ...items,
    ].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.domain}${item.path === "/" ? "" : item.path}`,
    })),
  };
  return <SchemaScript schema={schema} />;
}

const JOB_DATE_POSTED = new Date().toISOString().split("T")[0];
const JOB_VALID_THROUGH = new Date(Date.now() + 1000 * 60 * 60 * 24 * 180)
  .toISOString()
  .split("T")[0];

/** Generic JobPosting schema rendered on the application page. */
export function JobPostingJsonLd() {
  const datePosted = JOB_DATE_POSTED;
  const validThrough = JOB_VALID_THROUGH;

  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "Gazino ve Gece Kulübü Personeli",
    description: `Türkiye genelinde ${PROVINCE_COUNT} ilde gazino, gece kulübü, bar ve müzikhol mekanlarında çalışacak personel aranmaktadır. Deneyimli veya deneyimsiz, 18 yaş üstü adaylar başvurabilir. Günlük yevmiye, konaklama koordinasyonu ve 7/24 menajerlik desteği sağlanır.`,
    datePosted,
    validThrough,
    employmentType: ["FULL_TIME", "PART_TIME", "TEMPORARY"],
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.domain,
      logo: `${SITE_CONFIG.domain}/opengraph-image`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "TR",
        addressRegion: "Türkiye Geneli",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Türkiye",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "TRY",
      value: {
        "@type": "QuantitativeValue",
        minValue: SALARY_RANGE.min,
        maxValue: SALARY_RANGE.max,
        unitText: "DAY",
      },
    },
    directApply: true,
    industry: "Eğlence ve Hizmet Sektörü",
    qualifications: "18 yaşını doldurmuş olmak. Deneyim şartı aranmaz.",
    jobBenefits:
      "Günlük ödeme, konaklama koordinasyonu, ulaşım desteği, 7/24 menajerlik desteği",
  };
  return <SchemaScript schema={schema} />;
}
