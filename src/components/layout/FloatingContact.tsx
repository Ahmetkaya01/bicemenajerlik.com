"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const items = [
  {
    id: "phone",
    href: `tel:${SITE_CONFIG.phoneRaw}`,
    labelKey: "contactPhone" as const,
    icon: Phone,
    className:
      "bg-gradient-to-br from-gold to-amber-600 text-night shadow-lg shadow-gold/30 hover:shadow-gold/50",
  },
  {
    id: "whatsapp",
    href: `https://wa.me/${SITE_CONFIG.whatsapp}`,
    labelKey: "whatsapp" as const,
    icon: MessageCircle,
    className:
      "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/45 ring-2 ring-gold/20",
    external: true,
  },
];

export function FloatingContact() {
  const { t } = useLanguage();

  return (
    <div
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40 flex flex-col gap-3"
      aria-label={t("footerContact")}
    >
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, scale: 0.8, x: 16 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t(item.labelKey)}
            className={`group relative flex h-14 w-14 items-center justify-center rounded-full transition-shadow duration-300 ${item.className}`}
          >
            <Icon size={26} strokeWidth={2} aria-hidden />
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg glass px-3 py-1.5 text-xs font-medium text-silver opacity-0 transition-opacity group-hover:opacity-100 sm:block">
              {t(item.labelKey)}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
