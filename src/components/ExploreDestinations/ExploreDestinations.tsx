"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { DestinationArrowIcon } from "./DestinationArrowIcon";
import { DESTINATIONS, type DestinationItem } from "./destinations-data";
import { useDestinationSlider, LOOP_COPIES } from "./useDestinationSlider";
import { useExploreDestinationsAnimation } from "./useExploreDestinationsAnimation";
import styles from "./ExploreDestinations.module.css";

function DestinationCard({
  destination,
  index,
}: {
  destination: DestinationItem;
  index: number;
}) {
  const dt = useDt();
  const name = dt(`destinations.DESTINATIONS.${index}.name`, destination.name);

  return (
    <div className={styles.cardWrapper} data-slider-card>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={destination.image}
            alt={name}
            width={1644}
            height={1100}
            sizes="(max-width: 767px) calc(100vw - 40px), 408px"
            className={styles.image}
            draggable={false}
          />
        </div>

        <div className={styles.detail}>
          <div className={styles.info}>
            <div className={styles.smallParagraph}>
              {dt("ui.tourPackagesEyebrow.before", "Tour")}{" "}
              <span className="text-gradient-orange">
                {dt("ui.tourPackagesEyebrow.accent", "Packages")}
              </span>
            </div>
            <div className={`${styles.heading} text-gradient-orange`}>{name}</div>
          </div>

          <Link
            href={`/destinations/${destination.id}`}
            className={styles.linkBlock}
            aria-label={`${dt("ui.exploreDestination", "Explore")} ${name}`}
            draggable={false}
          >
            <span className={styles.linkIcon}>
              <DestinationArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ExploreDestinations() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { viewportRef, trackRef } = useDestinationSlider(DESTINATIONS.length);

  useExploreDestinationsAnimation(sectionRef, titleRef, viewportRef);

  const loopedDestinations = Array.from({ length: LOOP_COPIES }, (_, copyIndex) =>
    DESTINATIONS.map((destination, index) => ({
      ...destination,
      key: `${destination.id}-${copyIndex}`,
      index,
    })),
  ).flat();

  return (
    <section
      id="destination"
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="explore-destinations-title"
    >
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h2 id="explore-destinations-title" ref={titleRef} className={styles.title}>
            {dt("ui.tourPackagesHeading.before", "Our Tour")}{" "}
            <span className="text-gradient-orange">
              {dt("ui.tourPackagesHeading.accent", "Packages")}
            </span>
          </h2>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={styles.sliderViewport}
        aria-label={dt("ui.destinationCarousel", "Destination carousel")}
      >
        <div ref={trackRef} className={styles.sliderTrack}>
          {loopedDestinations.map((destination) => (
            <DestinationCard
              key={destination.key}
              destination={destination}
              index={destination.index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
