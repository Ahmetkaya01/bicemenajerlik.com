"use client";

import { motion } from "framer-motion";
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
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full transition-all duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        ) : (
          <Link href={href} className={classes}>
            {children}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
