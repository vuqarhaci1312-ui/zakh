"use client";

import Image from "next/image";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import PackageExploreButton from "@/components/RelatedPackages/PackageExploreButton";
import "@/components/RelatedPackages/related-packages.css";
import { ABOUT_INTRO, ABOUT_INTRO_BODY } from "./about-data";
import styles from "./About.module.css";

export default function AboutIntro() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.aboutIntro}`}>
        <div className={styles.aboutIntroGrid}>
          <div className={styles.aboutIntroMedia}>
            <Image
              src={ABOUT_INTRO.image}
              alt={dt("ui.aboutIntro.imageAlt", "Zakher Travel team")}
              width={640}
              height={640}
              className={styles.aboutIntroImage}
            />
          </div>

          <div className={styles.aboutIntroContent}>
            <h2 className={`${styles.h2Heading} ${styles.aboutIntroTitle}`}>
              <Dt k="ui.aboutIntro.titleBefore" fallback="Who" />{" "}
              <span className="text-gradient-orange">
                <Dt k="ui.aboutIntro.titleAccent" fallback="We Are?" />
              </span>
            </h2>

            <div className={`${styles.richTextBlock} ${styles.aboutIntroRichText}`}>
              {ABOUT_INTRO_BODY.map((paragraph, index) => (
                <Dt
                  key={paragraph.slice(0, 24)}
                  k={`about.ABOUT_INTRO_BODY.${index}`}
                  fallback={paragraph}
                  as="p"
                  className={styles.paragraph}
                />
              ))}
            </div>

            <div className={styles.aboutIntroActions}>
              <div className="avenora-related-packages">
                <PackageExploreButton href="/who-we-are" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
