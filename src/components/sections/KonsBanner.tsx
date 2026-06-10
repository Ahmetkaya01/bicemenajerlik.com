"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { KONS_HIGHLIGHT_KEYS } from "@/lib/constants";
import { IMAGE_ALTS } from "@/lib/image-placeholders";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import konsBannerPhoto from "../../../public/images/kons-banner.jpg";

export function KonsBanner() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-gold/10"
          >
            <Image
              src={konsBannerPhoto}
              alt={IMAGE_ALTS.konsBanner}
              fill
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_40%] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/25 to-gold/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 glass rounded-xl px-4 py-3">
              <p className="text-gold font-heading font-semibold text-sm">
                {t("konsBannerRegion")}
              </p>
              <p className="text-silver text-xs">{t("konsBannerRegionSub")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
              {t("konsBadge")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-5 leading-tight">
              {t("konsBannerTitle1")}{" "}
              <span className="text-gold-gradient">{t("konsBannerTitle2")}</span>{" "}
              {t("konsBannerTitle3")}
            </h2>
            <p className="text-silver leading-relaxed mb-6">{t("konsBannerDesc")}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {KONS_HIGHLIGHT_KEYS.map((key) => (
                <div
                  key={key}
                  className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 bg-white/[0.03] border border-white/5"
                >
                  <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-silver text-xs sm:text-sm leading-snug">
                    {t(key)}
                  </span>
                </div>
              ))}
            </div>

            <Button href="/basvuru" size="lg">
              {t("applyNow")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
