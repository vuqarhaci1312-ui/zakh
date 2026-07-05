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

type EventItem = {
  id: string;
  title: LocalizedText;
  description: LocalizedText | null;
  images: string[];
  videoUrl: string | null;
  published: boolean;
};

type Section = {
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
};

export default function EventsAdminPage() {
  const [items, setItems] = useState<EventItem[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [locale, setLocale] = useState<Locale>("az");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await contentAdminApi.events.list();
    setItems(data.items as EventItem[]);
    setSection((data.section as Section | null) ?? null);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Tədbirlər"
        description="Event siyahısı, qalereya şəkilləri və videolar."
        actions={
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.events
                .create({ title: emptyLocalized(), description: emptyLocalized(), images: [], published: false })
                .then(load)
            }
          >
            + Yeni event
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
          <button type="button" className={adminStyles.secondaryButton} onClick={() => void contentAdminApi.events.updateSection(section).then(load)}>
            Bölməni yadda saxla
          </button>
        </div>
      ) : null}

      {loading ? <p>Yüklənir...</p> : null}

      <div className={cmsStyles.cardGrid}>
        {items.map((item) => (
          <EventEditor key={item.id} item={item} onChanged={load} />
        ))}
      </div>
    </div>
  );
}

function EventEditor({ item, onChanged }: { item: EventItem; onChanged: () => Promise<void> }) {
  const [locale, setLocale] = useState<Locale>("az");
  const [draft, setDraft] = useState(item);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setDraft(item), [item]);

  async function saveDraft() {
    setSaving(true);
    try {
      await contentAdminApi.events.update(draft.id, draft);
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
      await contentAdminApi.events.update(draft.id, draft);
      await contentAdminApi.events.publish(draft.id);
      await onChanged();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setSaving(false);
    }
  }

  function addImage(url: string) {
    if (!url) return;
    setDraft({ ...draft, images: [...draft.images, url] });
  }

  return (
    <div className={cmsStyles.card}>
      <div className={cmsStyles.rowActions}>
        <StatusBadge published={draft.published} />
        <LocaleTabs active={locale} onChange={setLocale} values={draft.title} />
      </div>
      <LocalizedInput label="Başlıq" locale={locale} value={draft.title[locale]} onChange={(value) => setDraft({ ...draft, title: { ...draft.title, [locale]: value } })} />
      <LocalizedTextarea
        label="Təsvir"
        locale={locale}
        value={draft.description?.[locale] ?? ""}
        onChange={(value) => setDraft({ ...draft, description: { ...(draft.description ?? emptyLocalized()), [locale]: value } })}
      />
      <MediaUploader label="Yeni şəkil əlavə et" folder="events" value="" onChange={addImage} />
      <MediaUploader label="Video URL" folder="events" value={draft.videoUrl ?? ""} onChange={(videoUrl) => setDraft({ ...draft, videoUrl })} accept="video/mp4" />
      <div className={cmsStyles.repeater}>
        {draft.images.map((image, index) => (
          <div key={`${image}-${index}`} className={cmsStyles.repeaterItem}>
            <MediaUploader
              label={`Şəkil ${index + 1}`}
              folder="events"
              value={image}
              onChange={(url) => {
                const images = [...draft.images];
                images[index] = url;
                setDraft({ ...draft, images });
              }}
            />
            <button
              type="button"
              className={adminStyles.dangerButton}
              onClick={() => setDraft({ ...draft, images: draft.images.filter((_, i) => i !== index) })}
            >
              Şəkli sil
            </button>
          </div>
        ))}
      </div>
      {error ? <p className={adminStyles.errorText}>{error}</p> : null}
      <PublishBar published={draft.published} saving={saving} onSave={() => void saveDraft()} onPublish={() => void publish()} />
      <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.events.remove(draft.id).then(onChanged)}>
        Event-i sil
      </button>
    </div>
  );
}
