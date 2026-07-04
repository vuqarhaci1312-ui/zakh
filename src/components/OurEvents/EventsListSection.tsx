"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { EVENTS, EVENTS_PER_PAGE, OUR_EVENTS_SECTION } from "./events-data";
import styles from "./OurEvents.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

type LightboxState = {
  images: string[];
  index: number;
  title: string;
} | null;

function getPageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  sorted.forEach((page, index) => {
    const prev = sorted[index - 1];
    if (prev !== undefined && page - prev > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

export default function EventsListSection() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  const listTopRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  useOurServicesAnimation(sectionRef);

  const totalPages = Math.max(1, Math.ceil(EVENTS.length / EVENTS_PER_PAGE));

  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return EVENTS.slice(start, start + EVENTS_PER_PAGE).map((event, offset) => ({
      event,
      eventIndex: start + offset,
    }));
  }, [currentPage]);

  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const goToPage = useCallback(
    (page: number) => {
      const nextPage = Math.min(Math.max(page, 1), totalPages);
      setCurrentPage(nextPage);
      requestAnimationFrame(() => {
        listTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    [totalPages],
  );

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
                    <Dt k="events.OUR_EVENTS_SECTION.badge" fallback={OUR_EVENTS_SECTION.badge} />
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-52" style={{ margin: "0 auto" }}>
                <h1 className="section-heading night center">
                  <Dt k="ui.eventsHeading.before" fallback="International travel exhibitions and" />{" "}
                  <span className="text-gradient-orange">
                    <Dt k="ui.eventsHeading.accent" fallback="roadshows" />
                  </span>
                  <Dt k="ui.eventsHeading.after" fallback="." />
                </h1>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41" style={{ margin: "0 auto" }}>
                <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                  <Dt
                    k="events.OUR_EVENTS_SECTION.description"
                    fallback={OUR_EVENTS_SECTION.description}
                  />
                </p>
              </div>
            </div>

            <div className="space-3-medium" />

            <div ref={listTopRef} className={styles.listAnchor} />

            <p className={styles.pageSummary}>
              <Dt k="ui.page" fallback="Page" /> {currentPage}{" "}
              <Dt k="ui.pageOf" fallback="of" /> {totalPages}
              {" · "}
              {EVENTS.length} <Dt k="ui.eventsTotal" fallback="events" />
            </p>

            <div className={styles.eventsList}>
              {paginatedEvents.map(({ event, eventIndex }) => {
                const eventTitle = dt(`events.EVENTS.${eventIndex}.title`, event.title);
                return (
                  <article key={event.id} className={styles.eventCard}>
                    <Dt
                      k={`events.EVENTS.${eventIndex}.title`}
                      fallback={event.title}
                      as="h2"
                      className={styles.eventTitle}
                    />
                    {event.description ? (
                      <p className={styles.eventDescription}>
                        <Dt
                          k={`events.EVENTS.${eventIndex}.description`}
                          fallback={event.description}
                        />
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

            {totalPages > 1 ? (
              <nav className={styles.pagination} aria-label={dt("ui.eventsPagination", "Events pages")}>
                <button
                  type="button"
                  className={styles.pageButton}
                  disabled={currentPage === 1}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <Dt k="ui.previousPage" fallback="Previous" />
                </button>

                <div className={styles.pageNumbers}>
                  {pageNumbers.map((entry, index) =>
                    entry === "ellipsis" ? (
                      <span key={`ellipsis-${index}`} className={styles.pageEllipsis} aria-hidden="true">
                        …
                      </span>
                    ) : (
                      <button
                        key={entry}
                        type="button"
                        className={`${styles.pageNumber}${entry === currentPage ? ` ${styles.pageNumberActive}` : ""}`}
                        aria-current={entry === currentPage ? "page" : undefined}
                        onClick={() => goToPage(entry)}
                      >
                        {entry}
                      </button>
                    ),
                  )}
                </div>

                <button
                  type="button"
                  className={styles.pageButton}
                  disabled={currentPage === totalPages}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <Dt k="ui.nextPage" fallback="Next" />
                </button>
              </nav>
            ) : null}
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
