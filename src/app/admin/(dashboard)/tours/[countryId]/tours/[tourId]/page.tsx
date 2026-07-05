"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import {
  emptyLocalized,
  type Locale,
  type LocalizedMeta,
  type LocalizedSection,
  type LocalizedText,
} from "@/lib/content/localized";

type Tour = {
  id: string;
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  price: LocalizedText | null;
  image: string;
  meta: LocalizedMeta[];
  sections: LocalizedSection[];
  packages: LocalizedText[];
  inclusions: LocalizedText[];
  exclusions: LocalizedText[];
  published: boolean;
  country: { id: string; slug: string };
};

export default function TourDetailAdminPage() {
  const params = useParams<{ countryId: string; tourId: string }>();
  const [locale, setLocale] = useState<Locale>("az");
  const [tour, setTour] = useState<Tour | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await contentAdminApi.tours.getTour(params.tourId);
    setTour({
      ...(data as Tour),
      country: { id: (data as Tour & { country: { id: string; slug: string } }).country.id, slug: (data as Tour & { country: { id: string; slug: string } }).country.slug },
    });
  }

  useEffect(() => {
    void load();
  }, [params.tourId]);

  if (!tour) return <p>Yüklənir...</p>;

  return (
    <div>
      <AdminPageHeader
        title={`Tur: ${tour.title.en || tour.slug}`}
        description="Tur detail səhifəsinin bütün sahələri."
        actions={
          <>
            <Link href={`/admin/tours/${params.countryId}`} className={adminStyles.ghostButton}>
              ← Ölkəyə qayıt
            </Link>
            <a
              href={`/destinations/${tour.country.slug}/${tour.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className={adminStyles.secondaryButton}
            >
              Önizləmə
            </a>
          </>
        }
      />

      <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`}>
        <StatusBadge published={tour.published} />
        <LocaleTabs active={locale} onChange={setLocale} values={tour.title} />

        <div className={cmsStyles.formField}>
          <label>Slug</label>
          <input value={tour.slug} onChange={(e) => setTour({ ...tour, slug: e.target.value })} />
        </div>

        <LocalizedInput label="Başlıq" locale={locale} value={tour.title[locale]} onChange={(value) => setTour({ ...tour, title: { ...tour.title, [locale]: value } })} />
        <LocalizedTextarea label="Excerpt" locale={locale} value={tour.excerpt[locale]} onChange={(value) => setTour({ ...tour, excerpt: { ...tour.excerpt, [locale]: value } })} />
        <LocalizedInput label="Qiymət" locale={locale} value={tour.price?.[locale] ?? ""} onChange={(value) => setTour({ ...tour, price: { ...(tour.price ?? emptyLocalized()), [locale]: value } })} />
        <MediaUploader label="Tur şəkli" folder="tours" value={tour.image} onChange={(image) => setTour({ ...tour, image })} />

        <RepeaterMeta tour={tour} locale={locale} setTour={setTour} />
        <RepeaterSections tour={tour} locale={locale} setTour={setTour} />
        <RepeaterLines title="Packages" items={tour.packages} locale={locale} onChange={(packages) => setTour({ ...tour, packages })} />
        <RepeaterLines title="Inclusions" items={tour.inclusions} locale={locale} onChange={(inclusions) => setTour({ ...tour, inclusions })} />
        <RepeaterLines title="Exclusions" items={tour.exclusions} locale={locale} onChange={(exclusions) => setTour({ ...tour, exclusions })} />

        <PublishBar
          published={tour.published}
          saving={saving}
          onSave={() => {
            setSaving(true);
            void contentAdminApi.tours.updateTour(tour.id, tour).then(load).finally(() => setSaving(false));
          }}
          onPublish={() => {
            setSaving(true);
            void contentAdminApi.tours
              .updateTour(tour.id, tour)
              .then(() => contentAdminApi.tours.publishTour(tour.id))
              .then(load)
              .finally(() => setSaving(false));
          }}
        />

        <button type="button" className={adminStyles.dangerButton} onClick={() => void contentAdminApi.tours.removeTour(tour.id).then(() => window.history.back())}>
          Turu sil
        </button>
      </div>
    </div>
  );
}

function RepeaterMeta({
  tour,
  locale,
  setTour,
}: {
  tour: Tour;
  locale: Locale;
  setTour: (tour: Tour) => void;
}) {
  return (
    <div className={cmsStyles.repeater}>
      <h3>Meta</h3>
      {tour.meta.map((item, index) => (
        <div key={index} className={cmsStyles.repeaterItem}>
          <LocalizedInput
            label="Label"
            locale={locale}
            value={item.label[locale]}
            onChange={(value) => {
              const meta = [...tour.meta];
              meta[index] = { ...meta[index], label: { ...meta[index].label, [locale]: value } };
              setTour({ ...tour, meta });
            }}
          />
          <LocalizedInput
            label="Value"
            locale={locale}
            value={item.value[locale]}
            onChange={(value) => {
              const meta = [...tour.meta];
              meta[index] = { ...meta[index], value: { ...meta[index].value, [locale]: value } };
              setTour({ ...tour, meta });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={adminStyles.secondaryButton}
        onClick={() => setTour({ ...tour, meta: [...tour.meta, { label: emptyLocalized(), value: emptyLocalized() }] })}
      >
        + Meta
      </button>
    </div>
  );
}

function RepeaterSections({
  tour,
  locale,
  setTour,
}: {
  tour: Tour;
  locale: Locale;
  setTour: (tour: Tour) => void;
}) {
  return (
    <div className={cmsStyles.repeater}>
      <h3>Sections</h3>
      {tour.sections.map((section, index) => (
        <div key={index} className={cmsStyles.repeaterItem}>
          <LocalizedInput
            label="Heading"
            locale={locale}
            value={section.heading?.[locale] ?? ""}
            onChange={(value) => {
              const sections = [...tour.sections];
              sections[index] = {
                ...sections[index],
                heading: { ...(sections[index].heading ?? emptyLocalized()), [locale]: value },
              };
              setTour({ ...tour, sections });
            }}
          />
          <LocalizedTextarea
            label="Body"
            locale={locale}
            value={section.body[locale]}
            onChange={(value) => {
              const sections = [...tour.sections];
              sections[index] = { ...sections[index], body: { ...sections[index].body, [locale]: value } };
              setTour({ ...tour, sections });
            }}
          />
        </div>
      ))}
      <button
        type="button"
        className={adminStyles.secondaryButton}
        onClick={() => setTour({ ...tour, sections: [...tour.sections, { heading: emptyLocalized(), body: emptyLocalized() }] })}
      >
        + Section
      </button>
    </div>
  );
}

function RepeaterLines({
  title,
  items,
  locale,
  onChange,
}: {
  title: string;
  items: LocalizedText[];
  locale: Locale;
  onChange: (items: LocalizedText[]) => void;
}) {
  return (
    <div className={cmsStyles.repeater}>
      <h3>{title}</h3>
      {items.map((item, index) => (
        <div key={index} className={cmsStyles.repeaterItem}>
          <LocalizedTextarea
            label={`${title} ${index + 1}`}
            locale={locale}
            value={item[locale]}
            onChange={(value) => {
              const next = [...items];
              next[index] = { ...next[index], [locale]: value };
              onChange(next);
            }}
          />
        </div>
      ))}
      <button type="button" className={adminStyles.secondaryButton} onClick={() => onChange([...items, emptyLocalized()])}>
        + {title}
      </button>
    </div>
  );
}
