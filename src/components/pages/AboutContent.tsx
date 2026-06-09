"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
            {t("aboutBadge")}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-4 mb-6">
            {t("aboutTitle1")}{" "}
            <span className="text-gold-gradient">{t("aboutTitle2")}</span>{" "}
            {t("aboutTitle3")}
          </h1>
          <p className="text-silver text-lg max-w-3xl mx-auto leading-relaxed">
            {t("aboutIntro")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1571266028247-e4733b0f0bb0?w=800&q=80"
              alt="Bice Menajerlik"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              {t("aboutMissionTitle")}
            </h2>
            <p className="text-silver leading-relaxed">{t("aboutMission")}</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              {t("aboutWhyTitle")}
            </h2>
            <p className="text-silver leading-relaxed">
              {t("aboutWhy")}
            </p>
          </div>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            {t("aboutCtaTitle")}
          </h2>
          <p className="text-silver mb-8 max-w-xl mx-auto">{t("aboutCtaDesc")}</p>
          <Button href="/basvuru" size="lg">
            {t("applyNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
