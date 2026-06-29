import { PROVINCE_COUNT, SALARY_RANGE } from "./constants";
import type { Locale } from "./i18n/translations";

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Single source of truth for FAQ content. Used both by the visible FAQ
 * section and the FAQPage JSON-LD schema so they never drift apart.
 */
export const FAQ_ITEMS: Record<Locale, FaqItem[]> = {
  tr: [
    {
      question: "Bice Menajerlik hangi hizmetleri sunuyor?",
      answer: `Bice Menajerlik, Türkiye genelinde ${PROVINCE_COUNT} ilde gazino, gece kulübü, bar ve müzikhol mekanları için personel yerleştirme ve menajerlik hizmeti sunar. Başvurudan işe başlamaya kadar tüm süreçte adaylara eşlik ederiz.`,
    },
    {
      question: "Hangi şehirlerde iş imkânı var?",
      answer: `Türkiye genelinde ${PROVINCE_COUNT} ilde aktif kons iş ilanları ve gazino iş ilanları bulunmaktadır. İstanbul kons iş ilanları, Samsun kons iş ilanları, Tokat kons iş ilanı ve Ankara, İzmir, Antalya, Konya, Diyarbakır dahil birçok ilde güvenilir mekanlarla çalışıyoruz.`,
    },
    {
      question: "Yatılı kons ve yatılı gazino iş ilanları var mı?",
      answer:
        "Evet. Şehir dışından gelen adaylar için yatılı kons iş ilanları ve yatılı gazino iş ilanları sunuyoruz. Konaklama, çalışılacak mekan ile koordinasyon halinde sağlanır; ulaşım konusunda da destek verilir.",
    },
    {
      question: "Günlük yevmiye ne kadar?",
      answer: `Günlük yevmiye şehre ve mekana göre değişmekle birlikte genellikle ${SALARY_RANGE.min.toLocaleString("tr-TR")} ₺ ile ${SALARY_RANGE.max.toLocaleString("tr-TR")} ₺ arasındadır. İstanbul'da yarıcı (yüzdeli) çalışma seçenekleri de mevcuttur.`,
    },
    {
      question: "Deneyimsiz adaylar başvurabilir mi?",
      answer:
        "Evet. 18 yaşını doldurmuş, deneyimli veya deneyimsiz tüm adaylar başvurabilir. Deneyimsiz adaylara işe başlamadan önce gerekli bilgilendirme ve yönlendirme yapılır.",
    },
    {
      question: "Konaklama imkânı sağlanıyor mu?",
      answer:
        "Evet. Yatılı kons ve yatılı gazino iş ilanları kapsamında şehir dışından gelen adaylar için konaklama, çalışılacak mekan ile koordinasyon halinde sağlanır. Ulaşım konusunda da destek verilir.",
    },
    {
      question: "Başvurudan sonra süreç nasıl işliyor?",
      answer:
        "Online başvuru formunu doldurduktan sonra menajerlerimiz başvurunuzu 24 saat içinde değerlendirir ve sizinle iletişime geçer. Uygun eşleşme sağlandığında aynı gün veya ertesi gün işe başlayabilirsiniz.",
    },
    {
      question: "Ödemeler nasıl yapılıyor?",
      answer:
        "Ödemeler günlük olarak yapılır. Sözleşme zorunluluğu yoktur; sabit yevmiye veya yarıcı (yüzdeli) çalışma seçenekleri arasından tercih yapabilirsiniz.",
    },
    {
      question: "Kişisel bilgilerim güvende mi?",
      answer:
        "Evet. Başvuru sırasında paylaştığınız tüm bilgiler ve fotoğraflar gizli tutulur, yalnızca iş eşleştirme amacıyla kullanılır ve üçüncü kişilerle paylaşılmaz.",
    },
  ],
  en: [
    {
      question: "What services does Bice Menajerlik provide?",
      answer: `Bice Menajerlik provides staff placement and management services for casinos, night clubs, bars and music halls across ${PROVINCE_COUNT} provinces of Turkey. We guide candidates through the entire process, from application to their first day at work.`,
    },
    {
      question: "Which cities have job opportunities?",
      answer: `We have active kons and casino job listings in ${PROVINCE_COUNT} provinces across Turkey, including Istanbul, Samsun, Tokat, Ankara, Izmir, Antalya, Konya, Diyarbakir and many more, working with trusted venues.`,
    },
    {
      question: "Are live-in kons and casino job listings available?",
      answer:
        "Yes. We offer live-in kons and live-in casino job listings for candidates from other cities. Accommodation is arranged in coordination with the venue, and transportation support is also provided.",
    },
    {
      question: "How much is the daily wage?",
      answer: `Daily wages vary by city and venue, typically ranging from ${SALARY_RANGE.min.toLocaleString("en-US")} TRY to ${SALARY_RANGE.max.toLocaleString("en-US")} TRY. Commission-based options are also available in Istanbul.`,
    },
    {
      question: "Can candidates without experience apply?",
      answer:
        "Yes. All candidates aged 18 and over can apply, with or without experience. Inexperienced candidates receive guidance and orientation before starting work.",
    },
    {
      question: "Is accommodation provided?",
      answer:
        "Yes. Through our live-in kons and live-in casino job listings, accommodation for candidates from other cities is arranged in coordination with the venue. Transportation support is also provided.",
    },
    {
      question: "What happens after I apply?",
      answer:
        "After you submit the online application form, our managers review your application within 24 hours and contact you. Once matched, you can start working the same day or the next day.",
    },
    {
      question: "How are payments made?",
      answer:
        "Payments are made daily. There is no contract requirement; you can choose between a fixed daily wage or commission-based work.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes. All information and photos you share during the application are kept confidential, used only for job matching, and never shared with third parties.",
    },
  ],
};
