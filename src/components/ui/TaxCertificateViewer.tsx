"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { COMPANY_LEGAL, SITE_CONFIG } from "@/lib/constants";
import { IMAGE_ALTS } from "@/lib/image-placeholders";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface TaxCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZOOM_LEVELS = [1, 1.25, 1.5] as const;

export function TaxCertificateModal({ isOpen, onClose }: TaxCertificateModalProps) {
  const { t } = useLanguage();
  const [zoomIndex, setZoomIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const zoom = ZOOM_LEVELS[zoomIndex];

  useEffect(() => {
    if (!isOpen) {
      setZoomIndex(0);
      setCopied(false);
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  const copyTaxId = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_LEGAL.taxId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tax-certificate-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
        >
          <motion.button
            type="button"
            aria-label={t("close")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 flex h-[96dvh] sm:h-auto w-full sm:max-w-4xl sm:max-h-[92vh] flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-gold/25 bg-night shadow-2xl shadow-gold/10"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-5 py-3.5 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 shrink-0">
                  <ShieldCheck className="text-gold" size={20} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3
                    id="tax-certificate-modal-title"
                    className="font-heading font-semibold text-foreground text-sm sm:text-base truncate"
                  >
                    {t("corporateModalTitle")}
                  </h3>
                  <p className="text-silver/60 text-xs truncate">
                    {COMPANY_LEGAL.taxOffice} · {COMPANY_LEGAL.businessStartDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setZoomIndex((i) => Math.max(0, i - 1))}
                  disabled={zoomIndex === 0}
                  className="p-2 rounded-full text-silver hover:text-foreground hover:bg-white/10 disabled:opacity-30 transition-colors"
                  aria-label={t("corporateZoomOut")}
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setZoomIndex((i) => Math.min(ZOOM_LEVELS.length - 1, i + 1))
                  }
                  disabled={zoomIndex === ZOOM_LEVELS.length - 1}
                  className="p-2 rounded-full text-silver hover:text-foreground hover:bg-white/10 disabled:opacity-30 transition-colors"
                  aria-label={t("corporateZoomIn")}
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full text-silver hover:text-foreground hover:bg-white/10 transition-colors"
                  aria-label={t("close")}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-6">
              <div className="overflow-auto rounded-2xl border border-white/10 bg-white">
                <div
                  className="relative mx-auto transition-transform duration-300 ease-out"
                  style={{
                    width: `${zoom * 100}%`,
                    maxWidth: zoom > 1 ? "none" : "100%",
                  }}
                >
                  <div className="relative aspect-[3/4] w-full min-h-[280px]">
                    <Image
                      src={COMPANY_LEGAL.taxCertificateImage}
                      alt={IMAGE_ALTS.taxCertificate}
                      fill
                      sizes="(max-width: 768px) 100vw, 900px"
                      className="object-contain p-3 sm:p-4"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 sm:col-span-1">
                  <p className="text-silver/60 text-xs mb-1">{t("corporateOwner")}</p>
                  <p className="text-foreground font-medium">{COMPANY_LEGAL.ownerName}</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 sm:col-span-1">
                  <p className="text-silver/60 text-xs mb-1">{t("corporateTaxId")}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-foreground font-mono font-semibold tracking-wide">
                      {COMPANY_LEGAL.taxId}
                    </p>
                    <button
                      type="button"
                      onClick={copyTaxId}
                      className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors shrink-0"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? t("corporateCopied") : t("corporateCopyTaxId")}
                    </button>
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3 sm:col-span-1">
                  <p className="text-silver/60 text-xs mb-1">{t("corporateAddress")}</p>
                  <p className="text-foreground">{SITE_CONFIG.address}</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-2 border-t border-white/10 p-4 sm:px-6 sm:py-4 bg-night/80">
              <a
                href={COMPANY_LEGAL.taxCertificateImage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gold/30 px-4 py-3 text-sm font-medium text-gold hover:bg-gold/10 transition-colors"
              >
                {t("corporateOpenFull")}
                <ExternalLink size={14} aria-hidden />
              </a>
              <a
                href={COMPANY_LEGAL.taxVerificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gold-gradient px-4 py-3 text-sm font-semibold text-night transition-opacity hover:opacity-90"
              >
                {t("corporateVerifyLink")}
                <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface TaxCertificatePreviewProps {
  className?: string;
  featured?: boolean;
  onOpen?: () => void;
}

export function TaxCertificatePreview({
  className = "",
  featured = false,
  onOpen,
}: TaxCertificatePreviewProps) {
  const { t } = useLanguage();
  const [internalOpen, setInternalOpen] = useState(false);
  const usesExternalModal = Boolean(onOpen);

  const openModal = useCallback(() => {
    if (onOpen) onOpen();
    else setInternalOpen(true);
  }, [onOpen]);

  const closeModal = useCallback(() => setInternalOpen(false), []);

  return (
    <>
      <div className={`relative ${className}`}>
        {featured && (
          <>
            <div className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br from-gold/20 via-transparent to-gold/10 blur-xl" />
            <div className="pointer-events-none absolute -top-3 -right-3 z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/50 bg-night/90 shadow-lg shadow-gold/20">
              <div className="text-center leading-tight">
                <ShieldCheck className="text-gold mx-auto mb-0.5" size={16} aria-hidden />
                <span className="block text-[9px] font-bold tracking-widest text-gold uppercase">
                  {t("corporateVerifiedSeal")}
                </span>
              </div>
            </div>
          </>
        )}

        <button
          type="button"
          onClick={openModal}
          className={`group relative w-full overflow-hidden rounded-2xl border bg-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${
            featured
              ? "border-gold/30 shadow-2xl shadow-gold/15"
              : "border-white/10 hover:border-gold/40"
          }`}
          aria-label={t("corporateInspect")}
        >
          <div className={`relative w-full ${featured ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[3/4]"}`}>
            <Image
              src={COMPANY_LEGAL.taxCertificateImage}
              alt={IMAGE_ALTS.taxCertificate}
              fill
              loading="lazy"
              sizes={featured ? "(max-width: 768px) 90vw, 400px" : "(max-width: 768px) 100vw, 360px"}
              className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/95 via-night/70 to-transparent px-4 pt-10 pb-4">
              <div className="flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-night/80 px-4 py-2.5 text-sm font-medium text-foreground backdrop-blur-sm group-hover:border-gold/60 group-hover:bg-gold/10 transition-colors">
                <ZoomIn size={16} className="text-gold shrink-0" aria-hidden />
                {t("corporateInspect")}
              </div>
            </div>
          </div>
        </button>
      </div>

      {!usesExternalModal && (
        <TaxCertificateModal isOpen={internalOpen} onClose={closeModal} />
      )}
    </>
  );
}

export function useTaxCertificateModal() {
  const [isOpen, setIsOpen] = useState(false);
  return {
    isOpen,
    open: useCallback(() => setIsOpen(true), []),
    close: useCallback(() => setIsOpen(false), []),
  };
}
