"use client";

import Image from "next/image";
import { useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_VALUES, FLEET_CARD, PLUS_ICON, VALUE_CARDS } from "./about-data";
import styles from "./About.module.css";

export default function AboutValues() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.overflowHidden}`}>
      <div className={`${styles.container} ${styles.aboutValues}`}>
        <div className={`${styles.headingGrid} ${styles.centered} ${styles.twoRows}`}>
          <div className={`${styles.gridBlock} ${styles.headingGridTitle}`}>
            <div className={styles.textBox}>
              <h2 className={`${styles.h2Heading} ${styles.homeIntro}`}>
                {dt("about.ABOUT_VALUES.title", ABOUT_VALUES.title)}
              </h2>
            </div>
          </div>
          <div className={`${styles.gridBlock} ${styles.headingGridSubtitle}`}>
            <div className={styles.textBox}>
              <p className={styles.paragraph}>
                {dt("about.ABOUT_VALUES.subtitle", ABOUT_VALUES.subtitle)}
              </p>
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
                  <h3 className={`${styles.h3Heading} ${styles.valueTitle}`}>
                    {dt(`about.VALUE_CARDS.${index}.title`, card.title)}
                  </h3>
                  <div className={styles.textBox}>
                    <p className={`${styles.smallParagraph} ${styles.noMargin}`}>
                      {dt(`about.VALUE_CARDS.${index}.description`, card.description)}
                    </p>
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
              {dt("ui.aboutFleet.titleBefore", "Our Tour")}{" "}
              <span className="text-gradient-orange">
                {dt("ui.aboutFleet.titleAccent", "Packages")}
              </span>
            </h3>
            <div className={styles.textBox}>
              <p className={`${styles.smallParagraph} ${styles.noMargin}`}>
                {dt("about.FLEET_CARD.description", FLEET_CARD.description)}
              </p>
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
