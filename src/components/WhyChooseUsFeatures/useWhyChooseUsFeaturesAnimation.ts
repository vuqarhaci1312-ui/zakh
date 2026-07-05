"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useWhyChooseUsFeaturesAnimation(
  rootRef: React.RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let mm: gsap.MatchMedia | undefined;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-wcu-reveal]", root).forEach((element) => {
        gsap.set(element, { autoAlpha: 0, y: 36 });

        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-wcu-card]", root);
      if (cards.length === 0) {
        return;
      }

      mm = gsap.matchMedia();

      mm.add("(min-width: 992px)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 48 });

        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0].parentElement ?? cards[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });

      mm.add("(max-width: 991px)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm?.revert();
      ctx.revert();
    };
  }, [rootRef]);
}
