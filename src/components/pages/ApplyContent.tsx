"use client";

import { useState } from "react";
import { ApplicationForm } from "@/components/form/ApplicationForm";
import { QuickApplyForm } from "@/components/form/QuickApplyForm";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ApplyContent() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"quick" | "full">("quick");

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("applyBadge")}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-4">
            {t("applyTitle1")}{" "}
            <span className="text-gold-gradient">{t("applyTitle2")}</span>
          </h1>
          <p className="text-silver">{t("applyDesc")}</p>
        </header>

        <div className="flex rounded-full glass p-1 mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => setTab("quick")}
            className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
              tab === "quick" ? "gold-gradient text-night" : "text-silver hover:text-gold"
            }`}
          >
            {t("quickApplyTab")}
          </button>
          <button
            type="button"
            onClick={() => setTab("full")}
            className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
              tab === "full" ? "gold-gradient text-night" : "text-silver hover:text-gold"
            }`}
          >
            {t("fullApplyTab")}
          </button>
        </div>

        {tab === "quick" ? (
          <QuickApplyForm />
        ) : (
          <section className="glass rounded-3xl p-6 sm:p-10" aria-label={t("applicationForm")}>
            <ApplicationForm />
          </section>
        )}
      </div>
    </article>
  );
}
