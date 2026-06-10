import type { Metadata } from "next";
import { applicationMetadata } from "@/lib/metadata";
import { ApplyContent } from "@/components/pages/ApplyContent";
import { BreadcrumbJsonLd, JobPostingJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = applicationMetadata;

export default function ApplicationPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "İş Başvurusu", path: "/basvuru" }]} />
      <JobPostingJsonLd />
      <ApplyContent />
    </>
  );
}
