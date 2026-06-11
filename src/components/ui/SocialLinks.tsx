"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M17.53 3H20.5l-6.77 7.74L21.5 21h-6.18l-4.84-5.73L4.47 21H1.5l7.24-8.28L2.5 3h6.32l4.38 5.18L17.53 3zm-1.08 16.2h1.72L7.82 4.77H6.01l10.44 14.43z" />
    </svg>
  );
}

const ICONS = {
  instagram: InstagramIcon,
  x: XIcon,
} as const;

interface SocialLinksProps {
  variant?: "icons" | "list";
  className?: string;
}

export function SocialLinks({ variant = "icons", className = "" }: SocialLinksProps) {
  const { t } = useLanguage();

  if (variant === "list") {
    return (
      <ul className={`space-y-3 ${className}`}>
        {SOCIAL_LINKS.map((link) => {
          const Icon = ICONS[link.id];
          return (
            <li key={link.id}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-silver text-sm hover:text-gold transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0 text-gold" />
                {t(link.labelKey)}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.id];
        return (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(link.labelKey)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-silver hover:border-gold/40 hover:text-gold transition-colors"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
