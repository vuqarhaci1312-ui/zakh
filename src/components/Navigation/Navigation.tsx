"use client";

import Link from "next/link";
import {
  AboutTabIcon,
  CloseIcon,
  HomeTabIcon,
  MenuTabIcon,
  ServicesTabIcon,
  ToursTabIcon,
} from "./NavigationIcons";
import styles from "./Navigation.module.css";
import {
  MOBILE_TABS,
  NAV_LINKS,
  NAV_LOGO,
  NAV_PILL_LINKS,
} from "./navigation-data";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCeepiiNavigation } from "./useCeepiiNavigation";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isActiveLink(pathname: string, href: string) {
  if (isExternalHref(href)) {
    return false;
  }

  if (href === "/tour-packages") {
    return pathname === "/tour-packages" || pathname.startsWith("/destinations");
  }

  const pathOnly = href.split("#")[0] || href;

  if (pathOnly === "/") {
    return pathname === "/";
  }

  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

function NavLink({
  href,
  label,
  labelKey,
  pathname,
  className,
  activeClassName,
  onClick,
}: {
  href: string;
  label: string;
  labelKey: string;
  pathname: string;
  className: string;
  activeClassName: string;
  onClick?: () => void;
}) {
  const active = isActiveLink(pathname, href);
  const combinedClassName = `${className} ${active ? activeClassName : ""}`;

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={onClick}
        target="_blank"
        rel="noreferrer"
      >
        <T k={labelKey} fallback={label} />
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClassName} onClick={onClick}>
      <T k={labelKey} fallback={label} />
    </Link>
  );
}

function PillLink({
  href,
  label,
  labelKey,
  pathname,
  gradient,
}: {
  href: string;
  label: string;
  labelKey: string;
  pathname: string;
  gradient?: boolean;
}) {
  const active = isActiveLink(pathname, href);
  const className = `${styles.pillLink} ${gradient ? "text-gradient-orange" : ""} ${active ? styles.pillLinkActive : ""}`;

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        <T k={labelKey} fallback={label} />
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-current={active ? "page" : undefined}>
      <T k={labelKey} fallback={label} />
    </Link>
  );
}

function DesktopHeader({
  pathname,
  overlayMode,
}: {
  pathname: string;
  overlayMode: boolean;
}) {
  const t = useTranslations();

  return (
    <div className={overlayMode ? styles.overlayShell : styles.stickyShell}>
      <header className={`${styles.header} ${overlayMode ? "" : styles.headerLight}`}>
        <div className={styles.headerInner}>
          <div className={styles.container}>
            <div className={styles.left}>
              <Link
                href="/"
                className={styles.logoLink}
                aria-label={t("ui.zakherTravelHome", "Zakher Travel home")}
              >
                <img
                  src={NAV_LOGO}
                  alt={t("ui.zakherTravelHome", "Zakher Travel home")}
                  className={styles.logo}
                />
              </Link>
            </div>

            <div className={styles.centerWrap}>
              <div
                className={`${styles.centerPill} ${overlayMode ? "" : styles.centerPillLight}`}
              >
                <div className={styles.pillSegments}>
                  {NAV_PILL_LINKS.map((link, index) => (
                    <span key={link.href} style={{ display: "contents" }}>
                      {index > 0 ? (
                        <span
                          className={`${styles.pillDivider} ${overlayMode ? "" : styles.pillDividerLight}`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <PillLink
                        href={link.href}
                        label={link.label}
                        labelKey={`nav.pillLinks.${index}.label`}
                        pathname={pathname}
                        gradient={!overlayMode}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <LanguageSwitcher variant="desktop" overlayMode={overlayMode} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default function Navigation() {
  const {
    pathname,
    mobileMenuOpen,
    overlayMode,
    toggleMobileMenu,
    closeMobileMenu,
  } = useCeepiiNavigation();
  const t = useTranslations();

  return (
    <>
      <div
        className={`${styles.backdrop} ${mobileMenuOpen ? styles.backdropOpen : ""}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      <DesktopHeader pathname={pathname} overlayMode={overlayMode} />

      <aside
        className={`${styles.menuPanel} ${mobileMenuOpen ? styles.menuPanelOpen : ""}`}
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t("ui.navigationMenu", "Navigation menu")}
      >
        <div className={styles.menuPanelHandle} aria-hidden="true" />
        <div className={styles.menuPanelHeader}>
          <p className={styles.menuPanelTitle}>
            <T k="ui.menu" fallback="Menu" />
          </p>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={t("ui.closeMenu", "Close menu")}
            onClick={closeMobileMenu}
          >
            <CloseIcon />
          </button>
        </div>

        <ul className={styles.menuList}>
          {NAV_LINKS.map((link, index) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                label={link.label}
                labelKey={`nav.links.${index}.label`}
                pathname={pathname}
                className={styles.menuLink}
                activeClassName={styles.menuLinkActive}
                onClick={closeMobileMenu}
              />
            </li>
          ))}
        </ul>

        <LanguageSwitcher
          variant="mobile"
          onSelect={closeMobileMenu}
        />
      </aside>

      <nav className={styles.bottomBar} aria-label={t("ui.navigationMenu", "Navigation menu")}>
        <div className={styles.bottomBarInner}>
          {MOBILE_TABS.map((tab, tabIndex) => {
            if (tab.type === "menu") {
              return (
                <button
                  key={tab.label}
                  type="button"
                  className={`${styles.bottomTabButton} ${mobileMenuOpen ? styles.bottomTabActive : ""}`}
                  aria-label={t("ui.openMenu", "Open menu")}
                  onClick={toggleMobileMenu}
                >
                  <MenuTabIcon className={styles.bottomTabIcon} />
                  <p className={styles.bottomTabLabel}>
                    <T k={`nav.mobileTabs.${tabIndex}.label`} fallback={tab.label} />
                  </p>
                </button>
              );
            }

            const active = isActiveLink(pathname, tab.href);
            const Icon =
              tab.href === "/"
                ? HomeTabIcon
                : tab.href === "/about"
                  ? AboutTabIcon
                : tab.href === "/tour-packages"
                    ? ToursTabIcon
                    : ServicesTabIcon;

            const tabLabel = t(`nav.mobileTabs.${tabIndex}.label`, tab.label);

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`${styles.bottomTab} ${active ? styles.bottomTabActive : ""}`}
                aria-label={`${t("ui.navigateTo", "Navigate to")} ${tabLabel}`}
              >
                <Icon className={styles.bottomTabIcon} />
                <p className={styles.bottomTabLabel}>
                  <T k={`nav.mobileTabs.${tabIndex}.label`} fallback={tab.label} />
                </p>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
