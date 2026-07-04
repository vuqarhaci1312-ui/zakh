"use client";

import Image from "next/image";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
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
            <Dt
              k="about.ABOUT_HERO.title"
              fallback={ABOUT_HERO.title}
              as="h1"
              className={`${styles.h1Heading} ${styles.aboutHeroTitle}`}
            />
          </div>
          <div className={`${styles.textBox} ${styles.aboutHeroSub}`}>
            <Dt
              k="about.ABOUT_HERO.subtitle"
              fallback={ABOUT_HERO.subtitle}
              as="p"
              className={`${styles.paragraph} ${styles.marginNone} ${styles.white}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
