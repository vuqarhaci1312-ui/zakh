"use client";

import { useEffect, useState } from "react";
import adminStyles from "@/app/admin/admin.module.css";
import AdminPageHeader from "@/components/admin/cms/AdminPageHeader";
import LocaleTabs, {
  LocalizedInput,
  PublishBar,
  StatusBadge,
} from "@/components/admin/cms/LocaleTabs";
import MediaUploader from "@/components/admin/cms/MediaUploader";
import cmsStyles from "@/components/admin/cms/cms.module.css";
import { contentAdminApi } from "@/lib/admin/content-api";
import { emptyLocalized, type Locale, type LocalizedText } from "@/lib/content/localized";

type CertificateItem = {
  id: string;
  imageUrl: string;
  alt: LocalizedText | null;
  published: boolean;
};

type Section = {
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
};

export default function CertificatesAdminPage() {
  const [locale, setLocale] = useState<Locale>("az");
  const [section, setSection] = useState<Section | null>(null);
  const [items, setItems] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await contentAdminApi.certificates.list();
      setSection((data.section as Section | null) ?? null);
      setItems(data.items as CertificateItem[]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createItem() {
    setSaving(true);
    try {
      await contentAdminApi.certificates.create({
        imageUrl: "",
        alt: emptyLocalized(),
        published: false,
      });
      await load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Sertifikatlar"
        description="About səhifəsindəki sertifikat karuselini idarə edin."
        actions={
          <button type="button" className={adminStyles.primaryButton} onClick={() => void createItem()}>
            + Yeni sertifikat
          </button>
        }
      />

      {section ? (
        <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`} style={{ marginBottom: 24 }}>
          <h2>Bölmə başlığı</h2>
          <LocaleTabs active={locale} onChange={setLocale} values={section.title} />
          <LocalizedInput
            label="Başlıq"
            locale={locale}
            value={section.title[locale]}
            onChange={(value) => setSection({ ...section, title: { ...section.title, [locale]: value } })}
          />
          <button
            type="button"
            className={adminStyles.secondaryButton}
            onClick={() =>
              void contentAdminApi.certificates.updateSection(section).then(() => setMessage("Bölmə yadda saxlanıldı"))
            }
          >
            Bölməni yadda saxla
          </button>
        </div>
      ) : null}

      {message ? <p style={{ color: "#166534" }}>{message}</p> : null}
      {loading ? <p>Yüklənir...</p> : null}

      <div className={cmsStyles.card}>
        <table className={cmsStyles.table}>
          <thead>
            <tr>
              <th>Şəkil</th>
              <th>Status</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CertificateRow key={item.id} item={item} onChanged={load} saving={saving} setSaving={setSaving} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CertificateRow({
  item,
  onChanged,
  saving,
  setSaving,
}: {
  item: CertificateItem;
  onChanged: () => Promise<void>;
  saving: boolean;
  setSaving: (value: boolean) => void;
}) {
  const [locale, setLocale] = useState<Locale>("az");
  const [draft, setDraft] = useState(item);
  const [error, setError] = useState("");

  useEffect(() => setDraft(item), [item]);

  async function saveDraft() {
    setSaving(true);
    setError("");
    try {
      await contentAdminApi.certificates.update(draft.id, draft);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setSaving(true);
    setError("");
    try {
      await contentAdminApi.certificates.update(draft.id, draft);
      await contentAdminApi.certificates.publish(draft.id);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr>
      <td colSpan={3}>
        <div className={cmsStyles.cardGrid}>
          <div className={cmsStyles.rowActions}>
            <StatusBadge published={draft.published} />
            <LocaleTabs active={locale} onChange={setLocale} values={draft.alt ?? undefined} />
          </div>
          <MediaUploader
            label="Sertifikat şəkli"
            folder="certificates"
            value={draft.imageUrl}
            onChange={(imageUrl) => setDraft({ ...draft, imageUrl })}
          />
          <LocalizedInput
            label="Alt mətn"
            locale={locale}
            value={draft.alt?.[locale] ?? ""}
            onChange={(value) =>
              setDraft({
                ...draft,
                alt: { ...(draft.alt ?? emptyLocalized()), [locale]: value },
              })
            }
          />
          {error ? <p className={adminStyles.errorText}>{error}</p> : null}
          <PublishBar published={draft.published} saving={saving} onSave={() => void saveDraft()} onPublish={() => void publish()} />
          <div className={cmsStyles.rowActions}>
            <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.certificates.remove(draft.id).then(onChanged)}>
              Sil
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}
