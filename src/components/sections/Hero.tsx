"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroHighlights } from "@/components/sections/HeroHighlights";
import { SITE_CONFIG } from "@/lib/constants";
import { BLUR_PLACEHOLDER, IMAGE_ALTS } from "@/lib/image-placeholders";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const QUICK_LINKS = [
  { href: "/#hizmetler", key: "services" as const },
  { href: "/#maas", key: "salary" as const },
  { href: "/#sehirler", key: "cities" as const },
] as const;

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex flex-col hero-gradient overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <Image
          src="https://images.unsplash.com/photo-1571266028247-e4733b0f0bb0?w=1920&q=70"
          alt={IMAGE_ALTS.hero}
          fill
          preload
          quality={60}
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gold/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex-1 flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 w-full">
        <div className="flex-1 flex flex-col justify-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 w-fit"
          >
            <Globe size={16} className="text-gold" />
            <span className="text-silver text-sm">{t("heroBadge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            {t("heroTitle1")}{" "}
            <span className="text-gold-gradient">{t("heroTitle2")}</span>{" "}
            {t("heroTitle3")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-silver text-lg sm:text-xl leading-relaxed mb-8"
          >
            {t("heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <Button href="/basvuru" size="lg">
              {t("applyNow")}
              <ArrowRight size={20} />
            </Button>
            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              variant="outline"
              size="lg"
            >
              {t("contactWhatsapp")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            <span className="text-silver/50 text-xs mr-1 self-center">
              {t("heroExplore")}:
            </span>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-white/10 text-silver hover:border-gold/40 hover:text-gold transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </motion.div>
        </div>

        <HeroHighlights />
      </div>

      <motion.a
        href="/#nasil-calisir"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="relative z-10 pb-6 flex justify-center text-silver/40 hover:text-gold transition-colors"
        aria-label={t("heroScroll")}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.a>
    </section>
  );
}
