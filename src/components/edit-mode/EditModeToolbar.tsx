"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLanguageByCode } from "@/lib/i18n/language-data";
import styles from "./edit-mode.module.css";

function shortenKey(key: string) {
  const parts = key.split(".");
  if (parts.length <= 2) return key;
  return `${parts[0]}…${parts[parts.length - 1]}`;
}

export default function EditModeToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLanguage();
  const {
    isAdmin,
    isEditMode,
    activeField,
    unsavedCount,
    saving,
    saveError,
    saveSuccess,
    saveAll,
    discardAll,
    exitEditMode,
    enterEditMode,
  } = useEditMode();

  const language = getLanguageByCode(locale);
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    if (!isEditMode || isAdminRoute) {
      document.body.style.paddingBottom = "";
      document.body.dataset.editMode = "false";
      return;
    }
    document.body.style.paddingBottom = activeField ? "24px" : "88px";
    document.body.dataset.editMode = "true";
    return () => {
      document.body.style.paddingBottom = "";
      document.body.dataset.editMode = "false";
    };
  }, [isEditMode, isAdminRoute, activeField]);

  if (isAdminRoute) return null;

  if (!isAdmin) return null;

  if (!isEditMode) {
    return (
      <button type="button" className={styles.enterEditBtn} onClick={enterEditMode}>
        Məzmunu redaktə et
      </button>
    );
  }

  function handleExit() {
    if (unsavedCount > 0 && !confirm("Yadda saxlanmamış dəyişikliklər var. Çıxmaq istəyirsiniz?")) {
      return;
    }
    exitEditMode();
    router.replace(pathname);
  }

  return (
    <div className={styles.editToolbar} role="toolbar" aria-label="Edit mode toolbar">
      <span className={styles.editBadge}>Redaktə rejimi</span>
      <span className={styles.editLocale}>{language.short}</span>
      {activeField ? (
        <span className={styles.editActiveField} title={activeField.key}>
          {shortenKey(activeField.key)}
        </span>
      ) : unsavedCount > 0 ? (
        <span className={styles.editCount}>{unsavedCount} yadda saxlanmayıb</span>
      ) : (
        <span className={styles.editCount}>Redaktə üçün mətnə klikləyin</span>
      )}
      {saveSuccess ? <span className={styles.editSuccess}>Yadda saxlandı</span> : null}
      {saveError ? <span className={styles.editError}>{saveError}</span> : null}
      <div className={styles.editActions}>
        <Link href="/admin/languages" className={styles.editLink}>
          Cədvəl editor
        </Link>
        <button
          type="button"
          className={`${styles.editBtn} ${styles.editBtnSecondary}`}
          onClick={discardAll}
          disabled={saving || unsavedCount === 0}
        >
          Ləğv et
        </button>
        <button
          type="button"
          className={`${styles.editBtn} ${styles.editBtnPrimary}`}
          onClick={() => void saveAll()}
          disabled={saving || unsavedCount === 0}
        >
          {saving ? "Saxlanır..." : "Yadda saxla"}
        </button>
        <button
          type="button"
          className={`${styles.editBtn} ${styles.editBtnGhost}`}
          onClick={handleExit}
          disabled={saving}
        >
          Çıx
        </button>
      </div>
    </div>
  );
}
