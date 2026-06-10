import type { Metadata } from "next";
import { aboutMetadata } from "@/lib/metadata";
import { AboutContent } from "@/components/pages/AboutContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Hakkımızda", path: "/hakkimizda" }]} />
      <AboutContent />
    </>
  );
}
