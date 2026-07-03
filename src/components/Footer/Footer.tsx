"use client";

import Link from "next/link";
import { SocialIcon } from "@/components/SocialMedia/SocialIcons";
import { useTranslations } from "@/contexts/TranslationsContext";
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
  label,
  external,
  className,
}: {
  href: string;
  label: string;
  external?: boolean;
  className?: string;
}) {
  const linkClassName = className ?? styles.linkItem;

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
  const t = useTranslations();
  const currentYear = new Date().getFullYear();
  const primaryPhone = FOOTER_CONTACT?.phones[0];

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <Link href="/" className={styles.logoLink} aria-label="Zakher Travel home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FOOTER_LOGO} alt="Zakher Travel" className={styles.logo} />
          </Link>
          <p className={styles.tagline}>{t("footer.tagline", FOOTER_TAGLINE)}</p>
        </div>

        <div className={styles.mobileFooter}>
          {FOOTER_CONTACT ? (
            <div className={styles.mobileContact}>
              <p className={styles.mobileAddress}>
                {t("footer.columns.0.contact.address", FOOTER_CONTACT.address)}
              </p>
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

          <nav className={styles.mobileLinks} aria-label="Footer quick links">
            {MOBILE_FOOTER_LINKS.map((link, index) => (
              <FooterLinkItem
                key={`${link.href}-${link.label}`}
                href={link.href}
                label={t(`footer.mobileLinks.${index}.label`, link.label)}
                external={link.external}
                className={styles.mobileLinkItem}
              />
            ))}
          </nav>

          {FOOTER_SOCIAL.length > 0 ? (
            <div className={styles.mobileSocialRow} aria-label="Social media">
              {FOOTER_SOCIAL.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={styles.mobileSocialButton}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t(`footer.columns.3.social.${index}.label`, item.label)}
                >
                  <SocialIcon id={item.id} className={styles.mobileSocialIcon} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className={styles.columnsGrid}>
          {FOOTER_COLUMNS.map((column, columnIndex) => (
            <section key={column.title} className={styles.column}>
              <h3 className={`${styles.columnTitle} text-gradient-orange`}>
                {t(`footer.columns.${columnIndex}.title`, column.title)}
              </h3>

              {column.contact ? (
                <div className={styles.contactBlock}>
                  <p className={styles.contactLine}>
                    {t(`footer.columns.${columnIndex}.contact.address`, column.contact.address)}
                  </p>
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
                        label={t(
                          `footer.columns.${columnIndex}.links.${linkIndex}.label`,
                          link.label,
                        )}
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
                        aria-label={t(
                          `footer.columns.${columnIndex}.social.${socialIndex}.label`,
                          item.label,
                        )}
                      >
                        <SocialIcon id={item.id} className={styles.socialIcon} />
                        <span>
                          {t(
                            `footer.columns.${columnIndex}.social.${socialIndex}.label`,
                            item.label,
                          )}
                        </span>
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
            {t("footer.copyrightSuffix", FOOTER_COPYRIGHT_SUFFIX)}
          </p>
        </div>
      </div>
    </footer>
  );
}
