"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ContactContent() {
  const { t } = useLanguage();

  const contactItems = [
    {
      icon: Phone,
      title: t("contactPhone"),
      value: SITE_CONFIG.phone,
      href: `tel:${SITE_CONFIG.phoneRaw}`,
    },
    {
      icon: MessageCircle,
      title: t("contactWhatsappLabel"),
      value: t("contactWhatsappValue"),
      href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    },
    {
      icon: Mail,
      title: t("contactEmail"),
      value: SITE_CONFIG.email,
      href: `mailto:${SITE_CONFIG.email}`,
    },
    {
      icon: MapPin,
      title: t("contactRegion"),
      value: t("contactRegionValue"),
      href: undefined,
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("contactBadge")}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            {t("contactTitle1")}{" "}
            <span className="text-gold-gradient">{t("contactTitle2")}</span>
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            {t("contactIntro")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="glass rounded-2xl p-6 text-center h-full hover:border-gold/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{item.title}</h3>
                <p className="text-silver text-sm">{item.value}</p>
              </div>
            );

            return item.href ? (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="block"
              >
                {content}
              </a>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>

        <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("contactCtaTitle")}
          </h2>
          <p className="text-silver mb-8">{t("contactCtaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/basvuru" size="lg">
              {t("applicationForm")}
            </Button>
            <Button
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              variant="outline"
              size="lg"
            >
              {t("whatsapp")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
