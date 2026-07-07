"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import { COUNTRY_TOURS } from "../DestinationDetail/country-tours-data";
import { getToursForCountry } from "../DestinationDetail/tour-details-data";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";
import TourReservationModal, {
  type TourReservationTarget,
} from "./TourReservationModal";
import { MOBILE_TOURS_PAGE_SIZE, TOUR_PACKAGES_PAGE } from "./tour-packages-data";
import { RESERVATION_COPY } from "./reservation-data";
import styles from "./TourPackages.module.css";

const INITIAL_TOUR_LIMIT = 6;

type ActiveView = "all" | string;

const COUNTRIES_WITH_META = COUNTRY_TOURS.map((country, countryIndex) => ({
  ...country,
  countryIndex,
  tours: getToursForCountry(country.slug),
}));

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

function CountryOverviewCard({
  slug,
  name,
  heroImage,
  tourCount,
  countryIndex,
  onSelect,
}: {
  slug: string;
  name: string;
  heroImage: string;
  tourCount: number;
  countryIndex: number;
  onSelect: (slug: string) => void;
}) {
  const t = useTranslations();

  return (
    <article className={styles.overviewCard}>
      <button
        type="button"
        className={styles.overviewButton}
        onClick={() => onSelect(slug)}
        aria-label={`${t(`country.countries.${countryIndex}.name`, name)} — ${tourCount} tours`}
      >
        <div className={styles.overviewImageWrap}>
          <Image
            src={heroImage}
            alt=""
            width={480}
            height={320}
            sizes="(max-width: 767px) 50vw, (max-width: 991px) 33vw, 25vw"
            className={styles.image}
          />
        </div>
        <div className={styles.overviewBody}>
          <T
            k={`country.countries.${countryIndex}.name`}
            fallback={name}
            as="h3"
            className={styles.overviewName}
          />
          <span className={styles.overviewCount}>
            {tourCount}{" "}
            {tourCount === 1 ? (
              <T k="ui.tourSingular" fallback="tour" />
            ) : (
              <T k="ui.toursAccent" fallback="Tours" />
            )}
          </span>
          <span className={styles.overviewAction}>
            <T k="ui.browseTours" fallback="Browse tours" /> &rarr;
          </span>
        </div>
      </button>
    </article>
  );
}

function TourCard({
  countrySlug,
  countryName,
  tourIndex,
  tour,
  compact = false,
  onReserve,
}: {
  countrySlug: string;
  countryName: string;
  tourIndex: number;
  tour: ReturnType<typeof getToursForCountry>[number];
  compact?: boolean;
  onReserve: (target: TourReservationTarget) => void;
}) {
  const t = useTranslations();
  const tourTitle = t(`tours.byCountry.${countrySlug}.${tourIndex}.title`, tour.title);

  return (
    <article className={`${styles.tourCard}${compact ? ` ${styles.tourCardCompact}` : ""}`}>
      <Link
        href={`/destinations/${countrySlug}/${tour.slug}?from=tour-packages`}
        className={styles.tourCardLink}
      >
        <div className={styles.tourImageWrap}>
          <Image
            src={tour.image}
            alt={tourTitle}
            width={640}
            height={480}
            sizes="(max-width: 767px) 50vw, (max-width: 991px) 50vw, 33vw"
            className={styles.image}
          />
        </div>
        <div className={styles.tourBody}>
          <T
            k={`tours.byCountry.${countrySlug}.${tourIndex}.title`}
            fallback={tour.title}
            as="h3"
            className={styles.tourTitle}
          />
          {!compact ? (
            <p className={styles.tourExcerpt}>
              <T
                k={`tours.byCountry.${countrySlug}.${tourIndex}.excerpt`}
                fallback={tour.excerpt}
              />
            </p>
          ) : null}
          {tour.meta.length > 0 ? (
            <div className={styles.tourMeta}>
              {tour.meta.slice(0, compact ? 1 : 2).map((item, metaIndex) => (
                <span key={item.label} className={styles.stat}>
                  <strong>
                    <T
                      k={`tours.byCountry.${countrySlug}.${tourIndex}.meta.${metaIndex}.value`}
                      fallback={item.value}
                    />
                  </strong>{" "}
                  <T
                    k={`tours.byCountry.${countrySlug}.${tourIndex}.meta.${metaIndex}.label`}
                    fallback={item.label}
                  />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
      <div className={styles.tourCardActions}>
        <button
          type="button"
          className={styles.reserveButton}
          onClick={() =>
            onReserve({
              countrySlug,
              tourSlug: tour.slug,
              tourTitle,
              countryName,
            })
          }
        >
          <span className={styles.reserveButtonLabel}>
            {t("reservation.button", RESERVATION_COPY.button) || RESERVATION_COPY.button}
          </span>
        </button>
      </div>
    </article>
  );
}

export function TourPackagesSectionContent() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<ActiveView>("all");
  const [showAllTours, setShowAllTours] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileTourPage, setMobileTourPage] = useState(1);
  const [reservationTarget, setReservationTarget] = useState<TourReservationTarget | null>(null);

  useOurServicesAnimation(sectionRef);

  useEffect(() => {
    const country = searchParams.get("country");
    if (country && COUNTRIES_WITH_META.some((item) => item.slug === country)) {
      setActiveView(country);
      return;
    }

    setActiveView("all");
  }, [searchParams]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  const activeCountry = useMemo(
    () => COUNTRIES_WITH_META.find((country) => country.slug === activeView),
    [activeView],
  );

  const mobileTourTotalPages = activeCountry
    ? Math.max(1, Math.ceil(activeCountry.tours.length / MOBILE_TOURS_PAGE_SIZE))
    : 1;

  const visibleTours = useMemo(() => {
    if (!activeCountry) return [];

    if (isMobile) {
      const start = (mobileTourPage - 1) * MOBILE_TOURS_PAGE_SIZE;
      return activeCountry.tours.slice(start, start + MOBILE_TOURS_PAGE_SIZE);
    }

    if (showAllTours) return activeCountry.tours;
    return activeCountry.tours.slice(0, INITIAL_TOUR_LIMIT);
  }, [activeCountry, isMobile, mobileTourPage, showAllTours]);

  const mobileTourPageNumbers = useMemo(
    () => getMobilePageNumbers(mobileTourPage, mobileTourTotalPages),
    [mobileTourPage, mobileTourTotalPages],
  );

  const selectView = (view: ActiveView) => {
    setActiveView(view);
    setShowAllTours(false);
    setMobileTourPage(1);

    const params = new URLSearchParams(searchParams.toString());
    if (view === "all") {
      params.delete("country");
    } else {
      params.set("country", view);
    }

    const query = params.toString();
    router.replace(query ? `/tour-packages?${query}` : "/tour-packages", { scroll: false });

    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const goToMobileTourPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), mobileTourTotalPages);
    setMobileTourPage(nextPage);
  };

  return (
    <section ref={sectionRef} className={`section ${styles.page}`}>
      <div className="w-layout-blockcontainer container w-container">
        <div className={`service-wrapper ${styles.wrapper}`}>
          <div className={`section-title-wrapper ${styles.pageHeader}`} data-services-reveal>
            <div className="badge-wrap">
              <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  <T
                    k="tourPackages.TOUR_PACKAGES_PAGE.badge"
                    fallback={TOUR_PACKAGES_PAGE.badge}
                  />
                </div>
              </div>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-52">
              <h1 className="section-heading night center">
                <T k="ui.tourPackagesHeading.before" fallback="Our Tour" />{" "}
                <span className="text-gradient-orange">
                  <T k="ui.tourPackagesHeading.accent" fallback="Packages" />
                </span>
              </h1>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-41" style={{ margin: "0 auto" }}>
              <p className={`font-1-extra-small ${styles.pageDescription}`}>
                <T
                  k="tourPackages.TOUR_PACKAGES_PAGE.description"
                  fallback={TOUR_PACKAGES_PAGE.description}
                />
              </p>
            </div>
          </div>

          <div ref={contentRef} className={styles.contentPanel}>
            {activeView === "all" ? (
              <div className={styles.overviewSection}>
                <T
                  k="tourPackages.TOUR_PACKAGES_PAGE.countriesTitle"
                  fallback={TOUR_PACKAGES_PAGE.countriesTitle}
                  as="h2"
                  className={styles.panelTitle}
                />
                <p className={styles.panelHint}>
                  <T
                    k="ui.tourPackagesPickCountry"
                    fallback="Tap a country to browse its tours."
                  />
                </p>
                <div className={styles.overviewGrid}>
                  {COUNTRIES_WITH_META.map((country) => (
                    <CountryOverviewCard
                      key={country.slug}
                      slug={country.slug}
                      name={country.name}
                      heroImage={country.heroImage}
                      tourCount={country.tours.length}
                      countryIndex={country.countryIndex}
                      onSelect={selectView}
                    />
                  ))}
                </div>
              </div>
            ) : activeCountry ? (
              <div className={styles.toursSection}>
                <button
                  type="button"
                  className={styles.backButton}
                  onClick={() => selectView("all")}
                >
                  <span aria-hidden="true">←</span>
                  <T k="ui.backToAllDestinations" fallback="All destinations" />
                </button>

                <div className={styles.panelHeader}>
                  <div>
                    <h2 className={styles.panelTitle}>
                      <T
                        k={`country.countries.${activeCountry.countryIndex}.name`}
                        fallback={activeCountry.name}
                      />{" "}
                      <span className="text-gradient-orange">
                        <T k="ui.toursAccent" fallback="Tours" />
                      </span>
                    </h2>
                    <p className={styles.panelHint}>
                      {activeCountry.tours.length}{" "}
                      {activeCountry.tours.length === 1 ? (
                        <T k="ui.tourSingular" fallback="tour" />
                      ) : (
                        <T k="ui.toursAccent" fallback="tours" />
                      )}
                      {isMobile && activeCountry.tours.length > MOBILE_TOURS_PAGE_SIZE ? (
                        <>
                          {" · "}
                          <T k="ui.page" fallback="Page" /> {mobileTourPage}{" "}
                          <T k="ui.pageOf" fallback="of" /> {mobileTourTotalPages}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>

                {activeCountry.tours.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>
                      <T
                        k="ui.noToursForCountry"
                        fallback="Tour programs for this destination are coming soon."
                      />
                    </p>
                    <Link
                      href={`/destinations/${activeCountry.slug}`}
                      className={styles.emptyLink}
                    >
                      <T k="ui.exploreDestination" fallback="Explore destination" /> &rarr;
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className={styles.tourGrid}>
                      {visibleTours.map((tour) => {
                        const tourIndex = activeCountry.tours.findIndex(
                          (item) => item.slug === tour.slug,
                        );

                        return (
                          <TourCard
                            key={tour.slug}
                            countrySlug={activeCountry.slug}
                            countryName={t(
                              `country.countries.${activeCountry.countryIndex}.name`,
                              activeCountry.name,
                            )}
                            tourIndex={tourIndex}
                            tour={tour}
                            compact={isMobile}
                            onReserve={setReservationTarget}
                          />
                        );
                      })}
                    </div>

                    {isMobile && mobileTourTotalPages > 1 ? (
                      <nav
                        className={styles.pagination}
                        aria-label={t("ui.toursPagination", "Tour pages")}
                      >
                        <button
                          type="button"
                          className={styles.pageButton}
                          disabled={mobileTourPage === 1}
                          onClick={() => goToMobileTourPage(mobileTourPage - 1)}
                        >
                          <T k="ui.previousPage" fallback="Previous" />
                        </button>

                        <div className={styles.pageNumbers}>
                          {mobileTourPageNumbers.map((entry, entryIndex) =>
                            entry === "ellipsis" ? (
                              <span
                                key={`ellipsis-${entryIndex}`}
                                className={styles.pageEllipsis}
                                aria-hidden="true"
                              >
                                …
                              </span>
                            ) : (
                              <button
                                key={entry}
                                type="button"
                                className={`${styles.pageNumber}${entry === mobileTourPage ? ` ${styles.pageNumberActive}` : ""}`}
                                aria-current={entry === mobileTourPage ? "page" : undefined}
                                onClick={() => goToMobileTourPage(entry)}
                              >
                                {entry}
                              </button>
                            ),
                          )}
                        </div>

                        <button
                          type="button"
                          className={styles.pageButton}
                          disabled={mobileTourPage === mobileTourTotalPages}
                          onClick={() => goToMobileTourPage(mobileTourPage + 1)}
                        >
                          <T k="ui.nextPage" fallback="Next" />
                        </button>
                      </nav>
                    ) : null}

                    {!isMobile && activeCountry.tours.length > INITIAL_TOUR_LIMIT ? (
                      <div className={styles.showMoreWrap}>
                        <button
                          type="button"
                          className={styles.showMoreButton}
                          onClick={() => setShowAllTours((value) => !value)}
                          aria-expanded={showAllTours}
                        >
                          {showAllTours ? (
                            <T k="ui.showLess" fallback="Show less" />
                          ) : (
                            <>
                              <T k="ui.showMoreTours" fallback="Show all" />{" "}
                              {activeCountry.tours.length}{" "}
                              <T k="ui.toursAccent" fallback="tours" />
                            </>
                          )}
                        </button>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="space-8-small" />
      <TourReservationModal
        target={reservationTarget}
        onClose={() => setReservationTarget(null)}
      />
    </section>
  );
}

export default function TourPackagesSection() {
  return (
    <Suspense fallback={null}>
      <TourPackagesSectionContent />
    </Suspense>
  );
}
