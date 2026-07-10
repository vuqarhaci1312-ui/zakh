"use client";

import LocaleLink from "@/components/LocaleLink";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import {
  HERO_DESCRIPTION,
  HERO_HEADLINE,
  HERO_PRIMARY_CTA,
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
        style={
          HERO_VIDEO.poster
            ? { backgroundImage: `url(${HERO_VIDEO.poster})` }
            : undefined
        }
      >
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO.poster || undefined}
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
              data-speakable="hero-title"
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
              <LocaleLink href={HERO_PRIMARY_CTA.href} className={styles.btnSolid}>
                <T k="hero.cta.label" fallback={HERO_PRIMARY_CTA.label} />
                <ArrowRightIcon />
              </LocaleLink>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
