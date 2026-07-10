"use client";

import Image from "next/image";
import LocaleLink from "@/components/LocaleLink";
import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import { branchKey, translateField } from "@/lib/i18n/content-translators";
import type { BranchDetail } from "./branch-details-data";
import { BRANCH_DETAILS } from "./branch-details-data";
import { getBranchMapQuery } from "./branch-map";
import BranchMap from "./BranchMap";
import styles from "./BranchDetail.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";

function LocationIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93A8.001 8.001 0 0 1 4.07 13H11v6.93zM13 20.93V13h6.93A8.001 8.001 0 0 1 13 20.93zM13 11V4.07A8.001 8.001 0 0 1 19.93 11H13zM11 4.07V11H4.07A8.001 8.001 0 0 1 11 4.07z" />
    </svg>
  );
}

export default function BranchDetailSection({ branch }: { branch: BranchDetail }) {
  const t = useTranslations();
  const branchIndex = BRANCH_DETAILS.findIndex((item) => item.slug === branch.slug);
  const idx = branchIndex >= 0 ? branchIndex : 0;
  const sectionRef = useRef<HTMLElement>(null);
  useOurServicesAnimation(sectionRef);

  const mailHref = branch.contact.email ? `mailto:${branch.contact.email}` : undefined;
  const titleForAlt = translateField(t, branchKey(idx, "title"), branch.title);

  return (
    <section ref={sectionRef} className={`section ${styles.detailSection}`}>
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <LocaleLink href="/our-branches" className={styles.backLink} data-services-reveal>
            <T k="ui.allBranches" fallback="← All branches" />
          </LocaleLink>

          <div className={styles.grid} data-experience-card>
            <div className={styles.content}>
              <h1 className={styles.title}>
                <span className="text-gradient-orange">{titleForAlt}</span>
              </h1>

              {branch.description.map((paragraph, index) => (
                <p key={paragraph.slice(0, 32)} className={styles.description}>
                  {translateField(t, branchKey(idx, "description", String(index)), paragraph)}
                </p>
              ))}

              <div className={styles.contactCard}>
                <h2 className={styles.contactTitle}>
                  {translateField(
                    t,
                    branchKey(idx, "contact", "locationLabel"),
                    branch.contact.locationLabel,
                  )}
                </h2>
                <ul className={styles.contactList}>
                  {branch.contact.address ? (
                    <li className={styles.contactItem}>
                      <LocationIcon />
                      <span>
                        {translateField(
                          t,
                          branchKey(idx, "contact", "address"),
                          branch.contact.address,
                        )}
                      </span>
                    </li>
                  ) : null}
                  {branch.contact.phones?.map((phone) => (
                    <li key={phone} className={styles.contactItem}>
                      <PhoneIcon />
                      <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.contactLink}>
                        {phone}
                      </a>
                    </li>
                  ))}
                  {branch.contact.email ? (
                    <li className={styles.contactItem}>
                      <MailIcon />
                      <a href={mailHref} className={styles.contactLink}>
                        {branch.contact.email}
                      </a>
                    </li>
                  ) : null}
                  {branch.contact.website ? (
                    <li className={styles.contactItem}>
                      <GlobeIcon />
                      <a
                        href={`https://${branch.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactLink}
                      >
                        {branch.contact.website}
                      </a>
                    </li>
                  ) : null}
                </ul>

                <BranchMap
                  query={getBranchMapQuery(branch.contact)}
                  title={titleForAlt}
                  mapLink={branch.contact.mapLink}
                />
              </div>

              {mailHref ? (
                <a href={mailHref} className={styles.cta}>
                  <T k="ui.contactUs" fallback="Contact Us" />
                </a>
              ) : null}

              {branch.slug !== "saudi-arabia" ? (
                <LocaleLink
                  href={`/destinations/${branch.slug}`}
                  className={styles.cta}
                  style={{ marginTop: "0.75rem", display: "inline-flex" }}
                >
                  <T
                    k="ui.viewToursInCountry"
                    fallback={`View tours in ${branch.title}`}
                  />
                </LocaleLink>
              ) : null}
            </div>

            <div className={styles.media}>
              <Image
                src={branch.image}
                alt={titleForAlt}
                width={720}
                height={540}
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
