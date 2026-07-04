"use client";

import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import { useDt } from "@/lib/i18n/use-data-translation";
import {
  WHY_CHOOSE_US_CARDS,
  WHY_CHOOSE_US_SECTION,
  type WhyChooseUsCard,
} from "./why-choose-us-data";
import { WHY_CHOOSE_US_ICONS } from "./WhyChooseUsIcons";
import { useWhyChooseUsCarousel } from "./useWhyChooseUsCarousel";
import { useWhyChooseUsFeaturesAnimation } from "./useWhyChooseUsFeaturesAnimation";
import styles from "./WhyChooseUsFeatures.module.css";

function NavArrow({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={direction === "next" ? styles.navIconNext : styles.navIcon}
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FeatureCard({ card, index }: { card: WhyChooseUsCard; index: number }) {
  const Icon = WHY_CHOOSE_US_ICONS[card.id as keyof typeof WHY_CHOOSE_US_ICONS];

  return (
    <article data-wcu-card className={styles.slide}>
      <div className={styles.card}>
        <div className={styles.cardInner}>
          <div className={styles.iconWrap}>
            {Icon ? <Icon className={styles.icon} /> : null}
          </div>
          <T
            k={`whyChooseUs.WHY_CHOOSE_US_CARDS.${index}.title`}
            fallback={card.title}
            as="h3"
            className={styles.cardTitle}
          />
          <T
            k={`whyChooseUs.WHY_CHOOSE_US_CARDS.${index}.description`}
            fallback={card.description}
            as="p"
            className={styles.cardDescription}
          />
        </div>
      </div>
    </article>
  );
}

export default function WhyChooseUsFeatures() {
  const dt = useDt();
  const sectionRef = useRef<HTMLElement>(null);
  const { viewportRef, activeIndex, goPrev, goNext, scrollToIndex, canGoPrev, canGoNext } =
    useWhyChooseUsCarousel(WHY_CHOOSE_US_CARDS.length);

  useWhyChooseUsFeaturesAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="why-choose-us-title"
    >
      <div className={styles.container}>
        <header className={styles.header} data-wcu-reveal>
          <div className={styles.eyebrow}>
            <T
              k="whyChooseUs.WHY_CHOOSE_US_SECTION.eyebrow"
              fallback={WHY_CHOOSE_US_SECTION.eyebrow}
            />
          </div>
          <h2 id="why-choose-us-title" className={styles.title}>
            <T k="whyChooseUs.WHY_CHOOSE_US_SECTION.title" fallback={WHY_CHOOSE_US_SECTION.title} />{" "}
            <span className="text-gradient-orange">
              <T
                k="whyChooseUs.WHY_CHOOSE_US_SECTION.titleAccent"
                fallback={WHY_CHOOSE_US_SECTION.titleAccent}
              />
            </span>
          </h2>
          <p className={styles.subtitle}>
            <T
              k="whyChooseUs.WHY_CHOOSE_US_SECTION.subtitle"
              fallback={WHY_CHOOSE_US_SECTION.subtitle}
            />
          </p>
        </header>

        <div className={styles.carouselWrap} data-wcu-reveal>
          <button
            type="button"
            className={styles.navButton}
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label={dt("ui.previousSlide", "Previous slide")}
          >
            <NavArrow direction="prev" />
          </button>

          <div ref={viewportRef} className={styles.viewport}>
            <div className={styles.track}>
              {WHY_CHOOSE_US_CARDS.map((card, index) => (
                <FeatureCard key={card.id} card={card} index={index} />
              ))}
            </div>
          </div>

          <button
            type="button"
            className={`${styles.navButton} ${styles.navButtonNext}`}
            onClick={goNext}
            disabled={!canGoNext}
            aria-label={dt("ui.nextSlide", "Next slide")}
          >
            <NavArrow direction="next" />
          </button>
        </div>

        <div className={styles.dots} aria-hidden="true">
          {WHY_CHOOSE_US_CARDS.map((card, index) => (
            <button
              key={card.id}
              type="button"
              className={[styles.dot, index === activeIndex ? styles.dotActive : ""]
                .filter(Boolean)
                .join(" ")}
              onClick={() => scrollToIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
