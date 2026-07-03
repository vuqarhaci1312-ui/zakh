"use client";

import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { YOUTUBE_SECTION } from "./social-media-data";
import styles from "./SocialMedia.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

export default function YouTubeSection() {
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
                    {dt("social.YOUTUBE_SECTION.badge", YOUTUBE_SECTION.badge)}
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  {dt("ui.youtubeHeading.before", "Watch Us on")}{" "}
                  <span className="text-gradient-orange">
                    {dt("ui.youtubeHeading.accent", "YouTube")}
                  </span>
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                {dt("social.YOUTUBE_SECTION.description", YOUTUBE_SECTION.description)}
              </p>
            </div>
          </div>
          <div className={styles.youtubeWrap} data-experience-card>
            <iframe
              className={styles.youtubeIframe}
              src={YOUTUBE_SECTION.embedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <p className={`font-1-extra-small ${styles.youtubeLink}`}>
            <a href={YOUTUBE_SECTION.channelUrl} target="_blank" rel="noopener noreferrer">
              {dt("ui.youtubeViewAll", "View all videos on YouTube")} &rarr;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
