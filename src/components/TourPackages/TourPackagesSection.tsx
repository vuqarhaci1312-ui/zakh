"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useTranslations } from "@/contexts/TranslationsContext";
import { createCountryTranslator, createTourTranslator } from "@/lib/i18n/content-translators";
import { DestinationArrowIcon } from "../ExploreDestinations/DestinationArrowIcon";
import { COUNTRY_TOURS } from "../DestinationDetail/country-tours-data";
import { getToursForCountry } from "../DestinationDetail/tour-details-data";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";
import { TOUR_PACKAGES_PAGE } from "./tour-packages-data";
import styles from "./TourPackages.module.css";

function CountryCard({
  slug,
  name,
  heroImage,
  stats,
  countryIndex,
}: {
  slug: string;
  name: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  countryIndex: number;
}) {
  const t = useTranslations();
  const ct = createCountryTranslator(t, slug, countryIndex);

  return (
    <Link href={`/destinations/${slug}`} className={styles.countryCard} data-experience-card>
      <div className={styles.imageWrap}>
        <Image
          src={heroImage}
          alt={ct.field("name", name)}
          width={800}
          height={600}
          sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.countryBody}>
        <div className={styles.countryTop}>
          <div>
            <p className={styles.eyebrow}>
              {t("ui.tourPackagesEyebrow.before", "Tour")}{" "}
              <span className="text-gradient-orange">
                {t("ui.tourPackagesEyebrow.accent", "Packages")}
              </span>
            </p>
            <h3 className={`${styles.countryName} text-gradient-orange`}>
              {ct.field("name", name)}
            </h3>
          </div>
          <span className={styles.arrowButton} aria-hidden="true">
            <DestinationArrowIcon />
          </span>
        </div>
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <span key={stat.label} className={styles.stat}>
              <strong>{ct.stat(index, "value", stat.value)}</strong>{" "}
              {ct.stat(index, "label", stat.label)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function TourPackagesSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  const countriesWithTours = COUNTRY_TOURS.map((country) => ({
    ...country,
    tours: getToursForCountry(country.slug),
  }));

  return (
    <section ref={sectionRef} className={`section ${styles.page}`}>
      <div className="space-8-small" />
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="section-title-wrapper" data-services-reveal>
            <div className="badge-wrap">
              <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  {t("tourPackages.TOUR_PACKAGES_PAGE.badge", TOUR_PACKAGES_PAGE.badge)}
                </div>
              </div>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-52">
              <h1 className="section-heading night center">
                {t("ui.tourPackagesHeading.before", "Our Tour")}{" "}
                <span className="text-gradient-orange">
                  {t("ui.tourPackagesHeading.accent", "Packages")}
                </span>
              </h1>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-41" style={{ margin: "0 auto" }}>
              <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                {t(
                  "tourPackages.TOUR_PACKAGES_PAGE.description",
                  TOUR_PACKAGES_PAGE.description,
                )}
              </p>
            </div>
          </div>

          <div>
            <h2 className="section-heading night" data-services-reveal>
              {t(
                "tourPackages.TOUR_PACKAGES_PAGE.countriesTitle",
                TOUR_PACKAGES_PAGE.countriesTitle,
              )}
            </h2>
            <div className="space-2-normal" />
            <div className={styles.countryGrid}>
              {COUNTRY_TOURS.map((country, index) => (
                <CountryCard
                  key={country.slug}
                  slug={country.slug}
                  name={country.name}
                  heroImage={country.heroImage}
                  stats={country.stats}
                  countryIndex={index}
                />
              ))}
            </div>
          </div>

          {countriesWithTours
            .filter((country) => country.tours.length > 0)
            .map((country) => {
              const countryIndex = COUNTRY_TOURS.findIndex((c) => c.slug === country.slug);
              const ct = createCountryTranslator(
                t,
                country.slug,
                countryIndex >= 0 ? countryIndex : 0,
              );
              const countryName = ct.field("name", country.name);

              return (
                <div key={country.slug} className={styles.countryGroup}>
                  <div className={styles.groupHeader} data-services-reveal>
                    <h2 className={styles.groupTitle}>
                      {countryName}{" "}
                      <span className="text-gradient-orange">
                        {t("ui.toursAccent", "Tours")}
                      </span>
                    </h2>
                    <Link href={`/destinations/${country.slug}`} className={styles.groupLink}>
                      {t("ui.viewAllIn", "View all in")} {countryName} &rarr;
                    </Link>
                  </div>
                  <div className={styles.tourGrid}>
                    {country.tours.map((tour, tourIndex) => {
                      const tt = createTourTranslator(t, country.slug, tourIndex);
                      return (
                        <Link
                          key={tour.slug}
                          href={`/destinations/${country.slug}/${tour.slug}`}
                          className={styles.tourCard}
                          data-experience-card
                        >
                          <div className={styles.imageWrap}>
                            <Image
                              src={tour.image}
                              alt={tt.field("title", tour.title)}
                              width={640}
                              height={480}
                              sizes="(max-width: 639px) 100vw, (max-width: 991px) 50vw, 33vw"
                              className={styles.image}
                            />
                          </div>
                          <div className={styles.tourBody}>
                            <h3 className={`${styles.tourTitle} text-gradient-orange`}>
                              {tt.field("title", tour.title)}
                            </h3>
                            <p className={styles.tourExcerpt}>
                              {tt.field("excerpt", tour.excerpt)}
                            </p>
                            {tour.meta.length > 0 ? (
                              <div className={styles.stats}>
                                {tour.meta.slice(0, 2).map((item, metaIndex) => (
                                  <span key={item.label} className={styles.stat}>
                                    <strong>{tt.meta(metaIndex, "value", item.value)}</strong>{" "}
                                    {tt.meta(metaIndex, "label", item.label)}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
