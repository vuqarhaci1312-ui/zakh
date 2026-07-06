"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import {
  HERO_DESCRIPTION,
  HERO_HEADLINE,
  HERO_PRIMARY_CTA,
  HERO_TAGLINE,
  HERO_VIDEO,
} from "./hero-data";
import styles from "./Hero.module.css";

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className={styles.btnIcon}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function HeroDisplayTitle({
  beforeAccent,
  accent,
  afterAccent,
  as = "h1",
  className,
}: {
  beforeAccent: ReactNode;
  accent: ReactNode;
  afterAccent: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;

  return (
    <Tag className={className}>
      {beforeAccent}
      {accent}
      {afterAccent}
    </Tag>
  );
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const t = useTranslations();
  const taglineBefore = t("hero.tagline.beforeAccent", HERO_TAGLINE.beforeAccent);
  const taglineAccent = t("hero.tagline.accent", HERO_TAGLINE.accent);
  const taglineAfter = t("hero.tagline.afterAccent", HERO_TAGLINE.afterAccent);
  const hasTagline = [taglineBefore, taglineAccent, taglineAfter].some(
    (part) => part.trim().length > 0,
  );
  const fadeIn = reduceMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
      };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) {
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => undefined);
    };

    if (video.readyState >= 2) {
      playVideo();
      return;
    }

    video.addEventListener("canplay", playVideo, { once: true });
    video.load();

    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, [reduceMotion]);

  return (
    <section className={styles.heroSection} aria-label={t("ui.heroSection", "Hero")}>
      <div
        className={styles.mediaWrap}
        style={{ backgroundImage: `url(${HERO_VIDEO.poster})` }}
      >
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_VIDEO.poster}
        >
          <source src={HERO_VIDEO.src} type="video/mp4" />
        </video>
      </div>

      <div className={styles.overlay} />

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div {...fadeIn}>
            <HeroDisplayTitle
              beforeAccent={
                <T k="hero.headline.beforeAccent" fallback={HERO_HEADLINE.beforeAccent} />
              }
              accent={
                <T
                  k="hero.headline.accent"
                  fallback={HERO_HEADLINE.accent}
                  className="text-gradient-orange"
                />
              }
              afterAccent={
                <T k="hero.headline.afterAccent" fallback={HERO_HEADLINE.afterAccent} />
              }
              className={styles.displayTitle}
            />
          </motion.div>

          <div className={styles.bottomRow}>
            <motion.div
              className={styles.bottomLeft}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.15 }}
            >
              <T
                k="hero.description"
                fallback={HERO_DESCRIPTION}
                as="p"
                className={styles.description}
              />
              <Link href={HERO_PRIMARY_CTA.href} className={styles.btnSolid}>
                <T k="hero.cta.label" fallback={HERO_PRIMARY_CTA.label} />
                <ArrowRightIcon />
              </Link>
            </motion.div>

            {hasTagline ? (
              <motion.div
                className={styles.bottomRight}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: 0.25 }}
              >
                <HeroDisplayTitle
                  beforeAccent={
                    <T k="hero.tagline.beforeAccent" fallback={HERO_TAGLINE.beforeAccent} />
                  }
                  accent={
                    <T
                      k="hero.tagline.accent"
                      fallback={HERO_TAGLINE.accent}
                      className="text-gradient-orange"
                    />
                  }
                  afterAccent={
                    <T k="hero.tagline.afterAccent" fallback={HERO_TAGLINE.afterAccent} />
                  }
                  as="h2"
                  className={`${styles.displayTitle} ${styles.displayTitleRight}`}
                />
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
