"use client";

import Image from "next/image";
import { useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_HERO } from "./about-data";
import styles from "./About.module.css";

export default function AboutHero() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.aboutHero}`}>
        <div className={styles.aboutHeroPlaneWrapper}>
          <Image
            src={ABOUT_HERO.planeImage}
            alt={dt("ui.aboutHero.planeAlt", "White plane.")}
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
            className={`${styles.contentImage} ${styles.cover}`}
          />
        </div>

        <div className={`${styles.headingTextContainer} ${styles.aboutHeroHeading}`}>
          <div className={`${styles.textBox} ${styles.aboutHeroH1}`}>
            <h1 className={`${styles.h1Heading} ${styles.aboutHeroTitle}`}>
              {dt("about.ABOUT_HERO.title", ABOUT_HERO.title)}
            </h1>
          </div>
          <div className={`${styles.textBox} ${styles.aboutHeroSub}`}>
            <p className={`${styles.paragraph} ${styles.marginNone} ${styles.white}`}>
              {dt("about.ABOUT_HERO.subtitle", ABOUT_HERO.subtitle)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
