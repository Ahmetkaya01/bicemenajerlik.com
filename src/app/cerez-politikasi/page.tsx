import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = createMetadata({
  title: "Çerez Politikası",
  description:
    "Bice Menajerlik çerez politikası. Web sitemizde hangi çerezlerin kullanıldığı ve nasıl yönetebileceğiniz hakkında bilgi alın.",
  path: "/cerez-politikasi",
});

const SECTIONS = [
  {
    heading: "1. Çerez Nedir?",
    content: (
      <p>
        Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınıza
        kaydedilen küçük metin dosyalarıdır. Sitelerin düzgün çalışmasını ve
        tercihlerinizin hatırlanmasını sağlar.
      </p>
    ),
  },
  {
    heading: "2. Kullandığımız Çerezler",
    content: (
      <>
        <p>Web sitemiz minimum düzeyde çerez ve yerel depolama kullanır:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="text-foreground">Dil tercihi</strong> — Seçtiğiniz
            dil (Türkçe/İngilizce) tarayıcınızın yerel depolamasında saklanır.
          </li>
          <li>
            <strong className="text-foreground">Teknik çerezler</strong> —
            Sitenin güvenli ve düzgün çalışması için gereken zorunlu çerezler.
          </li>
        </ul>
        <p>
          Reklam, pazarlama veya üçüncü taraf izleme çerezi kullanmıyoruz.
        </p>
      </>
    ),
  },
  {
    heading: "3. Çerezleri Yönetme",
    content: (
      <p>
        Tarayıcınızın ayarlarından çerezleri silebilir veya engelleyebilirsiniz.
        Zorunlu çerezlerin engellenmesi durumunda sitenin bazı özellikleri
        düzgün çalışmayabilir.
      </p>
    ),
  },
  {
    heading: "4. İletişim",
    content: (
      <p>
        Çerez politikamız hakkında sorularınız için{" "}
        <a href={`mailto:${SITE_CONFIG.email}`} className="text-gold hover:underline">
          {SITE_CONFIG.email}
        </a>{" "}
        adresine yazabilirsiniz.
      </p>
    ),
  },
];

export default function CookiePolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Çerez Politikası", path: "/cerez-politikasi" }]}
      />
      <LegalPage
        title="Çerez Politikası"
        updatedAt="10 Haziran 2026"
        intro="Bu sayfa, bicemenajerlik.com web sitesinde kullanılan çerezler ve benzeri teknolojiler hakkında bilgi verir."
        sections={SECTIONS}
      />
    </>
  );
}
