import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

const ROUTES: MetadataRoute.Sitemap = [
  {
    url: SITE_CONFIG.domain,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES;
}
