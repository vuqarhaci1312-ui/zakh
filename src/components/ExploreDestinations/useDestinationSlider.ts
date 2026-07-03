"use client";

import { useEffect, useRef } from "react";

const LOOP_COPIES = 3;

export function useDestinationSlider(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track || itemCount === 0) {
      return;
    }

    let setWidth = 0;
    let rafId = 0;

    const measure = () => {
      setWidth = track.scrollWidth / LOOP_COPIES;
      if (setWidth > 0) {
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

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(normalizeScroll);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (target?.closest("a")) {
        return;
      }

      isDraggingRef.current = true;
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

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("pointerleave", endDrag);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("pointerleave", endDrag);
    };
  }, [itemCount]);

  return { viewportRef, trackRef };
}

export { LOOP_COPIES };
