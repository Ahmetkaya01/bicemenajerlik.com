import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-14 max-w-3xl ${alignClass}`}>
      <span className="inline-block text-gold text-sm font-heading font-semibold tracking-widest uppercase">
        {badge}
      </span>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-5 leading-tight">
        {title}
      </h2>
      {description ? (
        <p
          className={`text-silver text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
