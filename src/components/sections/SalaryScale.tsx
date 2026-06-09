"use client";

import { motion } from "framer-motion";
import { Banknote, MapPin, TrendingUp } from "lucide-react";
import { SALARY_EXAMPLES, SALARY_RANGE } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function formatTry(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-TR" : "tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(amount);
}

function rangePercent(min: number, max: number) {
  const span = SALARY_RANGE.max - SALARY_RANGE.min;
  const left = ((min - SALARY_RANGE.min) / span) * 100;
  const width = ((max - min) / span) * 100;
  return { left, width };
}

export function SalaryScale() {
  const { t, locale } = useLanguage();

  return (
    <section id="maas" className="section-alt section-glow-top py-20 sm:py-24 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("salaryBadge")}
          title={
            <>
              {t("salaryTitle1")}{" "}
              <span className="text-gold-gradient">{t("salaryTitle2")}</span>
            </>
          }
          description={t("salaryDesc")}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 sm:p-12 mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Banknote size={22} className="text-gold" />
            <p className="text-silver text-sm font-medium">
              {formatTry(SALARY_RANGE.min, locale)} —{" "}
              {formatTry(SALARY_RANGE.max, locale)} / {t("salaryPerDay")}
            </p>
          </div>

          <div className="relative pt-2 pb-10">
            <div className="h-4 rounded-full bg-white/5 overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full gold-gradient opacity-80"
              />
            </div>

            <div className="flex justify-between mt-4">
              <div className="text-center sm:text-left">
                <p className="text-silver/60 text-xs uppercase tracking-wider mb-1">
                  {t("salaryMin")}
                </p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
                  {formatTry(SALARY_RANGE.min, locale)}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-silver/50">
                <TrendingUp size={18} className="text-gold/60" />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-silver/60 text-xs uppercase tracking-wider mb-1">
                  {t("salaryMax")}
                </p>
                <p className="font-display text-2xl sm:text-3xl font-bold text-gold-gradient">
                  {formatTry(SALARY_RANGE.max, locale)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-silver/70 text-sm leading-relaxed border-t border-white/10 pt-6">
            {t("salaryDisclaimer")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-silver text-sm mb-6 flex items-center justify-center gap-2">
            <MapPin size={16} className="text-gold" />
            {t("salaryCityExamples")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SALARY_EXAMPLES.map((item, index) => {
              const { left, width } = rangePercent(item.min, item.max);
              return (
                <motion.div
                  key={item.city}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-5 hover:border-gold/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-semibold text-foreground">
                      {item.city}
                    </span>
                    <span className="text-gold text-sm font-medium">
                      {formatTry(item.min, locale)} – {formatTry(item.max, locale)}
                    </span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/5">
                    <div
                      className="absolute top-0 h-full rounded-full bg-gold/40"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                  <p className="text-silver/50 text-xs mt-2">{t("salaryRangeLabel")}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
