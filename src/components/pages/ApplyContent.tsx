"use client";

import { ApplicationForm } from "@/components/form/ApplicationForm";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ApplyContent() {
  const { t } = useLanguage();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("applyBadge")}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-4">
            {t("applyTitle1")}{" "}
            <span className="text-gold-gradient">{t("applyTitle2")}</span>
          </h1>
          <p className="text-silver">{t("applyDesc")}</p>
        </header>

        <section className="glass rounded-3xl p-6 sm:p-10" aria-label={t("applicationForm")}>
          <ApplicationForm />
        </section>
      </div>
    </article>
  );
}
