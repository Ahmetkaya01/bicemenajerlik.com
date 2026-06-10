import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Kullanım Şartları",
  description:
    "Bice Menajerlik web sitesi kullanım şartları. Site kullanımı, başvuru koşulları ve sorumluluklar hakkında bilgi alın.",
  path: "/kullanim-sartlari",
});

const SECTIONS = [
  {
    heading: "1. Hizmet Tanımı",
    content: (
      <p>
        Bice Menajerlik, Türkiye genelinde gazino, gece kulübü, bar ve müzikhol
        mekanları için personel yerleştirme ve menajerlik hizmeti sunan bir
        aracılık platformudur. Web sitemiz üzerinden iş başvurusu yapabilir ve
        hizmetlerimiz hakkında bilgi alabilirsiniz.
      </p>
    ),
  },
  {
    heading: "2. Başvuru Koşulları",
    content: (
      <>
        <p>
          İş başvurusunda bulunmak için 18 yaşını doldurmuş olmanız
          gerekmektedir. Başvuru formunda verdiğiniz bilgilerin doğru ve güncel
          olması sizin sorumluluğunuzdadır.
        </p>
        <p>
          Yanlış veya yanıltıcı bilgi verilmesi durumunda başvurunuz
          değerlendirme dışı bırakılabilir.
        </p>
      </>
    ),
  },
  {
    heading: "3. Hizmet Bedeli",
    content: (
      <p>
        Adaylardan başvuru veya yerleştirme için herhangi bir ücret talep
        edilmez. Başvuru ve eşleştirme süreci tamamen ücretsizdir.
      </p>
    ),
  },
  {
    heading: "4. Sorumluluk Sınırı",
    content: (
      <p>
        Web sitesindeki bilgiler genel bilgilendirme amaçlıdır. Yevmiye
        aralıkları ve çalışma koşulları mekana ve şehre göre değişiklik
        gösterebilir; kesin koşullar eşleştirme sırasında bildirilir.
      </p>
    ),
  },
  {
    heading: "5. Fikri Mülkiyet",
    content: (
      <p>
        Bu web sitesindeki tüm içerik, tasarım ve marka unsurları Bice
        Menajerlik&apos;e aittir ve izinsiz kullanılamaz.
      </p>
    ),
  },
  {
    heading: "6. İletişim",
    content: (
      <p>
        Kullanım şartları hakkında sorularınız için{" "}
        <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold hover:underline">
          {SITE_CONFIG.email}
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Kullanım Şartları", path: "/kullanim-sartlari" }]}
      />
      <LegalPage
        title="Kullanım Şartları"
        updatedAt="10 Haziran 2026"
        intro="Bu sayfa, bicemenajerlik.com web sitesini kullanırken geçerli olan şartları ve koşulları açıklar. Siteyi kullanarak bu şartları kabul etmiş sayılırsınız."
        sections={SECTIONS}
      />
    </>
  );
}
