"use client";

import Link from "next/link";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import { SocialIcon } from "@/components/SocialMedia/SocialIcons";
import styles from "./Footer.module.css";
import {
  FOOTER_CONTACT,
  FOOTER_COPYRIGHT_SUFFIX,
  FOOTER_COLUMNS,
  FOOTER_LOGO,
  FOOTER_SOCIAL,
  FOOTER_TAGLINE,
  MOBILE_FOOTER_LINKS,
} from "./footer-data";

function FooterLinkItem({
  href,
  labelKey,
  fallback,
  external,
  className,
}: {
  href: string;
  labelKey: string;
  fallback: string;
  external?: boolean;
  className?: string;
}) {
  const linkClassName = className ?? styles.linkItem;
  const label = <T k={labelKey} fallback={fallback} />;

  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={linkClassName} target="_blank" rel="noreferrer noopener">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClassName}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryPhone = FOOTER_CONTACT?.phones[0];
  const t = useTranslations();
  const homeLabel = t("ui.zakherTravelHome", "Zakher Travel home");

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <Link href="/" className={styles.logoLink} aria-label={homeLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOOTER_LOGO} alt={homeLabel} className={styles.logo} />
          </Link>
          <T k="footer.tagline" fallback={FOOTER_TAGLINE} as="p" className={styles.tagline} />
        </div>

        <div className={styles.mobileFooter}>
          {FOOTER_CONTACT ? (
            <div className={styles.mobileContact}>
              <T
                k="footer.columns.0.contact.address"
                fallback={FOOTER_CONTACT.address}
                as="p"
                className={styles.mobileAddress}
              />
              {primaryPhone ? (
                <a href={primaryPhone.href} className={styles.mobileContactLink}>
                  {primaryPhone.value}
                </a>
              ) : null}
              <a href={FOOTER_CONTACT.email.href} className={styles.mobileContactLink}>
                {FOOTER_CONTACT.email.value}
              </a>
            </div>
          ) : null}

          <nav className={styles.mobileLinks} aria-label={t("ui.footerQuickLinks", "Footer quick links")}>
            {MOBILE_FOOTER_LINKS.map((link, index) => (
              <FooterLinkItem
                key={`${link.href}-${link.label}`}
                href={link.href}
                labelKey={`footer.mobileLinks.${index}.label`}
                fallback={link.label}
                external={link.external}
                className={styles.mobileLinkItem}
              />
            ))}
          </nav>

          {FOOTER_SOCIAL.length > 0 ? (
            <div className={styles.mobileSocialRow} aria-label={t("ui.socialMediaSection", "Social media")}>
              {FOOTER_SOCIAL.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={styles.mobileSocialButton}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t(`footer.columns.3.social.${index}.label`, item.label)}
                >
                  <SocialIcon
                    id={item.id}
                    className={styles.mobileSocialIcon}
                    orangeLogo={item.id === "snapchat"}
                  />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.columnsGrid}>
          {FOOTER_COLUMNS.map((column, columnIndex) => (
            <section key={column.title} className={styles.column}>
              <T
                k={`footer.columns.${columnIndex}.title`}
                fallback={column.title}
                as="h3"
                className={`${styles.columnTitle} text-gradient-orange`}
              />

              {column.contact ? (
                <div className={styles.contactBlock}>
                  <T
                    k={`footer.columns.${columnIndex}.contact.address`}
                    fallback={column.contact.address}
                    as="p"
                    className={styles.contactLine}
                  />
                  <div className={styles.phoneList}>
                    {column.contact.phones.map((phone) => (
                      <a key={phone.href} href={phone.href} className={styles.contactLink}>
                        {phone.value}
                      </a>
                    ))}
                  </div>
                  <a href={column.contact.email.href} className={styles.contactLink}>
                    {column.contact.email.value}
                  </a>
                </div>
              ) : null}

              {column.links ? (
                <ul className={styles.linkList}>
                  {column.links.map((link, linkIndex) => (
                    <li key={`${link.href}-${link.label}`}>
                      <FooterLinkItem
                        href={link.href}
                        labelKey={`footer.columns.${columnIndex}.links.${linkIndex}.label`}
                        fallback={link.label}
                        external={link.external}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}

              {column.social ? (
                <ul className={styles.socialList}>
                  {column.social.map((item, socialIndex) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={styles.socialLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={t(`footer.columns.${columnIndex}.social.${socialIndex}.label`, item.label)}
                      >
                        {item.id === "x" ? (
                          <>
                            <SocialIcon
                              id={item.id}
                              className={styles.socialIcon}
                              orangeLogo={item.id === "snapchat"}
                            />
                            <span className={styles.socialLabel}>X</span>
                          </>
                        ) : (
                          <>
                            <SocialIcon
                              id={item.id}
                              className={styles.socialIcon}
                              orangeLogo={item.id === "snapchat"}
                            />
                            <T
                              k={`footer.columns.${columnIndex}.social.${socialIndex}.label`}
                              fallback={item.label}
                              as="span"
                            />
                          </>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © Zakher Travel {currentYear}{" "}
            <T k="footer.copyrightSuffix" fallback={FOOTER_COPYRIGHT_SUFFIX} />
          </p>
        </div>
      </div>
    </footer>
  );
}
