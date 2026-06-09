"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, MessageCircle } from "lucide-react";
import { Button } from "./Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryMethod: "email" | "whatsapp";
  whatsappUrl?: string;
  emailSent?: boolean;
}

export function SuccessModal({
  isOpen,
  onClose,
  deliveryMethod,
  whatsappUrl,
  emailSent = true,
}: SuccessModalProps) {
  const { t } = useLanguage();

  const message =
    deliveryMethod === "whatsapp" || !emailSent
      ? t("successWhatsapp")
      : t("successEmail");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass rounded-2xl p-8 max-w-md w-full text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-silver hover:text-gold transition-colors"
              aria-label={t("close")}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center"
            >
              <CheckCircle className="text-gold" size={36} />
            </motion.div>

            <h3 className="font-display text-2xl text-gold mb-3">
              {t("successTitle")}
            </h3>
            <p className="text-silver mb-6 leading-relaxed">{message}</p>

            <div className="flex flex-col gap-3">
              {whatsappUrl && (
                <Button href={whatsappUrl} variant="primary">
                  <MessageCircle size={18} />
                  {t("sendWhatsapp")}
                </Button>
              )}
              <Button onClick={onClose} variant="outline">
                {t("ok")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
