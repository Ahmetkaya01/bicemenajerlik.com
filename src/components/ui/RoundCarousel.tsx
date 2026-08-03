"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

interface RoundCarouselProps {
  items: ReactNode[];
  itemWidth?: number;
  itemHeight?: number;
  spacing?: number;
  speed?: number;
  direction?: "right" | "left";
  drag?: boolean;
  sensitivity?: number;
  tilt?: number;
  perspective?: number;
  cornerRadius?: number;
  background?: string;
  className?: string;
  style?: CSSProperties;
}

export function RoundCarousel({
  items,
  itemWidth = 280,
  itemHeight = 320,
  spacing = 2.2,
  speed = 4.5,
  direction = "right",
  drag = true,
  sensitivity = 5,
  tilt = -8,
  perspective = 2800,
  cornerRadius = 20,
  background = "transparent",
  className = "",
  style = {},
}: RoundCarouselProps) {
  const count = items.length;
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const rotYRef = useRef(0);
  const velRef = useRef(0);
  const lastRef = useRef(0);
  const dragRef = useRef({ active: false, x: 0, moved: false });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthMq = window.matchMedia("(max-width: 640px)");
    const sync = () => {
      setReduceMotion(motionMq.matches);
      setIsMobile(widthMq.matches);
    };
    sync();
    motionMq.addEventListener("change", sync);
    widthMq.addEventListener("change", sync);
    return () => {
      motionMq.removeEventListener("change", sync);
      widthMq.removeEventListener("change", sync);
    };
  }, []);

  const width = isMobile ? Math.min(itemWidth, 240) : itemWidth;
  const height = isMobile ? Math.min(itemHeight, 300) : itemHeight;
  const angle = count > 0 ? 360 / count : 0;
  const factor = 1 + spacing * 0.15;
  const radius =
    count > 2 ? (width * factor) / (2 * Math.tan(Math.PI / count)) : width;
  const degPerSec = speed * 6 * (direction === "left" ? -1 : 1);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || count < 3 || reduceMotion) return;

    const apply = () => {
      ring.style.transform = `translateZ(${-radius}px) rotateY(${rotYRef.current}deg)`;
    };
    apply();

    const draw = (now: number) => {
      const dt = lastRef.current ? (now - lastRef.current) / 1000 : 0;
      lastRef.current = now;
      const f = Math.min(dt, 0.1);
      const d = dragRef.current;
      if (!d.active) {
        if (Math.abs(velRef.current) > 0.01) {
          rotYRef.current += velRef.current * f;
          velRef.current *= 0.94;
        } else {
          rotYRef.current += degPerSec * f;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [radius, degPerSec, count, reduceMotion]);

  const onPointerDown = (e: ReactPointerEvent) => {
    if (!drag || reduceMotion) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragRef.current = { active: true, x: e.clientX, moved: false };
    velRef.current = 0;
  };

  const onPointerMove = (e: ReactPointerEvent) => {
    const d = dragRef.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    d.x = e.clientX;
    if (Math.abs(dx) > 2) d.moved = true;
    const k = 0.3 * sensitivity;
    rotYRef.current += dx * k;
    velRef.current = dx * k * 60;
  };

  const onPointerUp = (e: ReactPointerEvent) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    dragRef.current.active = false;
  };

  if (count === 0) return null;

  if (count < 3 || reduceMotion) {
    return (
      <div
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-1 ${className}`}
        style={style}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="snap-center shrink-0"
            style={{ width, minHeight: height }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        ...style,
        width: "100%",
        height: Math.max(height + 96, isMobile ? 360 : 420),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background,
        perspective: `${isMobile ? 1800 : perspective}px`,
        cursor: drag ? "grab" : "default",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: "relative",
            width,
            height,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="h-full w-full overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                style={{
                  borderRadius: cornerRadius,
                  backfaceVisibility: "hidden",
                }}
                onClickCapture={(e) => {
                  if (dragRef.current.moved) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {item}
              </div>
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: cornerRadius,
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(160deg, #0f172a 0%, #0a0a0f 100%)",
                  filter: "brightness(0.35)",
                  boxShadow: "inset 0 0 0 1px rgba(251,191,36,0.08)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
