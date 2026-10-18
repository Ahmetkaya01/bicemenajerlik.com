import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Applebot-Extended",
  "Bingbot",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "anthropic-ai",
  "GoogleOther",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    host: "bicemenajerlik.com",
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  };
}
