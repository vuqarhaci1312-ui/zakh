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

type Section = {
  key: string;
  badge: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  embedUrl?: string | null;
  channelUrl?: string | null;
};

type SocialLink = {
  id: string;
  platformId: string;
  label: LocalizedText;
  title: LocalizedText;
  href: string;
  published: boolean;
};

type InstagramAccount = {
  id: string;
  username: string;
  href: string;
  imageUrl: string;
  avatarUrl: string;
  published: boolean;
};

const PLATFORMS = ["facebook", "x", "wechat", "telegram", "youtube", "tiktok", "instagram", "linkedin", "snapchat", "tripadvisor"];

export default function SocialMediaAdminPage() {
  const [tab, setTab] = useState<"follow" | "instagram" | "youtube" | "links">("follow");
  const [sections, setSections] = useState<Section[]>([]);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [instagram, setInstagram] = useState<InstagramAccount[]>([]);
  const [locale, setLocale] = useState<Locale>("az");

  async function load() {
    const data = await contentAdminApi.social.list();
    setSections(data.sections as Section[]);
    setLinks(data.links as SocialLink[]);
    setInstagram(data.instagram as InstagramAccount[]);
  }

  useEffect(() => {
    void load();
  }, []);

  const sectionByKey = (key: string) => sections.find((s) => s.key === key);

  return (
    <div>
      <AdminPageHeader title="Sosial media" description="Follow Us, Instagram, YouTube və platform linkləri." />

      <div className={cmsStyles.localeTabs} style={{ marginBottom: 20 }}>
        {[
          ["follow", "Follow Us"],
          ["instagram", "Instagram"],
          ["youtube", "YouTube"],
          ["links", "Platform linkləri"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`${cmsStyles.localeTab}${tab === id ? ` ${cmsStyles.localeTabActive}` : ""}`}
            onClick={() => setTab(id as typeof tab)}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === "follow" || tab === "instagram" || tab === "youtube") && (
        <SectionEditor
          sectionKey={tab === "follow" ? "follow_us" : tab}
          section={sectionByKey(tab === "follow" ? "follow_us" : tab)}
          locale={locale}
          setLocale={setLocale}
          onSaved={load}
        />
      )}

      {tab === "links" && (
        <div className={cmsStyles.cardGrid}>
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.social
                .createLink({
                  platformId: "facebook",
                  label: emptyLocalized(),
                  title: emptyLocalized(),
                  href: "",
                  published: false,
                })
                .then(load)
            }
          >
            + Yeni link
          </button>
          {links.map((link) => (
            <SocialLinkEditor key={link.id} item={link} onChanged={load} />
          ))}
        </div>
      )}

      {tab === "instagram" && (
        <div className={cmsStyles.cardGrid} style={{ marginTop: 24 }}>
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.social
                .createInstagram({ username: "", href: "", imageUrl: "", avatarUrl: "", published: false })
                .then(load)
            }
          >
            + Instagram hesabı
          </button>
          {instagram.map((account) => (
            <InstagramEditor key={account.id} item={account} onChanged={load} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionEditor({
  sectionKey,
  section,
  locale,
  setLocale,
  onSaved,
}: {
  sectionKey: string;
  section?: Section;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onSaved: () => Promise<void>;
}) {
  const [draft, setDraft] = useState<Section | null>(section ?? null);

  useEffect(() => {
    setDraft(section ?? null);
  }, [section]);

  if (!draft) return <p>Bölmə tapılmadı. Seed script-i işə salın.</p>;

  return (
    <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`}>
      <LocaleTabs active={locale} onChange={setLocale} values={draft.title} />
      <LocalizedInput label="Badge" locale={locale} value={draft.badge[locale]} onChange={(value) => setDraft({ ...draft, badge: { ...draft.badge, [locale]: value } })} />
      <LocalizedInput label="Başlıq" locale={locale} value={draft.title[locale]} onChange={(value) => setDraft({ ...draft, title: { ...draft.title, [locale]: value } })} />
      <LocalizedTextarea label="Təsvir" locale={locale} value={draft.description[locale]} onChange={(value) => setDraft({ ...draft, description: { ...draft.description, [locale]: value } })} />
      {sectionKey === "youtube" ? (
        <>
          <div className={cmsStyles.formField}>
            <label>Embed URL</label>
            <input value={draft.embedUrl ?? ""} onChange={(e) => setDraft({ ...draft, embedUrl: e.target.value })} />
          </div>
          <div className={cmsStyles.formField}>
            <label>Channel URL</label>
            <input value={draft.channelUrl ?? ""} onChange={(e) => setDraft({ ...draft, channelUrl: e.target.value })} />
          </div>
        </>
      ) : null}
      <button type="button" className={adminStyles.primaryButton} onClick={() => void contentAdminApi.social.updateSection(sectionKey, draft).then(onSaved)}>
        Yadda saxla
      </button>
    </div>
  );
}

function SocialLinkEditor({ item, onChanged }: { item: SocialLink; onChanged: () => Promise<void> }) {
  const [locale, setLocale] = useState<Locale>("az");
  const [draft, setDraft] = useState(item);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(item), [item]);

  return (
    <div className={cmsStyles.card}>
      <StatusBadge published={draft.published} />
      <LocaleTabs active={locale} onChange={setLocale} values={draft.label} />
      <div className={cmsStyles.formField}>
        <label>Platform</label>
        <select value={draft.platformId} onChange={(e) => setDraft({ ...draft, platformId: e.target.value })}>
          {PLATFORMS.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>
      <LocalizedInput label="Label" locale={locale} value={draft.label[locale]} onChange={(value) => setDraft({ ...draft, label: { ...draft.label, [locale]: value } })} />
      <LocalizedInput label="Title" locale={locale} value={draft.title[locale]} onChange={(value) => setDraft({ ...draft, title: { ...draft.title, [locale]: value } })} />
      <div className={cmsStyles.formField}>
        <label>Link</label>
        <input value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} />
      </div>
      <PublishBar
        published={draft.published}
        saving={saving}
        onSave={() => {
          setSaving(true);
          void contentAdminApi.social.updateLink(draft.id, draft).then(onChanged).finally(() => setSaving(false));
        }}
        onPublish={() => {
          setSaving(true);
          void contentAdminApi.social
            .updateLink(draft.id, draft)
            .then(() => contentAdminApi.social.publishLink(draft.id))
            .then(onChanged)
            .finally(() => setSaving(false));
        }}
      />
      <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.social.removeLink(draft.id).then(onChanged)}>
        Sil
      </button>
    </div>
  );
}

function InstagramEditor({ item, onChanged }: { item: InstagramAccount; onChanged: () => Promise<void> }) {
  const [draft, setDraft] = useState(item);
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(item), [item]);

  return (
    <div className={cmsStyles.card}>
      <StatusBadge published={draft.published} />
      <div className={cmsStyles.formField}>
        <label>Username (tərcümə olunmur)</label>
        <input value={draft.username} onChange={(e) => setDraft({ ...draft, username: e.target.value })} />
      </div>
      <div className={cmsStyles.formField}>
        <label>Instagram link</label>
        <input value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} />
      </div>
      <MediaUploader label="Cover" folder="social-media" value={draft.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, imageUrl })} />
      <MediaUploader label="Avatar" folder="social-media" value={draft.avatarUrl} onChange={(avatarUrl) => setDraft({ ...draft, avatarUrl })} />
      <PublishBar
        published={draft.published}
        saving={saving}
        onSave={() => {
          setSaving(true);
          void contentAdminApi.social.updateInstagram(draft.id, draft).then(onChanged).finally(() => setSaving(false));
        }}
        onPublish={() => {
          setSaving(true);
          void contentAdminApi.social
            .updateInstagram(draft.id, draft)
            .then(() => contentAdminApi.social.publishInstagram(draft.id))
            .then(onChanged)
            .finally(() => setSaving(false));
        }}
      />
      <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.social.removeInstagram(draft.id).then(onChanged)}>
        Sil
      </button>
    </div>
  );
}
