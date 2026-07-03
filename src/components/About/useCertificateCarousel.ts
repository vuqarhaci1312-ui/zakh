"use client";

import { useEffect, useRef } from "react";

export const CERTIFICATE_LOOP_COPIES = 3;
const AUTO_SCROLL_SPEED = 0.45;
const DRAG_THRESHOLD = 6;

export function useCertificateCarousel(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || itemCount === 0) {
      return;
    }

    let setWidth = 0;
    let scrollRafId = 0;
    let autoRafId = 0;

    const measure = () => {
      setWidth = track.scrollWidth / CERTIFICATE_LOOP_COPIES;
      if (setWidth > 0 && viewport.scrollLeft === 0) {
        viewport.scrollLeft = setWidth;
      }
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

    const onScroll = () => {
      if (isDraggingRef.current) {
        return;
      }

      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(normalizeScroll);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      isDraggingRef.current = true;
      suppressClickRef.current = false;
      dragStartXRef.current = event.clientX;
      scrollStartRef.current = viewport.scrollLeft;
      viewport.setPointerCapture(event.pointerId);
      viewport.dataset.dragging = "true";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) {
        return;
      }

      const delta = event.clientX - dragStartXRef.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        suppressClickRef.current = true;
      }

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

      normalizeScroll();
    };

    const autoTick = () => {
      if (!isDraggingRef.current && !isPausedRef.current) {
        viewport.scrollLeft += AUTO_SCROLL_SPEED;
        normalizeScroll();
      }

      autoRafId = requestAnimationFrame(autoTick);
    };

    const onEnter = () => {
      isPausedRef.current = true;
    };

    const onLeave = () => {
      isPausedRef.current = false;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);
    autoRafId = requestAnimationFrame(autoTick);

    return () => {
      cancelAnimationFrame(scrollRafId);
      cancelAnimationFrame(autoRafId);
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
    };
  }, [itemCount]);

  return { viewportRef, trackRef, suppressClickRef };
}
