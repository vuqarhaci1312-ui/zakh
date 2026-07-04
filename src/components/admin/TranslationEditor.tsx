"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  bulkSaveTranslations,
  deleteTranslationKey,
  exportTranslations,
  listTranslationsForSection,
  saveTranslation,
  type TranslationRow,
} from "@/lib/admin/api";
import type { AdminPageSection } from "@/lib/admin/page-sections";
import { LANGUAGES, type Locale } from "@/lib/i18n/language-data";
import styles from "@/app/admin/admin.module.css";

type EditableRow = TranslationRow & {
  drafts: Record<string, string>;
  dirty: boolean;
};

type LocaleView = Locale | "all";

type TranslationEditorProps = {
  section: AdminPageSection;
};

function buildEditableRows(items: TranslationRow[]): EditableRow[] {
  return items.map((item) => {
    const drafts: Record<string, string> = {};
    for (const locale of LANGUAGES) {
      drafts[locale.code] =
        item.translations.find((t) => t.locale === locale.code)?.value ?? "";
    }
    return { ...item, drafts, dirty: false };
  });
}

function formatKeyLabel(key: string) {
  const parts = key.split(".");
  parts.shift();
  return parts.join(" · ") || key;
}

export default function TranslationEditor({ section }: TranslationEditorProps) {
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [localeView, setLocaleView] = useState<LocaleView>("all");
  const [newKey, setNewKey] = useState("");
  const [showAddKey, setShowAddKey] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listTranslationsForSection({
        search,
        namespaces: section.namespaces,
        page,
        pageSize: 20,
      });
      setRows(buildEditableRows(list.items));
      setTotalPages(list.totalPages);
      setTotal(list.total);
    } finally {
      setLoading(false);
    }
  }, [search, section.namespaces, page]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setPage(1);
    setSearch("");
  }, [section.id]);

  const dirtyRows = useMemo(() => rows.filter((row) => row.dirty), [rows]);
  const visibleLocales = localeView === "all" ? LANGUAGES : LANGUAGES.filter((l) => l.code === localeView);

  function updateDraft(key: string, locale: string, value: string) {
    setRows((current) =>
      current.map((row) =>
        row.key === key
          ? {
              ...row,
              drafts: { ...row.drafts, [locale]: value },
              dirty: true,
            }
          : row,
      ),
    );
  }

  async function handleSaveAll() {
    setSaving(true);
    setMessage(null);
    try {
      const items = dirtyRows.flatMap((row) =>
        LANGUAGES.map((locale) => ({
          key: row.key,
          locale: locale.code,
          value: row.drafts[locale.code] ?? "",
          namespace: row.namespace,
        })),
      );
      await bulkSaveTranslations(items);
      setMessage({ type: "success", text: `${dirtyRows.length} key saved successfully.` });
      await load();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleAddKey() {
    const trimmed = newKey.trim();
    if (!trimmed) return;
    setSaving(true);
    setMessage(null);
    try {
      const namespace = trimmed.split(".")[0] || section.namespaces[0];
      for (const locale of LANGUAGES) {
        await saveTranslation({
          key: trimmed,
          locale: locale.code,
          value: "",
          namespace,
        });
      }
      setNewKey("");
      setShowAddKey(false);
      setMessage({ type: "success", text: `Added key "${trimmed}".` });
      await load();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Add failed",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteKey(key: string) {
    if (!confirm(`Delete all translations for "${key}"?`)) return;
    setSaving(true);
    try {
      await deleteTranslationKey(key);
      setMessage({ type: "success", text: `Deleted "${key}".` });
      await load();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Delete failed",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleExport() {
    const data = await exportTranslations(section.namespaces[0]);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zakher-${section.id}-translations.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.editorPage}>
      <div className={styles.pageHeader}>
        <div className={styles.breadcrumbs}>
          <Link href="/admin/languages">Languages</Link>
          <span>/</span>
          <span>{section.labelAz}</span>
        </div>
        <h1 className={styles.pageTitle}>{section.labelAz}</h1>
        <p className={styles.pageDescription}>{section.descriptionAz}</p>
        <div className={styles.pageMeta}>
          <span className={styles.metaBadge}>{total} keys</span>
          {section.namespaces.map((ns) => (
            <span key={ns} className={styles.metaTag}>
              {ns}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.editorToolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchField}>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              type="search"
              placeholder="Search key or text..."
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className={styles.localeTabs} role="tablist" aria-label="Language view">
            <button
              type="button"
              role="tab"
              className={`${styles.localeTab} ${localeView === "all" ? styles.localeTabActive : ""}`}
              onClick={() => setLocaleView("all")}
            >
              All
            </button>
            {LANGUAGES.map((locale) => (
              <button
                key={locale.code}
                type="button"
                role="tab"
                className={`${styles.localeTab} ${localeView === locale.code ? styles.localeTabActive : ""}`}
                onClick={() => setLocaleView(locale.code)}
              >
                {locale.short}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.toolbarRight}>
          <button
            type="button"
            className={styles.ghostButton}
            onClick={() => setShowAddKey((open) => !open)}
          >
            + Add key
          </button>
          <button type="button" className={styles.ghostButton} onClick={() => void handleExport()}>
            Export
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void handleSaveAll()}
            disabled={saving || !dirtyRows.length}
          >
            {saving ? "Saving..." : `Save (${dirtyRows.length})`}
          </button>
        </div>
      </div>

      {showAddKey ? (
        <div className={styles.addKeyPanel}>
          <input
            type="text"
            placeholder={`e.g. ${section.namespaces[0]}.newKey`}
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
          />
          <button type="button" className={styles.secondaryButton} onClick={() => void handleAddKey()} disabled={saving}>
            Add
          </button>
          <button type="button" className={styles.ghostButton} onClick={() => setShowAddKey(false)}>
            Cancel
          </button>
        </div>
      ) : null}

      {message ? (
        <div className={message.type === "success" ? styles.toastSuccess : styles.toastError}>
          {message.text}
        </div>
      ) : null}

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>Loading translations...</p>
        </div>
      ) : rows.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No translations found for this page.</p>
          <button type="button" className={styles.secondaryButton} onClick={() => setShowAddKey(true)}>
            Add first key
          </button>
        </div>
      ) : (
        <div className={styles.translationList}>
          {rows.map((row) => (
            <article key={row.key} className={`${styles.translationCard} ${row.dirty ? styles.translationCardDirty : ""}`}>
              <div className={styles.translationCardHeader}>
                <div>
                  <h3 className={styles.translationLabel}>{formatKeyLabel(row.key)}</h3>
                  <code className={styles.translationKey}>{row.key}</code>
                </div>
                <div className={styles.translationCardActions}>
                  {row.dirty ? <span className={styles.unsavedBadge}>Unsaved</span> : null}
                  <button
                    type="button"
                    className={styles.iconDangerButton}
                    onClick={() => void handleDeleteKey(row.key)}
                    title="Delete key"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                className={`${styles.localeGrid} ${
                  localeView !== "all" ? styles.localeGridSingle : ""
                }`}
              >
                {visibleLocales.map((locale) => (
                  <label key={locale.code} className={styles.localeField}>
                    <span className={styles.localeFieldLabel}>
                      {locale.label}
                      {!row.drafts[locale.code] ? <em>empty</em> : null}
                    </span>
                    <textarea
                      className={`${styles.localeTextarea} ${
                        !row.drafts[locale.code] ? styles.localeTextareaEmpty : ""
                      }`}
                      value={row.drafts[locale.code] ?? ""}
                      onChange={(e) => updateDraft(row.key, locale.code, e.target.value)}
                      rows={localeView === "all" ? 3 : 5}
                      placeholder={`${locale.short} translation...`}
                    />
                  </label>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && totalPages > 1 ? (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className={styles.secondaryButton}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      ) : null}

      {dirtyRows.length > 0 ? (
        <div className={styles.saveBar}>
          <span>{dirtyRows.length} unsaved change(s)</span>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void handleSaveAll()}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save all changes"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
