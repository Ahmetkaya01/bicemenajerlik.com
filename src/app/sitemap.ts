import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { ALL_LANDING_PAGES } from "@/lib/landing-pages";

export const dynamic = "force-static";

function url(path = ""): string {
  if (!path || path === "/") return `${SITE_CONFIG.domain}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_CONFIG.domain}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
}

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: url("/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: url("/ilanlar"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    url: url("/hakkimizda"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: url("/iletisim"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: url("/basvuru"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: url("/kvkk"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: url("/gizlilik-politikasi"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: url("/kullanim-sartlari"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: url("/cerez-politikasi"),
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const landingRoutes: MetadataRoute.Sitemap = ALL_LANDING_PAGES.map((page) => ({
    url: url(`/ilanlar/${page.slug}`),
    lastModified: new Date(),
    changeFrequency: page.type === "city" ? "weekly" : "monthly",
    priority: page.type === "category" ? 0.85 : 0.75,
  }));

  return [...STATIC_ROUTES, ...landingRoutes];
}
