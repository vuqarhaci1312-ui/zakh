"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

function revealElement(element: HTMLElement, delay = 0) {
  gsap.set(element, { autoAlpha: 0, y: 40 });

  const tween = gsap.to(element, {
    autoAlpha: 1,
    y: 0,
    duration: 0.9,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 92%",
      toggleActions: "play none none none",
      once: true,
    },
  });

  const rect = element.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.92) {
    tween.scrollTrigger?.kill();
    gsap.to(element, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power2.out",
    });
  }
}

export function useCustomerReviewsAnimation(
  rootRef: React.RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-customer-reviews-reveal]", root).forEach(
        (element, index) => {
          revealElement(element, index * 0.08);
        },
      );
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [rootRef]);
}
