"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { HEADER_DELAYS, SLIDE_IN_ANIMATION } from "./destinations-data";

gsap.registerPlugin(ScrollTrigger);

function animateSlideIn(
  element: HTMLElement,
  delayMs: number,
  trigger: HTMLElement
) {
  gsap.set(element, { y: SLIDE_IN_ANIMATION.y, opacity: 0 });

  return gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: SLIDE_IN_ANIMATION.duration,
    delay: delayMs / 1000,
    ease: SLIDE_IN_ANIMATION.ease,
    scrollTrigger: {
      trigger,
      start: SLIDE_IN_ANIMATION.start,
      once: true,
    },
  });
}

export function useExploreDestinationsAnimation(
  sectionRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLHeadingElement | null>,
  sliderRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const slider = sliderRef.current;

    if (!section || !title || !slider) {
      return;
    }

    const animations = [
      animateSlideIn(title, HEADER_DELAYS.title, section),
      animateSlideIn(slider, 400, section),
    ];

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [sectionRef, titleRef, sliderRef]);
}
