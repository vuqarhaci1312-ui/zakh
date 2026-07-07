"use client";

import { useEffect, useRef } from "react";

const LOOP_COPIES = 3;
const DESKTOP_QUERY = "(min-width: 992px)";

function getVisibleCards() {
  return window.matchMedia(DESKTOP_QUERY).matches ? 3 : 1;
}

function isMousePointer(event: PointerEvent) {
  return event.pointerType === "mouse";
}

export function useDestinationSlider(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || itemCount === 0) {
      return;
    }

    let setWidth = 0;
    let rafId = 0;
    let scrollEndTimer = 0;

    const getGap = () =>
      parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0");

    const getCardStep = () => {
      const card = track.querySelector<HTMLElement>("[data-slider-card]");
      if (!card) {
        return 0;
      }

      return card.offsetWidth + getGap();
    };

    const applyCardLayout = () => {
      const visibleCards = getVisibleCards();
      const gap = getGap();
      const innerWidth = viewport.clientWidth;
      const cardWidth = Math.floor((innerWidth - (visibleCards - 1) * gap) / visibleCards);

      viewport.style.setProperty("--slider-card-width", `${Math.max(cardWidth, 0)}px`);
    };

    const measure = () => {
      applyCardLayout();

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const step = getCardStep();
        setWidth = step * itemCount;

        if (setWidth <= 0) {
          return;
        }

        if (!hasInitializedRef.current) {
          viewport.scrollLeft = setWidth;
          hasInitializedRef.current = true;
          return;
        }

        if (isDraggingRef.current) {
          return;
        }

        const copyIndex = Math.max(1, Math.round(viewport.scrollLeft / setWidth));
        const offset = viewport.scrollLeft % setWidth;
        viewport.scrollLeft = copyIndex * setWidth + offset;
      });
    };

    const snapToNearest = (smooth = false) => {
      const step = getCardStep();
      if (step <= 0) {
        return;
      }

      const target = Math.round(viewport.scrollLeft / step) * step;
      const useSmooth = smooth && window.matchMedia(DESKTOP_QUERY).matches;

      if (useSmooth) {
        viewport.scrollTo({ left: target, behavior: "smooth" });
        return;
      }

      viewport.scrollLeft = target;
    };

    const normalizeScroll = () => {
      if (setWidth <= 0) {
        return;
      }

      if (viewport.scrollLeft >= setWidth * 2 - 1) {
        viewport.scrollLeft -= setWidth;
      } else if (viewport.scrollLeft <= 1) {
        viewport.scrollLeft += setWidth;
      }
    };

    const settleScroll = (smooth = false) => {
      normalizeScroll();
      snapToNearest(smooth);
    };

    const scheduleSettle = (smooth = false) => {
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        if (!isDraggingRef.current) {
          settleScroll(smooth);
        }
      }, 120);
    };

    const onScroll = () => {
      if (isDraggingRef.current || "onscrollend" in window) {
        return;
      }

      scheduleSettle(false);
    };

    const onScrollEnd = () => {
      if (isDraggingRef.current) {
        return;
      }

      window.clearTimeout(scrollEndTimer);
      settleScroll(false);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!isMousePointer(event) || event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest("a")) {
        return;
      }

      window.clearTimeout(scrollEndTimer);
      isDraggingRef.current = true;
      dragStartXRef.current = event.clientX;
      scrollStartRef.current = viewport.scrollLeft;
      viewport.setPointerCapture(event.pointerId);
      viewport.dataset.dragging = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current || !isMousePointer(event)) {
        return;
      }

      const delta = event.clientX - dragStartXRef.current;
      viewport.scrollLeft = scrollStartRef.current - delta;
    };

    const endDrag = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      isDraggingRef.current = false;
      delete viewport.dataset.dragging;

      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }

      settleScroll(true);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    const desktopMedia = window.matchMedia(DESKTOP_QUERY);
    desktopMedia.addEventListener("change", measure);

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scrollend", onScrollEnd, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("pointerleave", endDrag);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(scrollEndTimer);
      resizeObserver.disconnect();
      desktopMedia.removeEventListener("change", measure);
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scrollend", onScrollEnd);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("pointerleave", endDrag);
      viewport.style.removeProperty("--slider-card-width");
    };
  }, [itemCount]);

  return { viewportRef, trackRef };
}

export { LOOP_COPIES };
