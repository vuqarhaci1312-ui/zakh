"use client";

import Image from "next/image";
import { Dt } from "@/lib/i18n/use-data-translation";
import { ABOUT_CHARITY } from "./about-data";
import styles from "./About.module.css";

export default function AboutCharity() {
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
                <Dt k="about.ABOUT_CHARITY.title" fallback={ABOUT_CHARITY.title} />
              </span>
            </h2>

            {ABOUT_CHARITY.paragraphs.map((paragraph, index) => (
              <Dt
                key={paragraph.slice(0, 24)}
                k={`about.ABOUT_CHARITY.paragraphs.${index}`}
                fallback={paragraph}
                as="p"
                className={styles.paragraph}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
