"use client";

import { motion } from "framer-motion";
import {
  Music,
  Sparkles,
  Zap,
  Wallet,
  Headphones,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const iconMap: Record<string, LucideIcon> = {
  Music,
  Sparkles,
  Zap,
  Wallet,
  Headphones,
  Shield,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <section id="hizmetler" className="section-glow-top py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("servicesBadge")}
          title={
            <>
              {t("servicesTitle1")}{" "}
              <span className="text-gold-gradient">{t("servicesTitle2")}</span>
            </>
          }
          description={t("servicesDesc")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="card-glow glass rounded-2xl p-7 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-gold transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {t(service.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
