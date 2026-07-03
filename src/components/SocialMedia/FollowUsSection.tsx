"use client";

import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { FOLLOW_US_SECTION, SOCIAL_LINKS } from "./social-media-data";
import { SocialIcon } from "./SocialIcons";
import styles from "./SocialMedia.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

export default function FollowUsSection() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="section-title-wrapper" data-services-reveal>
            <div className="badge-wrap">
              <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  {dt("social.FOLLOW_US_SECTION.badge", FOLLOW_US_SECTION.badge)}
                </div>
              </div>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-52">
              <h2 className="section-heading night center">
                {dt("ui.followUsHeading.before", "Stay connected with")}{" "}
                <span className="text-gradient-orange">
                  {dt("ui.followUsHeading.accent", "Zakher Travel.")}
                </span>
              </h2>
            </div>
            <div className="space-1-normal" />
            <div className={`max-width-41 ${styles.introCenter}`}>
              <p className="font-1-extra-small">
                {dt("social.FOLLOW_US_SECTION.description", FOLLOW_US_SECTION.description)}
              </p>
            </div>
          </div>
          <div className={styles.socialGrid}>
            {SOCIAL_LINKS.map((link, index) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                title={dt(`social.SOCIAL_LINKS.${index}.title`, link.title)}
                data-experience-card
              >
                <div className={styles.socialIconWrap} data-platform={link.id}>
                  <SocialIcon id={link.id} />
                </div>
                <span className={styles.socialLabel}>
                  {dt(`social.SOCIAL_LINKS.${index}.label`, link.label)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
