import type { Metadata } from "next";
import { PROVINCE_COUNT, SITE_CONFIG } from "./constants";

export const SEO_KEYWORDS = [
  "gazino personeli iş ilanları",
  "gece kulübü iş ilanları",
  "gazino iş ilanları",
  "night club personeli",
  "menajerlik hizmeti",
  "menajerlik ajansı",
  "bice menajerlik",
  "bicemenajerlik",
  "günlük yevmiyeli iş",
  "günlük ödemeli iş",
  "konaklamalı iş ilanları",
  "türkiye geneli iş ilanları",
  "istanbul gazino iş ilanları",
  "deneyimsiz iş ilanları",
  "güvenilir menajerlik",
  "personel yerleştirme",
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
        "x-default": url,
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
    default: `${SITE_CONFIG.name} | bicemenajerlik.com — Gazino & Gece Kulübü İş İlanları`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  applicationName: SITE_CONFIG.name,
  description:
    `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.`,
  keywords: SEO_KEYWORDS.join(", "),
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.domain }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  alternates: {
    canonical: SITE_CONFIG.domain,
    languages: {
      "tr-TR": SITE_CONFIG.domain,
      "x-default": SITE_CONFIG.domain,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_CONFIG.domain,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | bicemenajerlik.com — Gazino & Gece Kulübü İş İlanları`,
    description:
      `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.`,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | bicemenajerlik.com — Gazino & Gece Kulübü İş İlanları`,
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
  verification: {
    google: [
      "0ccmGJsQS_BoxomjxgzQ2zNdRt0YwPVtDngfWeGuhm8",
      "PnANGsYFHqv6vCBFHmmV-ty0ks0r-qZqJc3G",
    ],
  },
};

export const homeMetadata = createMetadata({
  title: "bicemenajerlik.com — Gazino & Gece Kulübü İş İlanları",
  description:
    "Bice Menajerlik | 58 ilde gazino ve gece kulübü personeli iş ilanları. Türkiye genelinde güvenilir menajerlik hizmeti, günlük yevmiye ve 7/24 destek.",
  path: "/",
});

export const aboutMetadata = createMetadata({
  title: "Hakkımızda | Güvenilir Menajerlik Ajansı",
  description:
    `Bice Menajerlik; ${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli sağlayan güvenilir menajerlik ajansı. 2500+ başarılı yerleştirme, 7/24 destek.`,
  path: "/hakkimizda",
});

export const contactMetadata = createMetadata({
  title: "İletişim | 7/24 WhatsApp ve Telefon Desteği",
  description:
    "Gazino ve gece kulübü iş ilanları hakkında sorularınız için Bice Menajerlik ile iletişime geçin. WhatsApp ve telefon ile 7/24 ulaşın.",
  path: "/iletisim",
});

export const applicationMetadata = createMetadata({
  title: "İş Başvurusu | Online Başvuru Formu",
  description:
    `${PROVINCE_COUNT} ilde gazino ve gece kulübü personeli iş başvuru formu. 24 saat içinde değerlendirme, aynı gün iş başı imkânı. Hemen ücretsiz başvurun.`,
  path: "/basvuru",
});
