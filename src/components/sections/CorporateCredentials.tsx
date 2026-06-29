"use client";

import { Building2, ExternalLink, FileCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  TaxCertificateModal,
  TaxCertificatePreview,
  useTaxCertificateModal,
} from "@/components/ui/TaxCertificateViewer";
import { COMPANY_LEGAL, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const INFO_ROWS = [
  { key: "corporateOwner", value: COMPANY_LEGAL.ownerName, icon: Building2 },
  { key: "corporateTaxOffice", value: COMPANY_LEGAL.taxOffice, icon: FileCheck },
  { key: "corporateTaxId", value: COMPANY_LEGAL.taxId, icon: FileCheck },
  { key: "corporateAddress", value: SITE_CONFIG.address, icon: MapPin },
] as const;

export function CorporateCredentials() {
  const { t } = useLanguage();
  const modal = useTaxCertificateModal();

  return (
    <section
      id="kurumsal-bilgiler"
      className="mb-20 scroll-mt-28"
      aria-labelledby="corporate-heading"
    >
      <div className="text-center mb-10">
        <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
          {t("corporateBadge")}
        </span>
        <h2
          id="corporate-heading"
          className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-4"
        >
          {t("corporateTitle")}
        </h2>
        <p className="text-silver max-w-2xl mx-auto leading-relaxed">
          {t("corporateDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-5">
          <ul className="space-y-4">
            {INFO_ROWS.map(({ key, value, icon: Icon }) => (
              <li key={key} className="flex items-start gap-3 text-sm sm:text-base">
                <Icon size={18} className="text-gold shrink-0 mt-0.5" aria-hidden />
                <div>
                  <p className="text-silver/70 text-xs uppercase tracking-wide mb-1">
                    {t(key)}
                  </p>
                  <p className="text-foreground">{value}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-white/10">
            <p className="text-silver/70 text-xs uppercase tracking-wide mb-2">
              {t("corporateActivity")}
            </p>
            <p className="text-silver text-sm leading-relaxed">
              <span className="text-gold font-medium">{COMPANY_LEGAL.activityCode}</span>
              {" — "}
              {COMPANY_LEGAL.activityName}
            </p>
            <p className="text-silver/60 text-xs mt-3">
              {t("corporateSince")}: {COMPANY_LEGAL.businessStartDate}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="button" onClick={modal.open}>
              {t("corporateInspect")}
            </Button>
            <a
              href={COMPANY_LEGAL.taxVerificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-gold hover:text-gold/80 text-sm transition-colors px-4 py-2"
            >
              {t("corporateVerifyLink")}
              <ExternalLink size={14} aria-hidden />
            </a>
          </div>
        </div>

        <figure className="glass rounded-3xl p-4 sm:p-6">
          <TaxCertificatePreview featured onOpen={modal.open} />
          <figcaption className="text-center text-silver/60 text-xs mt-4">
            {t("corporateCertificateCaption")}
          </figcaption>
        </figure>
      </div>

      <TaxCertificateModal isOpen={modal.isOpen} onClose={modal.close} />
    </section>
  );
}
