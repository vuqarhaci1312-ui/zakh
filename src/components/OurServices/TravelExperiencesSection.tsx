"use client";

import { useRef } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { TRAVEL_EXPERIENCES, TRAVEL_EXPERIENCES_SECTION } from "./our-services-data";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

function ExperienceTitle({
  index,
  title,
  titleAccent,
}: {
  index: number;
  title: string;
  titleAccent?: string;
}) {
  if (!titleAccent || !title.includes(titleAccent)) {
    return <Dt k={`services.TRAVEL_EXPERIENCES.${index}.title`} fallback={title} />;
  }

  const accentIndex = title.indexOf(titleAccent);
  const before = title.slice(0, accentIndex);
  const after = title.slice(accentIndex + titleAccent.length);

  return (
    <>
      {before}
      <span className="text-gradient-orange">
        <Dt k={`services.TRAVEL_EXPERIENCES.${index}.titleAccent`} fallback={titleAccent} />
      </span>
      {after}
    </>
  );
}

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
                    <Dt
                      k="services.TRAVEL_EXPERIENCES_SECTION.badge"
                      fallback={TRAVEL_EXPERIENCES_SECTION.badge}
                    />
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  <Dt k="ui.experiencesHeading.before" fallback="Discover our most requested" />{" "}
                  <span className="text-gradient-orange">
                    <Dt k="ui.experiencesHeading.accent" fallback="tour packages" />
                  </span>
                  <Dt k="ui.experiencesHeading.after" fallback="." />
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                <Dt
                  k="services.TRAVEL_EXPERIENCES_SECTION.description"
                  fallback={TRAVEL_EXPERIENCES_SECTION.description}
                />
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
                      <Dt
                        k={`services.TRAVEL_EXPERIENCES.${index}.badge`}
                        fallback={experience.badge}
                      />
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
                    <ExperienceTitle
                      index={index}
                      title={experience.title}
                      titleAccent={experience.titleAccent}
                    />
                  </div>
                  <div className="max-width-20">
                    <p className="font-1-extra-small">
                      <Dt
                        k={`services.TRAVEL_EXPERIENCES.${index}.description`}
                        fallback={experience.description}
                      />
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
