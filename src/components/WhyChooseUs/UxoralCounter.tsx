"use client";

import { useEffect, useRef, useState } from "react";

function parseStatValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] ?? "" };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function countDuration(target: number) {
  if (target >= 10000) return 2600;
  if (target >= 1000) return 2200;
  if (target >= 100) return 1800;
  return 1400;
}

type UxoralCounterProps = {
  value: string;
  label: React.ReactNode;
  labelClassName?: string;
  light?: boolean;
};

export default function UxoralCounter({
  value,
  label,
  labelClassName = "fontSizeSmLemongrass missionStatLabel",
  light = false,
}: UxoralCounterProps) {
  const { target, suffix } = parseStatValue(value);
  const rootRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || hasAnimated.current) return;

    const startAnimation = () => {
      hasAnimated.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplayValue(target);
        setShowSuffix(Boolean(suffix));
        return;
      }

      const duration = countDuration(target);
      let startTime: number | null = null;
      let raf = 0;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const next = Math.round(easeOutCubic(progress) * target);
        setDisplayValue(next);

        if (progress < 1) {
          raf = requestAnimationFrame(tick);
          return;
        }

        setDisplayValue(target);
        setShowSuffix(Boolean(suffix));
      };

      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    };

    let cleanupAnimation: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        cleanupAnimation = startAnimation();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cleanupAnimation?.();
    };
  }, [suffix, target]);

  const digitCount = String(target).length + suffix.length;
  const digitClass = light
    ? "counterStaticDigit counterStaticDigitWhite"
    : "counterStaticDigit";

  return (
    <div
      ref={rootRef}
      className={`satisficationPercentise missionStatCounter${light ? " missionStatCounterLight" : ""}`}
    >
      <div className="counterItem" data-ux-counter-item>
        <div
          className={`counterText${light ? " counterTextLight" : ""}`}
          data-digit-count={digitCount}
          aria-label={`${target}${suffix}`}
        >
          <span className={digitClass}>{displayValue}</span>
          {showSuffix && suffix ? (
            <span
              className={
                light
                  ? "counterStaticDigit counterStaticDigitWhite"
                  : "counterStaticDigit counterStaticDigitBrand"
              }
            >
              {suffix}
            </span>
          ) : null}
        </div>
      </div>
      <div className={labelClassName}>{label}</div>
    </div>
  );
}
