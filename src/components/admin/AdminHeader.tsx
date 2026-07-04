"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ADMIN_LANGUAGE_SECTIONS,
  ADMIN_PAGE_GROUPS,
  getSectionsByGroup,
} from "@/lib/admin/page-sections";
import type { AdminUser } from "@/lib/admin/api";
import styles from "@/app/admin/admin.module.css";

type AdminHeaderProps = {
  user: AdminUser;
  onLogout: () => void;
};

export default function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  const pathname = usePathname();
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const languagesRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const isLanguagesActive = pathname.startsWith("/admin/languages");
  const activeSection = ADMIN_LANGUAGE_SECTIONS.find((section) =>
    pathname.startsWith(`/admin/languages/${section.id}`),
  );

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (languagesRef.current && !languagesRef.current.contains(event.target as Node)) {
        setLanguagesOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user.email.slice(0, 2).toUpperCase();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <Link href="/admin/dashboard" className={styles.headerBrand}>
            <span className={styles.headerBrandMark}>Z</span>
            <span className={styles.headerBrandText}>
              Zakher <em>CMS</em>
            </span>
          </Link>

          <nav className={styles.headerNav} aria-label="Admin navigation">
            <Link
              href="/admin/dashboard"
              className={`${styles.headerNavLink} ${
                pathname.startsWith("/admin/dashboard") ? styles.headerNavLinkActive : ""
              }`}
            >
              Dashboard
            </Link>

            <div className={styles.headerDropdown} ref={languagesRef}>
              <button
                type="button"
                className={`${styles.headerNavLink} ${styles.headerDropdownTrigger} ${
                  isLanguagesActive ? styles.headerNavLinkActive : ""
                }`}
                aria-expanded={languagesOpen}
                aria-haspopup="true"
                onClick={() => {
                  setLanguagesOpen((open) => !open);
                  setUserOpen(false);
                }}
              >
                Languages
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              {languagesOpen ? (
                <div className={styles.headerMegaMenu}>
                  <div className={styles.megaMenuIntro}>
                    <strong>Page translations</strong>
                    <p>Select a page to edit its content in AZ, EN, RU and AR.</p>
                    <Link
                      href="/admin/languages"
                      className={styles.megaMenuOverviewLink}
                      onClick={() => setLanguagesOpen(false)}
                    >
                      View all pages →
                    </Link>
                  </div>
                  <div className={styles.megaMenuGrid}>
                    {ADMIN_PAGE_GROUPS.map((group) => {
                      const sections = getSectionsByGroup(group.id);
                      if (!sections.length) return null;
                      return (
                        <div key={group.id} className={styles.megaMenuGroup}>
                          <p className={styles.megaMenuGroupTitle}>{group.labelAz}</p>
                          <ul className={styles.megaMenuList}>
                            {sections.map((section) => (
                              <li key={section.id}>
                                <Link
                                  href={`/admin/languages/${section.id}`}
                                  className={`${styles.megaMenuLink} ${
                                    activeSection?.id === section.id ? styles.megaMenuLinkActive : ""
                                  }`}
                                  onClick={() => setLanguagesOpen(false)}
                                >
                                  <span>{section.labelAz}</span>
                                  <small>{section.label}</small>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </nav>
        </div>

        <div className={styles.headerRight}>
          {activeSection ? (
            <span className={styles.headerContext}>
              Editing: <strong>{activeSection.labelAz}</strong>
            </span>
          ) : null}

          <div className={styles.headerDropdown} ref={userRef}>
            <button
              type="button"
              className={styles.userButton}
              aria-expanded={userOpen}
              onClick={() => {
                setUserOpen((open) => !open);
                setLanguagesOpen(false);
              }}
            >
              <span className={styles.userAvatar}>{initials}</span>
              <span className={styles.userEmail}>{user.email}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {userOpen ? (
              <div className={styles.userMenu}>
                <div className={styles.userMenuMeta}>
                  <strong>{user.email}</strong>
                  <span>{user.role}</span>
                </div>
                <button type="button" className={styles.userMenuLogout} onClick={onLogout}>
                  Sign out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
