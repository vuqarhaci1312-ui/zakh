"use client";

import Image from "next/image";
import { useRef } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { STAT_CARDS, STAT_SECTION } from "./stats-data";
import { useWhyChooseUsAnimation } from "./useWhyChooseUsAnimation";
import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs() {
  const dt = useDt();
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useWhyChooseUsAnimation(contentRef, cardRefs);

  return (
    <section className={styles.statSection} aria-labelledby="platform-stats-title">
      <div className={styles.container}>
        <div ref={contentRef} className={styles.statContent}>
          <div className={styles.statTop}>
            <h2 id="platform-stats-title" className={`${styles.statTitle} text-gradient-orange`}>
              {dt("stats.STAT_SECTION.title", "STATISTICS")}
            </h2>
            <p className={styles.statDescription}>
              {STAT_SECTION.descriptionParts.map((part, index) => {
                const text = dt(`stats.STAT_SECTION.descriptionParts.${index}.text`, part.text);
                return "accent" in part && part.accent ? (
                  <span key={index} className={styles.statTextAccent}>
                    {text}
                  </span>
                ) : (
                  <span key={index}>{text}</span>
                );
              })}
            </p>
          </div>

          <div className={styles.statList}>
            {STAT_CARDS.map((card, index) => (
              <div
                key={card.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={[
                  styles.statCard,
                  styles[`card${card.id}`],
                  styles.statCardAnimate,
                  card.theme === "dark" ? styles.dark : "",
                  card.theme === "primary" ? styles.primary : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className={styles.gridStatisticsInfo}>
                  <div
                    className={[
                      styles.statisticsCardTitle,
                      card.titleWhite ? styles.textWhite : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {dt(`stats.STAT_CARDS.${index}.title`, card.title)}
                  </div>
                  <div className={styles.statIconItem}>
                    <div
                      className={[
                        styles.statIconWrap,
                        card.iconWrap === "white" ? styles.bgWhite : "",
                        card.iconWrap === "black" ? styles.bgBlack : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <Image
                        src={card.icon}
                        alt={dt(`stats.STAT_CARDS.${index}.iconAlt`, card.iconAlt)}
                        width={20}
                        height={20}
                        className={styles.statIcon}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.statisticsCardInfo}>
                  <h3
                    className={[
                      styles.statisticsCardCount,
                      card.countWhite ? styles.textWhite : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {card.count}
                  </h3>
                  <p
                    className={[
                      styles.statisticsCardDescription,
                      card.descriptionLight ? styles.textLight : "",
                      card.descriptionWhite ? styles.textWhite : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {dt(`stats.STAT_CARDS.${index}.description`, card.description)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
