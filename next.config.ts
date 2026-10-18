import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages (hauzmaid modeli) — static export
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
