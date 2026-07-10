"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDt } from "@/lib/i18n/use-data-translation";
import styles from "./TourGallery.module.css";

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

function CloseIcon() {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

type TourGalleryProps = {
  images: string[];
  label: string;
  alt: string;
};

export default function TourGallery({ images, label, alt }: TourGalleryProps) {
  const dt = useDt();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const hasMany = total > 1;

  const goPrev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
      if (event.key === "ArrowLeft" && hasMany) {
        goPrev();
      }
      if (event.key === "ArrowRight" && hasMany) {
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [goNext, goPrev, hasMany, lightboxOpen]);

  const handleTouchStart = (clientX: number) => {
    touchStartX.current = clientX;
  };

  const handleTouchEnd = (clientX: number, onSwipe: () => void) => {
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

    onSwipe();
  };

  if (!total) {
    return null;
  }

  const lightbox = lightboxOpen && mounted
    ? createPortal(
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={dt("ui.gallery", "Gallery")}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            aria-label={dt("ui.close", "Close")}
            onClick={() => setLightboxOpen(false)}
          >
            <CloseIcon />
          </button>

          <div
            className={styles.lightboxFrame}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
            onTouchEnd={(event) =>
              handleTouchEnd(event.changedTouches[0]?.clientX ?? 0, () => undefined)
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[activeIndex]}
              alt={alt}
              className={styles.lightboxImage}
              draggable={false}
            />

            {hasMany ? (
              <>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxNavPrev}`}
                  aria-label={dt("ui.previousSlide", "Previous slide")}
                  onClick={goPrev}
                >
                  <ChevronIcon direction="left" />
                </button>
                <button
                  type="button"
                  className={`${styles.lightboxNav} ${styles.lightboxNavNext}`}
                  aria-label={dt("ui.nextSlide", "Next slide")}
                  onClick={goNext}
                >
                  <ChevronIcon direction="right" />
                </button>
              </>
            ) : null}
          </div>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        className={styles.gallery}
        data-detail-reveal
        onTouchStart={(event) => handleTouchStart(event.touches[0]?.clientX ?? 0)}
        onTouchEnd={(event) =>
          handleTouchEnd(event.changedTouches[0]?.clientX ?? 0, () => undefined)
        }
      >
        <div className={styles.viewer}>
          <div
            className={styles.track}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div className={styles.slide} key={`${image}-${index}`}>
                <button
                  type="button"
                  className={styles.slideButton}
                  aria-label={dt("ui.gallery", "Gallery")}
                  onClick={() => setLightboxOpen(true)}
                >
                  {index === 0 ? (
                    <Image
                      src={image}
                      alt={alt}
                      width={1280}
                      height={720}
                      className={styles.slideImage}
                      sizes="(max-width: 991px) 100vw, 720px"
                      priority
                      fetchPriority="high"
                      draggable={false}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={alt}
                      className={styles.slideImage}
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className={styles.topBar}>
            <span className={styles.badge}>{label}</span>
            {hasMany ? (
              <span className={styles.counter}>
                {activeIndex + 1} / {total}
              </span>
            ) : null}
          </div>

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

        {hasMany ? (
          <div className={styles.thumbs}>
            {images.map((image, index) => (
              <button
                key={`${image}-thumb-${index}`}
                type="button"
                className={`${styles.thumb} ${index === activeIndex ? styles.thumbActive : ""}`}
                aria-label={`${index + 1}`}
                onClick={() => setActiveIndex(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className={styles.thumbImage} loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightbox}
    </>
  );
}
