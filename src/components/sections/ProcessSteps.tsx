"use client";

import { motion } from "framer-motion";
import { FileText, Search, Briefcase } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STEPS = [
  { icon: FileText, num: "01", titleKey: "processStep1Title", descKey: "processStep1Desc" },
  { icon: Search, num: "02", titleKey: "processStep2Title", descKey: "processStep2Desc" },
  { icon: Briefcase, num: "03", titleKey: "processStep3Title", descKey: "processStep3Desc" },
] as const;

export function ProcessSteps() {
  const { t } = useLanguage();

  return (
    <section id="nasil-calisir" className="section-alt py-20 sm:py-24 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("processBadge")}
          title={
            <>
              {t("processTitle1")}{" "}
              <span className="text-gold-gradient">{t("processTitle2")}</span>
            </>
          }
          description={t("processDesc")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative glass rounded-2xl p-8 text-center group hover:border-gold/25 transition-colors"
              >
                <span className="absolute top-4 right-4 font-display text-4xl font-bold text-white/5 group-hover:text-gold/10 transition-colors">
                  {step.num}
                </span>
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon size={26} className="text-gold" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-silver text-sm leading-relaxed">
                  {t(step.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
