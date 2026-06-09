import type { Metadata } from "next";
import { PROVINCE_COUNT, SITE_CONFIG } from "./constants";

export const SEO_KEYWORDS = [
  "organizasyon kadrosu",
  "fuar hostesi",
  "davet organizasyon personeli",
  "karşılama personeli",
  "etkinlik personeli",
  "hostes ajansı",
  "organizasyon personeli",
  "menajerlik hizmeti",
  "bice menajerlik",
  "bicemenajerlik",
  "menajerlik ajansı",
  "ankara organizasyon kadrosu",
  "izmir fuar hostesi",
  "türkiye geneli hostes iş ilanları",
  "profesyonel organizasyon kadrosu",
  "güvenilir menajerlik",
] as const;

const defaultOgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Bice Menajerlik | Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti",
};

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [...SEO_KEYWORDS],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const fullTitle = `${SITE_CONFIG.name} | ${title}`;
  const url = `${SITE_CONFIG.domain}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.domain }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.domain),
    alternates: {
      canonical: url,
      languages: {
        "tr-TR": url,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "tr_TR",
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [defaultOgImage.url],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    category: "business",
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: `${SITE_CONFIG.name} | Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.`,
  keywords: SEO_KEYWORDS.join(", "),
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.domain }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti`,
    description:
      `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.`,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti`,
    description:
      `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.`,
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
};

export const homeMetadata = createMetadata({
  title: "Güvenilir Organizasyon Kadrosu ve Menajerlik Hizmeti",
  description:
    "58 ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.",
  path: "/",
});

export const aboutMetadata = createMetadata({
  title: "Hakkımızda",
  description:
    `Bice Menajerlik; ${PROVINCE_COUNT} ilde fuar hostesi ve organizasyon kadrosu sağlayan güvenilir menajerlik ajansı.`,
  path: "/hakkimizda",
});

export const contactMetadata = createMetadata({
  title: "İletişim",
  description:
    "Organizasyon kadrosu ve etkinlik personeli için Bice Menajerlik ile iletişime geçin. WhatsApp ve telefon ile 7/24 ulaşın.",
  path: "/iletisim",
});

export const applicationMetadata = createMetadata({
  title: "İş Başvurusu",
  description:
    "Organizasyon personeli iş başvuru formu. Deneyiminizi paylaşın, Bice Menajerlik ile hemen başvurun.",
  path: "/basvuru",
});
