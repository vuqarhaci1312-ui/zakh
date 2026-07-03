"use client";

import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { TRAVEL_EXPERIENCES, TRAVEL_EXPERIENCES_SECTION } from "./our-services-data";
import TitleWithGradient from "./TitleWithGradient";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

export default function TravelExperiencesSection() {
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
                    {dt("services.TRAVEL_EXPERIENCES_SECTION.badge", TRAVEL_EXPERIENCES_SECTION.badge)}
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  {dt("ui.experiencesHeading.before", "Discover our most requested")}{" "}
                  <span className="text-gradient-orange">
                    {dt("ui.experiencesHeading.accent", "tour packages")}
                  </span>
                  {dt("ui.experiencesHeading.after", ".")}
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                {dt(
                  "services.TRAVEL_EXPERIENCES_SECTION.description",
                  TRAVEL_EXPERIENCES_SECTION.description,
                )}
              </p>
            </div>
          </div>
          <div className="space-3-medium" />
          <div className="w-layout-grid service-bottom-grid">
            {TRAVEL_EXPERIENCES.map((experience, index) => (
              <div
                key={experience.badge}
                className={`service-grid-card${experience.hideMobile ? " hide-mobile" : ""}`}
                data-experience-card
              >
                <div className="service-card-top">
                  <div className="card-badge">
                    <div className="badge-text bg-2">
                      {dt(`services.TRAVEL_EXPERIENCES.${index}.badge`, experience.badge)}
                    </div>
                  </div>
                  <div className="service-image-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={experience.image}
                      loading="lazy"
                      sizes="100vw"
                      srcSet={experience.imageSrcSet}
                      alt={dt(`services.TRAVEL_EXPERIENCES.${index}.alt`, experience.alt)}
                      className="experience-image"
                    />
                  </div>
                </div>
                <div className="service-content-wrapper">
                  <div className="font-1-medium pearl">
                    <TitleWithGradient
                      title={dt(`services.TRAVEL_EXPERIENCES.${index}.title`, experience.title)}
                      accent={
                        experience.titleAccent
                          ? dt(
                              `services.TRAVEL_EXPERIENCES.${index}.titleAccent`,
                              experience.titleAccent,
                            )
                          : undefined
                      }
                    />
                  </div>
                  <div className="max-width-20">
                    <p className="font-1-extra-small">
                      {dt(
                        `services.TRAVEL_EXPERIENCES.${index}.description`,
                        experience.description,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
