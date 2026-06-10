"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQ_ITEMS } from "@/lib/faq";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FAQ() {
  const { t, locale } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = FAQ_ITEMS[locale];

  return (
    <section id="sss" className="py-20 sm:py-24" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t("faqBadge")}
          title={
            <span id="faq-heading">
              {t("faqTitle1")}{" "}
              <span className="text-gold-gradient">{t("faqTitle2")}</span>
            </span>
          }
          description={t("faqDesc")}
        />

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-gold/25 bg-gold/[0.04]"
                    : "border-white/5 bg-white/[0.02] hover:border-white/10"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`font-heading font-semibold text-sm sm:text-base ${
                        isOpen ? "text-gold" : "text-foreground"
                      }`}
                    >
                      {item.question}
                    </span>
                    <ChevronDown
                      size={18}
                      aria-hidden
                      className={`shrink-0 text-gold transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-silver text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
