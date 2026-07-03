"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_SELECTOR = "[data-lagoon-headline]";
const PARALLAX_SELECTOR = "[data-lagoon-parallax]";

export function useLagoonCollectionAnimation(
  rootRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const headline = root.querySelector<HTMLElement>(HEADLINE_SELECTOR);
      if (headline) {
        gsap.set(headline, { autoAlpha: 0, filter: "blur(5px)" });

        gsap.to(headline, {
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headline,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(PARALLAX_SELECTOR, root).forEach((image) => {
        const container = image.closest(".image_resort-slide");
        if (!container) {
          return;
        }

        gsap.fromTo(
          image,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
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
