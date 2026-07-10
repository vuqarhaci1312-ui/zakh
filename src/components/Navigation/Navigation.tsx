"use client";

import { Fragment, useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  type NavChildLink,
} from "./navigation-data";
import LanguageSwitcher from "./LanguageSwitcher";
import { useCeepiiNavigation } from "./useCeepiiNavigation";
import T from "@/components/edit-mode/EditableText";
import LocaleLink from "@/components/LocaleLink";
import { useTranslations } from "@/contexts/TranslationsContext";
import { stripLocale } from "@/lib/i18n/locale-path";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isActiveLink(pathname: string, href: string) {
  if (isExternalHref(href)) {
    return false;
  }

  const barePath = stripLocale(pathname);

  if (href === "/tour-packages") {
    return barePath === "/tour-packages" || barePath.startsWith("/destinations");
  }

  const pathOnly = href.split("#")[0] || href;

  if (pathOnly === "/") {
    return barePath === "/";
  }

  return barePath === pathOnly || barePath.startsWith(`${pathOnly}/`);
}

function isDropdownActive(
  pathname: string,
  href: string,
  children?: readonly NavChildLink[],
) {
  if (isActiveLink(pathname, href)) {
    return true;
  }

  return children?.some((child) => isActiveLink(pathname, child.href)) ?? false;
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
    <LocaleLink href={href} className={combinedClassName} onClick={onClick}>
      <T k={labelKey} fallback={label} />
    </LocaleLink>
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
    <LocaleLink href={href} className={className} aria-current={active ? "page" : undefined}>
      <T k={labelKey} fallback={label} />
    </LocaleLink>
  );
}

function PillDropdown({
  href,
  label,
  labelKey,
  subLinks,
  pathname,
  gradient,
}: {
  href: string;
  label: string;
  labelKey: string;
  subLinks: readonly NavChildLink[];
  pathname: string;
  gradient?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const menuId = useId();
  const active = isDropdownActive(pathname, href, subLinks);
  const className = `${styles.pillLink} ${styles.pillDropdownTrigger} ${gradient ? "text-gradient-orange" : ""} ${active ? styles.pillLinkActive : ""}`;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const rect = root.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + 10,
      left: rect.left + rect.width / 2,
    });
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    updateMenuPosition();
    window.addEventListener("scroll", updateMenuPosition, true);
    window.addEventListener("resize", updateMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition, true);
      window.removeEventListener("resize", updateMenuPosition);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    updateMenuPosition();
    setOpen(true);
  }, [updateMenuPosition]);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 120);
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  const menu =
    open && mounted && menuPosition
      ? createPortal(
          <div
            ref={menuRef}
            className={styles.pillDropdownMenuWrapPortal}
            style={{ top: menuPosition.top, left: menuPosition.left }}
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
          >
            <ul id={menuId} className={styles.pillDropdownMenu} role="menu">
              {subLinks.map((child, childIndex) => {
                const childActive = isActiveLink(pathname, child.href);
                const childLabelKey = `${labelKey.replace(/\.label$/, "")}.children.${childIndex}.label`;

                return (
                  <li key={child.href} role="none">
                    <LocaleLink
                      href={child.href}
                      className={`${styles.pillDropdownItem} ${childActive ? styles.pillDropdownItemActive : ""}`}
                      role="menuitem"
                      aria-current={childActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <T k={childLabelKey} fallback={child.label} />
                    </LocaleLink>
                  </li>
                );
              })}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={rootRef}
      className={`${styles.pillDropdown} ${open ? styles.pillDropdownOpen : ""}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <LocaleLink
        href={href}
        className={className}
        aria-current={active ? "page" : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(false)}
      >
        <T k={labelKey} fallback={label} />
        <span className={styles.pillDropdownChevron} aria-hidden="true">
          ▾
        </span>
      </LocaleLink>

      {menu}
    </div>
  );
}

const B2B_URL = "https://b2b.zakher.travel/";

function B2bLink({
  overlayMode,
  className,
  onClick,
}: {
  overlayMode?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const t = useTranslations();

  return (
    <a
      href={B2B_URL}
      className={`${styles.b2bLink} ${overlayMode ? styles.b2bLinkOverlay : styles.b2bLinkLight} ${className ?? ""}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={t("nav.b2b", "B2B")}
    >
      B2B
    </a>
  );
}

function DesktopHeader({
  pathname,
  overlayMode,
  fixedMode,
}: {
  pathname: string;
  overlayMode: boolean;
  fixedMode: boolean;
}) {
  const t = useTranslations();
  const shellClassName = overlayMode
    ? styles.overlayShell
    : fixedMode
      ? styles.fixedShell
      : styles.stickyShell;

  return (
    <div className={shellClassName}>
      <header className={`${styles.header} ${overlayMode ? "" : styles.headerLight}`}>
        <div className={styles.headerInner}>
          <div className={styles.container}>
            <div className={styles.left}>
              <LocaleLink
                href="/"
                className={styles.logoLink}
                aria-label={t("ui.zakherTravelHome", "Zakher Travel home")}
              >
                <img
                  src={NAV_LOGO}
                  alt={t("ui.zakherTravelHome", "Zakher Travel home")}
                  className={styles.logo}
                  width={160}
                  height={48}
                />
              </LocaleLink>
            </div>

            <div className={styles.centerWrap}>
              <div
                className={`${styles.centerPill} ${overlayMode ? "" : styles.centerPillLight}`}
              >
                <div className={styles.pillSegments}>
                  {NAV_PILL_LINKS.map((link, index) => (
                    <Fragment key={link.href}>
                      {index > 0 ? (
                        <span
                          className={`${styles.pillDivider} ${overlayMode ? "" : styles.pillDividerLight}`}
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className={styles.pillSegment}>
                        {link.children ? (
                          <PillDropdown
                            href={link.href}
                            label={link.label}
                            labelKey={`nav.pillLinks.${index}.label`}
                            subLinks={link.children}
                            pathname={pathname}
                            gradient={!overlayMode}
                          />
                        ) : (
                          <PillLink
                            href={link.href}
                            label={link.label}
                            labelKey={`nav.pillLinks.${index}.label`}
                            pathname={pathname}
                            gradient={!overlayMode}
                          />
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.right}>
              <B2bLink overlayMode={overlayMode} />
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
    fixedMode,
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

      <DesktopHeader pathname={pathname} overlayMode={overlayMode} fixedMode={fixedMode} />

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
              {link.children ? (
                <ul className={styles.menuSubList}>
                  {link.children.map((child, childIndex) => (
                    <li key={child.href}>
                      <NavLink
                        href={child.href}
                        label={child.label}
                        labelKey={`nav.links.${index}.children.${childIndex}.label`}
                        pathname={pathname}
                        className={styles.menuSubLink}
                        activeClassName={styles.menuLinkActive}
                        onClick={closeMobileMenu}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <div className={styles.menuActions}>
          <B2bLink onClick={closeMobileMenu} />
        </div>

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
              <LocaleLink
                key={tab.href}
                href={tab.href}
                className={`${styles.bottomTab} ${active ? styles.bottomTabActive : ""}`}
                aria-label={`${t("ui.navigateTo", "Navigate to")} ${tabLabel}`}
              >
                <Icon className={styles.bottomTabIcon} />
                <p className={styles.bottomTabLabel}>
                  <T k={`nav.mobileTabs.${tabIndex}.label`} fallback={tab.label} />
                </p>
              </LocaleLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
