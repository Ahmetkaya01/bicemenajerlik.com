import { SITE_CONFIG } from "./constants";
import type { TranslationKey } from "./i18n/translations";
import { translations, type Locale } from "./i18n/translations";

export interface ApplicationWhatsAppData {
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  height: number;
  experienceArea: string;
  experience: string;
  phone: string;
}

function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key];
}

export function buildWhatsAppMessage(
  data: ApplicationWhatsAppData,
  locale: Locale = "tr"
): string {
  const lines = [
    `*${t(locale, "waNewApplication")}*`,
    "",
    `*${t(locale, "waFirstName")}:* ${data.firstName}`,
    `*${t(locale, "waLastName")}:* ${data.lastName}`,
    `*${t(locale, "waAge")}:* ${data.age}`,
    `*${t(locale, "waCity")}:* ${data.city}`,
    `*${t(locale, "waHeight")}:* ${data.height} cm`,
    `*${t(locale, "waExperienceArea")}:* ${data.experienceArea}`,
    `*${t(locale, "waPhone")}:* ${data.phone}`,
    `*${t(locale, "waExperience")}:* ${data.experience}`,
  ];

  return lines.join("\n");
}

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}
