import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

const defaultKeywords = [
  "iş ilanları",
  "türkiye geneli iş ilanları",
  "gazino iş ilanları",
  "konsomatris iş ilanı",
  "menajerlik",
  "güvenilir mekanlar",
  "istanbul iş ilanları",
  "izmir iş ilanları",
  "ankara iş ilanları",
  "kons menejeri",
  "Bice Menajerlik",
  "bicemenajerlik",
  "night club iş ilanları",
];

export function createMetadata({
  title,
  description,
  path = "",
  keywords = defaultKeywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const url = `${SITE_CONFIG.domain}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_CONFIG.domain),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const homeMetadata = createMetadata({
  title: "Türkiye Geneli İş İlanları & Güvenilir Mekanlar",
  description:
    "Türkiye genelinde 68 ilde iş ilanları, gazino ve night club mekanlarında güvenilir iş eşleştirmesi. Bice Menajerlik ile günlük yevmiye, konaklama desteği ve 7/24 menajer danışmanlığı.",
  path: "/",
});

export const aboutMetadata = createMetadata({
  title: "Hakkımızda",
  description:
    "Türkiye genelinde menajerlik ve güvenilir mekan iş birlikleri. Bice Menajerlik olarak 68 ilde şeffaf, güvenilir ve profesyonel hizmet sunuyoruz.",
  path: "/hakkimizda",
});

export const contactMetadata = createMetadata({
  title: "İletişim",
  description:
    "Türkiye geneli iş ilanları için Bice Menajerlik ile iletişime geçin. WhatsApp ve telefon ile 7/24 ulaşabilirsiniz.",
  path: "/iletisim",
});

export const applicationMetadata = createMetadata({
  title: "İş Başvurusu",
  description:
    "Türkiye geneli iş başvuru formu. Bulunduğunuz şehri belirtin, deneyiminizi paylaşın ve güvenilir mekanlarımızda işe başlayın.",
  path: "/basvuru",
});
