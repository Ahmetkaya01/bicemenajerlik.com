"use client";

import Image from "next/image";
import { CorporateCredentials } from "@/components/sections/CorporateCredentials";
import { Button } from "@/components/ui/Button";
import { IMAGE_ALTS } from "@/lib/image-placeholders";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import aboutPhoto from "../../../public/images/about.jpg";

function HighlightBrand({ text }: { text: string }) {
  const brand = "Bice Menajerlik";
  const index = text.indexOf(brand);
  if (index < 0) {
    return text;
  }

  return (
    <>
      {text.slice(0, index)}
      <span className="text-gold-gradient">{brand}</span>
      {text.slice(index + brand.length)}
    </>
  );
}

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
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
        </header>

        <section
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          aria-labelledby="about-mission-heading"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={aboutPhoto}
              alt={IMAGE_ALTS.about}
              fill
              loading="lazy"
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="space-y-6">
            <h2
              id="about-mission-heading"
              className="font-display text-2xl sm:text-3xl font-bold"
            >
              {t("aboutMissionTitle")}
            </h2>
            <p className="text-silver leading-relaxed">{t("aboutMission")}</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              {t("aboutWhyTitle")}
            </h3>
            <p className="text-silver leading-relaxed">
              {t("aboutWhy")}
            </p>
          </div>
        </section>

        <CorporateCredentials />

        <section
          id="aile"
          className="mb-20 scroll-mt-24"
          aria-labelledby="about-family-heading"
        >
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-heading font-semibold tracking-widest uppercase">
              {t("aboutFamilyBadge")}
            </span>
            <h2
              id="about-family-heading"
              className="font-display text-2xl sm:text-3xl font-bold mt-4 leading-snug max-w-3xl mx-auto"
            >
              <HighlightBrand text={t("aboutFamilyTitle")} />
            </h2>
          </div>

          <div className="glass rounded-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-16">
            <div className="max-w-3xl mx-auto text-center space-y-5 text-silver leading-relaxed text-base sm:text-lg">
              <p>{t("aboutFamilyP1")}</p>
              <p>{t("aboutFamilyP2")}</p>
              <p>{t("aboutFamilyP3")}</p>
              <p>{t("aboutFamilyP4")}</p>
              <p>{t("aboutFamilyP5")}</p>
              <p>{t("aboutFamilyP6")}</p>
              <div
                className="mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
                aria-hidden="true"
              />
              <p className="text-foreground font-medium">
                {t("aboutFamilyClosing1")}
              </p>
              <p className="text-foreground font-medium">
                {t("aboutFamilyClosing2")}
              </p>
            </div>
          </div>
        </section>

        <section className="glass rounded-3xl p-8 sm:p-12 text-center" aria-labelledby="about-cta-heading">
          <h2
            id="about-cta-heading"
            className="font-display text-2xl sm:text-3xl font-bold mb-4"
          >
            {t("aboutCtaTitle")}
          </h2>
          <p className="text-silver mb-8 max-w-xl mx-auto">{t("aboutCtaDesc")}</p>
          <Button href="/basvuru" size="lg">
            {t("applyNow")}
          </Button>
        </section>
      </div>
    </article>
  );
}
