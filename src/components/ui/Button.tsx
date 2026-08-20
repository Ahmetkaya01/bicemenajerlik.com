"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  /** Opt out of Next Link prefetch (e.g. heavy /basvuru form + zod). */
  prefetch?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "gold-gradient text-night font-semibold shadow-lg shadow-gold/20 hover:shadow-gold/40",
  secondary:
    "bg-accent-purple/20 text-accent-purple border border-accent-purple/30 hover:bg-accent-purple/30",
  outline:
    "border border-gold/40 text-gold hover:bg-gold/10 hover:border-gold/60",
  ghost: "text-silver hover:text-gold hover:bg-white/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2.5 text-sm",
  md: "min-h-11 px-6 py-3 text-base",
  lg: "min-h-12 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg",
};

function shouldPrefetch(href: string, prefetch?: boolean) {
  if (prefetch !== undefined) return prefetch;
  // Application form pulls zod + react-hook-form; keep off the home critical path.
  if (href === "/basvuru" || href.startsWith("/basvuru?")) return false;
  return undefined;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  className = "",
  prefetch,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-transform duration-200 [@media(hover:hover)]:hover:scale-[1.03] active:scale-[0.98] touch-manipulation ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed [@media(hover:hover)]:hover:scale-100 active:scale-100" : ""} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    const handleClick = () => onClick?.();

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={classes}
        prefetch={shouldPrefetch(href, prefetch)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
