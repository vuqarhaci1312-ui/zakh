"use client";

import type { Application } from "@splinetool/runtime";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { SPLINE_GLOBE_SCENE } from "./check-flights-data";
import styles from "./CheckFlightsGlobe.module.css";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className={styles.splineLoading} aria-hidden="true" />,
});

type SplineGlobeProps = {
  sceneRef?: React.RefObject<HTMLDivElement | null>;
};

function handleSplineLoad(app: Application) {
  app.setZoom(0.84);
}

export default function SplineGlobe({ sceneRef }: SplineGlobeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  // Defer the WebGL runtime + scene download until the globe is near the
  // viewport, so it doesn't compete with the initial page load.
  useEffect(() => {
    const element = sceneRef?.current;
    if (!element) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sceneRef]);

  return (
    <div ref={sceneRef} className={styles.splineGlobeScene}>
      {shouldLoad ? (
        <Spline
          scene={SPLINE_GLOBE_SCENE}
          className={styles.splineCanvas}
          onLoad={handleSplineLoad}
        />
      ) : (
        <div className={styles.splineLoading} aria-hidden="true" />
      )}
    </div>
  );
}
