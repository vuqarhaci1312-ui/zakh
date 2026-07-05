"use client";

import { LOCALES, missingLocales, type Locale, type LocalizedText } from "@/lib/content/localized";
import adminStyles from "@/app/admin/admin.module.css";
import styles from "./cms.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
  ar: "AR",
};

type LocaleTabsProps = {
  active: Locale;
  onChange: (locale: Locale) => void;
  values?: LocalizedText | Record<Locale, string>;
};

export default function LocaleTabs({ active, onChange, values }: LocaleTabsProps) {
  return (
    <div className={styles.localeTabs}>
      {LOCALES.map((locale) => {
        const missing = values ? missingLocales(values).includes(locale) : false;
        return (
          <button
            key={locale}
            type="button"
            className={`${styles.localeTab}${active === locale ? ` ${styles.localeTabActive}` : ""}`}
            onClick={() => onChange(locale)}
          >
            <span className={`${styles.localeDot}${missing ? "" : ` ${styles.localeDotComplete}`}`} />
            {LOCALE_LABELS[locale]}
          </button>
        );
      })}
    </div>
  );
}

export function LocalizedInput({
  label,
  locale,
  value,
  onChange,
}: {
  label: string;
  locale: Locale;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className={styles.formField}>
      <label>{label} ({locale.toUpperCase()})</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function LocalizedTextarea({
  label,
  locale,
  value,
  onChange,
}: {
  label: string;
  locale: Locale;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className={styles.formField}>
      <label>{label} ({locale.toUpperCase()})</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span className={`${styles.statusBadge} ${published ? styles.statusPublished : styles.statusDraft}`}>
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function PublishBar({
  published,
  hint,
  saving,
  onSave,
  onPublish,
}: {
  published: boolean;
  hint?: string;
  saving?: boolean;
  onSave: () => void;
  onPublish: () => void;
}) {
  return (
    <div className={styles.publishBar}>
      <div>
        <StatusBadge published={published} />
        {hint ? <p className={styles.publishHint}>{hint}</p> : null}
      </div>
      <div className={styles.rowActions}>
        <button type="button" className={adminStyles.secondaryButton} disabled={saving} onClick={onSave}>
          {saving ? "Saving..." : "Draft save"}
        </button>
        <button type="button" className={adminStyles.primaryButton} disabled={saving} onClick={onPublish}>
          Publish
        </button>
      </div>
    </div>
  );
}
