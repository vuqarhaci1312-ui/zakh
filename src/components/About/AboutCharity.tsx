"use client";

import Image from "next/image";
import { useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_CHARITY } from "./about-data";
import styles from "./About.module.css";

export default function AboutCharity() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.aboutCharitySection}`}>
      <div className={`${styles.container} ${styles.aboutCharity}`}>
        <div className={styles.charityGrid}>
          <div className={styles.charityVisual}>
            <Image
              src={ABOUT_CHARITY.image}
              alt=""
              width={420}
              height={420}
              className={styles.charityImage}
            />
          </div>

          <div className={styles.charityContent}>
            <h2 className={`${styles.h2Heading} ${styles.charityTitle}`}>
              <span className="text-gradient-orange">
                {dt("about.ABOUT_CHARITY.title", ABOUT_CHARITY.title)}
              </span>
            </h2>

            {ABOUT_CHARITY.paragraphs.map((paragraph, index) => (
              <p key={paragraph.slice(0, 24)} className={styles.paragraph}>
                {dt(`about.ABOUT_CHARITY.paragraphs.${index}`, paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
