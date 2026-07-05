"use client";

import { useEffect, useState } from "react";
import adminStyles from "@/app/admin/admin.module.css";
import AdminPageHeader from "@/components/admin/cms/AdminPageHeader";
import LocaleTabs, {
  LocalizedInput,
  LocalizedTextarea,
  PublishBar,
  StatusBadge,
} from "@/components/admin/cms/LocaleTabs";
import MediaUploader from "@/components/admin/cms/MediaUploader";
import cmsStyles from "@/components/admin/cms/cms.module.css";
import { contentAdminApi } from "@/lib/admin/content-api";
import { emptyLocalized, type Locale, type LocalizedText } from "@/lib/content/localized";

type BrochureItem = {
  id: string;
  title: LocalizedText;
  languageTag: string;
  imageUrl: string;
  fileUrl: string;
  published: boolean;
};

type Section = {
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
};

const LANGUAGE_TAGS = ["EN", "AR", "RU", "DE", "Chinese", "EN/AR"];

export default function CatalogsAdminPage() {
  const [items, setItems] = useState<BrochureItem[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [locale, setLocale] = useState<Locale>("az");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await contentAdminApi.brochures.list();
    setItems(data.items as BrochureItem[]);
    setSection((data.section as Section | null) ?? null);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Kataloqlar"
        description="Broşürlər və PDF kataloqlar."
        actions={
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.brochures
                .create({
                  title: emptyLocalized(),
                  languageTag: "EN",
                  imageUrl: "",
                  fileUrl: "",
                  published: false,
                })
                .then(load)
            }
          >
            + Yeni kataloq
          </button>
        }
      />

      {section ? (
        <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`} style={{ marginBottom: 24 }}>
          <h2>Bölmə mətnləri</h2>
          <LocaleTabs active={locale} onChange={setLocale} values={section.title} />
          <LocalizedInput label="Badge" locale={locale} value={section.badge[locale]} onChange={(value) => setSection({ ...section, badge: { ...section.badge, [locale]: value } })} />
          <LocalizedInput label="Başlıq" locale={locale} value={section.title[locale]} onChange={(value) => setSection({ ...section, title: { ...section.title, [locale]: value } })} />
          <LocalizedTextarea label="Təsvir" locale={locale} value={section.description[locale]} onChange={(value) => setSection({ ...section, description: { ...section.description, [locale]: value } })} />
          <button type="button" className={adminStyles.secondaryButton} onClick={() => void contentAdminApi.brochures.updateSection(section).then(load)}>
            Bölməni yadda saxla
          </button>
        </div>
      ) : null}

      {loading ? <p>Yüklənir...</p> : null}

      <div className={cmsStyles.cardGrid}>
        {items.map((item) => (
          <BrochureEditor key={item.id} item={item} onChanged={load} />
        ))}
      </div>
    </div>
  );
}

function BrochureEditor({ item, onChanged }: { item: BrochureItem; onChanged: () => Promise<void> }) {
  const [locale, setLocale] = useState<Locale>("az");
  const [draft, setDraft] = useState(item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setDraft(item), [item]);

  async function saveDraft() {
    setSaving(true);
    try {
      await contentAdminApi.brochures.update(draft.id, draft);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    setSaving(true);
    try {
      await contentAdminApi.brochures.update(draft.id, draft);
      await contentAdminApi.brochures.publish(draft.id);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={cmsStyles.card}>
      <div className={cmsStyles.rowActions}>
        <StatusBadge published={draft.published} />
        <LocaleTabs active={locale} onChange={setLocale} values={draft.title} />
      </div>
      <LocalizedInput label="Başlıq" locale={locale} value={draft.title[locale]} onChange={(value) => setDraft({ ...draft, title: { ...draft.title, [locale]: value } })} />
      <div className={cmsStyles.formField}>
        <label>Dil etiketi</label>
        <select value={draft.languageTag} onChange={(e) => setDraft({ ...draft, languageTag: e.target.value })}>
          {LANGUAGE_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <MediaUploader label="Cover şəkli" folder="brochures" value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} />
      <MediaUploader label="PDF fayl və ya URL" folder="brochures" value={draft.fileUrl} onChange={(fileUrl) => setDraft({ ...draft, fileUrl })} accept="application/pdf,.pdf,image/*" />
      {error ? <p className={adminStyles.errorText}>{error}</p> : null}
      <PublishBar published={draft.published} saving={saving} onSave={() => void saveDraft()} onPublish={() => void publish()} />
      <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.brochures.remove(draft.id).then(onChanged)}>
        Sil
      </button>
    </div>
  );
}
