"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { useTranslations } from "@/contexts/TranslationsContext";
import {
  createCountryTranslator,
  createTourTranslator,
} from "@/lib/i18n/content-translators";
import { COUNTRY_TOURS } from "./country-tours-data";
import type { DestinationDetailData } from "./destination-detail-data";
import FaqAccordion from "./FaqAccordion";
import GallerySlider from "./GallerySlider";
import { useDestinationDetailAnimation } from "./useDestinationDetailAnimation";

function StarIcon() {
  return (
    <div className="star-testimonial w-embed">
      <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7.68323 1.53009C7.71245 1.47107 7.75758 1.42138 7.81353 1.38664C7.86949 1.3519 7.93404 1.3335 7.9999 1.3335C8.06576 1.3335 8.13031 1.3519 8.18626 1.38664C8.24222 1.42138 8.28735 1.47107 8.31656 1.53009L9.85656 4.64943C9.95802 4.85474 10.1078 5.03236 10.293 5.16706C10.4782 5.30176 10.6933 5.3895 10.9199 5.42276L14.3639 5.92676C14.4292 5.93621 14.4905 5.96374 14.5409 6.00622C14.5913 6.04871 14.6289 6.10446 14.6492 6.16716C14.6696 6.22987 14.6721 6.29703 14.6563 6.36105C14.6405 6.42507 14.6071 6.48339 14.5599 6.52943L12.0692 8.95476C11.905 9.11483 11.7821 9.31241 11.7111 9.53051C11.6402 9.74861 11.6233 9.98069 11.6619 10.2068L12.2499 13.6334C12.2614 13.6987 12.2544 13.7658 12.2296 13.8272C12.2048 13.8886 12.1632 13.9418 12.1096 13.9808C12.056 14.0197 11.9926 14.0428 11.9265 14.0474C11.8604 14.052 11.7944 14.0379 11.7359 14.0068L8.65723 12.3881C8.45438 12.2816 8.22868 12.2259 7.99956 12.2259C7.77044 12.2259 7.54475 12.2816 7.3419 12.3881L4.2639 14.0068C4.20545 14.0377 4.1395 14.0516 4.07353 14.0469C4.00757 14.0422 3.94424 14.0191 3.89076 13.9802C3.83728 13.9413 3.79579 13.8882 3.771 13.8269C3.74622 13.7656 3.73914 13.6986 3.75056 13.6334L4.3379 10.2074C4.3767 9.98125 4.35989 9.74902 4.28892 9.53079C4.21796 9.31256 4.09497 9.11486 3.93056 8.95476L1.4399 6.53009C1.39229 6.48411 1.35856 6.42569 1.34254 6.36147C1.32652 6.29726 1.32886 6.22984 1.34928 6.16689C1.36971 6.10393 1.40741 6.04799 1.45808 6.00541C1.50876 5.96284 1.57037 5.93536 1.6359 5.92609L5.07923 5.42276C5.30607 5.38976 5.52149 5.30213 5.70695 5.16742C5.89242 5.0327 6.04237 4.85494 6.1439 4.64943L7.68323 1.53009Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function AreaIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M14 15H9v-5" />
        <path d="M16 3h5v5" />
        <path d="M21 3 9 15" />
      </svg>
    </div>
  );
}

function BedIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    </div>
  );
}

function UsersIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <path d="M16 3.128a4 4 0 0 1 0 7.744" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    </div>
  );
}

const RELATED_ICONS = [AreaIcon, BedIcon, UsersIcon] as const;

export default function DestinationDetail({ data }: { data: DestinationDetailData }) {
  const t = useTranslations();
  const rootRef = useRef<HTMLDivElement>(null);
  useDestinationDetailAnimation(rootRef);

  const countryIndex = COUNTRY_TOURS.findIndex((country) => country.slug === data.slug);
  const ct = createCountryTranslator(t, data.slug, countryIndex >= 0 ? countryIndex : 0);
  const countryName = ct.field("name", COUNTRY_TOURS[countryIndex]?.name ?? data.slug);
  const hasTours = data.tours.length > 0;

  const translatedFaqs = useMemo(
    () =>
      data.faqs.map((item, index) => ({
        question: hasTours
          ? t(`country.generalFaqs.${index}.question`, item.question)
          : ct.faq(index, "question", item.question),
        answer: hasTours
          ? t(`country.generalFaqs.${index}.answer`, item.answer)
          : ct.faq(index, "answer", item.answer),
      })),
    [ct, data.faqs, hasTours, t],
  );

  return (
    <div ref={rootRef} className="destination-detail-root">
      <section className="section_hero-resort">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="w-layout-grid grid_resort">
              <div className="content_resort">
                <div className="wrap_image-resort" data-detail-reveal>
                  <div className="inner_image-resort">
                    <div className="master_label w-variant-84e91bde-75c3-dd4c-a083-7846b4ae6170">
                      <div className="label-small">
                        {t("ui.tourPackage", data.tag)}
                      </div>
                    </div>
                    <div className="wrap_small-gallery">
                      <div className="wrap_lightbox-resort">
                        {data.galleryThumbs.map((thumb) => (
                          <a
                            key={thumb}
                            href={thumb}
                            className="lightbox_resort w-inline-block"
                            data-detail-thumb
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={thumb} loading="lazy" alt="" className="image_cover" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="image_resort">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.heroImage}
                      loading="lazy"
                      alt=""
                      className="image_cover is-parallax"
                      data-detail-parallax
                    />
                  </div>
                </div>

                <div className="wrap_text-resort" data-detail-reveal>
                  <h1 className="heading-style-h3">
                    {countryName} {t("ui.tourPackagesEyebrow.before", "Tour")}{" "}
                    <span className="text-gradient-orange">
                      {t("ui.packagesAccent", "Packages")}
                    </span>
                  </h1>
                  <p className="margin-0 tone-medium">
                    {ct.field("description", data.description)}
                  </p>
                </div>

                <div className="resort_amenities">
                  <div className="text-size-large text_body-bold">
                    {t("ui.amenities", "Amenities")}
                  </div>
                  <div className="amenities">
                    <div className="grid_amenities">
                      {data.amenities.map((amenity, index) => (
                        <div key={amenity.label} className="tile_amenity" data-detail-amenity>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={amenity.icon} loading="lazy" alt="" className="icon_amenity" />
                          <div>
                            {t(
                              `caladan.CALADAN_RESORT_DETAIL.amenities.${index}.label`,
                              amenity.label,
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="resort_amenities" data-detail-reveal>
                  <div className="text-size-large text_body-bold">
                    {t("ui.reviews", "Reviews")}
                  </div>
                  <div className="content_card-testimonials-v3">
                    <div className="testimonial-v3_top-tile">
                      <div className="rating_testimonial">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} />
                        ))}
                      </div>
                      <div className="testimonial-v3_text-tile">
                        <div className="text-size-large text_body-bold">
                          {t(
                            "caladan.CALADAN_RESORT_DETAIL.review.headline",
                            data.review.headline,
                          )}
                        </div>
                        <p className="tone-medium margin-0">
                          &quot;
                          {t("caladan.CALADAN_RESORT_DETAIL.review.quote", data.review.quote)}
                          &quot;
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-v3_bottom-tile">
                      <div className="text_body-bold">
                        {t("caladan.CALADAN_RESORT_DETAIL.review.name", data.review.name)}
                      </div>
                      <div className="tone-medium">
                        {t("caladan.CALADAN_RESORT_DETAIL.review.role", data.review.role)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="resort_amenities" data-detail-reveal>
                  <div className="text-size-large text_body-bold">
                    {t("ui.gallery", "Gallery")}
                  </div>
                  <GallerySlider images={data.gallerySlides} />
                </div>

                <div className="resort_amenities" data-detail-reveal>
                  <div className="text-size-large text_body-bold">
                    {data.faqsTitle ? t("ui.faqs", data.faqsTitle) : t("ui.faqs", "FAQs")}
                  </div>
                  <FaqAccordion items={translatedFaqs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {data.tours.length > 0 && (
        <section className="section_more-resorts">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="headline_more-resorts" data-detail-reveal>
                <h2 className="margin-0">
                  {countryName} {t("ui.toursAccent", "Tours")}{" "}
                  <span className="tone-medium">({data.tours.length})</span>
                </h2>
              </div>
              <div className="resorts">
                <div className="grid_resorts">
                  {data.tours.map((tour, tourIndex) => {
                    const tt = createTourTranslator(t, data.slug, tourIndex);
                    return (
                      <Link
                        key={tour.slug}
                        href={`/destinations/${data.slug}/${tour.slug}`}
                        className="card_resort-v1 w-inline-block"
                        data-detail-related-card
                      >
                        <div className="image_resort-v1">
                          <div className="overlay_resort-card-v1">
                            <div className="master_label w-variant-84e91bde-75c3-dd4c-a083-7846b4ae6170">
                              <div className="label-small">
                                {tt.meta(0, "value", tour.stats[0]?.value ?? t("ui.tours", "Tour"))}
                              </div>
                            </div>
                          </div>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tour.image}
                            loading="lazy"
                            alt={tt.field("title", tour.title)}
                            className="image_cover is-parallax"
                            data-detail-parallax
                          />
                        </div>
                        <div className="wrap_content-resort-v1">
                          <div className="text-size-large text_body-bold text-gradient-orange">
                            {tt.field("title", tour.title)}
                          </div>
                          <p className="margin-0 tone-medium">
                            {tt.field("excerpt", tour.excerpt)}
                          </p>
                          <div className="card-resort_info-tile-v1">
                            {tour.stats.map((stat, index) => {
                              const Icon = RELATED_ICONS[index] ?? UsersIcon;
                              return (
                                <div key={stat.label} className="tile_room-summary">
                                  <Icon />
                                  <div className="wrap_text-room-summary">
                                    <div>{tt.meta(index, "value", stat.value)}</div>
                                    <div className="tone-medium">
                                      {tt.meta(index, "label", stat.label)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section_more-resorts">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="headline_more-resorts" data-detail-reveal>
              <h2 className="margin-0">
                {t("ui.moreDestinations.before", "More")}{" "}
                <span className="tone-medium">
                  {t("ui.moreDestinations.accent", "Destinations")}
                </span>
              </h2>
            </div>
            <div className="resorts">
              <div className="grid_resorts">
                {data.related.map((resort) => {
                  const relatedIndex = COUNTRY_TOURS.findIndex((c) => c.slug === resort.slug);
                  const relatedName =
                    relatedIndex >= 0
                      ? t(
                          `country.countries.${relatedIndex}.name`,
                          COUNTRY_TOURS[relatedIndex].name,
                        )
                      : resort.title;
                  return (
                    <Link
                      key={resort.slug}
                      href={`/destinations/${resort.slug}`}
                      className="card_resort-v1 w-inline-block"
                      data-detail-related-card
                    >
                      <div className="image_resort-v1">
                        <div className="overlay_resort-card-v1">
                          <div className="master_label w-variant-84e91bde-75c3-dd4c-a083-7846b4ae6170">
                            <div className="label-small">
                              {t("ui.tourPackage", resort.tag)}
                            </div>
                          </div>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={resort.image}
                          loading="lazy"
                          alt=""
                          className="image_cover is-parallax"
                          data-detail-parallax
                        />
                      </div>
                      <div className="wrap_content-resort-v1">
                        <div className="text-size-large text_body-bold text-gradient-orange">
                          {relatedName} {t("ui.toursAccent", "Tours")}
                        </div>
                        <div className="card-resort_info-tile-v1">
                          {resort.stats.map((stat, index) => {
                            const Icon = RELATED_ICONS[index] ?? UsersIcon;
                            const rct =
                              relatedIndex >= 0
                                ? createCountryTranslator(t, resort.slug, relatedIndex)
                                : null;
                            return (
                              <div key={stat.label} className="tile_room-summary">
                                <Icon />
                                <div className="wrap_text-room-summary">
                                  <div>
                                    {rct ? rct.stat(index, "value", stat.value) : stat.value}
                                  </div>
                                  <div>
                                    {rct ? rct.stat(index, "label", stat.label) : stat.label}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
