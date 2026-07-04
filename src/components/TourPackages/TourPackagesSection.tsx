"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import { COUNTRY_TOURS } from "../DestinationDetail/country-tours-data";
import { getToursForCountry } from "../DestinationDetail/tour-details-data";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";
import { TOUR_PACKAGES_PAGE } from "./tour-packages-data";
import styles from "./TourPackages.module.css";

const INITIAL_TOUR_LIMIT = 6;

type ActiveView = "all" | string;

const COUNTRIES_WITH_META = COUNTRY_TOURS.map((country, countryIndex) => ({
  ...country,
  countryIndex,
  tours: getToursForCountry(country.slug),
}));

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
            sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 25vw"
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
        </div>
      </button>
      <Link href={`/destinations/${slug}`} className={styles.overviewLink}>
        <T k="ui.exploreDestination" fallback="Explore" /> &rarr;
      </Link>
    </article>
  );
}

function TourCard({
  countrySlug,
  tourIndex,
  tour,
}: {
  countrySlug: string;
  tourIndex: number;
  tour: ReturnType<typeof getToursForCountry>[number];
}) {
  const t = useTranslations();

  return (
    <Link
      href={`/destinations/${countrySlug}/${tour.slug}`}
      className={styles.tourCard}
    >
      <div className={styles.tourImageWrap}>
        <Image
          src={tour.image}
          alt={t(
            `tours.byCountry.${countrySlug}.${tourIndex}.title`,
            tour.title,
          )}
          width={640}
          height={480}
          sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 33vw"
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
        <p className={styles.tourExcerpt}>
          <T
            k={`tours.byCountry.${countrySlug}.${tourIndex}.excerpt`}
            fallback={tour.excerpt}
          />
        </p>
        {tour.meta.length > 0 ? (
          <div className={styles.tourMeta}>
            {tour.meta.slice(0, 2).map((item, metaIndex) => (
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
  );
}

export default function TourPackagesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<ActiveView>("all");
  const [showAllTours, setShowAllTours] = useState(false);

  useOurServicesAnimation(sectionRef);

  const activeCountry = useMemo(
    () => COUNTRIES_WITH_META.find((country) => country.slug === activeView),
    [activeView],
  );

  const visibleTours = useMemo(() => {
    if (!activeCountry) return [];
    if (showAllTours) return activeCountry.tours;
    return activeCountry.tours.slice(0, INITIAL_TOUR_LIMIT);
  }, [activeCountry, showAllTours]);

  const selectView = (view: ActiveView) => {
    setActiveView(view);
    setShowAllTours(false);
    requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section ref={sectionRef} className={`section ${styles.page}`}>
      <div className="space-8-small" />
      <div className="w-layout-blockcontainer container w-container">
        <div className={`service-wrapper ${styles.wrapper}`}>
          <div className="section-title-wrapper" data-services-reveal>
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
              <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                <T
                  k="tourPackages.TOUR_PACKAGES_PAGE.description"
                  fallback={TOUR_PACKAGES_PAGE.description}
                />
              </p>
            </div>
          </div>

          <div className={styles.filterBar} data-services-reveal>
            <div className={styles.filterScroll} role="tablist" aria-label="Destinations">
              <button
                type="button"
                role="tab"
                aria-selected={activeView === "all"}
                className={`${styles.filterButton}${activeView === "all" ? ` ${styles.filterButtonActive}` : ""}`}
                onClick={() => selectView("all")}
              >
                <T k="ui.allDestinations" fallback="All destinations" />
              </button>
              {COUNTRIES_WITH_META.map((country) => (
                <button
                  key={country.slug}
                  type="button"
                  role="tab"
                  aria-selected={activeView === country.slug}
                  className={`${styles.filterButton}${activeView === country.slug ? ` ${styles.filterButtonActive}` : ""}`}
                  onClick={() => selectView(country.slug)}
                >
                  <T
                    k={`country.countries.${country.countryIndex}.name`}
                    fallback={country.name}
                  />
                  {country.tours.length > 0 ? (
                    <span className={styles.filterCount}>{country.tours.length}</span>
                  ) : null}
                </button>
              ))}
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
                    fallback="Pick a destination to browse tours — no endless scrolling."
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
                    </p>
                  </div>
                  <Link
                    href={`/destinations/${activeCountry.slug}`}
                    className={styles.groupLink}
                  >
                    <T k="ui.viewAllIn" fallback="View all in" />{" "}
                    <T
                      k={`country.countries.${activeCountry.countryIndex}.name`}
                      fallback={activeCountry.name}
                    />{" "}
                    &rarr;
                  </Link>
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
                            tourIndex={tourIndex}
                            tour={tour}
                          />
                        );
                      })}
                    </div>

                    {activeCountry.tours.length > INITIAL_TOUR_LIMIT ? (
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
    </section>
  );
}
