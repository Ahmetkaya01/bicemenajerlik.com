"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  TaxCertificateModal,
  TaxCertificatePreview,
  useTaxCertificateModal,
} from "@/components/ui/TaxCertificateViewer";
import { COMPANY_LEGAL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const TRUST_BADGES = [
  { key: "corporateBadgeRegistered", icon: ShieldCheck },
  { key: "corporateBadgeSince", icon: BadgeCheck },
  { key: "corporateBadgeAgency", icon: Building2 },
  { key: "corporateBadgeTaxId", icon: FileCheck },
] as const;

export function CorporateTrustSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const modal = useTaxCertificateModal();

  return (
    <section
      id="kurumsal"
      ref={ref}
      className="py-20 sm:py-28 scroll-mt-24 relative overflow-hidden"
      aria-labelledby="corporate-trust-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,48rem)] h-64 bg-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-gold text-xs font-heading font-semibold tracking-widest uppercase mb-4">
              <Stamp size={14} aria-hidden />
              {t("corporateBadge")}
            </span>
            <h2
              id="corporate-trust-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight"
            >
              {t("corporateTrustTitle")}
            </h2>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              {t("corporateTrustSubtitle")}
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/5 px-5 py-4 lg:min-w-[220px]">
            <div>
              <p className="text-gold/80 text-[10px] font-heading font-bold tracking-widest uppercase">
                {t("footerTaxId")}
              </p>
              <p className="font-mono text-xl sm:text-2xl font-bold text-foreground tracking-wider">
                {COMPANY_LEGAL.taxId}
              </p>
            </div>
            <ShieldCheck className="text-gold/60 shrink-0" size={32} strokeWidth={1.5} aria-hidden />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="glass rounded-[2rem] p-5 sm:p-8 lg:p-10 border border-gold/15"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,380px)_1fr] gap-8 lg:gap-14 items-center">
            <div className="mx-auto w-full max-w-sm lg:max-w-none">
              <TaxCertificatePreview featured onOpen={modal.open} />
              <p className="text-center text-silver/50 text-xs mt-4 flex items-center justify-center gap-1.5">
                <ZoomHint />
                {t("corporateTapToView")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUST_BADGES.map(({ key, icon: Icon }, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.15 + index * 0.06 }}
                    className="flex items-start gap-3 rounded-2xl bg-white/[0.04] border border-white/8 px-4 py-3.5 hover:border-gold/20 transition-colors"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold/10">
                      <Icon className="text-gold" size={17} aria-hidden />
                    </div>
                    <p className="text-sm text-foreground leading-snug pt-1">{t(key)}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
                <p className="text-xs font-heading font-semibold tracking-wide text-silver/60 uppercase">
                  {t("corporateQuickCheck")}
                </p>
                <ul className="space-y-2 text-sm text-silver">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    {t("corporateCheck1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    {t("corporateCheck2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                    {t("corporateCheck3")}
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button type="button" size="lg" onClick={modal.open} className="sm:flex-1">
                  {t("corporateInspect")}
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href="/hakkimizda#kurumsal-bilgiler"
                  variant="outline"
                  size="lg"
                  className="sm:flex-1"
                >
                  {t("corporateFullDetails")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35 }}
          className="text-center mt-6"
        >
          <Link
            href={COMPANY_LEGAL.taxVerificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-silver/50 hover:text-gold text-xs transition-colors underline-offset-4 hover:underline"
          >
            {t("corporateVerifyLink")}
          </Link>
        </motion.p>
      </div>

      <TaxCertificateModal isOpen={modal.isOpen} onClose={modal.close} />
    </section>
  );
}

function ZoomHint() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold/70" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 8V14M8 11H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
