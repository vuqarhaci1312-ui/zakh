"use client";

import { useRef } from "react";
import { useCmsContent } from "@/lib/content/use-cms";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { YOUTUBE_SECTION } from "./social-media-data";
import styles from "./SocialMedia.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

export default function YouTubeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dt = useDt();
  const { data: cmsData, hasCms } = useCmsContent<{
    youtubeSection: { embedUrl?: string; channelUrl?: string } | null;
  }>("/api/content/social");
  const embedUrl = hasCms && cmsData?.youtubeSection?.embedUrl ? cmsData.youtubeSection.embedUrl : YOUTUBE_SECTION.embedUrl;
  const channelUrl = hasCms && cmsData?.youtubeSection?.channelUrl ? cmsData.youtubeSection.channelUrl : YOUTUBE_SECTION.channelUrl;
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
                    <Dt k="social.YOUTUBE_SECTION.badge" fallback={YOUTUBE_SECTION.badge} />
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  <Dt k="ui.youtubeHeading.before" fallback="Watch Us on" />{" "}
                  <span className="text-gradient-orange">
                    <Dt k="ui.youtubeHeading.accent" fallback="YouTube" />
                  </span>
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                <Dt
                  k="social.YOUTUBE_SECTION.description"
                  fallback={YOUTUBE_SECTION.description}
                />
              </p>
            </div>
          </div>
          <div className={styles.youtubeWrap} data-experience-card>
            <iframe
              className={styles.youtubeIframe}
              src={embedUrl}
              title={dt("ui.youtubePlayer", "YouTube video player")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className={`font-1-extra-small ${styles.youtubeLink}`}>
            <a href={channelUrl} target="_blank" rel="noopener noreferrer">
              <Dt k="ui.youtubeViewAll" fallback="View all videos on YouTube" /> &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
