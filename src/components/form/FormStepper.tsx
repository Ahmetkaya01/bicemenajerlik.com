"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const STEP_KEYS = ["stepPersonal", "stepExperience", "stepPhoto"] as const;

interface FormStepperProps {
  currentStep: number;
}

export function FormStepper({ currentStep }: FormStepperProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {STEP_KEYS.map((key, index) => {
          const stepNumber = index + 1;
          return (
            <div
              key={key}
              className="flex items-center flex-1 last:flex-none"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentStep === stepNumber ? 1.1 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep >= stepNumber
                      ? "border-gold text-gold bg-gold/20"
                      : "border-white/20 text-silver bg-white/5"
                  }`}
                >
                  {currentStep > stepNumber ? (
                    <Check size={18} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </motion.div>
                <span
                  className={`text-xs mt-2 hidden sm:block text-center max-w-[80px] ${
                    currentStep >= stepNumber ? "text-gold" : "text-silver/60"
                  }`}
                >
                  {t(key)}
                </span>
              </div>
              {index < STEP_KEYS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 sm:mx-4 bg-white/10 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gold"
                    initial={{ width: "0%" }}
                    animate={{
                      width: currentStep > stepNumber ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
