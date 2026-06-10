import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Gizlilik Politikası",
  description:
    "Bice Menajerlik gizlilik politikası. Kişisel verilerinizin KVKK kapsamında nasıl işlendiği, saklandığı ve korunduğu hakkında bilgi alın.",
  path: "/gizlilik-politikasi",
});

const SECTIONS = [
  {
    heading: "1. Toplanan Veriler",
    content: (
      <>
        <p>
          İş başvuru formu aracılığıyla yalnızca başvurunuzun değerlendirilmesi
          için gerekli olan veriler toplanır: ad, soyad, yaş, şehir, telefon
          numarası, deneyim bilgisi ve fotoğraf.
        </p>
        <p>
          Web sitemizi ziyaret ettiğinizde teknik zorunluluk dışında çerez veya
          izleme aracı kullanılmaz.
        </p>
      </>
    ),
  },
  {
    heading: "2. Verilerin Kullanım Amacı",
    content: (
      <p>
        Toplanan veriler yalnızca iş eşleştirme ve sizinle iletişim kurma
        amacıyla kullanılır. Verileriniz pazarlama amacıyla kullanılmaz ve
        üçüncü kişilerle paylaşılmaz.
      </p>
    ),
  },
  {
    heading: "3. Verilerin Saklanması ve Güvenliği",
    content: (
      <p>
        Başvuru verileriniz güvenli sistemlerde saklanır ve yalnızca yetkili
        menajerlik ekibimiz tarafından erişilebilir. Başvurunuzun
        sonuçlanmasının ardından talebiniz hâlinde verileriniz silinir.
      </p>
    ),
  },
  {
    heading: "4. KVKK Kapsamındaki Haklarınız",
    content: (
      <>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında;
          verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya
          silinmesini talep etme haklarına sahipsiniz.
        </p>
        <p>
          Bu haklarınızı kullanmak için{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold hover:underline">
            {SITE_CONFIG.email}
          </a>{" "}
          adresinden bize ulaşabilirsiniz.
        </p>
      </>
    ),
  },
  {
    heading: "5. İletişim",
    content: (
      <p>
        Gizlilik politikamız hakkında sorularınız için{" "}
        <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold hover:underline">
          {SITE_CONFIG.email}
        </a>{" "}
        veya{" "}
        <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-gold hover:underline">
          {SITE_CONFIG.phone}
        </a>{" "}
        üzerinden bizimle iletişime geçebilirsiniz.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Gizlilik Politikası", path: "/gizlilik-politikasi" }]}
      />
      <LegalPage
        title="Gizlilik Politikası"
        updatedAt="10 Haziran 2026"
        intro="Bice Menajerlik olarak kişisel verilerinizin gizliliğine önem veriyoruz. Bu politika, hangi verileri topladığımızı, nasıl kullandığımızı ve haklarınızı açıklar."
        sections={SECTIONS}
      />
    </>
  );
}
