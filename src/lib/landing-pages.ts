import { PROVINCE_COUNT, SALARY_RANGE, SERVICE_CITIES, SITE_CONFIG } from "./constants";

export type LandingPageType = "city" | "category";

export interface LandingPageConfig {
  slug: string;
  type: LandingPageType;
  nameTr: string;
  nameEn: string;
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  descriptionEn: string;
  h1Tr: string;
  h1En: string;
  introTr: string;
  introEn: string;
  keywords: string[];
}

const CITY_SLUG_MAP: Record<string, string> = {
  İstanbul: "istanbul",
  Ankara: "ankara",
  İzmir: "izmir",
  Antalya: "antalya",
  Bursa: "bursa",
  Adana: "adana",
  Gaziantep: "gaziantep",
  Konya: "konya",
  Mersin: "mersin",
  Kayseri: "kayseri",
  Eskişehir: "eskisehir",
  Trabzon: "trabzon",
  Samsun: "samsun",
  Denizli: "denizli",
  Muğla: "mugla",
  Tekirdağ: "tekirdag",
  Balıkesir: "balikesir",
  Manisa: "manisa",
  Aydın: "aydin",
  Hatay: "hatay",
  Sakarya: "sakarya",
  Kocaeli: "kocaeli",
  Diyarbakır: "diyarbakir",
  Malatya: "malatya",
  Erzurum: "erzurum",
  Van: "van",
  Tokat: "tokat",
  Amasya: "amasya",
};

export const CATEGORY_PAGES: LandingPageConfig[] = [
  {
    slug: "kons",
    type: "category",
    nameTr: "Kons",
    nameEn: "Hostess",
    titleTr: "Kons İş İlanları",
    titleEn: "Hostess Job Listings",
    descriptionTr: `Türkiye genelinde kons iş ilanları ve kons menajerlik desteği. ${PROVINCE_COUNT} ilde günlük ödemeli, yatılı seçenekli fırsatlar.`,
    descriptionEn: `Nationwide hostess job listings with management support in ${PROVINCE_COUNT} provinces.`,
    h1Tr: "Kons İş İlanları",
    h1En: "Hostess Job Listings",
    introTr: `Bice Menajerlik olarak Türkiye genelinde kons iş ilanı arayan adayları güvenilir mekanlarla buluşturuyoruz. Günlük yevmiye ${SALARY_RANGE.min.toLocaleString("tr-TR")}–${SALARY_RANGE.max.toLocaleString("tr-TR")} ₺ aralığında; deneyimli veya deneyimsiz adaylar başvurabilir.`,
    introEn: `We connect candidates with trusted venues nationwide. Daily wages typically ${SALARY_RANGE.min}–${SALARY_RANGE.max} TRY.`,
    keywords: ["kons iş ilanları", "kons iş ilanı", "kons menajerlik", "kons menajer"],
  },
  {
    slug: "gazino",
    type: "category",
    nameTr: "Gazino",
    nameEn: "Casino",
    titleTr: "Gazino İş İlanları",
    titleEn: "Casino Job Listings",
    descriptionTr: `Gazino iş ilanları — ${PROVINCE_COUNT} ilde güvenilir menajerlik, günlük ödeme ve konaklama koordinasyonu.`,
    descriptionEn: `Casino job listings across ${PROVINCE_COUNT} provinces with daily pay.`,
    h1Tr: "Gazino İş İlanları",
    h1En: "Casino Job Listings",
    introTr: "Gazino personeli arayan adaylar için Türkiye genelinde aktif ilanlar sunuyoruz. Yatılı gazino iş ilanları, ulaşım desteği ve 7/24 menajer desteği mevcuttur.",
    introEn: "Active casino staff listings nationwide with accommodation coordination.",
    keywords: ["gazino iş ilanları", "gazino personeli"],
  },
  {
    slug: "pavyon",
    type: "category",
    nameTr: "Pavyon",
    nameEn: "Cabaret",
    titleTr: "Pavyon İş İlanları",
    titleEn: "Cabaret Job Listings",
    descriptionTr: "Pavyon iş ilanları — günlük ödemeli, yatılı seçenekli fırsatlar. Türkiye geneli menajerlik desteği.",
    descriptionEn: "Cabaret job listings with daily pay across Turkey.",
    h1Tr: "Pavyon İş İlanları",
    h1En: "Cabaret Job Listings",
    introTr: "Pavyon iş ilanları arayan bayan adaylar için şehir bazlı eşleştirme yapıyoruz. Konaklama koordinasyonu ve güvenilir mekan ağı ile çalışıyoruz.",
    introEn: "City-based matching for cabaret staff candidates with trusted venues.",
    keywords: ["pavyon iş ilanları"],
  },
  {
    slug: "gece-kulubu",
    type: "category",
    nameTr: "Gece Kulübü",
    nameEn: "Night Club",
    titleTr: "Gece Kulübü İş İlanları",
    titleEn: "Night Club Job Listings",
    descriptionTr: "Gece kulübü iş ilanları — 58 ilde aktif fırsatlar, günlük yevmiye, kons menajer desteği.",
    descriptionEn: "Night club job listings in 58 provinces.",
    h1Tr: "Gece Kulübü İş İlanları",
    h1En: "Night Club Job Listings",
    introTr: "Gece kulübü personeli arayan adaylar için İstanbul, Antalya, İzmir ve diğer illerde aktif ilanlarımız bulunmaktadır.",
    introEn: "Active night club staff opportunities in major cities.",
    keywords: ["gece kulübü iş ilanları", "gece kulübü is ilanları"],
  },
  {
    slug: "dansoz",
    type: "category",
    nameTr: "Dansöz",
    nameEn: "Dancer",
    titleTr: "Dansöz İş İlanları",
    titleEn: "Dancer Job Listings",
    descriptionTr: "Dansöz iş ilanları — Türkiye genelinde güvenilir mekanlarda çalışma fırsatları.",
    descriptionEn: "Dancer job listings at trusted venues nationwide.",
    h1Tr: "Dansöz İş İlanları",
    h1En: "Dancer Job Listings",
    introTr: "Dansöz ve sahne sanatçısı adayları için gazino, gece kulübü ve müzikhol mekanlarında iş eşleştirmesi sağlıyoruz.",
    introEn: "Matching dancers with casino, nightclub and music hall venues.",
    keywords: ["dansöz iş ilanları", "konsluk iş ilanları"],
  },
];

function buildCityPage(city: string): LandingPageConfig {
  const slug = CITY_SLUG_MAP[city] ?? city.toLowerCase();
  return {
    slug,
    type: "city",
    nameTr: city,
    nameEn: city,
    titleTr: `${city} Kons İş İlanları`,
    titleEn: `${city} Hostess Job Listings`,
    descriptionTr: `${city} kons iş ilanları, gazino ve gece kulübü fırsatları. Günlük ödemeli, yatılı seçenekler. Bice Menajerlik.`,
    descriptionEn: `${city} hostess and entertainment staff job listings with daily pay.`,
    h1Tr: `${city} Kons İş İlanları`,
    h1En: `${city} Hostess Job Listings`,
    introTr: `${city} ve çevresinde kons, gazino ve gece kulübü iş ilanları arayan adaylar için güvenilir menajerlik hizmeti sunuyoruz. Günlük yevmiye ${SALARY_RANGE.min.toLocaleString("tr-TR")}–${SALARY_RANGE.max.toLocaleString("tr-TR")} ₺ bandında; deneyimsiz adaylar da başvurabilir.`,
    introEn: `Trusted management services for staff candidates in ${city} and surrounding areas.`,
    keywords: [`${city.toLowerCase()} kons iş ilanları`, "kons iş ilanları"],
  };
}

export const CITY_PAGES: LandingPageConfig[] = SERVICE_CITIES.map(buildCityPage);

export const ALL_LANDING_PAGES: LandingPageConfig[] = [
  ...CATEGORY_PAGES,
  ...CITY_PAGES,
];

export function getLandingPage(slug: string): LandingPageConfig | undefined {
  return ALL_LANDING_PAGES.find((p) => p.slug === slug);
}

export function citySlug(city: string): string {
  return CITY_SLUG_MAP[city] ?? city.toLowerCase();
}

export function landingPageUrl(slug: string): string {
  return `${SITE_CONFIG.domain}/ilanlar/${slug}`;
}

/** Featured cards on homepage job listings section */
export const FEATURED_JOB_CARDS = [
  { slug: "kons", badgeKey: "jobCatKons" as const },
  { slug: "gazino", badgeKey: "jobCatGazino" as const },
  { slug: "pavyon", badgeKey: "jobCatPavyon" as const },
  { slug: "gece-kulubu", badgeKey: "jobCatNightClub" as const },
  { slug: "istanbul", badgeKey: "jobCatCity" as const, cityName: "İstanbul" },
  { slug: "antalya", badgeKey: "jobCatCity" as const, cityName: "Antalya" },
  { slug: "samsun", badgeKey: "jobCatCity" as const, cityName: "Samsun" },
  { slug: "izmir", badgeKey: "jobCatCity" as const, cityName: "İzmir" },
] as const;
