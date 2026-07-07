"use client";

import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import "@/styles/uxoral-mission.css";
import UxoralCounter from "./UxoralCounter";
import { STAT_CARDS } from "./stats-data";
import { useUxoralMissionAnimation } from "./useUxoralMissionAnimation";

export default function WhyChooseUs() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  useUxoralMissionAnimation(sectionRef);

  const partnersCount = t("stats.STAT_CARDS.0.count", STAT_CARDS[0].count);
  const destinationsCount = t("stats.STAT_CARDS.1.count", STAT_CARDS[1].count);
  const hotelsCount = t("stats.STAT_CARDS.2.count", STAT_CARDS[2].count);
  const touristsCount = t("stats.STAT_CARDS.3.count", STAT_CARDS[3].count);
  const staffCount = t("stats.STAT_CARDS.4.count", STAT_CARDS[4].count);

  return (
    <section ref={sectionRef} className="uxoralMission section">
      <div className="uxContainer">
        <div className="missionGrid" data-ux-mission-grid>
          <div className="missionContainCard" data-ux-card="left">
            <div className="missionTopCard missionTopCardText">
              <UxoralCounter
                value={partnersCount}
                light
                labelClassName="fontSizeXsm fontSizeXsmWhite missionStatLabel"
                label={<T k="stats.STAT_CARDS.0.title" fallback={STAT_CARDS[0].title} />}
              />
            </div>

            <div className="containBottomCard">
              <UxoralCounter
                value={hotelsCount}
                light
                labelClassName="fontSizeXsm fontSizeXsmWhite missionStatLabel"
                label={<T k="stats.STAT_CARDS.2.title" fallback={STAT_CARDS[2].title} />}
              />
            </div>
          </div>

          <div className="missionContainCard" data-ux-card="center">
            <div className="robotImageWrapper">
              <span className="missionStatisticsTitle">
                <T k="stats.STAT_SECTION.eyebrow" fallback="Statistika" />
              </span>
            </div>

            <div className="counterMain">
              <div className="counterWrapperMain">
                <UxoralCounter
                  value={destinationsCount}
                  light
                  labelClassName="fontSizeXsm fontSizeXsmWhite missionStatLabel"
                  label={<T k="stats.STAT_CARDS.1.title" fallback={STAT_CARDS[1].title} />}
                />
              </div>
            </div>
          </div>

          <div className="missionContainCard" data-ux-card="right">
            <div className="containBottomCard">
              <UxoralCounter
                value={touristsCount}
                light
                labelClassName="fontSizeXsm fontSizeXsmWhite missionStatLabel"
                label={<T k="stats.STAT_CARDS.3.title" fallback={STAT_CARDS[3].title} />}
              />
            </div>

            <div className="missionTopCard missionTopCardText">
              <UxoralCounter
                value={staffCount}
                light
                labelClassName="fontSizeXsm fontSizeXsmWhite missionStatLabel"
                label={<T k="stats.STAT_CARDS.4.title" fallback={STAT_CARDS[4].title} />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
