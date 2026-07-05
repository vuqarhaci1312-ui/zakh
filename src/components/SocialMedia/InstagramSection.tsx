"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCmsContent } from "@/lib/content/use-cms";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
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

const INSTAGRAM_MOBILE_PAGE_SIZE = 6;

function getMobilePageNumbers(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);
  if (currentPage > 1) pages.add(currentPage - 1);
  if (currentPage < totalPages) pages.add(currentPage + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];

  sorted.forEach((page, index) => {
    const prev = sorted[index - 1];
    if (prev !== undefined && page - prev > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

function InstagramPostCard({
  account,
  compact = false,
}: {
  account: InstagramAccount;
  compact?: boolean;
}) {
  const dt = useDt();
  const onInstagram = dt("ui.onInstagram", " on Instagram");

  return (
    <a
      href={account.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.instaCard}${compact ? ` ${styles.instaCardCompact}` : ""}`}
      data-experience-card={compact ? undefined : true}
      aria-label={`${dt("ui.exploreDestination", "View")} ${account.username}${onInstagram}`}
    >
      <div className={styles.instaPostHeader}>
        <div className={styles.instaAvatarRing}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={account.avatar} alt="" className={styles.instaAvatar} loading="lazy" />
        </div>
        <div className={styles.instaMeta}>
          <span className={styles.instaUsername}>{account.username}</span>
          {!compact ? (
            <span className={styles.instaSubtitle}>
              <Dt k="ui.instagramSubtitle" fallback="Zakher Travel" />
            </span>
          ) : null}
        </div>
        {!compact ? (
          <>
            <span className={styles.instaFollow}>
              <Dt k="ui.instagramFollow" fallback="Follow" />
            </span>
            <InstaMoreIcon className={styles.instaMoreIcon} />
          </>
        ) : null}
      </div>

      {!compact ? (
        <div className={styles.instaImageWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={account.image}
            alt={`${account.username}${onInstagram}`}
            className={styles.instaImage}
            loading="lazy"
          />
        </div>
      ) : null}

      {!compact ? (
        <>
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
              <strong>{account.username}</strong>{" "}
              <Dt
                k="ui.instagramCaption"
                fallback="Tours, destinations, and travel moments from our team."
              />
            </p>
            <p className={styles.instaViewProfile}>
              <Dt k="ui.instagramViewProfile" fallback="View profile on Instagram" />
            </p>
          </div>
        </>
      ) : null}
    </a>
  );
}

export default function InstagramSection() {
  const t = useTranslations();
  const { data: cmsData, hasCms } = useCmsContent<{
    instagramAccounts: Array<{ username: string; href: string; image: string; avatar: string }>;
  }>("/api/content/social");
  const accountsSource = useMemo(
    () =>
      hasCms && cmsData?.instagramAccounts?.length
        ? cmsData.instagramAccounts.map((account) => ({
            username: account.username,
            href: account.href,
            image: account.image,
            avatar: account.avatar,
          }))
        : INSTAGRAM_ACCOUNTS,
    [hasCms, cmsData],
  );
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobilePage, setMobilePage] = useState(1);

  useOurServicesAnimation(sectionRef);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsMobile(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  const mobileTotalPages = Math.max(
    1,
    Math.ceil(accountsSource.length / INSTAGRAM_MOBILE_PAGE_SIZE),
  );

  const visibleAccounts = useMemo(() => {
    if (!isMobile) return accountsSource.map((account, index) => ({ account, index }));

    const start = (mobilePage - 1) * INSTAGRAM_MOBILE_PAGE_SIZE;
    return accountsSource.slice(start, start + INSTAGRAM_MOBILE_PAGE_SIZE).map(
      (account, offset) => ({
        account,
        index: start + offset,
      }),
    );
  }, [isMobile, mobilePage, accountsSource]);

  const mobilePageNumbers = useMemo(
    () => getMobilePageNumbers(mobilePage, mobileTotalPages),
    [mobilePage, mobileTotalPages],
  );

  const goToMobilePage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), mobileTotalPages);
    setMobilePage(nextPage);
    requestAnimationFrame(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

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

          {isMobile && accountsSource.length > INSTAGRAM_MOBILE_PAGE_SIZE ? (
            <p className={styles.instaMobileCount}>
              {accountsSource.length}{" "}
              <T k="ui.instagramAccountsTotal" fallback="accounts" />
              {" · "}
              <T k="ui.page" fallback="Page" /> {mobilePage}{" "}
              <T k="ui.pageOf" fallback="of" /> {mobileTotalPages}
            </p>
          ) : null}

          <div
            ref={gridRef}
            className={`${styles.instaGrid}${isMobile ? ` ${styles.instaGridMobile}` : ""}`}
          >
            {visibleAccounts.map(({ account, index }) => (
              <InstagramPostCard
                key={`${account.username}-${index}`}
                account={account}
                compact={isMobile}
              />
            ))}
          </div>

          {isMobile && mobileTotalPages > 1 ? (
            <nav
              className={styles.instaPagination}
              aria-label={t("ui.instagramPagination", "Instagram account pages")}
            >
              <button
                type="button"
                className={styles.instaPageButton}
                disabled={mobilePage === 1}
                onClick={() => goToMobilePage(mobilePage - 1)}
              >
                <T k="ui.previousPage" fallback="Previous" />
              </button>

              <div className={styles.instaPageNumbers}>
                {mobilePageNumbers.map((entry, entryIndex) =>
                  entry === "ellipsis" ? (
                    <span
                      key={`ellipsis-${entryIndex}`}
                      className={styles.instaPageEllipsis}
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      className={`${styles.instaPageNumber}${entry === mobilePage ? ` ${styles.instaPageNumberActive}` : ""}`}
                      aria-current={entry === mobilePage ? "page" : undefined}
                      onClick={() => goToMobilePage(entry)}
                    >
                      {entry}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                className={styles.instaPageButton}
                disabled={mobilePage === mobileTotalPages}
                onClick={() => goToMobilePage(mobilePage + 1)}
              >
                <T k="ui.nextPage" fallback="Next" />
              </button>
            </nav>
          ) : null}
        </div>
      </div>
    </section>
  );
}
