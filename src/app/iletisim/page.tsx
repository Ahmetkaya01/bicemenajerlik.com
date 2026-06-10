import type { Metadata } from "next";
import { contactMetadata } from "@/lib/metadata";
import { ContactContent } from "@/components/pages/ContactContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "İletişim", path: "/iletisim" }]} />
      <ContactContent />
    </>
  );
}
