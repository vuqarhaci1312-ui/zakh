"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCmsContent } from "@/lib/content/use-cms";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import {
  BROCHURES,
  BROCHURES_MOBILE_PAGE_SIZE,
  BROCHURES_SECTION,
  type BrochureItem,
} from "./brochures-data";
import styles from "./BrochuresSection.module.css";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

const LANGUAGE_FILTERS = ["All", "EN", "AR", "RU", "DE", "Chinese", "EN/AR"] as const;

type LanguageFilter = (typeof LANGUAGE_FILTERS)[number];
type BrochureWithIndex = BrochureItem & { sourceIndex: number };

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2v8M8 10l3-3M8 10L5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function matchesLanguageFilter(brochure: BrochureItem, filter: LanguageFilter) {
  if (filter === "All") return true;
  if (filter === "EN") {
    return brochure.language === "EN" || brochure.language.startsWith("EN/");
  }
  if (filter === "AR") {
    return brochure.language === "AR" || brochure.language.includes("AR");
  }
  return brochure.language === filter;
}

function getMobilePageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
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

export default function BrochuresSection() {
  const dt = useDt();
  const { data: cmsData, hasCms } = useCmsContent<{
    section: { badge: string; title: string; description: string };
    items: Array<{ title: string; languageTag: string; imageUrl: string; fileUrl: string }>;
  }>("/api/content/brochures");
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<LanguageFilter>("All");
  const [mobilePage, setMobilePage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useOurServicesAnimation(sectionRef);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  const sourceBrochures = useMemo<BrochureWithIndex[]>(() => {
    const raw: BrochureWithIndex[] =
      hasCms && cmsData?.items?.length
        ? cmsData.items.map((item, sourceIndex) => ({
            title: item.title,
            language: item.languageTag,
            image: item.imageUrl,
            file: item.fileUrl,
            sourceIndex,
          }))
        : BROCHURES.map((item, sourceIndex) => ({ ...item, sourceIndex }));

    const seen = new Set<string>();
    return raw.filter((item) => {
      const key = item.file.replace(/%20\(1\)/g, "").toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [hasCms, cmsData]);

  const filteredBrochures = useMemo(
    () => sourceBrochures.filter((brochure) => matchesLanguageFilter(brochure, activeFilter)),
    [activeFilter, sourceBrochures],
  );

  const mobileTotalPages = Math.max(
    1,
    Math.ceil(filteredBrochures.length / BROCHURES_MOBILE_PAGE_SIZE),
  );

  const visibleBrochures = useMemo(() => {
    if (!isMobile) {
      return filteredBrochures;
    }

    const start = (mobilePage - 1) * BROCHURES_MOBILE_PAGE_SIZE;
    return filteredBrochures.slice(start, start + BROCHURES_MOBILE_PAGE_SIZE);
  }, [filteredBrochures, isMobile, mobilePage]);

  const mobilePageNumbers = useMemo(
    () => getMobilePageNumbers(mobilePage, mobileTotalPages),
    [mobilePage, mobileTotalPages],
  );

  const selectFilter = (filter: LanguageFilter) => {
    setActiveFilter(filter);
    setMobilePage(1);
  };

  const goToMobilePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), mobileTotalPages);
    setMobilePage(nextPage);
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className="w-layout-blockcontainer container w-container">
        <header className={styles.header} data-services-reveal>
          <span className={styles.badge}>
            <Dt k="brochures.BROCHURES_SECTION.badge" fallback={BROCHURES_SECTION.badge} />
          </span>
          <h2 className={styles.title}>
            <Dt k="ui.brochuresHeading.before" fallback="Download our" />{" "}
            <span className="text-gradient-orange">
              <Dt k="ui.brochuresHeading.accent" fallback="tour catalogs" />
            </span>
            <Dt k="ui.brochuresHeading.after" fallback=" and booklets." />
          </h2>
          <p className={styles.description}>
            <Dt
              k="brochures.BROCHURES_SECTION.description"
              fallback={BROCHURES_SECTION.description}
            />
          </p>
        </header>

        <div className={styles.filterBar} data-services-reveal>
          <div className={styles.filters} role="tablist" aria-label="Brochure languages">
            {LANGUAGE_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={`${styles.filterButton}${activeFilter === filter ? ` ${styles.filterButtonActive}` : ""}`}
                onClick={() => selectFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div ref={listRef} className={styles.listAnchor} />

        <p className={styles.count} data-services-reveal>
          {filteredBrochures.length}{" "}
          {filteredBrochures.length === 1 ? (
            <Dt k="ui.brochureSingular" fallback="brochure" />
          ) : (
            <Dt k="ui.brochuresTotal" fallback="brochures" />
          )}
          {isMobile && filteredBrochures.length > BROCHURES_MOBILE_PAGE_SIZE ? (
            <>
              {" · "}
              <Dt k="ui.page" fallback="Page" /> {mobilePage}{" "}
              <Dt k="ui.pageOf" fallback="of" /> {mobileTotalPages}
            </>
          ) : null}
        </p>

        <div className={styles.grid} data-brochures-grid>
          {filteredBrochures.length === 0 ? (
            <p className={styles.empty}>
              <Dt k="ui.noBrochuresForLanguage" fallback="No brochures for this language." />
            </p>
          ) : (
            visibleBrochures.map((brochure) => (
              <a
                key={`${brochure.file}-${brochure.sourceIndex}`}
                href={brochure.file}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`${dt(`brochures.BROCHURES.${brochure.sourceIndex}.title`, brochure.title)} (${dt(`brochures.BROCHURES.${brochure.sourceIndex}.language`, brochure.language)})`}
              >
                <div className={styles.thumbWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brochure.image}
                    loading="lazy"
                    alt=""
                    className={styles.thumb}
                  />
                </div>
                <div className={styles.body}>
                  <p className={styles.cardTitle}>
                    {hasCms ? (
                      brochure.title
                    ) : (
                      <Dt
                        k={`brochures.BROCHURES.${brochure.sourceIndex}.title`}
                        fallback={brochure.title}
                      />
                    )}
                  </p>
                  <p className={styles.meta}>
                    <span className={styles.lang}>{brochure.language}</span>
                    PDF
                  </p>
                </div>
                <span className={styles.download} aria-hidden="true">
                  <DownloadIcon />
                </span>
              </a>
            ))
          )}
        </div>

        {isMobile && mobileTotalPages > 1 ? (
          <nav className={styles.pagination} aria-label={dt("ui.brochuresPagination", "Brochure pages")}>
            <button
              type="button"
              className={styles.pageButton}
              disabled={mobilePage === 1}
              onClick={() => goToMobilePage(mobilePage - 1)}
            >
              <Dt k="ui.previousPage" fallback="Previous" />
            </button>

            <div className={styles.pageNumbers}>
              {mobilePageNumbers.map((entry, entryIndex) =>
                entry === "ellipsis" ? (
                  <span key={`ellipsis-${entryIndex}`} className={styles.pageEllipsis} aria-hidden="true">
                    …
                  </span>
                ) : (
                  <button
                    key={entry}
                    type="button"
                    className={`${styles.pageNumber}${entry === mobilePage ? ` ${styles.pageNumberActive}` : ""}`}
                    aria-current={entry === mobilePage ? "page" : undefined}
                    onClick={() => goToMobilePage(entry)}
                  >
                    {entry}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              className={styles.pageButton}
              disabled={mobilePage === mobileTotalPages}
              onClick={() => goToMobilePage(mobilePage + 1)}
            >
              <Dt k="ui.nextPage" fallback="Next" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
