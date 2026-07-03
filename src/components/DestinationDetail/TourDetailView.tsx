"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { useTranslations } from "@/contexts/TranslationsContext";
import { createTourTranslator } from "@/lib/i18n/content-translators";
import type { TourDetail } from "./tour-details-data";
import { useDestinationDetailAnimation } from "./useDestinationDetailAnimation";

function ClockIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    </div>
  );
}

function MapPinIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
  );
}

function GlobeIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    </div>
  );
}

const META_ICONS = [ClockIcon, MapPinIcon, GlobeIcon] as const;

function CheckIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </div>
  );
}

function CrossIcon() {
  return (
    <div className="icon_summary w-embed">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </div>
  );
}

export type TourDetailViewProps = {
  countrySlug: string;
  countryName: string;
  tour: TourDetail;
  tourIndex: number;
  otherTours: {
    slug: string;
    title: string;
    excerpt: string;
    image: string;
    index: number;
  }[];
};

export default function TourDetailView({
  countrySlug,
  countryName,
  tour,
  tourIndex,
  otherTours,
}: TourDetailViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const tt = useMemo(
    () => createTourTranslator(t, countrySlug, tourIndex),
    [t, countrySlug, tourIndex],
  );
  useDestinationDetailAnimation(rootRef);

  const title = tt.field("title", tour.title);
  const excerpt = tt.field("excerpt", tour.excerpt);

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
                      <div className="label-small">{countryName}</div>
                    </div>
                  </div>
                  <div className="image_resort">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tour.image}
                      loading="eager"
                      alt={title}
                      className="image_cover is-parallax"
                      data-detail-parallax
                    />
                  </div>
                </div>

                <div className="wrap_text-resort" data-detail-reveal>
                  <h1 className="heading-style-h3 text-gradient-orange">{title}</h1>
                  <p className="margin-0 tone-medium">{excerpt}</p>
                </div>

                <div className="resort_amenities" data-detail-reveal>
                  <div className="text-size-large text_body-bold">
                    {t("ui.tourDetails", "Tour Details")}
                  </div>
                  <div className="card-resort_info-tile-v1" style={{ flexWrap: "wrap", rowGap: "0.75rem" }}>
                    {tour.meta.map((item, index) => {
                      const Icon = META_ICONS[index % META_ICONS.length];
                      return (
                        <div key={item.label} className="tile_room-summary" data-detail-amenity>
                          <Icon />
                          <div className="wrap_text-room-summary">
                            <div className="text_body-bold">
                              {tt.meta(index, "value", item.value)}
                            </div>
                            <div className="tone-medium">
                              {tt.meta(index, "label", item.label)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {tour.sections.map((section, index) => (
                  <div className="resort_amenities" data-detail-reveal key={index}>
                    {section.heading && (
                      <div className="text-size-large text_body-bold">
                        {tt.section(index, "heading", section.heading)}
                      </div>
                    )}
                    <p className="margin-0 tone-medium" style={{ whiteSpace: "pre-line" }}>
                      {tt.section(index, "body", section.body)}
                    </p>
                  </div>
                ))}

                {tour.packages && tour.packages.length > 0 && (
                  <div className="resort_amenities" data-detail-reveal>
                    <div className="text-size-large text_body-bold">
                      {t("ui.transportPackages", "Transport Packages")}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {tour.packages.map((pkg, index) => (
                        <p key={pkg} className="margin-0 tone-medium">
                          {tt.packageLine(index, pkg)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {(tour.inclusions?.length || tour.exclusions?.length) && (
                  <div className="resort_amenities" data-detail-reveal>
                    <div className="text-size-large text_body-bold">
                      {t("ui.inclusionsExclusions", "Inclusions & Exclusions")}
                    </div>
                    <div className="grid_amenities" style={{ gridTemplateColumns: "1fr 1fr" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {tour.inclusions?.map((item, index) => (
                          <div key={item} className="tile_amenity" data-detail-amenity>
                            <CheckIcon />
                            <div>{tt.inclusion(index, item)}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {tour.exclusions?.map((item, index) => (
                          <div key={item} className="tile_amenity tone-medium" data-detail-amenity>
                            <CrossIcon />
                            <div>{tt.exclusion(index, item)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="resort_amenities" data-detail-reveal>
                  <div className="text-size-large text_body-bold">
                    {t("ui.booking", "Booking")}
                  </div>
                  <p className="margin-0 tone-medium">
                    {tour.price ? `${tt.field("price", tour.price)}. ` : ""}
                    {t(
                      "ui.bookingContact",
                      "For reservation please contact us: incoming@zakher.travel or +994 12 310 09 32. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {otherTours.length > 0 && (
        <section className="section_more-resorts">
          <div className="padding-global">
            <div className="w-layout-blockcontainer container-large w-container">
              <div className="headline_more-resorts" data-detail-reveal>
                <h2 className="margin-0">
                  More <span className="tone-medium">{countryName} {t("ui.tours", "Tours")}</span>
                </h2>
              </div>
              <div className="resorts">
                <div className="grid_resorts">
                  {otherTours.map((other) => {
                    const otherTt = createTourTranslator(t, countrySlug, other.index);
                    return (
                    <Link
                      key={other.slug}
                      href={`/destinations/${countrySlug}/${other.slug}`}
                      className="card_resort-v1 w-inline-block"
                      data-detail-related-card
                    >
                      <div className="image_resort-v1">
                        <div className="overlay_resort-card-v1">
                          <div className="master_label w-variant-84e91bde-75c3-dd4c-a083-7846b4ae6170">
                            <div className="label-small">{countryName}</div>
                          </div>
                        </div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={other.image}
                          loading="lazy"
                          alt={otherTt.field("title", other.title)}
                          className="image_cover is-parallax"
                          data-detail-parallax
                        />
                      </div>
                      <div className="wrap_content-resort-v1">
                        <div className="text-size-large text_body-bold text-gradient-orange">
                          {otherTt.field("title", other.title)}
                        </div>
                        <p className="margin-0 tone-medium">
                          {otherTt.field("excerpt", other.excerpt)}
                        </p>
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
    </div>
  );
}
