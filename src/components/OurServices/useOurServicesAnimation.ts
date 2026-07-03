"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function useOurServicesAnimation(
  rootRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const serviceCards = gsap.utils.toArray<HTMLElement>(
        "[data-service-card]",
        root
      );

      if (serviceCards.length > 0) {
        gsap.set(serviceCards, { autoAlpha: 0, y: 56 });

        gsap.to(serviceCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: serviceCards[0].closest(".service-main") ?? serviceCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      const experienceCards = gsap.utils.toArray<HTMLElement>(
        "[data-experience-card]",
        root
      );

      if (experienceCards.length > 0) {
        gsap.set(experienceCards, { autoAlpha: 0, y: 48, scale: 0.96 });

        gsap.to(experienceCards, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger:
              experienceCards[0].closest(".service-bottom-grid") ??
              experienceCards[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-services-reveal]", root).forEach(
        (element) => {
          gsap.set(element, { autoAlpha: 0, y: 40 });

          const tween = gsap.to(element, {
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

          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.88) {
            tween.scrollTrigger?.kill();
            gsap.to(element, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
            });
          }
        }
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
