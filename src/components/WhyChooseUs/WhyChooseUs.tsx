"use client";

import Image from "next/image";
import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import "@/styles/uxoral-mission.css";
import UxoralCounter from "./UxoralCounter";
import {
  buildUxoralCounterColumns,
  STAT_CARDS,
  STAT_MISSION,
  UXORAL_CENTER_IMAGE,
} from "./stats-data";
import { useUxoralMissionAnimation } from "./useUxoralMissionAnimation";

function QuoteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none" className="invertedComma" aria-hidden="true">
      <path
        d="M14.5 9V20C14.4983 21.5908 13.8657 23.116 12.7408 24.2408C11.616 25.3657 10.0908 25.9983 8.5 26C8.23478 26 7.98043 25.8946 7.79289 25.7071C7.60536 25.5196 7.5 25.2652 7.5 25C7.5 24.7348 7.60536 24.4804 7.79289 24.2929C7.98043 24.1054 8.23478 24 8.5 24C9.56087 24 10.5783 23.5786 11.3284 22.8284C12.0786 22.0783 12.5 21.0609 12.5 20V19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H12.5C13.0304 7 13.5391 7.21071 13.9142 7.58579C14.2893 7.96086 14.5 8.46957 14.5 9ZM27 7H19.5C18.9696 7 18.4609 7.21071 18.0858 7.58579C17.7107 7.96086 17.5 8.46957 17.5 9V17C17.5 17.5304 17.7107 18.0391 18.0858 18.4142C18.4609 18.7893 18.9696 19 19.5 19H27V20C27 21.0609 26.5786 22.0783 25.8284 22.8284C25.0783 23.5786 24.0609 24 23 24C22.7348 24 22.4804 24.1054 22.2929 24.2929C22.1054 24.4804 22 24.7348 22 25C22 25.2652 22.1054 25.5196 22.2929 25.7071C22.4804 25.8946 22.7348 26 23 26C24.5908 25.9983 26.116 25.3657 27.2408 24.2408C28.3657 23.116 28.9983 21.5908 29 20V9C29 8.46957 28.7893 7.96086 28.4142 7.58579C28.0391 7.21071 27.5304 7 27 7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" className="cardIcon" aria-hidden="true">
      <path
        d="M21.75 6H19.5V5.25C19.5 4.85218 19.342 4.47064 19.0607 4.18934C18.7794 3.90804 18.3978 3.75 18 3.75H6C5.60218 3.75 5.22064 3.90804 4.93934 4.18934C4.65804 4.47064 4.5 4.85218 4.5 5.25V6H2.25C1.85218 6 1.47064 6.15804 1.18934 6.43934C0.908035 6.72064 0.75 7.10218 0.75 7.5V9C0.75 9.99456 1.14509 10.9484 1.84835 11.6517C2.19657 11.9999 2.60997 12.2761 3.06494 12.4645C3.51991 12.653 4.00754 12.75 4.5 12.75H4.84219C5.28398 14.1501 6.12634 15.39 7.26516 16.3166C8.40398 17.2431 9.78933 17.8157 11.25 17.9634V20.25H9C8.80109 20.25 8.61032 20.329 8.46967 20.4697C8.32902 20.6103 8.25 20.8011 8.25 21C8.25 21.1989 8.32902 21.3897 8.46967 21.5303C8.61032 21.671 8.80109 21.75 9 21.75H15C15.1989 21.75 15.3897 21.671 15.5303 21.5303C15.671 21.3897 15.75 21.1989 15.75 21C15.75 20.8011 15.671 20.6103 15.5303 20.4697C15.3897 20.329 15.1989 20.25 15 20.25H12.75V17.9606C15.7444 17.6578 18.2288 15.5569 19.1325 12.75H19.5C20.4946 12.75 21.4484 12.3549 22.1516 11.6517C22.8549 10.9484 23.25 9.99456 23.25 9V7.5C23.25 7.10218 23.092 6.72064 22.8107 6.43934C22.5294 6.15804 22.1478 6 21.75 6ZM4.5 11.25C3.90326 11.25 3.33097 11.0129 2.90901 10.591C2.48705 10.169 2.25 9.59674 2.25 9V7.5H4.5V10.5C4.5 10.75 4.51219 11 4.53656 11.25H4.5ZM21.75 9C21.75 9.59674 21.5129 10.169 21.091 10.591C20.669 11.0129 20.0967 11.25 19.5 11.25H19.4531C19.4839 10.9729 19.4995 10.6944 19.5 10.4156V7.5H21.75V9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function WhyChooseUs() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  useUxoralMissionAnimation(sectionRef);

  const card1Columns = buildUxoralCounterColumns(t("stats.STAT_CARDS.0.count", STAT_CARDS[0].count));
  const card2Columns = buildUxoralCounterColumns(
    t("stats.STAT_CARDS.1.count", STAT_CARDS[1].count),
    { light: true },
  );
  const card3Columns = buildUxoralCounterColumns(t("stats.STAT_CARDS.3.count", STAT_CARDS[3].count));

  return (
    <section ref={sectionRef} className="uxoralMission section">
      <div className="uxContainer">
        <div className="missionGrid" data-ux-mission-grid>
          <div className="missionContainCard" data-ux-card="left">
            <div className="missionTopCard missionTopCardText">
              <T
                k="stats.STAT_MISSION.card1Top"
                fallback={STAT_MISSION.card1Top}
                as="p"
                className="fontSizeXsm fontSizeXsmPureBlack missionTopText"
              />
            </div>

            <div className="containBottomCard">
              <div className="bottomTopContant">
                <QuoteIcon />
                <T
                  k="stats.STAT_CARDS.0.description"
                  fallback={STAT_CARDS[0].description}
                  as="div"
                  className="fontSizeBase"
                />
              </div>

              <UxoralCounter
                columns={card1Columns}
                label={<T k="stats.STAT_CARDS.0.title" fallback={STAT_CARDS[0].title} />}
              />
            </div>
          </div>

          <div className="missionContainCard" data-ux-card="center">
            <div className="robotImageWrapper">
              <Image
                src={UXORAL_CENTER_IMAGE}
                alt={t("stats.STAT_CARDS.1.title", STAT_CARDS[1].title)}
                width={640}
                height={760}
                className="robotImage"
              />
              <div className="robotImageCaption">
                <T
                  k="stats.STAT_MISSION.card2ImageCaption"
                  fallback={STAT_MISSION.card2ImageCaption}
                  as="p"
                  className="robotImageCaptionText"
                />
              </div>
            </div>

            <div className="counterMain">
              <div className="counterWrapperMain">
                <UxoralCounter
                  columns={card2Columns}
                  light
                  labelClassName="fontSizeXsm fontSizeXsmWhite"
                  label={<T k="stats.STAT_CARDS.1.title" fallback={STAT_CARDS[1].title} />}
                />
              </div>
              <div className="cardIconWrap">
                <TrophyIcon />
              </div>
            </div>
          </div>

          <div className="missionContainCard" data-ux-card="right">
            <div className="containBottomCard">
              <div className="bottomTopContant">
                <T
                  k="stats.STAT_MISSION.card3Highlight"
                  fallback={STAT_MISSION.card3Highlight}
                  as="p"
                  className="fontSizeBase"
                />
              </div>

              <UxoralCounter
                columns={card3Columns}
                label={<T k="stats.STAT_CARDS.3.title" fallback={STAT_CARDS[3].title} />}
              />
            </div>

            <div className="missionTopCard missionTopCardText">
              <T
                k="stats.STAT_MISSION.card3Footer"
                fallback={STAT_MISSION.card3Footer}
                as="p"
                className="fontSizeXsm fontSizeXsmPureBlack missionTopText"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
