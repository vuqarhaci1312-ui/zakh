"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import {
  STAT_CARD_ANIMATIONS,
  STAT_DESKTOP_MEDIA,
  STAT_SCROLL_TRIGGER,
} from "./animation-data";
import type { StatCardVariant } from "./stats-data";

gsap.registerPlugin(ScrollTrigger);

export function useWhyChooseUsAnimation(
  contentRef: React.RefObject<HTMLDivElement | null>,
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>
) {
  useEffect(() => {
    const content = contentRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!content || cards.length !== STAT_CARD_ANIMATIONS.length) {
      return;
    }

    const matchMedia = gsap.matchMedia();

    matchMedia.add(STAT_DESKTOP_MEDIA, () => {
      const cardMap = new Map<StatCardVariant, HTMLDivElement>();

      cards.forEach((card, index) => {
        cardMap.set(STAT_CARD_ANIMATIONS[index].id, card);
      });

      STAT_CARD_ANIMATIONS.forEach(({ id, x, y }) => {
        const card = cardMap.get(id);
        if (!card) {
          return;
        }

        gsap.set(card, {
          x,
          y,
          opacity: 0,
          force3D: true,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: content,
          start: STAT_SCROLL_TRIGGER.start,
          end: STAT_SCROLL_TRIGGER.end,
          scrub: STAT_SCROLL_TRIGGER.scrub,
          invalidateOnRefresh: true,
        },
      });

      STAT_CARD_ANIMATIONS.forEach(({ id, x, y }) => {
        const card = cardMap.get(id);
        if (!card) {
          return;
        }

        timeline.to(
          card,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.02,
            ease: "none",
            force3D: true,
          },
          0
        );
      });

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();

        cards.forEach((card) => {
          gsap.set(card, { clearProps: "transform,opacity" });
        });
      };
    });

    matchMedia.add(`not ${STAT_DESKTOP_MEDIA}`, () => {
      cards.forEach((card) => {
        gsap.set(card, { clearProps: "transform,opacity" });
      });

      return () => undefined;
    });

    return () => {
      matchMedia.revert();
    };
  }, [contentRef, cardRefs]);
}
