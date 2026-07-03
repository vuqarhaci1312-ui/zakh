"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import type { CaladanResortDetail } from "./caladan-resort-data";

function SliderArrowIcon() {
  return (
    <>
      <div className="icon_slider-button large w-embed">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="icon_slider-button medium w-embed">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

export default function GallerySlider({
  images,
}: {
  images: CaladanResortDetail["gallerySlides"];
}) {
  const dt = useDt();
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    gsap.set(track, { xPercent: 0 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    gsap.to(track, {
      xPercent: -100 * activeIndex,
      duration: 1,
      ease: "circ.out",
    });
  }, [activeIndex]);

  return (
    <div data-delay="4000" data-animation="slide" className="slider w-slider">
      <div className="mask_resort-testimonials w-slider-mask gallery-slider-mask">
        <div ref={trackRef} className="gallery-slider-track">
          {images.map((image) => (
            <div key={image} className="slide_inner-resort w-slide gallery-slide">
              <a href={image} className="lightbox_resort-gallery w-inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  loading="lazy"
                  alt=""
                  className="image_cover is-parallax"
                  data-detail-parallax
                />
              </a>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label={dt("ui.previousSlide", "Previous slide")}
        className="button_slider-bottom w-slider-arrow-left"
        onClick={goPrev}
      >
        <div className="slider_button w-variant-3b1d5b2f-3e5d-c467-6981-e7b261b76e46">
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
        className="button_slider-bottom w-slider-arrow-right"
        onClick={goNext}
      >
        <div className="slider_button w-variant-3b1d5b2f-3e5d-c467-6981-e7b261b76e46">
          <div className="wrao_icon-slider">
            <div className="icon_slider">
              <SliderArrowIcon />
            </div>
          </div>
        </div>
      </button>
      <div className="hide w-slider-nav w-round w-num" />
    </div>
  );
}
