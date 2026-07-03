"use client";

import { useEffect, useRef, useState } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import SplineGlobe from "./SplineGlobe";
import { useCheckFlightsAnimation } from "./useCheckFlightsAnimation";
import styles from "./CheckFlightsGlobe.module.css";

const DESKTOP_MEDIA = "(min-width: 1024px)";

export default function CheckFlightsGlobe() {
  const dt = useDt();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_MEDIA);
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useCheckFlightsAnimation(sectionRef, globeRef);

  if (isDesktop !== true) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label={dt("ui.interactiveGlobe", "Interactive globe")}
    >
      <div className={styles.container}>
        <div className={styles.globeSplineContainer}>
          <SplineGlobe sceneRef={globeRef} />
        </div>
      </div>
    </section>
  );
}