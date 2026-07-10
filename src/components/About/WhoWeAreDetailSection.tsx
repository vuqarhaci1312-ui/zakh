"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { Dt } from "@/lib/i18n/use-data-translation";
import CompanyProfileSlider from "./CompanyProfileSlider";
import {
  WHO_WE_ARE_ASSETS,
  WHO_WE_ARE_BODY,
  WHO_WE_ARE_HERO,
} from "./who-we-are-data";
import styles from "./About.module.css";

export default function WhoWeAreDetailSection() {
  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.whoWeAreDetail}`}>
        <LocaleLink href="/about" className={styles.whoWeAreBackLink}>
          <Dt k="ui.backToAbout" fallback="← About Us" />
        </LocaleLink>

        <div className={styles.whoWeAreDetailGrid}>
          <div className={styles.whoWeAreDetailMedia}>
            <Image
              src={WHO_WE_ARE_ASSETS.heroImage}
              alt={WHO_WE_ARE_HERO.titleBefore + " " + WHO_WE_ARE_HERO.titleAccent}
              width={640}
              height={640}
              className={styles.aboutIntroImage}
              priority
            />
          </div>

          <div className={styles.whoWeAreDetailContent}>
            <h1 className={`${styles.h2Heading} ${styles.aboutIntroTitle}`}>
              <Dt k="ui.aboutIntro.titleBefore" fallback={WHO_WE_ARE_HERO.titleBefore} />{" "}
              <span className="text-gradient-orange">
                <Dt k="ui.aboutIntro.titleAccent" fallback={WHO_WE_ARE_HERO.titleAccent} />
              </span>
            </h1>

            <div className={`${styles.richTextBlock} ${styles.aboutIntroRichText}`}>
              {WHO_WE_ARE_BODY.map((paragraph, index) => (
                <Dt
                  key={paragraph.slice(0, 24)}
                  k={`about.WHO_WE_ARE_BODY.${index}`}
                  fallback={paragraph}
                  as="p"
                  className={styles.paragraph}
                />
              ))}
            </div>
          </div>
        </div>

        <CompanyProfileSlider />
      </div>
    </section>
  );
}
