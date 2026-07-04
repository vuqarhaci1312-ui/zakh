"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useEditMode } from "@/contexts/EditModeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslationsState } from "@/contexts/TranslationsContext";
import { getLanguageByCode } from "@/lib/i18n/language-data";
import styles from "./edit-mode.module.css";

export default function EditFieldPanel() {
  const { locale } = useLanguage();
  const { t } = useTranslationsState();
  const {
    isEditMode,
    activeField,
    clearField,
    setDraft,
    getDraftValue,
    isDraftDirty,
    saveAll,
    saving,
  } = useEditMode();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const language = getLanguageByCode(locale);

  const mounted = typeof document !== "undefined";

  useEffect(() => {
    if (!activeField || !textareaRef.current) return;
    textareaRef.current.focus();
    const len = textareaRef.current.value.length;
    textareaRef.current.setSelectionRange(len, len);
  }, [activeField?.key]);

  useEffect(() => {
    if (!isEditMode || !activeField) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        clearField();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        void saveAll();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isEditMode, activeField, clearField, saveAll]);

  useEffect(() => {
    if (!mounted) return;
    document.body.dataset.editPanelOpen = activeField ? "true" : "false";
    return () => {
      document.body.dataset.editPanelOpen = "false";
    };
  }, [activeField, mounted]);

  if (!mounted || !isEditMode || !activeField) return null;

  const savedValue = t(activeField.key, activeField.fallback);
  const currentValue = getDraftValue(activeField.key, savedValue);
  const isEmpty = !currentValue.trim();
  const dirty = isDraftDirty(activeField.key);

  function handleChange(value: string) {
    setDraft(activeField!.key, value);
  }

  return createPortal(
    <>
      <button
        type="button"
        className={styles.editBackdrop}
        aria-label="Close editor"
        onClick={clearField}
      />
      <aside className={styles.editPanel} role="dialog" aria-label="Edit translation field">
        <div className={styles.editPanelHeader}>
          <div>
            <p className={styles.editPanelEyebrow}>Mətn redaktəsi</p>
            <h2 className={styles.editPanelTitle}>Translation field</h2>
          </div>
          <button type="button" className={styles.editPanelClose} onClick={clearField} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.editPanelMeta}>
          <span className={styles.editPanelLocale}>{language.short}</span>
          {dirty ? <span className={styles.editPanelDirty}>Unsaved</span> : null}
          {isEmpty ? <span className={styles.editPanelEmpty}>Empty</span> : null}
        </div>

        <code className={styles.editPanelKey}>{activeField.key}</code>

        <div className={styles.editPanelSection}>
          <p className={styles.editPanelLabel}>Reference (EN source)</p>
          <p className={styles.editPanelReference}>{activeField.fallback || "—"}</p>
        </div>

        <div className={styles.editPanelSection}>
          <label className={styles.editPanelLabel} htmlFor="edit-field-textarea">
            {language.label} translation
          </label>
          <textarea
            id="edit-field-textarea"
            ref={textareaRef}
            className={styles.editPanelTextarea}
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            rows={8}
            placeholder={activeField.fallback || "Enter translation..."}
          />
          <p className={styles.editPanelHint}>
            Dəyişiklik səhifədə dərhal görünür. Yadda saxlamaq üçün altdakı &quot;Yadda saxla&quot; düyməsini basın.
          </p>
        </div>

        <div className={styles.editPanelFooter}>
          <span className={styles.editPanelShortcut}>Esc — bağla · Ctrl+S — yadda saxla</span>
          <button
            type="button"
            className={styles.editPanelDone}
            onClick={clearField}
            disabled={saving}
          >
            Hazırdır
          </button>
        </div>
      </aside>
    </>,
    document.body,
  );
}
