"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { useRef } from "react";
import { Dt, useDt } from "@/lib/i18n/use-data-translation";
import { translateField } from "@/lib/i18n/content-translators";
import { useTranslations } from "@/contexts/TranslationsContext";
import { BRANCHES, OUR_BRANCHES_SECTION } from "./branches-data";
import styles from "./OurBranches.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

export default function BranchesSection() {
  const dt = useDt();
  const t = useTranslations();
  const headingBefore = dt("ui.branchesHeading.before", "Our");
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  return (
    <section ref={sectionRef} className="section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="section-title-wrapper" data-services-reveal>
            <div className="badge-wrap">
              <div className="section-badge w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                <div className="badge-text w-variant-cbbf38fe-d1d9-25df-a3f8-ed2322a2901f">
                  <Dt k="branches.OUR_BRANCHES_SECTION.badge" fallback={OUR_BRANCHES_SECTION.badge} />
                </div>
              </div>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-52" style={{ margin: "0 auto" }}>
              <h1 className="section-heading night center">
                {headingBefore ? (
                  <>
                    <Dt k="ui.branchesHeading.before" fallback="Our" as="span" />
                    {" "}
                  </>
                ) : null}
                <span className="text-gradient-orange">
                  <Dt k="ui.branchesHeading.accent" fallback="Branches" as="span" />
                </span>
              </h1>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-41" style={{ margin: "0 auto" }}>
              <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                <Dt
                  k="branches.OUR_BRANCHES_SECTION.description"
                  fallback={OUR_BRANCHES_SECTION.description}
                />
              </p>
            </div>
          </div>

          <div className="space-3-medium" />

          <div className={styles.branchGrid}>
            {BRANCHES.map((branch, index) => (
              <LocaleLink
                key={branch.id}
                href={`/our-branches/${branch.slug}`}
                className={styles.branchCard}
                data-experience-card
              >
                <div className={styles.flagWrap}>
                  <Image
                    src={branch.flag}
                    alt={`${dt(`branches.BRANCHES.${index}.name`, branch.name)}${dt("ui.countryFlag", " flag")}`}
                    width={240}
                    height={160}
                    className={styles.flagImage}
                  />
                </div>
                <h2 className={styles.branchName}>
                  {translateField(t, `branches.BRANCHES.${index}.name`, branch.name)}
                </h2>
              </LocaleLink>
            ))}
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
