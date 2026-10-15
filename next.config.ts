import type { NextConfig } from "next";
import { MEKANBUL, SITE_CONFIG } from "./src/lib/constants";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [40, 50, 60, 75],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    // Inline Tailwind/app CSS into <style> to remove the render-blocking
    // stylesheet request waterfall (prod only). See Next docs: inlineCss.
    inlineCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      // Prefer platform redirect over Edge Middleware (avoids middleware TTFB on every path).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bicemenajerlik.com" }],
        destination: "https://bicemenajerlik.com/:path*",
        permanent: true,
      },
      {
        source: MEKANBUL.shortPath,
        destination: MEKANBUL.url,
        permanent: false,
      },
      {
        source: "/instagram",
        destination: SITE_CONFIG.instagram,
        permanent: false,
      },
      {
        source: "/ig",
        destination: SITE_CONFIG.instagram,
        permanent: false,
      },
      {
        source: "/x",
        destination: SITE_CONFIG.x,
        permanent: false,
      },
      {
        source: "/twitter",
        destination: SITE_CONFIG.x,
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
