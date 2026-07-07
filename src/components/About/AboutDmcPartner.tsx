"use client";

import Image from "next/image";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { DMC_PARTNER } from "./about-data";
import styles from "./About.module.css";

export default function AboutDmcPartner() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.aboutDmcPartner}`}>
        <div className={styles.aboutIntroGrid}>
          <div className={styles.aboutIntroMedia}>
            <Image
              src={DMC_PARTNER.image}
              alt={dt("ui.aboutDmcPartner.imageAlt", "Destination Management Company (DMC)")}
              width={640}
              height={400}
              className={styles.aboutDmcPartnerImage}
            />
          </div>

          <div className={styles.aboutIntroContent}>
            <h2 className={`${styles.h2Heading} ${styles.aboutIntroTitle}`}>
              <span className="text-gradient-orange">
                <Dt k="about.DMC_PARTNER.title" fallback={DMC_PARTNER.title} />
              </span>
            </h2>

            <div className={`${styles.richTextBlock} ${styles.aboutIntroRichText}`}>
              {DMC_PARTNER.paragraphs.map((paragraph, index) => (
                <Dt
                  key={paragraph.slice(0, 24)}
                  k={`about.DMC_PARTNER.paragraphs.${index}`}
                  fallback={paragraph}
                  as="p"
                  className={styles.paragraph}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
