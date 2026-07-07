"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = "[data-detail-reveal]";
const PARALLAX_SELECTOR = "[data-detail-parallax]";
const THUMB_SELECTOR = "[data-detail-thumb]";
const AMENITY_SELECTOR = "[data-detail-amenity]";
const RELATED_CARD_SELECTOR = "[data-detail-related-card]";

export function useDestinationDetailAnimation(
  rootRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const revealElements = gsap.utils.toArray<HTMLElement>(REVEAL_SELECTOR, root);

      revealElements.forEach((element) => {
        gsap.set(element, { autoAlpha: 0, y: 48 });

        const tween = gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
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
            duration: 1,
            ease: "power2.out",
          });
        }
      });

      const amenityTiles = gsap.utils.toArray<HTMLElement>(AMENITY_SELECTOR, root);
      if (amenityTiles.length > 0) {
        gsap.set(amenityTiles, { autoAlpha: 0, y: 24 });

        gsap.to(amenityTiles, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: amenityTiles[0].closest(".resort_amenities") ?? amenityTiles[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      const relatedCards = gsap.utils.toArray<HTMLElement>(RELATED_CARD_SELECTOR, root);
      if (relatedCards.length > 0) {
        gsap.set(relatedCards, { autoAlpha: 0, y: 56 });

        gsap.to(relatedCards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: relatedCards[0].closest(".grid_resorts") ?? relatedCards[0],
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(PARALLAX_SELECTOR, root).forEach((image) => {
        if (image.closest(".destination-detail-root")) {
          return;
        }

        const container =
          image.closest(".wrap_image-resort") ??
          image.closest(".lightbox_resort-gallery") ??
          image.closest(".image_resort-v1");

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

      gsap.utils.toArray<HTMLElement>(THUMB_SELECTOR, root).forEach((link) => {
        const image = link.querySelector("img");
        if (!image) {
          return;
        }

        gsap.set(image, { scale: 1, transformOrigin: "center center" });

        link.addEventListener("mouseenter", () => {
          gsap.to(image, { scale: 1.08, duration: 0.45, ease: "power2.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(image, { scale: 1, duration: 0.45, ease: "power2.out" });
        });
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
