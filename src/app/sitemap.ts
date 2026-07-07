import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { ALL_LANDING_PAGES } from "@/lib/landing-pages";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_CONFIG.domain,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${SITE_CONFIG.domain}/ilanlar`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    url: `${SITE_CONFIG.domain}/hakkimizda`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_CONFIG.domain}/iletisim`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_CONFIG.domain}/basvuru`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${SITE_CONFIG.domain}/kvkk`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_CONFIG.domain}/gizlilik-politikasi`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_CONFIG.domain}/kullanim-sartlari`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${SITE_CONFIG.domain}/cerez-politikasi`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const landingRoutes: MetadataRoute.Sitemap = ALL_LANDING_PAGES.map((page) => ({
    url: `${SITE_CONFIG.domain}/ilanlar/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: page.type === "city" ? "weekly" : "monthly",
    priority: page.type === "category" ? 0.85 : 0.75,
  }));

  return [...STATIC_ROUTES, ...landingRoutes];
}
