import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Montserrat,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientChrome } from "@/components/layout/ClientChrome";
import { Providers } from "@/components/providers/Providers";
import { rootMetadata } from "@/lib/metadata";
import { GoogleAdsTag } from "@/components/seo/GoogleAdsTag";
import { HomeJobPostingJsonLd, JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  // Do not preload — hero paints with fallback first; improves FCP on mobile.
  preload: false,
  weight: ["600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground pb-16 lg:pb-0">
        <GoogleAdsTag />
        <JsonLd />
        <HomeJobPostingJsonLd />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-night focus:text-sm focus:font-semibold"
        >
          İçeriğe atla
        </a>
        <Providers>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ClientChrome />
        </Providers>
      </body>
    </html>
  );
}
