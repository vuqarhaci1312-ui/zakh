"use client";

import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";
import { INSTAGRAM_ACCOUNTS, INSTAGRAM_SECTION, type InstagramAccount } from "./social-media-data";
import {
  InstaBookmarkIcon,
  InstaCommentIcon,
  InstaHeartIcon,
  InstaMoreIcon,
  InstaShareIcon,
} from "./SocialIcons";
import styles from "./SocialMedia.module.css";

function InstagramPostCard({
  account,
  index,
}: {
  account: InstagramAccount;
  index: number;
}) {
  const dt = useDt();
  const username = dt(`social.INSTAGRAM_ACCOUNTS.${index}.username`, account.username);

  return (
    <a
      href={account.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.instaCard}
      data-experience-card
      aria-label={`${dt("ui.exploreDestination", "View")} ${username} on Instagram`}
    >
      <div className={styles.instaPostHeader}>
        <div className={styles.instaAvatarRing}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={account.avatar} alt="" className={styles.instaAvatar} loading="lazy" />
        </div>
        <div className={styles.instaMeta}>
          <span className={styles.instaUsername}>{username}</span>
          <span className={styles.instaSubtitle}>
            {dt("ui.instagramSubtitle", "Zakher Travel")}
          </span>
        </div>
        <span className={styles.instaFollow}>{dt("ui.instagramFollow", "Follow")}</span>
        <InstaMoreIcon className={styles.instaMoreIcon} />
      </div>

      <div className={styles.instaImageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={account.image}
          alt={`${username} on Instagram`}
          className={styles.instaImage}
          loading="lazy"
        />
      </div>

      <div className={styles.instaActions}>
        <div className={styles.instaActionsLeft}>
          <InstaHeartIcon className={styles.instaActionIcon} />
          <InstaCommentIcon className={styles.instaActionIcon} />
          <InstaShareIcon className={styles.instaActionIcon} />
        </div>
        <InstaBookmarkIcon className={styles.instaActionIcon} />
      </div>

      <div className={styles.instaBody}>
        <p className={styles.instaLikes}>
          {dt("ui.instagramLikes", "Liked by zakher.travel and others")}
        </p>
        <p className={styles.instaCaption}>
          <strong>{username}</strong>{" "}
          {dt(
            "ui.instagramCaption",
            "Tours, destinations, and travel moments from our team.",
          )}
        </p>
        <p className={styles.instaViewProfile}>
          {dt("ui.instagramViewProfile", "View profile on Instagram")}
        </p>
      </div>
    </a>
  );
}

export default function InstagramSection() {
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
                    {dt("social.INSTAGRAM_SECTION.badge", INSTAGRAM_SECTION.badge)}
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  <span className="text-gradient-orange">
                    {dt("ui.instagramHeading.accent", "Zakher Travel")}
                  </span>
                  {dt("ui.instagramHeading.after", " on Instagram")}
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                {dt("social.INSTAGRAM_SECTION.description", INSTAGRAM_SECTION.description)}
              </p>
            </div>
          </div>
          <div className={styles.instaGrid}>
            {INSTAGRAM_ACCOUNTS.map((account, index) => (
              <InstagramPostCard key={account.username} account={account} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
