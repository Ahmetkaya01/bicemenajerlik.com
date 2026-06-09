"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Mail, MessageCircle } from "lucide-react";
import { FormStepper } from "./FormStepper";
import { Button } from "@/components/ui/Button";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { getApplicationSchema, type ApplicationForm } from "@/lib/validations";
import { EXPERIENCE_AREA_KEYS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ApplicationForm() {
  const { t, locale } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | undefined>();
  const [successDelivery, setSuccessDelivery] = useState<"email" | "whatsapp">("email");
  const [emailSent, setEmailSent] = useState(true);

  const schema = useMemo(() => getApplicationSchema(locale), [locale]);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ApplicationForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      consent: undefined,
      deliveryMethod: "email",
    },
  });

  const consent = watch("consent");
  const deliveryMethod = watch("deliveryMethod");

  const nextStep = async () => {
    const fields =
      step === 1
        ? (["firstName", "lastName", "age", "city", "height"] as const)
        : step === 2
          ? (["experienceArea", "experience", "phone"] as const)
          : (["consent", "deliveryMethod"] as const);

    const valid = await trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setValue("photo", files);
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("age", String(data.age));
      formData.append("city", data.city);
      formData.append("height", String(data.height));
      formData.append("experienceArea", data.experienceArea);
      formData.append("experience", data.experience);
      formData.append("phone", data.phone);
      formData.append("deliveryMethod", data.deliveryMethod);
      formData.append("locale", locale);
      if (data.photo?.[0]) {
        formData.append("photo", data.photo[0]);
      }

      const response = await fetch("/api/basvuru", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error("Gönderim başarısız");

      setSuccessDelivery(
        result.fallbackToWhatsapp ? "whatsapp" : data.deliveryMethod
      );
      setEmailSent(
        data.deliveryMethod === "email" &&
          result.emailSent === true &&
          !result.fallbackToWhatsapp
      );
      setWhatsappUrl(result.whatsappUrl);

      if (data.deliveryMethod === "whatsapp" && result.whatsappUrl) {
        window.open(result.whatsappUrl, "_blank");
      }

      setShowSuccess(true);
      reset({ deliveryMethod: "email" });
      setStep(1);
      setPhotoPreview(null);
    } catch {
      alert(t("submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground placeholder:text-silver/40 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors";
  const labelClass = "block text-sm font-medium text-silver mb-2";
  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <>
      <FormStepper currentStep={step} />

      <form key={locale} onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{t("firstName")} *</label>
                  <input
                    {...register("firstName")}
                    className={inputClass}
                    placeholder={t("placeholderFirstName")}
                  />
                  {errors.firstName && (
                    <p className={errorClass}>{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t("lastName")} *</label>
                  <input
                    {...register("lastName")}
                    className={inputClass}
                    placeholder={t("placeholderLastName")}
                  />
                  {errors.lastName && (
                    <p className={errorClass}>{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>{t("age")} *</label>
                  <input
                    {...register("age", { valueAsNumber: true })}
                    type="number"
                    className={inputClass}
                    placeholder="18"
                    min={18}
                  />
                  {errors.age && (
                    <p className={errorClass}>{errors.age.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t("city")} *</label>
                  <input
                    {...register("city")}
                    className={inputClass}
                    placeholder={t("placeholderCity")}
                  />
                  {errors.city && (
                    <p className={errorClass}>{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>{t("height")} *</label>
                  <input
                    {...register("height", { valueAsNumber: true })}
                    type="number"
                    className={inputClass}
                    placeholder="170"
                    min={140}
                  />
                  {errors.height && (
                    <p className={errorClass}>{errors.height.message}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClass}>{t("experienceArea")} *</label>
                <select
                  {...register("experienceArea")}
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {t("selectOption")}
                  </option>
                  {EXPERIENCE_AREA_KEYS.map((key) => (
                    <option key={key} value={t(key)}>
                      {t(key)}
                    </option>
                  ))}
                </select>
                {errors.experienceArea && (
                  <p className={errorClass}>{errors.experienceArea.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>{t("phone")} *</label>
                <input
                  {...register("phone")}
                  type="tel"
                  className={inputClass}
                  placeholder={t("placeholderPhone")}
                />
                {errors.phone && (
                  <p className={errorClass}>{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>{t("experience")} *</label>
                <textarea
                  {...register("experience")}
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder={t("placeholderExperience")}
                />
                {errors.experience && (
                  <p className={errorClass}>{errors.experience.message}</p>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <label className={labelClass}>{t("photoUpload")}</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-gold/30 transition-colors">
                  {photoPreview ? (
                    <div className="relative w-40 h-40 mx-auto mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt={t("photoPreview")}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  ) : (
                    <p className="text-silver/60 mb-4">{t("photoHint")}</p>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    {...register("photo")}
                    onChange={(e) => {
                      register("photo").onChange(e);
                      handlePhotoChange(e);
                    }}
                    className="block w-full text-sm text-silver file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 file:cursor-pointer"
                  />
                </div>
                {errors.photo && (
                  <p className={errorClass}>
                    {typeof errors.photo.message === "string"
                      ? errors.photo.message
                      : t("valPhotoRequired")}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t("deliveryMethod")} *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-colors ${
                      deliveryMethod === "email"
                        ? "border-gold/50 bg-gold/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="email"
                        {...register("deliveryMethod")}
                        className="text-gold"
                      />
                      <Mail size={18} className="text-gold" />
                      <span className="font-medium text-sm">
                        {t("deliveryEmail")}
                      </span>
                    </div>
                    <span className="text-silver/60 text-xs pl-6">
                      {t("deliveryEmailDesc")}
                    </span>
                  </label>
                  <label
                    className={`flex flex-col gap-2 p-4 rounded-xl border cursor-pointer transition-colors ${
                      deliveryMethod === "whatsapp"
                        ? "border-gold/50 bg-gold/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        value="whatsapp"
                        {...register("deliveryMethod")}
                        className="text-gold"
                      />
                      <MessageCircle size={18} className="text-gold" />
                      <span className="font-medium text-sm">
                        {t("deliveryWhatsapp")}
                      </span>
                    </div>
                    <span className="text-silver/60 text-xs pl-6">
                      {t("deliveryWhatsappDesc")}
                    </span>
                  </label>
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold/30"
                />
                <span className="text-silver text-sm leading-relaxed">
                  {t("consent")} *
                </span>
              </label>
              {errors.consent && (
                <p className={errorClass}>{errors.consent.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep}>
              <ArrowLeft size={18} />
              {t("back")}
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button type="button" onClick={nextStep}>
              {t("next")}
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || !consent}>
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t("submitting")}
                </>
              ) : (
                t("submitApplication")
              )}
            </Button>
          )}
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        deliveryMethod={successDelivery}
        whatsappUrl={whatsappUrl}
        emailSent={emailSent}
      />
    </>
  );
}
