"use client";

import { useRef } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
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

  const onInstagram = dt("ui.onInstagram", " on Instagram");

  return (
    <a
      href={account.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.instaCard}
      data-experience-card
      aria-label={`${dt("ui.exploreDestination", "View")} ${username}${onInstagram}`}
    >
      <div className={styles.instaPostHeader}>
        <div className={styles.instaAvatarRing}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={account.avatar} alt="" className={styles.instaAvatar} loading="lazy" />
        </div>
        <div className={styles.instaMeta}>
          <span className={styles.instaUsername}>
            <Dt k={`social.INSTAGRAM_ACCOUNTS.${index}.username`} fallback={account.username} />
          </span>
          <span className={styles.instaSubtitle}>
            <Dt k="ui.instagramSubtitle" fallback="Zakher Travel" />
          </span>
        </div>
        <span className={styles.instaFollow}>
          <Dt k="ui.instagramFollow" fallback="Follow" />
        </span>
        <InstaMoreIcon className={styles.instaMoreIcon} />
      </div>

      <div className={styles.instaImageWrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={account.image}
          alt={`${username}${onInstagram}`}
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
          <Dt k="ui.instagramLikes" fallback="Liked by zakher.travel and others" />
        </p>
        <p className={styles.instaCaption}>
          <strong>
            <Dt k={`social.INSTAGRAM_ACCOUNTS.${index}.username`} fallback={account.username} />
          </strong>{" "}
          <Dt
            k="ui.instagramCaption"
            fallback="Tours, destinations, and travel moments from our team."
          />
        </p>
        <p className={styles.instaViewProfile}>
          <Dt k="ui.instagramViewProfile" fallback="View profile on Instagram" />
        </p>
      </div>
    </a>
  );
}

export default function InstagramSection() {
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
                    <Dt k="social.INSTAGRAM_SECTION.badge" fallback={INSTAGRAM_SECTION.badge} />
                  </div>
                </div>
              </div>
              <div className="space-1-normal" />
              <div className="max-width-41">
                <h2 className="section-heading night">
                  <span className="text-gradient-orange">
                    <Dt k="ui.instagramHeading.accent" fallback="Zakher Travel" />
                  </span>
                  <Dt k="ui.instagramHeading.after" fallback=" on Instagram" />
                </h2>
              </div>
            </div>
            <div className="max-width-27">
              <p className="font-1-extra-small">
                <Dt
                  k="social.INSTAGRAM_SECTION.description"
                  fallback={INSTAGRAM_SECTION.description}
                />
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
