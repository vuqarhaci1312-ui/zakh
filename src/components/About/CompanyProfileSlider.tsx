"use client";

import { useCallback, useRef, useState } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { WHO_WE_ARE_ASSETS } from "./who-we-are-data";
import styles from "./CompanyProfileSlider.module.css";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function CompanyProfileSlider() {
  const dt = useDt();
  const images = WHO_WE_ARE_ASSETS.companyProfileSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const hasMany = total > 1;

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStartX.current == null || !hasMany) {
      return;
    }

    const delta = clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  if (!total) {
    return null;
  }

  return (
    <div className={styles.profileSlider}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Dt
            k="about.WHO_WE_ARE.profileLabel"
            fallback={WHO_WE_ARE_ASSETS.companyProfileLabel}
          />
        </h2>
      </div>

      <div
        className={styles.viewer}
        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
      >
        <div
          className={styles.track}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div className={styles.slide} key={image}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt=""
                className={styles.slideImage}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {hasMany ? (
          <span className={styles.counter}>
            {activeIndex + 1} / {total}
          </span>
        ) : null}

        {hasMany ? (
          <>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              aria-label={dt("ui.previousSlide", "Previous slide")}
              onClick={goPrev}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              aria-label={dt("ui.nextSlide", "Next slide")}
              onClick={goNext}
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
