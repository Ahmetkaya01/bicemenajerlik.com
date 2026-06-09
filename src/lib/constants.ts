export const PROVINCE_COUNT = 58;

export const SITE_CONFIG = {
  name: "Bice Menajerlik",
  domain: "https://bicemenajerlik.com",
  phone: "+90 530 373 39 89",
  phoneRaw: "905303733989",
  email: "bicemenajerliktr@gmail.com",
  whatsapp: "905303733989",
  address: "Türkiye Geneli Hizmet",
} as const;

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
    id: "placements",
    icon: "Users",
    value: "2500+",
    labelKey: "trustBarPlacements" as const,
    sectionKey: "whyBadge" as const,
    href: "/#guven",
  },
] as const;

export const SALARY_EXAMPLES = [
  { city: "İstanbul", min: 10000, max: 12000 },
  { city: "İzmir", min: 9500, max: 11500 },
  { city: "Ankara", min: 9000, max: 11000 },
  { city: "Antalya", min: 8500, max: 10500 },
  { city: "Bursa", min: 8000, max: 10000 },
  { city: "Adana", min: 7500, max: 9500 },
  { city: "Tokat", min: 7000, max: 9000 },
] as const;

export const NAV_LINKS = [
  { href: "/", key: "home" as const },
  { href: "/#hizmetler", key: "services" as const },
  { href: "/#maas", key: "salary" as const },
  { href: "/#sehirler", key: "cities" as const },
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
  { value: 2500, suffix: "+", labelKey: "statPlacements" as const },
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
