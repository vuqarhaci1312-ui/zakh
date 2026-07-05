"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useWhyChooseUsCarousel(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartRef = useRef(0);

  const getSlideWidth = useCallback(() => viewportRef.current?.clientWidth ?? 0, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const clamped = Math.max(0, Math.min(index, itemCount - 1));
      const slideWidth = getSlideWidth();
      if (slideWidth <= 0) {
        return;
      }

      viewport.scrollTo({ left: clamped * slideWidth, behavior });
      activeIndexRef.current = clamped;
      setActiveIndex(clamped);
    },
    [getSlideWidth, itemCount],
  );

  const goPrev = useCallback(() => {
    scrollToIndex(activeIndexRef.current - 1);
  }, [scrollToIndex]);

  const goNext = useCallback(() => {
    scrollToIndex(activeIndexRef.current + 1);
  }, [scrollToIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const syncSlideWidth = () => {
      viewport.style.setProperty("--wcu-slide-width", `${viewport.clientWidth}px`);
    };

    syncSlideWidth();

    const onScroll = () => {
      if (isDraggingRef.current) {
        return;
      }

      const slideWidth = getSlideWidth();
      if (slideWidth <= 0) {
        return;
      }

      const index = Math.round(viewport.scrollLeft / slideWidth);
      const clamped = Math.max(0, Math.min(index, itemCount - 1));
      if (clamped !== activeIndexRef.current) {
        activeIndexRef.current = clamped;
        setActiveIndex(clamped);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
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

      const slideWidth = getSlideWidth();
      if (slideWidth > 0) {
        const index = Math.round(viewport.scrollLeft / slideWidth);
        scrollToIndex(index);
      }
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    const resizeObserver = new ResizeObserver(() => {
      syncSlideWidth();
      scrollToIndex(activeIndexRef.current, "auto");
    });
    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      resizeObserver.disconnect();
    };
  }, [getSlideWidth, itemCount, scrollToIndex]);

  return {
    viewportRef,
    activeIndex,
    goPrev,
    goNext,
    scrollToIndex,
    canGoPrev: activeIndex > 0,
    canGoNext: activeIndex < itemCount - 1,
  };
}
