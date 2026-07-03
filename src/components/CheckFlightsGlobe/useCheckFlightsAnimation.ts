"use client";



import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useEffect } from "react";



gsap.registerPlugin(ScrollTrigger);



const SLIDE_UP = {

  y: 40,

  duration: 0.8,

  ease: "power3.out",

  start: "top 82%",

} as const;



export function useCheckFlightsAnimation(

  sectionRef: React.RefObject<HTMLElement | null>,

  globeRef: React.RefObject<HTMLDivElement | null>

) {

  useEffect(() => {

    const section = sectionRef.current;

    const globe = globeRef.current;



    if (!section || !globe) {

      return;

    }



    gsap.set(globe, { y: SLIDE_UP.y, autoAlpha: 0 });



    const animation = gsap.to(globe, {

      y: 0,

      autoAlpha: 1,

      duration: SLIDE_UP.duration,

      ease: SLIDE_UP.ease,

      scrollTrigger: {

        trigger: section,

        start: SLIDE_UP.start,

        once: true,

      },

    });



    return () => {

      animation.scrollTrigger?.kill();

      animation.kill();

    };

  }, [sectionRef, globeRef]);

}


