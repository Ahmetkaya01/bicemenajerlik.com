import { z } from "zod";
import { translations, type Locale } from "./i18n/translations";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export function getApplicationSchema(locale: Locale = "tr") {
  const m = translations[locale];

  return z.object({
    firstName: z
      .string()
      .min(2, m.valFirstNameMin)
      .max(50, m.valFirstNameMax),
    lastName: z
      .string()
      .min(2, m.valLastNameMin)
      .max(50, m.valLastNameMax),
    age: z
      .number({ error: m.valAgeInvalid })
      .min(18, m.valAgeMin)
      .max(65, m.valAgeMax),
    city: z.string().min(2, m.valCityMin).max(50, m.valCityMax),
    height: z
      .number({ error: m.valHeightInvalid })
      .min(140, m.valHeightMin)
      .max(220, m.valHeightMax),
    experienceArea: z.string().min(1, m.valExperienceArea),
    experience: z
      .string()
      .min(10, m.valExperienceMin)
      .max(1000, m.valExperienceMax),
    phone: z
      .string()
      .min(10, m.valPhone)
      .max(15, m.valPhone)
      .regex(/^[0-9+\s()-]+$/, m.valPhone),
    photo: z
      .custom<FileList | undefined>()
      .optional()
      .refine(
        (files) => !files?.length || files[0].size <= MAX_FILE_SIZE,
        m.valPhotoSize
      )
      .refine(
        (files) =>
          !files?.length ||
          ACCEPTED_IMAGE_TYPES.includes(files[0].type ?? ""),
        m.valPhotoType
      ),
    consent: z.literal(true, { error: m.valConsent }),
    deliveryMethod: z.enum(["email", "whatsapp"]),
  });
}

export type ApplicationForm = z.infer<ReturnType<typeof getApplicationSchema>>;
