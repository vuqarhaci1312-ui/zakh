"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import adminStyles from "@/app/admin/admin.module.css";
import AdminPageHeader from "@/components/admin/cms/AdminPageHeader";
import { StatusBadge } from "@/components/admin/cms/LocaleTabs";
import cmsStyles from "@/components/admin/cms/cms.module.css";
import { contentAdminApi } from "@/lib/admin/content-api";
import { emptyLocalized, type LocalizedText } from "@/lib/content/localized";

type Country = {
  id: string;
  slug: string;
  name: LocalizedText;
  published: boolean;
  tours: { id: string; slug: string; title: LocalizedText; published: boolean }[];
};

export default function ToursAdminPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await contentAdminApi.tours.list();
    setCountries(data.countries as Country[]);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Tur paketləri"
        description="Ölkələr və hər ölkənin turları."
        actions={
          <button
            type="button"
            className={adminStyles.primaryButton}
            onClick={() =>
              void contentAdminApi.tours
                .createCountry({
                  slug: "new-country",
                  name: emptyLocalized(),
                  description: emptyLocalized(),
                  faqsTitle: emptyLocalized(),
                  heroImage: "",
                  faqs: [],
                  stats: [],
                  generalFaqs: [],
                  published: false,
                })
                .then(load)
            }
          >
            + Yeni ölkə
          </button>
        }
      />

      {loading ? <p>Yüklənir...</p> : null}

      <div className={cmsStyles.card}>
        <table className={cmsStyles.table}>
          <thead>
            <tr>
              <th>Ölkə</th>
              <th>Slug</th>
              <th>Turlar</th>
              <th>Status</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>{country.name.en || country.slug}</td>
                <td>{country.slug}</td>
                <td>{country.tours.length}</td>
                <td>
                  <StatusBadge published={country.published} />
                </td>
                <td>
                  <Link href={`/admin/tours/${country.id}`} className={adminStyles.ghostButton}>
                    Redaktə et
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
