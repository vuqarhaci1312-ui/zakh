"use client";

import Image from "next/image";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_MEMBERS, MEMBER_LOGOS } from "./about-data";
import styles from "./About.module.css";

export default function AboutMembers() {
  const dt = useDt();

  return (
    <section className={`${styles.section} ${styles.aboutMembersSection}`}>
      <div className={`${styles.container} ${styles.aboutMembers}`}>
        <h2 className={`${styles.h2Heading} ${styles.sectionTitleCenter}`}>
          <span className="text-gradient-orange">
            <Dt k="about.ABOUT_MEMBERS.title" fallback={ABOUT_MEMBERS.title} />
          </span>
        </h2>

        <div className={styles.membersTrack}>
          {MEMBER_LOGOS.map((logo, index) => (
            <div key={logo.src} className={styles.memberCard}>
              <Image
                src={logo.src}
                alt={dt(`about.MEMBER_LOGOS.${index}.alt`, logo.alt)}
                width={220}
                height={120}
                className={styles.memberLogo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
