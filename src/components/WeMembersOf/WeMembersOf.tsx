"use client";

import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_MEMBERS, MEMBER_LOGOS } from "../About/about-data";
import styles from "./WeMembersOf.module.css";

export default function WeMembersOf() {
  const dt = useDt();
  const loopLogos = [...MEMBER_LOGOS, ...MEMBER_LOGOS];

  return (
    <section className={styles.section} aria-labelledby="we-members-of-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="we-members-of-title" className={styles.title}>
            <Dt k="about.ABOUT_MEMBERS.titleBefore" fallback={ABOUT_MEMBERS.titleBefore} />{" "}
            <span className="text-gradient-orange">
              <Dt k="about.ABOUT_MEMBERS.titleAccent" fallback={ABOUT_MEMBERS.titleAccent} />
            </span>
          </h2>
        </header>

        <div
          className={styles.marquee}
          aria-label={dt("about.ABOUT_MEMBERS.title", ABOUT_MEMBERS.title)}
        >
          <div className={styles.track}>
            {loopLogos.map((logo, index) => {
              const sourceIndex = index % MEMBER_LOGOS.length;

              return (
                <div key={`${logo.src}-${index}`} className={styles.logoCard}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={dt(`about.MEMBER_LOGOS.${sourceIndex}.alt`, logo.alt)}
                    className={styles.logo}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
