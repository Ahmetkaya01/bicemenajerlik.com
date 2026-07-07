"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { buildQuickApplyWhatsAppMessage, getWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function QuickApplyForm() {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !phone.trim() || !city.trim()) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!consent) {
      setError(t("valConsent"));
      return;
    }
    setError("");
    trackEvent("quick_apply_submit", { city });
    const url = getWhatsAppUrl(
      buildQuickApplyWhatsAppMessage({ firstName: firstName.trim(), phone: phone.trim(), city: city.trim() })
    );
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const inputClass =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-foreground placeholder:text-silver/40 focus:border-gold/50 focus:outline-none transition-colors";

  return (
    <div className="glass rounded-2xl p-6 border border-gold/15">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
        {t("quickApplyTitle")}
      </h3>
      <p className="text-silver text-sm mb-5">{t("quickApplyDesc")}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t("firstName")}
          className={inputClass}
          autoComplete="given-name"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("placeholderPhone")}
          className={inputClass}
          autoComplete="tel"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("placeholderCity")}
          className={inputClass}
          autoComplete="address-level2"
        />
        <label className="flex items-start gap-3 text-sm text-silver cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 accent-gold"
          />
          <span>{t("consent")}</span>
        </label>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:bg-[#20bd5a] transition-colors"
        >
          <MessageCircle size={18} />
          {t("quickApplySubmit")}
        </button>
      </form>
    </div>
  );
}
