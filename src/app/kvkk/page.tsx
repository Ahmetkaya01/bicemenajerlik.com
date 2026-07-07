import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "Bice Menajerlik KVKK aydınlatma metni. Kişisel verilerinizin 6698 sayılı kanun kapsamında işlenmesi hakkında bilgi.",
  path: "/kvkk",
});

const SECTIONS = [
  {
    heading: "1. Veri Sorumlusu",
    content: (
      <p>
        {SITE_CONFIG.name} — {SITE_CONFIG.address}. İletişim: {SITE_CONFIG.email},{" "}
        {SITE_CONFIG.phone}.
      </p>
    ),
  },
  {
    heading: "2. İşlenen Kişisel Veriler",
    content: (
      <p>
        Başvuru formu kapsamında ad, soyad, yaş, şehir, telefon, deneyim bilgisi ve
        isteğe bağlı fotoğraf; web sitesi ziyaretinde teknik log ve çerez verileri (onay
        vermeniz halinde analitik veriler).
      </p>
    ),
  },
  {
    heading: "3. İşleme Amaçları",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>İş eşleştirme ve başvuru değerlendirme</li>
        <li>Sizinle iletişim kurma</li>
        <li>Web sitesi performansını ölçme (analitik çerez onayı ile)</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
      </ul>
    ),
  },
  {
    heading: "4. Hukuki Sebep",
    content: (
      <p>
        KVKK m.5/2 (c) sözleşmenin kurulması, m.5/2 (f) meşru menfaat ve açık rızanız
        (form onay kutusu, çerez tercihi).
      </p>
    ),
  },
  {
    heading: "5. Haklarınız",
    content: (
      <p>
        Verilerinize erişim, düzeltme, silme, işlemeyi kısıtlama ve itiraz haklarına
        sahipsiniz. Taleplerinizi {SITE_CONFIG.email} adresine iletebilirsiniz.
      </p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "KVKK Aydınlatma Metni", path: "/kvkk" }]}
      />
      <LegalPage
        title="KVKK Aydınlatma Metni"
        updatedAt="7 Temmuz 2026"
        intro="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme metni."
        sections={SECTIONS}
      />
    </>
  );
}
