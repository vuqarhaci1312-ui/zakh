"use client";

import Image from "next/image";
import { useDt } from "@/lib/i18n/use-data-translation";
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
              {dt("ui.aboutIntro.titleBefore", "Who")}{" "}
              <span className="text-gradient-orange">
                {dt("ui.aboutIntro.titleAccent", "We Are?")}
              </span>
            </h2>

            <div className={`${styles.richTextBlock} ${styles.aboutIntroRichText}`}>
              {ABOUT_INTRO_BODY.map((paragraph, index) => (
                <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
                  {dt(`about.ABOUT_INTRO_BODY.${index}`, paragraph)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
