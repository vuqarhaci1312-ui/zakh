"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
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
  const name = dt(`lagoon.POPULAR_TOUR_ITEMS.${index}.title`, destination.name);
  const alt = dt(`lagoon.POPULAR_TOUR_ITEMS.${index}.imageAlt`, destination.imageAlt);

  return (
    <div className={styles.cardWrapper} data-slider-card>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={destination.image}
            alt={alt}
            width={1644}
            height={1100}
            sizes="(max-width: 767px) calc(100vw - 80px), calc((100vw - 80px - 48px) / 3)"
            className={styles.image}
            draggable={false}
          />
        </div>

        <div className={styles.detail}>
          <div className={styles.info}>
            <div className={styles.smallParagraph}>
              <Dt k="ui.tourPackagesEyebrow.before" fallback="Tour" />{" "}
              <span className="text-gradient-orange">
                <Dt k="ui.tourPackagesEyebrow.accent" fallback="Packages" />
              </span>
            </div>
            <div className={`${styles.heading} text-gradient-orange`}>{name}</div>
          </div>

          <Link
            href={destination.href}
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
            <Dt k="ui.tourPackagesHeading.before" fallback="Our Tour" />{" "}
            <span className="text-gradient-orange">
              <Dt k="ui.tourPackagesHeading.accent" fallback="Packages" />
            </span>
          </h2>
        </div>
      </div>

      <div className={styles.sliderShell}>
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
      </div>
    </section>
  );
}
