"use client";

import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n/language-data";

const AUTOPLAY_DELAY_MS = 3000;
const TRANSITION_DURATION = 0.5;
const MOBILE_SWIPE_MAX_WIDTH = 991;
const SWIPE_THRESHOLD_PX = 40;
const DRAG_START_PX = 8;

export function useLagoonCollectionSlider(itemCount: number, locale?: Locale) {
  const maskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const autoplayTimerRef = useRef<number | null>(null);

  const getStepWidth = useCallback(() => {
    const track = trackRef.current;
    const mask = maskRef.current;
    if (!track || !mask) {
      return 0;
    }

    const slide = track.querySelector<HTMLElement>(".slide_resorts-v1");
    if (!slide) {
      return mask.clientWidth;
    }

    const slideStyle = window.getComputedStyle(slide);
    const marginRight = parseFloat(slideStyle.marginRight) || 0;
    const slideWidth = slide.getBoundingClientRect().width;

    if (slideWidth > 0) {
      return slideWidth + marginRight;
    }

    return mask.clientWidth + marginRight;
  }, []);

  const animateToIndex = useCallback(
    (nextIndex: number) => {
      const track = trackRef.current;
      if (!track || itemCount === 0) {
        return;
      }

      const normalizedIndex = ((nextIndex % itemCount) + itemCount) % itemCount;
      const stepWidth = getStepWidth();

      isAnimatingRef.current = true;
      activeIndexRef.current = normalizedIndex;
      setActiveIndex(normalizedIndex);

      gsap.to(track, {
        x: -stepWidth * normalizedIndex,
        duration: TRANSITION_DURATION,
        ease: "power1.inOut",
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [getStepWidth, itemCount]
  );

  const goNext = useCallback(() => {
    if (isAnimatingRef.current) {
      return;
    }

    animateToIndex(activeIndexRef.current + 1);
  }, [animateToIndex]);

  const goPrev = useCallback(() => {
    if (isAnimatingRef.current) {
      return;
    }

    animateToIndex(activeIndexRef.current - 1);
  }, [animateToIndex]);

  const resetAutoplay = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      window.clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = window.setInterval(() => {
      if (!isAnimatingRef.current) {
        animateToIndex(activeIndexRef.current + 1);
      }
    }, AUTOPLAY_DELAY_MS);
  }, [animateToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    gsap.set(track, { x: 0 });

    const syncPosition = () => {
      const stepWidth = getStepWidth();
      gsap.set(track, { x: -stepWidth * activeIndexRef.current });
    };

    syncPosition();

    const resizeObserver = new ResizeObserver(syncPosition);
    if (maskRef.current) {
      resizeObserver.observe(maskRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [getStepWidth, itemCount, locale]);

  useEffect(() => {
    activeIndexRef.current = 0;
    setActiveIndex(0);
    const track = trackRef.current;
    if (track) {
      gsap.set(track, { x: 0 });
    }
  }, [locale]);

  useEffect(() => {
    resetAutoplay();

    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current);
      }
    };
  }, [resetAutoplay]);

  useEffect(() => {
    const mask = maskRef.current;
    const track = trackRef.current;

    if (!mask || !track) {
      return;
    }

    let isDragging = false;
    let didDrag = false;
    let startX = 0;
    let startTranslateX = 0;

    const isMobileViewport = () => window.innerWidth <= MOBILE_SWIPE_MAX_WIDTH;

    const getCurrentX = () => (gsap.getProperty(track, "x") as number) || 0;

    const pauseAutoplay = () => {
      if (autoplayTimerRef.current !== null) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!isMobileViewport() || isAnimatingRef.current) {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      isDragging = true;
      didDrag = false;
      startX = event.clientX;
      startTranslateX = getCurrentX();
      pauseAutoplay();
      mask.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      const delta = event.clientX - startX;

      if (!didDrag && Math.abs(delta) < DRAG_START_PX) {
        return;
      }

      didDrag = true;
      mask.dataset.dragging = "true";

      const stepWidth = getStepWidth();
      const minX = -stepWidth * Math.max(itemCount - 1, 0);
      const maxX = 0;
      const nextX = Math.min(maxX, Math.max(minX, startTranslateX + delta));

      gsap.set(track, { x: nextX });
    };

    const finishDrag = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      delete mask.dataset.dragging;

      if (mask.hasPointerCapture(event.pointerId)) {
        mask.releasePointerCapture(event.pointerId);
      }

      if (!didDrag) {
        resetAutoplay();
        return;
      }

      const delta = event.clientX - startX;

      if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) {
        if (delta < 0) {
          animateToIndex(activeIndexRef.current + 1);
        } else {
          animateToIndex(activeIndexRef.current - 1);
        }
      } else {
        animateToIndex(activeIndexRef.current);
      }

      resetAutoplay();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!didDrag) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    };

    mask.addEventListener("pointerdown", onPointerDown);
    mask.addEventListener("pointermove", onPointerMove);
    mask.addEventListener("pointerup", finishDrag);
    mask.addEventListener("pointercancel", finishDrag);
    mask.addEventListener("click", onClickCapture, true);

    return () => {
      mask.removeEventListener("pointerdown", onPointerDown);
      mask.removeEventListener("pointermove", onPointerMove);
      mask.removeEventListener("pointerup", finishDrag);
      mask.removeEventListener("pointercancel", finishDrag);
      mask.removeEventListener("click", onClickCapture, true);
    };
  }, [animateToIndex, getStepWidth, itemCount, resetAutoplay]);

  const handlePrev = () => {
    goPrev();
    resetAutoplay();
  };

  const handleNext = () => {
    goNext();
    resetAutoplay();
  };

  return {
    maskRef,
    trackRef,
    activeIndex,
    goPrev: handlePrev,
    goNext: handleNext,
  };
}
