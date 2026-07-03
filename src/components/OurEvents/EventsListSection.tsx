"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { EVENTS, OUR_EVENTS_SECTION } from "./events-data";
import styles from "./OurEvents.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

type LightboxState = {
  images: string[];
  index: number;
  title: string;
} | null;

export default function EventsListSection() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  useOurServicesAnimation(sectionRef);

  const openLightbox = useCallback((images: string[], index: number, title: string) => {
    setLightbox({ images, index, title });
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback(() => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index - 1 + current.images.length) % current.images.length,
          }
        : null,
    );
  }, []);

  const showNext = useCallback(() => {
    setLightbox((current) =>
      current
        ? {
            ...current,
            index: (current.index + 1) % current.images.length,
          }
        : null,
    );
  }, []);

  useEffect(() => {
    if (!lightbox) {
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, closeLightbox, showNext, showPrev]);

  return (
    <>
      <section ref={sectionRef} className="section">
        <div className="space-8-small" />
        <div className="w-layout-blockcontainer container w-container">
          <div className="service-wrapper">
            <div className="section-title-wrapper" data-services-reveal>
              <div className="badge-wrap">
                <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                    {dt("events.OUR_EVENTS_SECTION.badge", OUR_EVENTS_SECTION.badge)}                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-52" style={{ margin: "0 auto" }}>
                <h1 className="section-heading night center">
                  {dt("ui.eventsHeading.before", "International travel exhibitions and")}{" "}
                  <span className="text-gradient-orange">
                    {dt("ui.eventsHeading.accent", "roadshows")}
                  </span>
                  {dt("ui.eventsHeading.after", ".")}
                </h1>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41" style={{ margin: "0 auto" }}>
                <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                  {dt("events.OUR_EVENTS_SECTION.description", OUR_EVENTS_SECTION.description)}                </p>
              </div>
            </div>

            <div className="space-3-medium" />

            <div className={styles.eventsList}>
              {EVENTS.map((event, eventIndex) => {
                const eventTitle = dt(`events.EVENTS.${eventIndex}.title`, event.title);
                return (
                <article key={event.id} className={styles.eventCard} data-experience-card>
                  <h2 className={styles.eventTitle}>{eventTitle}</h2>
                  {event.description ? (
                    <p className={styles.eventDescription}>
                      {dt(`events.EVENTS.${eventIndex}.description`, event.description)}
                    </p>
                  ) : null}

                  {event.images.length > 0 ? (
                    <div className={styles.gallery}>
                      {event.images.map((src, index) => (
                        <button
                          key={`${event.id}-${src}`}
                          type="button"
                          className={styles.galleryButton}
                          aria-label={`${dt("ui.explore", "View")} ${index + 1} — ${eventTitle}`}
                          onClick={() => openLightbox(event.images, index, eventTitle)}
                        >
                          <Image
                            src={src}
                            alt=""
                            width={480}
                            height={320}
                            className={styles.galleryImage}
                          />
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {event.video ? (
                    <video className={styles.eventVideo} controls preload="metadata">
                      <source src={event.video} type="video/mp4" />
                    </video>
                  ) : null}
                </article>
              );
              })}
            </div>
          </div>
        </div>
        <div className="space-8-small" />
      </section>

      {lightbox ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={closeLightbox}
        >
          <div className={styles.lightboxInner} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              aria-label={dt("ui.previousImage", "Previous image")}
              onClick={showPrev}
            >
              ‹
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.images[lightbox.index]}
              alt=""
              className={styles.lightboxImage}
            />
            <button
              type="button"
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              aria-label={dt("ui.nextImage", "Next image")}
              onClick={showNext}
            >
              ›
            </button>
            <p className={styles.lightboxCaption}>{lightbox.title}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
