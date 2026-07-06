"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const CARD_ORIGIN = "50% 100%";

function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

function scheduleScrollRefresh() {
  refreshScrollTriggers();
  requestAnimationFrame(refreshScrollTriggers);
  window.setTimeout(refreshScrollTriggers, 120);
  window.setTimeout(refreshScrollTriggers, 500);
}

export function useUxoralMissionAnimation(
  rootRef: React.RefObject<HTMLElement | null>,
) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let mm: gsap.MatchMedia | undefined;

    const ctx = gsap.context(() => {
      const grid = root.querySelector<HTMLElement>("[data-ux-mission-grid]");
      if (grid) {
        const leftCard = grid.querySelector<HTMLElement>('[data-ux-card="left"]');
        const centerCard = grid.querySelector<HTMLElement>('[data-ux-card="center"]');
        const rightCard = grid.querySelector<HTMLElement>('[data-ux-card="right"]');
        const mobileCards = gsap.utils.toArray<HTMLElement>("[data-ux-card]", grid);

        mm = gsap.matchMedia();

        mm.add("(min-width: 992px)", () => {
          const scrub = {
            trigger: grid,
            start: "top bottom",
            end: "center center",
            scrub: 0.9,
            invalidateOnRefresh: true,
          };

          if (leftCard) {
            gsap.fromTo(
              leftCard,
              { rotateY: 49, rotateX: 25, transformOrigin: CARD_ORIGIN, force3D: true },
              { rotateY: 0, rotateX: 0, ease: "none", scrollTrigger: scrub },
            );
          }

          if (centerCard) {
            gsap.fromTo(
              centerCard,
              { rotateX: 25, transformOrigin: CARD_ORIGIN, force3D: true },
              { rotateX: 0, ease: "none", scrollTrigger: scrub },
            );
          }

          if (rightCard) {
            gsap.fromTo(
              rightCard,
              { rotateY: -49, rotateX: 25, transformOrigin: CARD_ORIGIN, force3D: true },
              { rotateY: 0, rotateX: 0, ease: "none", scrollTrigger: scrub },
            );
          }
        });

        mm.add("(max-width: 991px)", () => {
          mobileCards.forEach((card) => {
            gsap.fromTo(
              card,
              { rotateX: 20, transformOrigin: CARD_ORIGIN, force3D: true },
              {
                rotateX: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "center center",
                  scrub: 0.9,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });
      }
    }, root);

    scheduleScrollRefresh();

    const onLoad = () => scheduleScrollRefresh();
    window.addEventListener("load", onLoad);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => refreshScrollTriggers())
        : null;
    resizeObserver?.observe(root);

    root.querySelectorAll("img").forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", scheduleScrollRefresh, { once: true });
    });

    return () => {
      window.removeEventListener("load", onLoad);
      resizeObserver?.disconnect();
      mm?.revert();
      ctx.revert();
    };
  }, [rootRef]);
}
