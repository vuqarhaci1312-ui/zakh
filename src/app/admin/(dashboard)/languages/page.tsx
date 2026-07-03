"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "../../admin.module.css";
import {
  bulkSaveTranslations,
  deleteTranslationKey,
  exportTranslations,
  getNamespaces,
  listTranslations,
  saveTranslation,
  type TranslationRow,
} from "@/lib/admin/api";
import { LANGUAGES } from "@/lib/i18n/language-data";

type EditableRow = TranslationRow & {
  drafts: Record<string, string>;
  dirty: boolean;
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

export default function AdminLanguagesPage() {
  const [rows, setRows] = useState<EditableRow[]>([]);
  const [namespaces, setNamespaces] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [namespace, setNamespace] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newNamespace, setNewNamespace] = useState("general");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [list, ns] = await Promise.all([
        listTranslations({ search, namespace, page, pageSize: 25 }),
        getNamespaces(),
      ]);
      setRows(buildEditableRows(list.items));
      setTotalPages(list.totalPages);
      setNamespaces(ns.namespaces);
    } finally {
      setLoading(false);
    }
  }, [search, namespace, page]);

  useEffect(() => {
    void load();
  }, [load]);

  const dirtyRows = useMemo(() => rows.filter((row) => row.dirty), [rows]);

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
    setMessage("");
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
      setMessage(`Saved ${dirtyRows.length} key(s).`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddKey() {
    if (!newKey.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      for (const locale of LANGUAGES) {
        await saveTranslation({
          key: newKey.trim(),
          locale: locale.code,
          value: "",
          namespace: newNamespace.trim() || "general",
        });
      }
      setNewKey("");
      setMessage(`Added key ${newKey.trim()}`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Add failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteKey(key: string) {
    if (!confirm(`Delete all translations for "${key}"?`)) return;
    setSaving(true);
    try {
      await deleteTranslationKey(key);
      setMessage(`Deleted ${key}`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleExport() {
    const data = await exportTranslations(namespace || undefined);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `zakher-translations${namespace ? `-${namespace}` : ""}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text) as {
      translations?: Record<string, Record<string, string>>;
    };

    const items: { key: string; locale: string; value: string; namespace?: string }[] = [];

    if (parsed.translations) {
      for (const [locale, dict] of Object.entries(parsed.translations)) {
        for (const [key, value] of Object.entries(dict)) {
          items.push({ key, locale, value, namespace: key.split(".")[0] });
        }
      }
    }

    if (!items.length) {
      setMessage("Import file format not recognized.");
      return;
    }

    setSaving(true);
    try {
      await bulkSaveTranslations(items);
      setMessage(`Imported ${items.length} translation entries.`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Import failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2>Languages / Translations</h2>
      <p>Manage AZ, EN, RU, and AR content across the website.</p>

      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Search key or text..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select
          value={namespace}
          onChange={(e) => {
            setPage(1);
            setNamespace(e.target.value);
          }}
        >
          <option value="">All namespaces</option>
          {namespaces.map((ns) => (
            <option key={ns} value={ns}>
              {ns}
            </option>
          ))}
        </select>
        <button type="button" className={styles.primaryButton} onClick={handleSaveAll} disabled={saving || !dirtyRows.length}>
          Save changes ({dirtyRows.length})
        </button>
        <button type="button" className={styles.secondaryButton} onClick={handleExport}>
          Export JSON
        </button>
        <label className={styles.secondaryButton}>
          Import JSON
          <input
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImport(file);
              e.currentTarget.value = "";
            }}
          />
        </label>
      </div>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="new.translation.key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="namespace"
          value={newNamespace}
          onChange={(e) => setNewNamespace(e.target.value)}
        />
        <button type="button" className={styles.secondaryButton} onClick={handleAddKey} disabled={saving}>
          Add key
        </button>
      </div>

      {message ? <p>{message}</p> : null}
      {loading ? <p>Loading translations...</p> : null}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Key</th>
              {LANGUAGES.map((locale) => (
                <th key={locale.code}>{locale.short}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key}>
                <td className={styles.keyCell}>
                  <div>{row.key}</div>
                  <small>{row.namespace}</small>
                </td>
                {LANGUAGES.map((locale) => (
                  <td key={locale.code}>
                    <textarea
                      className={`${styles.localeInput} ${!row.drafts[locale.code] ? styles.emptyCell : ""}`}
                      value={row.drafts[locale.code] ?? ""}
                      onChange={(e) => updateDraft(row.key, locale.code, e.target.value)}
                    />
                  </td>
                ))}
                <td>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => void handleDeleteKey(row.key)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          Page {page} / {totalPages}
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
    </div>
  );
}
