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
import { emptyLocalized, type Locale, type LocalizedFaq, type LocalizedStat, type LocalizedText } from "@/lib/content/localized";

type Country = {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  faqsTitle: LocalizedText;
  heroImage: string;
  faqs: LocalizedFaq[];
  stats: LocalizedStat[];
  generalFaqs: LocalizedFaq[];
  published: boolean;
  tours: { id: string; slug: string; title: LocalizedText; published: boolean }[];
};

export default function CountryAdminPage() {
  const params = useParams<{ countryId: string }>();
  const countryId = params.countryId;
  const [locale, setLocale] = useState<Locale>("az");
  const [country, setCountry] = useState<Country | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const data = await contentAdminApi.tours.list();
    const found = (data.countries as Country[]).find((c) => c.id === countryId) ?? null;
    setCountry(found);
  }

  useEffect(() => {
    void load();
  }, [countryId]);

  if (!country) return <p>Yüklənir...</p>;

  const currentCountry = country;

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    const faqs = [...currentCountry.faqs];
    faqs[index] = { ...faqs[index], [field]: { ...faqs[index][field], [locale]: value } };
    setCountry({ ...currentCountry, faqs });
  }

  function updateStat(index: number, field: "label" | "value", value: string) {
    const stats = [...currentCountry.stats];
    stats[index] = { ...stats[index], [field]: { ...stats[index][field], [locale]: value } };
    setCountry({ ...currentCountry, stats });
  }

  return (
    <div>
      <AdminPageHeader
        title={`Ölkə: ${country.name.en || country.slug}`}
        description="Ölkə səhifəsi məzmunu və turlar siyahısı."
        actions={
          <Link href="/admin/tours" className={adminStyles.ghostButton}>
            ← Bütün ölkələr
          </Link>
        }
      />

      <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`} style={{ marginBottom: 24 }}>
        <StatusBadge published={country.published} />
        <LocaleTabs active={locale} onChange={setLocale} values={country.name} />
        <div className={cmsStyles.formField}>
          <label>Slug</label>
          <input value={country.slug} onChange={(e) => setCountry({ ...country, slug: e.target.value })} />
        </div>
        <LocalizedInput label="Ad" locale={locale} value={country.name[locale]} onChange={(value) => setCountry({ ...country, name: { ...country.name, [locale]: value } })} />
        <LocalizedTextarea label="Təsvir" locale={locale} value={country.description[locale]} onChange={(value) => setCountry({ ...country, description: { ...country.description, [locale]: value } })} />
        <LocalizedInput label="FAQ başlığı" locale={locale} value={country.faqsTitle[locale]} onChange={(value) => setCountry({ ...country, faqsTitle: { ...country.faqsTitle, [locale]: value } })} />
        <MediaUploader label="Hero şəkli" folder="tours" value={country.heroImage} onChange={(heroImage) => setCountry({ ...country, heroImage })} />

        <div className={cmsStyles.repeater}>
          {country.faqs.map((faq, index) => (
            <div key={index} className={cmsStyles.repeaterItem}>
              <LocalizedInput label={`FAQ ${index + 1} sual`} locale={locale} value={faq.question[locale]} onChange={(value) => updateFaq(index, "question", value)} />
              <LocalizedTextarea label="Cavab" locale={locale} value={faq.answer[locale]} onChange={(value) => updateFaq(index, "answer", value)} />
            </div>
          ))}
          <button type="button" className={adminStyles.secondaryButton} onClick={() => setCountry({ ...country, faqs: [...country.faqs, { question: emptyLocalized(), answer: emptyLocalized() }] })}>
            + FAQ
          </button>
        </div>

        <div className={cmsStyles.repeater}>
          {country.stats.map((stat, index) => (
            <div key={index} className={cmsStyles.repeaterItem}>
              <LocalizedInput label={`Stat ${index + 1} label`} locale={locale} value={stat.label[locale]} onChange={(value) => updateStat(index, "label", value)} />
              <LocalizedInput label="Value" locale={locale} value={stat.value[locale]} onChange={(value) => updateStat(index, "value", value)} />
            </div>
          ))}
          <button type="button" className={adminStyles.secondaryButton} onClick={() => setCountry({ ...country, stats: [...country.stats, { label: emptyLocalized(), value: emptyLocalized() }] })}>
            + Stat
          </button>
        </div>

        <PublishBar
          published={country.published}
          saving={saving}
          onSave={() => {
            setSaving(true);
            void contentAdminApi.tours.updateCountry(country.id, country).then(load).finally(() => setSaving(false));
          }}
          onPublish={() => {
            setSaving(true);
            void contentAdminApi.tours
              .updateCountry(country.id, country)
              .then(() => contentAdminApi.tours.publishCountry(country.id))
              .then(load)
              .finally(() => setSaving(false));
          }}
        />
      </div>

      <AdminPageHeader
        title="Turlar"
        actions={
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.tours
                .createTour(country.id, {
                  slug: "new-tour",
                  title: emptyLocalized(),
                  excerpt: emptyLocalized(),
                  image: "",
                  meta: [],
                  sections: [],
                  packages: [],
                  inclusions: [],
                  exclusions: [],
                  published: false,
                })
                .then(load)
            }
          >
            + Yeni tur
          </button>
        }
      />

      <div className={cmsStyles.card}>
        <table className={cmsStyles.table}>
          <thead>
            <tr>
              <th>Tur</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {country.tours.map((tour) => (
              <tr key={tour.id}>
                <td>{tour.title.en || tour.slug}</td>
                <td>{tour.slug}</td>
                <td>
                  <StatusBadge published={tour.published} />
                </td>
                <td>
                  <Link href={`/admin/tours/${country.id}/tours/${tour.id}`} className={adminStyles.ghostButton}>
                    Detail redaktə
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
