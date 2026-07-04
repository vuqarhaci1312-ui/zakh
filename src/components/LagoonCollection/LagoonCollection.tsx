"use client";

import Link from "next/link";
import { IBM_Plex_Mono } from "next/font/google";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { SliderArrowIcon } from "./LagoonCollectionIcons";
import {
  LAGOON_COLLECTION_TITLE,
  LAGOON_COLLECTION_TITLE_ACCENT,
  POPULAR_TOUR_ITEMS,
} from "./lagoon-collection-data";
import "./lagoon-collection.css";
import { useLagoonCollectionAnimation } from "./useLagoonCollectionAnimation";
import { useLagoonCollectionSlider } from "./useLagoonCollectionSlider";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

function TourSlideCard({
  href,
  image,
  imageAlt,
  index,
}: Pick<(typeof POPULAR_TOUR_ITEMS)[number], "href" | "image" | "imageAlt"> & {
  index: number;
}) {
  const dt = useDt();
  const alt = dt(`lagoon.POPULAR_TOUR_ITEMS.${index}.imageAlt`, imageAlt);

  return (
    <div className="resorts w-dyn-list">
      <div role="list" className="w-dyn-items">
        <div role="listitem" className="w-dyn-item">
          <Link href={href} className="card_resort-slide w-inline-block" aria-label={alt}>
            <div className="image_resort-slide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                loading="eager"
                alt={alt}
                className="image_cover lagoon-tour-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LagoonCollection() {
  const dt = useDt();
  const { locale } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const { maskRef, trackRef, goPrev, goNext } = useLagoonCollectionSlider(
    POPULAR_TOUR_ITEMS.length,
    locale,
  );

  useLagoonCollectionAnimation(rootRef);

  return (
    <div
      ref={rootRef}
      className={`caladan-page caladan-lagoon home-a_rest-content ${ibmPlexMono.variable}`}
    >
      <section className="section_resorts-slider">
        <div className="padding-global">
          <div className="w-layout-blockcontainer container-large w-container">
            <div className="headline_resorts-slider">
              <div className="heading_resorts-slider" data-lagoon-headline>
                <h2 className="margin-0">
                  <Dt k="lagoon.LAGOON_COLLECTION_TITLE" fallback={LAGOON_COLLECTION_TITLE} />{" "}
                  <span className="lagoon-title-accent">
                    <Dt
                      k="lagoon.LAGOON_COLLECTION_TITLE_ACCENT"
                      fallback={LAGOON_COLLECTION_TITLE_ACCENT}
                    />
                  </span>
                </h2>
              </div>
            </div>

            <div className="master_slider">
              <div className="shadow_slider" />
              <div
                data-delay="3000"
                data-animation="slide"
                className="slider resorts-centered w-slider"
                data-autoplay="true"
                data-easing="ease-in-out"
                data-hide-arrows="false"
                data-disable-swipe="false"
                data-autoplay-limit="0"
                data-nav-spacing="3"
                data-duration="500"
                data-infinite="true"
              >
                <div ref={maskRef} className="mask_resorts-v1 w-slider-mask">
                  <div ref={trackRef} className="lagoon-slider-track">
                    {POPULAR_TOUR_ITEMS.map((item, index) => (
                      <div key={item.id} className="slide_resorts-v1 w-slide">
                        <TourSlideCard {...item} index={index} />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={dt("ui.previousSlide", "Previous slide")}
                  className="button_slider-resorts-centered prev w-slider-arrow-left"
                  onClick={goPrev}
                >
                  <div className="slider_button">
                    <div className="wrao_icon-slider w-variant-5ba9241a-7079-4c4d-345e-a0127f34962f">
                      <div className="icon_slider">
                        <SliderArrowIcon />
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  aria-label={dt("ui.nextSlide", "Next slide")}
                  className="button_slider-resorts-centered next w-slider-arrow-right"
                  onClick={goNext}
                >
                  <div className="slider_button">
                    <div className="wrao_icon-slider">
                      <div className="icon_slider">
                        <SliderArrowIcon />
                      </div>
                    </div>
                  </div>
                </button>

                <div className="hide w-slider-nav w-round w-num" />
              </div>
              <div className="shadow_slider right" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
