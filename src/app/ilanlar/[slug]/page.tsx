import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageContent } from "@/components/pages/LandingPageContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/metadata";
import { ALL_LANDING_PAGES, getLandingPage } from "@/lib/landing-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ALL_LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  return createMetadata({
    title: page.titleTr,
    description: page.descriptionTr,
    path: `/ilanlar/${slug}`,
    keywords: page.keywords,
  });
}

export default async function LandingSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "İş İlanları", path: "/ilanlar" },
          { name: page.titleTr, path: `/ilanlar/${slug}` },
        ]}
      />
      <LandingPageContent page={page} />
    </>
  );
}
