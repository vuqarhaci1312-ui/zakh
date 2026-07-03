"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useRelatedPackagesAnimation(
  rootRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-related-packages-reveal]", root).forEach(
        (element) => {
          gsap.set(element, { autoAlpha: 0, y: 40 });

          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          });
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-related-package-card]",
        root
      );

      if (cards.length > 0) {
        gsap.set(cards, { autoAlpha: 0, y: 48 });

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0].closest(".collection-item-wrap") ?? cards[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }
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
