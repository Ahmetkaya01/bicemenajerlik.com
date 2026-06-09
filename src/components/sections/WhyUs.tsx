"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Headphones, Globe, type LucideIcon } from "lucide-react";
import { WHY_US_STATS, WHY_US_FEATURES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const featureIcons: Record<string, LucideIcon> = {
  Shield,
  Zap,
  Headphones,
  Globe,
};

function AnimatedCounter({
  value,
  suffix,
  inView,
}: {
  value: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="font-display text-4xl sm:text-5xl font-bold text-gold-gradient">
      {count}
      {suffix}
    </span>
  );
}

export function WhyUs() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <section id="guven" className="section-alt section-glow-top py-20 sm:py-24 relative overflow-hidden scroll-mt-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("whyBadge")}
          title={
            <>
              {t("whyTitle1")}{" "}
              <span className="text-gold-gradient">{t("whyTitle2")}</span>
            </>
          }
          description={t("whyDesc")}
        />

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {WHY_US_STATS.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                inView={statsInView}
              />
              <p className="text-silver text-sm mt-2 font-medium">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_FEATURES.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-gold" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-silver text-sm">{t(feature.descKey)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
