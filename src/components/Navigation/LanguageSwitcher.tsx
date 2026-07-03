"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/contexts/TranslationsContext";
import {
  getLanguageByCode,
  LANGUAGES,
  type Locale,
} from "@/lib/i18n/language-data";
import { GlobeIcon } from "./NavigationIcons";
import styles from "./Navigation.module.css";

type LanguageSwitcherProps = {
  variant: "desktop" | "mobile";
  overlayMode?: boolean;
  onSelect?: () => void;
};

export default function LanguageSwitcher({
  variant,
  overlayMode = false,
  onSelect,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const current = getLanguageByCode(locale);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
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

  function handleSelect(next: Locale) {
    setLocale(next);
    setOpen(false);
    onSelect?.();
  }

  if (variant === "mobile") {
    return (
      <div className={styles.menuLanguageSection}>
        <p className={styles.menuLanguageLabel}>{t("ui.language", "Language")}</p>
        <div className={styles.menuLanguageGrid} role="listbox" aria-label="Select language">
          {LANGUAGES.map((language) => {
            const active = language.code === locale;

            return (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={active}
                className={`${styles.menuLanguageOption} ${active ? styles.menuLanguageOptionActive : ""}`}
                onClick={() => handleSelect(language.code)}
              >
                <span className={styles.menuLanguageCode}>{language.short}</span>
                <span className={styles.menuLanguageName}>{language.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.languageWrap} ref={rootRef}>
      <button
        type="button"
        className={`${styles.languageTrigger} ${overlayMode ? styles.languageTriggerOverlay : styles.languageTriggerLight}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
      >
        <GlobeIcon className={styles.languageTriggerIcon} />
        <span className={styles.languageTriggerText}>{current.short}</span>
        <span className={styles.languageTriggerChevron} aria-hidden="true">
          ▾
        </span>
      </button>

      {open ? (
        <ul
          id={listboxId}
          className={styles.languageDropdown}
          role="listbox"
          aria-label="Select language"
        >
          {LANGUAGES.map((language) => {
            const active = language.code === locale;

            return (
              <li key={language.code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`${styles.languageOption} ${active ? styles.languageOptionActive : ""}`}
                  onClick={() => handleSelect(language.code)}
                >
                  <span className={styles.languageOptionCode}>{language.short}</span>
                  <span className={styles.languageOptionLabel}>{language.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
