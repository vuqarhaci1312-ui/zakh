"use client";

import { useMemo, useRef, useState } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { BROCHURES, BROCHURES_SECTION, type BrochureItem } from "./brochures-data";
import styles from "./BrochuresSection.module.css";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

const LANGUAGE_FILTERS = ["All", "EN", "AR", "RU", "DE", "Chinese", "EN/AR"] as const;

type LanguageFilter = (typeof LANGUAGE_FILTERS)[number];

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

export default function BrochuresSection() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<LanguageFilter>("All");

  useOurServicesAnimation(sectionRef);

  const filteredBrochures = useMemo(
    () =>
      BROCHURES.map((brochure, index) => ({ brochure, index })).filter(({ brochure }) =>
        matchesLanguageFilter(brochure, activeFilter),
      ),
    [activeFilter],
  );

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

        <div className={styles.filters} data-services-reveal>
          {LANGUAGE_FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${styles.filterButton}${activeFilter === filter ? ` ${styles.filterButtonActive}` : ""}`}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className={styles.count} data-services-reveal>
          {filteredBrochures.length} {filteredBrochures.length === 1 ? "brochure" : "brochures"}
        </p>

        <div className={styles.grid} data-brochures-grid>
          {filteredBrochures.length === 0 ? (
            <p className={styles.empty}>No brochures for this language.</p>
          ) : (
            filteredBrochures.map(({ brochure, index }) => (
                <a
                  key={`${brochure.file}-${index}`}
                  href={brochure.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  aria-label={`${dt(`brochures.BROCHURES.${index}.title`, brochure.title)} (${dt(`brochures.BROCHURES.${index}.language`, brochure.language)})`}
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
                      <Dt k={`brochures.BROCHURES.${index}.title`} fallback={brochure.title} />
                    </p>
                    <p className={styles.meta}>
                      <span className={styles.lang}>
                        <Dt
                          k={`brochures.BROCHURES.${index}.language`}
                          fallback={brochure.language}
                        />
                      </span>
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
      </div>
    </section>
  );
}
