"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { getMarketingWhatsAppUrl } from "@/lib/whatsapp";

export function CTA() {
  const { t } = useLanguage();
  const whatsappUrl = getMarketingWhatsAppUrl();

  return (
    <section className="py-20 sm:py-24 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 shimmer-border opacity-20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-14">
            <div>
              <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
                {t("ctaBadge")}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-4 leading-tight">
                {t("ctaTitle1")}{" "}
                <span className="text-gold-gradient">{t("ctaTitle2")}</span>
              </h2>
              <p className="text-silver text-lg mb-6 max-w-md">{t("ctaDesc")}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href="/basvuru" size="lg">
                  {t("applicationForm")}
                  <ArrowRight size={20} />
                </Button>
                <Button href={whatsappUrl} variant="outline" size="lg">
                  {t("whatsapp")}
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-silver/60 text-xs uppercase tracking-wider mb-0.5">
                    {t("contactPhone")}
                  </p>
                  <p className="font-medium text-foreground">{SITE_CONFIG.phone}</p>
                </div>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-gold/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MessageCircle size={22} className="text-gold" />
                </div>
                <div>
                  <p className="text-silver/60 text-xs uppercase tracking-wider mb-0.5">
                    {t("contactWhatsappLabel")}
                  </p>
                  <p className="font-medium text-foreground">
                    {t("contactWhatsappValue")}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
