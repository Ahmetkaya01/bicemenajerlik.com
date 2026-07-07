import type { Metadata } from "next";
import {
  Inter,
  Playfair_Display,
  Montserrat,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Providers } from "@/components/providers/Providers";
import { rootMetadata } from "@/lib/metadata";
import { GoogleAdsTag } from "@/components/seo/GoogleAdsTag";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { HomeJobPostingJsonLd, JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
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
          <FloatingContact />
          <StickyCtaBar />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}
