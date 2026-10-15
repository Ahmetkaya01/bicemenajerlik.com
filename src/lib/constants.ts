export const PROVINCE_COUNT = 58;

export const SITE_CONFIG = {
  name: "Bice Menajerlik",
  domain: "https://bicemenajerlik.com",
  phone: "+90 530 373 39 89",
  phoneRaw: "905303733989",
  email: "bicemenajerliktr@gmail.com",
  whatsapp: "905303733989",
  address: "Semerkant Mah., Merkez / Tokat",
  instagram: "https://www.instagram.com/bice.menajerlik",
  x: "https://x.com/bicemenajerlik",
} as const;

export const MEKANBUL = {
  name: "mekanbul.online",
  url: "https://www.mekanbul.online",
  shortPath: "/mekanbul",
} as const;

export const COMPANY_LEGAL = {
  ownerName: "Ragıp Onur Bice",
  taxOffice: "Tokat",
  taxId: "1690396554",
  activityCode: "749901",
  activityName:
    "Sanatçı, sporcu, şovmen, manken ve diğerleri için ajansların ve menajerlerin faaliyetleri",
  businessStartDate: "15.06.2015",
  taxCertificateImage: "/images/vergi-levhasi.png",
  taxVerificationUrl: "https://intvd.gib.gov.tr",
} as const;

/** Shared PostalAddress for Organization and JobPosting JSON-LD. */
export const BUSINESS_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "Semerkant Mah.",
  addressLocality: "Merkez",
  addressRegion: "Tokat",
  postalCode: "60000",
  addressCountry: "TR",
};

export const SOCIAL_LINKS = [
  {
    id: "instagram",
    href: SITE_CONFIG.instagram,
    labelKey: "socialInstagram" as const,
  },
  {
    id: "x",
    href: SITE_CONFIG.x,
    labelKey: "socialX" as const,
  },
] as const;

export const SALARY_RANGE = {
  min: 7000,
  max: 12000,
} as const;

export const HERO_HIGHLIGHTS = [
  {
    id: "provinces",
    icon: "MapPin",
    value: String(PROVINCE_COUNT),
    labelKey: "trustBarProvinces" as const,
    sectionKey: "cities" as const,
    href: "/#sehirler",
  },
  {
    id: "salary",
    icon: "Banknote",
    valueType: "salary" as const,
    labelKey: "trustBarSalary" as const,
    sectionKey: "salary" as const,
    href: "/#maas",
  },
  {
    id: "review",
    icon: "Clock",
    valueType: "review" as const,
    labelKey: "trustBarReview" as const,
    sectionKey: "processBadge" as const,
    href: "/#nasil-calisir",
  },
  {
    id: "support",
    icon: "Headphones",
    value: "7/24",
    labelKey: "trustBarSupport" as const,
    sectionKey: "contact" as const,
    href: "/iletisim",
  },
] as const;

export const SALARY_EXAMPLES = [
  {
    city: "İstanbul",
    labelKey: "salaryIstanbulSpecial" as const,
    noteKey: "salaryIstanbulNote" as const,
  },
  { city: "Samsun", min: 7000, max: 9000 },
  { city: "Tokat", min: 7000, max: 10000 },
  { city: "Diyarbakır", min: 8000, max: 12000 },
  { city: "Konya", min: 7000, max: 9000 },
  { city: "Uşak", min: 7000, max: 10000 },
  { city: "Zonguldak", min: 7000, max: 9000 },
] as const;

export const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/ilanlar", key: "jobListings" as const },
  { href: "/#hizmetler", key: "services" as const },
  { href: "/#maas", key: "salary" as const },
  { href: "/#sehirler", key: "cities" as const },
  { href: "/#kurumsal", key: "corporateNav" as const },
  { href: "/basvuru", key: "apply" as const },
  { href: "/hakkimizda", key: "about" as const },
  { href: "/iletisim", key: "contact" as const },
] as const;

export const HEADER_NAV_LINKS = NAV_LINKS.filter((link) => link.href !== "/basvuru");

export const SERVICES = [
  {
    id: "kons",
    titleKey: "serviceKonsTitle" as const,
    descKey: "serviceKonsDesc" as const,
    icon: "Music",
  },
  {
    id: "gazino",
    titleKey: "serviceGazinoTitle" as const,
    descKey: "serviceGazinoDesc" as const,
    icon: "Sparkles",
  },
  {
    id: "placement",
    titleKey: "servicePlacementTitle" as const,
    descKey: "servicePlacementDesc" as const,
    icon: "Zap",
  },
  {
    id: "payment",
    titleKey: "servicePaymentTitle" as const,
    descKey: "servicePaymentDesc" as const,
    icon: "Wallet",
  },
  {
    id: "support",
    titleKey: "serviceSupportTitle" as const,
    descKey: "serviceSupportDesc" as const,
    icon: "Headphones",
  },
  {
    id: "trust",
    titleKey: "serviceTrustTitle" as const,
    descKey: "serviceTrustDesc" as const,
    icon: "Shield",
  },
] as const;

export const SERVICE_CITIES = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Gaziantep",
  "Konya",
  "Mersin",
  "Kayseri",
  "Eskişehir",
  "Trabzon",
  "Samsun",
  "Denizli",
  "Muğla",
  "Tekirdağ",
  "Balıkesir",
  "Manisa",
  "Aydın",
  "Hatay",
  "Sakarya",
  "Kocaeli",
  "Diyarbakır",
  "Malatya",
  "Erzurum",
  "Van",
  "Tokat",
  "Amasya",
] as const;

export const WHY_US_STATS = [
  { value: 50, suffix: "+", labelKey: "statVenues" as const },
  { value: 10, suffix: "+", labelKey: "statYears" as const },
  { value: PROVINCE_COUNT, suffix: "", labelKey: "statCities" as const },
  { value: 24, suffix: "sa", labelKey: "statReview" as const },
] as const;

export const WHY_US_FEATURES = [
  {
    titleKey: "featureNationwideTitle" as const,
    descKey: "featureNationwideDesc" as const,
    icon: "Globe",
  },
  {
    titleKey: "featureTrustTitle" as const,
    descKey: "featureTrustDesc" as const,
    icon: "Shield",
  },
  {
    titleKey: "featureFastTitle" as const,
    descKey: "featureFastDesc" as const,
    icon: "Zap",
  },
  {
    titleKey: "featureWhatsappTitle" as const,
    descKey: "featureWhatsappDesc" as const,
    icon: "Headphones",
  },
] as const;

export const EXPERIENCE_AREA_KEYS = [
  "expKons",
  "expGarson",
  "expDancer",
  "expHostes",
  "expBeginner",
  "expOther",
] as const;

export const KONS_HIGHLIGHT_KEYS = [
  "highlight1",
  "highlight2",
  "highlight3",
  "highlight4",
  "highlight5",
] as const;
