"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  HERO_DESCRIPTION,
  HERO_HEADLINE,
  HERO_PRIMARY_CTA,
  HERO_TAGLINE,
  HERO_VIDEO,
} from "./hero-data";
import { useTranslations } from "@/contexts/TranslationsContext";
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
  beforeAccent: string;
  accent: string;
  afterAccent: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;

  return (
    <Tag className={className}>
      {beforeAccent}
      <span className="text-gradient-orange">{accent}</span>
      {afterAccent}
    </Tag>
  );
}

export default function Hero() {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
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
    <section className={styles.heroSection} aria-label="Hero">
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
              beforeAccent={t("hero.headline.beforeAccent", HERO_HEADLINE.beforeAccent)}
              accent={t("hero.headline.accent", HERO_HEADLINE.accent)}
              afterAccent={t("hero.headline.afterAccent", HERO_HEADLINE.afterAccent)}
              className={styles.displayTitle}
            />
          </motion.div>

          <div className={styles.bottomRow}>
            <motion.div
              className={styles.bottomLeft}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.15 }}
            >
              <p className={styles.description}>{t("hero.description", HERO_DESCRIPTION)}</p>
              <Link href={HERO_PRIMARY_CTA.href} className={styles.btnSolid}>
                {t("hero.cta.label", HERO_PRIMARY_CTA.label)}
                <ArrowRightIcon />
              </Link>
            </motion.div>

            <motion.div
              className={styles.bottomRight}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: 0.25 }}
            >
              <HeroDisplayTitle
                beforeAccent={t("hero.tagline.beforeAccent", HERO_TAGLINE.beforeAccent)}
                accent={t("hero.tagline.accent", HERO_TAGLINE.accent)}
                afterAccent={t("hero.tagline.afterAccent", HERO_TAGLINE.afterAccent)}
                as="h2"
                className={`${styles.displayTitle} ${styles.displayTitleRight}`}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
