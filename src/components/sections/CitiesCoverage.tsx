"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { SERVICE_CITIES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function CitiesCoverage() {
  const { t } = useLanguage();

  return (
    <section id="sehirler" className="section-glow-top py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("citiesBadge")}
          title={
            <>
              <span className="text-gold-gradient">{t("citiesTitle1")}</span>{" "}
              {t("citiesTitle2")}
            </>
          }
          description={t("citiesDesc")}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-10"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <MapPin size={20} className="text-gold" />
            <p className="text-silver text-sm">{t("citiesListLabel")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {SERVICE_CITIES.map((city, index) => (
              <motion.span
                key={city}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-silver hover:border-gold/30 hover:text-gold transition-colors"
              >
                {city}
              </motion.span>
            ))}
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gold/10 border border-gold/30 text-gold">
              {t("citiesMore")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
