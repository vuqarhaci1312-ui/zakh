"use client";

import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { BROCHURES, BROCHURES_SECTION } from "./brochures-data";
import { BrochureTitle } from "./TitleWithGradient";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

export default function BrochuresSection() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="service-title-wrapper" data-services-reveal>
            <div className="service-title-left">
              <div className="badge-wrap">
                <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                    {dt("brochures.BROCHURES_SECTION.badge", BROCHURES_SECTION.badge)}
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  {dt("ui.brochuresHeading.before", "Download our")}{" "}
                  <span className="text-gradient-orange">
                    {dt("ui.brochuresHeading.accent", "tour catalogs")}
                  </span>
                  {dt("ui.brochuresHeading.after", " and booklets.")}
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                {dt("brochures.BROCHURES_SECTION.description", BROCHURES_SECTION.description)}
              </p>
            </div>
          </div>
          <div className="space-3-medium" />
          <div className="w-layout-grid service-bottom-grid">
            {BROCHURES.map((brochure, index) => (
              <a
                key={`${brochure.file}-${index}`}
                href={brochure.file}
                target="_blank"
                rel="noopener noreferrer"
                className="service-grid-card"
                style={{ textDecoration: "none" }}
                data-experience-card
              >
                <div className="service-card-top">
                  <div className="card-badge">
                    <div className="badge-text bg-2">
                      {dt(`brochures.BROCHURES.${index}.language`, brochure.language)}
                    </div>
                  </div>
                  <div className="service-image-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={brochure.image}
                      loading="lazy"
                      alt={`${dt(`brochures.BROCHURES.${index}.title`, brochure.title)} (${dt(`brochures.BROCHURES.${index}.language`, brochure.language)})`}
                      className="experience-image"
                    />
                  </div>
                </div>
                <div className="service-content-wrapper">
                  <div className="font-1-medium pearl">
                    <BrochureTitle title={dt(`brochures.BROCHURES.${index}.title`, brochure.title)} />
                  </div>
                  <div className="max-width-20">
                    <p className="font-1-extra-small">
                      {dt(`brochures.BROCHURES.${index}.language`, brochure.language)} &middot; PDF &darr;
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
