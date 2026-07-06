"use client";

import { useRef } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { OUR_SERVICES } from "./our-services-data";
import ServiceIcon from "./ServiceIcon";
import { useOurServicesAnimation } from "./useOurServicesAnimation";

function ServiceTitle({
  index,
  title,
  titleAccent,
}: {
  index: number;
  title: string;
  titleAccent?: string;
}) {
  if (!titleAccent || !title.includes(titleAccent)) {
    return <Dt k={`services.OUR_SERVICES.${index}.title`} fallback={title} />;
  }

  const accentIndex = title.indexOf(titleAccent);
  const before = title.slice(0, accentIndex);
  const after = title.slice(accentIndex + titleAccent.length);

  return (
    <>
      {before}
      <span className="text-gradient-orange">
        <Dt k={`services.OUR_SERVICES.${index}.titleAccent`} fallback={titleAccent} />
      </span>
      {after}
    </>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof OUR_SERVICES)[number];
  index: number;
}) {
  const dt = useDt();
  const cardClassName = service.gridLayout
    ? "w-layout-grid service-card-main"
    : "service-card-main";

  return (
    <div className={cardClassName} data-service-card>
      <div className="service-left">
        <div className="service-number-text">{service.number}</div>
        <div className="service-content">
          <div className="font-1-medium pearl">
            <ServiceTitle index={index} title={service.title} titleAccent={service.titleAccent} />
          </div>
          <div className="service-content-bottom">
            <div className="space-1-exta-small" />
            <div className="service-bottom">
              <p>
                <Dt
                  k={`services.OUR_SERVICES.${index}.description`}
                  fallback={service.description}
                />
              </p>
            </div>
            {service.number === "02" ? <div className="space-1-medium" /> : null}
          </div>
        </div>
      </div>
      <div className="service-right">
        <div className="service-image-wrapper">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            loading="lazy"
            sizes="100vw"
            srcSet={service.imageSrcSet}
            alt={dt(`services.OUR_SERVICES.${index}.alt`, service.alt)}
            className="service-image"
          />
        </div>
        <div className="service-icon-wrapper">
          <ServiceIcon />
        </div>
      </div>
    </div>
  );
}

export default function OurServiceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="section-title-wrapper" data-services-reveal>
            <div className="max-width-52">
              <h2 className="section-heading night center">
                <Dt k="ui.servicesHeading.before" fallback="Professional" />{" "}
                <span className="text-gradient-orange">
                  <Dt k="ui.servicesHeading.accent" fallback="travel services" />
                </span>{" "}
                <Dt k="ui.servicesHeading.after" fallback="for every kind of journey." />
              </h2>
            </div>
          </div>
          <div className="space-3-medium" />
          <div className="service-main">
            {OUR_SERVICES.map((service, index) => (
              <ServiceCard key={service.number} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
