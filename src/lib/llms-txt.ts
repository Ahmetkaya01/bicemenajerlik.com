import {
  COMPANY_LEGAL,
  PROVINCE_COUNT,
  SALARY_RANGE,
  SERVICE_CITIES,
  SITE_CONFIG,
} from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/faq";
import { CATEGORY_PAGES, CITY_PAGES } from "@/lib/landing-pages";

export function llmsTxtBody(): string {
  const salary = `${SALARY_RANGE.min.toLocaleString("tr-TR")}–${SALARY_RANGE.max.toLocaleString("tr-TR")} ₺ / gün`;

  const lines = [
    `# ${SITE_CONFIG.name}`,
    "",
    `> ${SITE_CONFIG.name}, Türkiye genelinde kons iş ilanları, gazino ve gece kulübü personel yerleştirmesi yapan menajerlik ajansıdır. Günlük yevmiye ${salary}; yatılı seçenekler ve 7/24 WhatsApp desteği sunulur. Başvuru ücretsizdir.`,
    "",
    "## Key facts",
    `- Website: ${SITE_CONFIG.domain}`,
    `- Phone / WhatsApp: ${SITE_CONFIG.phone} (wa.me/${SITE_CONFIG.whatsapp})`,
    `- Email: ${SITE_CONFIG.email}`,
    `- Address: ${SITE_CONFIG.address}`,
    `- Legal owner: ${COMPANY_LEGAL.ownerName}`,
    `- Tax office / ID: ${COMPANY_LEGAL.taxOffice} / ${COMPANY_LEGAL.taxId}`,
    `- Activity: ${COMPANY_LEGAL.activityName} (${COMPANY_LEGAL.activityCode})`,
    `- Business start: ${COMPANY_LEGAL.businessStartDate}`,
    `- Coverage claim: ${PROVINCE_COUNT} provinces; dedicated landing pages for ${SERVICE_CITIES.length} cities`,
    `- Languages: Turkish (primary), English`,
    `- Support: 7/24 WhatsApp and phone`,
    `- Application: free via /basvuru or WhatsApp — no contract required`,
    "",
    "## Pay & conditions",
    `- Typical daily wage: ${salary}`,
    "- Payment: daily; fixed wage or commission (yarıcı) options depending on city/venue",
    "- Live-in (yatılı) listings available for candidates from other cities",
    "- Accommodation coordinated with the venue; transport support available",
    "- Experience not required; candidates 18+",
    "- Review after apply: usually within 24 hours",
    "",
    "## Main pages",
    `- [Ana sayfa](${SITE_CONFIG.domain}/): kons iş ilanları hub`,
    `- [Tüm iş ilanları](${SITE_CONFIG.domain}/ilanlar/): kategori ve şehir listesi`,
    `- [Başvuru](${SITE_CONFIG.domain}/basvuru/): online başvuru (WhatsApp)`,
    `- [Hakkımızda](${SITE_CONFIG.domain}/hakkimizda/): ajans ve güven bilgisi`,
    `- [İletişim](${SITE_CONFIG.domain}/iletisim/): telefon ve WhatsApp`,
    `- [KVKK](${SITE_CONFIG.domain}/kvkk/): aydınlatma metni`,
    "",
    "## Categories",
    ...CATEGORY_PAGES.map(
      (p) =>
        `- [${p.titleTr}](${SITE_CONFIG.domain}/ilanlar/${p.slug}/): ${p.descriptionTr}`
    ),
    "",
    "## Cities",
    ...CITY_PAGES.map(
      (p) =>
        `- [${p.titleTr}](${SITE_CONFIG.domain}/ilanlar/${p.slug}/): ${p.descriptionTr}`
    ),
    "",
    "## FAQ",
    ...FAQ_ITEMS.tr.flatMap((faq) => [`### ${faq.question}`, faq.answer, ""]),
    "## Social",
    `- Instagram: ${SITE_CONFIG.instagram}`,
    `- X: ${SITE_CONFIG.x}`,
    "",
  ];

  return lines.join("\n");
}
