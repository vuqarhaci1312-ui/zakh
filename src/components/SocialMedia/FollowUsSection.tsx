"use client";

import { useMemo, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCmsContent } from "@/lib/content/use-cms";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { FOLLOW_US_SECTION, SOCIAL_LINKS } from "./social-media-data";
import { SocialIcon } from "./SocialIcons";
import styles from "./SocialMedia.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

export default function FollowUsSection() {
  const dt = useDt();
  const { locale } = useLanguage();
  const translateSocialName = locale === "ar";
  const { data: cmsData, hasCms } = useCmsContent<{
    socialLinks: Array<{ id: string; label: string; title: string; href: string }>;
  }>("/api/content/social");
  const links = useMemo(
    () =>
      hasCms && cmsData?.socialLinks?.length
        ? cmsData.socialLinks.map((link) => ({ id: link.id as typeof SOCIAL_LINKS[number]["id"], label: link.label, title: link.title, href: link.href }))
        : SOCIAL_LINKS,
    [hasCms, cmsData],
  );
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
                  <Dt k="social.FOLLOW_US_SECTION.badge" fallback={FOLLOW_US_SECTION.badge} />
                </div>
              </div>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-52">
              <h2 className="section-heading night center">
                <Dt k="ui.followUsHeading.before" fallback="Stay connected with" />{" "}
                <span className="text-gradient-orange">
                  <Dt k="ui.followUsHeading.accent" fallback="Zakher Travel." />
                </span>
              </h2>
            </div>
            <div className="space-1-normal" />
            <div className={`max-width-41 ${styles.introCenter}`}>
              <p className="font-1-extra-small">
                <Dt
                  k="social.FOLLOW_US_SECTION.description"
                  fallback={FOLLOW_US_SECTION.description}
                />
              </p>
            </div>
          </div>
          <div className={styles.socialGrid}>
            {links.map((link, index) => (
              <a
                key={`${link.id}-${index}`}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                title={
                  hasCms
                    ? link.title
                    : translateSocialName
                      ? dt(`social.SOCIAL_LINKS.${index}.title`, link.title)
                      : link.title
                }
                data-experience-card
              >
                <div className={styles.socialIconWrap} data-platform={link.id}>
                  <SocialIcon id={link.id} />
                </div>
                <span className={styles.socialLabel}>
                  {link.id === "x" ? (
                    "X"
                  ) : hasCms ? (
                    link.label
                  ) : translateSocialName ? (
                    <Dt k={`social.SOCIAL_LINKS.${index}.label`} fallback={link.label} />
                  ) : (
                    link.label
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
