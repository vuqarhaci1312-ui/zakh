import type { MetadataRoute } from "next";
import { COUNTRY_TOURS } from "@/components/DestinationDetail/country-tours-data";
import { TOURS_BY_COUNTRY } from "@/components/DestinationDetail/tour-details-data";
import { BRANCH_DETAILS } from "@/components/OurBranches/branch-details-data";
import { localePath } from "@/lib/i18n/locale-path";
import {
  LOCALES,
  SITE_URL,
  STATIC_PATHS,
  type Locale,
} from "@/lib/seo/site-config";

function entry(locale: Locale, path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const items: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      const priority = path === "" ? 1 : path === "/tour-packages" ? 0.9 : 0.7;
      items.push(entry(locale, path || "/", priority, path === "" ? "weekly" : "monthly"));
    }

    for (const country of COUNTRY_TOURS) {
      const tours = TOURS_BY_COUNTRY[country.slug] ?? [];
      const hubPriority = tours.length > 0 ? 0.85 : 0.65;
      items.push(entry(locale, `/destinations/${country.slug}`, hubPriority, "weekly"));
      for (const tour of tours) {
        items.push(
          entry(locale, `/destinations/${country.slug}/${tour.slug}`, 0.8, "weekly"),
        );
      }
    }

    for (const branch of BRANCH_DETAILS) {
      items.push(entry(locale, `/our-branches/${branch.slug}`, 0.6, "monthly"));
    }
  }

  return items;
}
