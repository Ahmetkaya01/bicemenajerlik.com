"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { COMPANY_LEGAL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function HeroTrustBadge() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mb-6"
    >
      <Link
        href="/#kurumsal"
        className="group inline-flex flex-wrap items-center gap-3 rounded-2xl border border-gold/25 bg-gold/[0.07] px-4 py-3 hover:border-gold/45 hover:bg-gold/10 transition-all"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 shrink-0">
          <ShieldCheck className="text-gold" size={20} aria-hidden />
        </div>
        <div className="text-left min-w-0">
          <p className="text-foreground text-sm font-semibold leading-tight">
            {t("corporateHeroBadge")}
          </p>
          <p className="text-silver/70 text-xs mt-0.5">
            {t("footerTaxId")}: {COMPANY_LEGAL.taxId}
          </p>
        </div>
        <span className="text-gold text-xs font-semibold tracking-wide uppercase ml-auto sm:ml-0 group-hover:underline underline-offset-4">
          {t("corporateHeroBadgeCta")} →
        </span>
      </Link>
    </motion.div>
  );
}
