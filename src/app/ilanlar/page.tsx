import type { Metadata } from "next";
import { IlanlarHubContent } from "@/components/pages/IlanlarHubContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ilanlarHubMetadata } from "@/lib/metadata";

export const metadata: Metadata = ilanlarHubMetadata;

export default function IlanlarHubPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "İş İlanları", path: "/ilanlar" }]} />
      <IlanlarHubContent />
    </>
  );
}
