type LogoSize = "sm" | "md" | "lg";

const sizeStyles: Record<
  LogoSize,
  { brand: string; sub: string; divider: string }
> = {
  sm: {
    brand: "text-base tracking-[0.14em]",
    sub: "text-[10px] tracking-[0.3em] mt-0.5",
    divider: "w-6 my-0.5",
  },
  md: {
    brand: "text-xl sm:text-2xl tracking-[0.16em]",
    sub: "text-[11px] sm:text-xs tracking-[0.38em] mt-1",
    divider: "w-8 sm:w-10 my-1",
  },
  lg: {
    brand: "text-3xl sm:text-4xl tracking-[0.14em]",
    sub: "text-sm tracking-[0.42em] mt-1.5",
    divider: "w-12 my-1.5",
  },
};

export function Logo({
  size = "md",
  showDivider = true,
}: {
  size?: LogoSize;
  showDivider?: boolean;
}) {
  const styles = sizeStyles[size];

  return (
    <span className="inline-flex flex-col items-start leading-none select-none">
      <span
        className={`font-logo font-semibold text-gold-gradient uppercase ${styles.brand}`}
      >
        Bice
      </span>
      {showDivider && (
        <span
          className={`h-px bg-gradient-to-r from-gold/80 via-gold/30 to-transparent ${styles.divider}`}
          aria-hidden
        />
      )}
      <span
        className={`font-logo-sub font-medium italic text-silver uppercase ${styles.sub}`}
      >
        Menajerlik
      </span>
    </span>
  );
}
