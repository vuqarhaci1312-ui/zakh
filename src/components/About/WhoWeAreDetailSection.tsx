"use client";

import Image from "next/image";
import Link from "next/link";
import { Dt } from "@/lib/i18n/use-data-translation";
import {
  WHO_WE_ARE_ASSETS,
  WHO_WE_ARE_BODY,
  WHO_WE_ARE_EXHIBITIONS,
  WHO_WE_ARE_HERO,
} from "./who-we-are-data";
import styles from "./About.module.css";

export default function WhoWeAreDetailSection() {
  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.whoWeAreDetail}`}>
        <Link href="/about" className={styles.whoWeAreBackLink}>
          <Dt k="ui.backToAbout" fallback="← About Us" />
        </Link>

        <div className={styles.whoWeAreDetailGrid}>
          <div className={styles.whoWeAreDetailMedia}>
            <Image
              src={WHO_WE_ARE_ASSETS.heroImage}
              alt=""
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

        <div className={styles.whoWeAreExhibitions}>
          <h2 className={`${styles.h3Heading} ${styles.whoWeAreExhibitionsTitle}`}>
            <Dt
              k="about.WHO_WE_ARE_EXHIBITIONS.title"
              fallback={WHO_WE_ARE_EXHIBITIONS.title}
            />
          </h2>
          <p className={styles.paragraph}>
            <Dt
              k="about.WHO_WE_ARE_EXHIBITIONS.intro"
              fallback={WHO_WE_ARE_EXHIBITIONS.intro}
            />
          </p>
          <ul className={styles.whoWeAreExhibitionsList}>
            {WHO_WE_ARE_EXHIBITIONS.items.map((item, index) => (
              <li key={item.slice(0, 24)} className={styles.whoWeAreExhibitionsItem}>
                <Dt
                  k={`about.WHO_WE_ARE_EXHIBITIONS.items.${index}`}
                  fallback={item}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.whoWeAreAssets}>
          <div className={styles.whoWeAreQualityPolicy}>
            <Image
              src={WHO_WE_ARE_ASSETS.qualityPolicyImage}
              alt=""
              width={791}
              height={1024}
              className={styles.whoWeAreQualityImage}
            />
          </div>

          <div className={styles.whoWeAreDownload}>
            <p className={`${styles.paragraph} ${styles.whoWeAreDownloadLabel}`}>
              <Dt
                k="about.WHO_WE_ARE.profileLabel"
                fallback={WHO_WE_ARE_ASSETS.companyProfileLabel}
              />
            </p>
            <a
              href={WHO_WE_ARE_ASSETS.companyProfilePdf}
              className={styles.whoWeAreDownloadButton}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Dt k="about.WHO_WE_ARE.downloadLabel" fallback={WHO_WE_ARE_ASSETS.downloadLabel} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
