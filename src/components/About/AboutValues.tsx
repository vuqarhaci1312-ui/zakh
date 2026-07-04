"use client";

import Image from "next/image";
import { Dt } from "@/lib/i18n/use-data-translation";
import { ABOUT_VALUES, FLEET_CARD, PLUS_ICON, VALUE_CARDS } from "./about-data";
import styles from "./About.module.css";

export default function AboutValues() {
  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.aboutValues}`}>
        <div className={`${styles.headingGrid} ${styles.centered} ${styles.twoRows}`}>
          <div className={`${styles.gridBlock} ${styles.headingGridTitle}`}>
            <div className={styles.textBox}>
              <Dt
                k="about.ABOUT_VALUES.title"
                fallback={ABOUT_VALUES.title}
                as="h2"
                className={`${styles.h2Heading} ${styles.homeIntro}`}
              />
            </div>
          </div>
          <div className={`${styles.gridBlock} ${styles.headingGridSubtitle}`}>
            <div className={styles.textBox}>
              <Dt
                k="about.ABOUT_VALUES.subtitle"
                fallback={ABOUT_VALUES.subtitle}
                as="p"
                className={styles.paragraph}
              />
            </div>
          </div>
        </div>

        <div className={`${styles.valueContentGrid} ${styles.aboutSubPage}`}>
          {VALUE_CARDS.map((card, index) => (
            <div key={card.id} className={styles.gridBlock}>
              <div
                className={[
                  styles.valueCardContainer,
                  styles[`valueCard${card.variant}`],
                ].join(" ")}
                style={{ backgroundImage: `url("${card.backgroundImage}")` }}
              >
                <div className={styles.plusCircleIntro}>
                  <Image
                    src={PLUS_ICON}
                    alt=""
                    width={16}
                    height={16}
                    className={`${styles.contentImage} ${styles.plusIntro}`}
                  />
                </div>
                <div className={styles.textBox}>
                  <Dt
                    k={`about.VALUE_CARDS.${index}.title`}
                    fallback={card.title}
                    as="h3"
                    className={`${styles.h3Heading} ${styles.valueTitle}`}
                  />
                  <div className={styles.textBox}>
                    <Dt
                      k={`about.VALUE_CARDS.${index}.description`}
                      fallback={card.description}
                      as="p"
                      className={`${styles.smallParagraph} ${styles.noMargin}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`${styles.valueContentLargeBox} ${styles.valueCardContainer} ${styles.valueCard04}`}
          style={{ backgroundImage: `url("${FLEET_CARD.backgroundImage}")` }}
        >
          <div className={styles.textBox}>
            <h3 className={`${styles.h3Heading} ${styles.valueTitle} ${styles.larger}`}>
              <Dt k="ui.aboutFleet.titleBefore" fallback="Our Tour" />{" "}
              <span className="text-gradient-orange">
                <Dt k="ui.aboutFleet.titleAccent" fallback="Packages" />
              </span>
            </h3>
            <div className={styles.textBox}>
              <Dt
                k="about.FLEET_CARD.description"
                fallback={FLEET_CARD.description}
                as="p"
                className={`${styles.smallParagraph} ${styles.noMargin}`}
              />
            </div>
          </div>
          <div className={`${styles.plusCircleIntro} ${styles.largerBox}`}>
            <Image
              src={PLUS_ICON}
              alt=""
              width={16}
              height={16}
              className={`${styles.contentImage} ${styles.plusIntro}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
