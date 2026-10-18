import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "bicemenajerlik.com",
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
