import { localePath } from "@/lib/i18n/locale-path";
import type { Locale } from "@/lib/seo/site-config";

const TOP_DESTINATIONS = [
  "/tour-packages",
  "/destinations/azerbaijan",
  "/destinations/turkiye",
  "/destinations/georgia",
] as const;

export default function SpeculationRules({ locale }: { locale: Locale }) {
  const urls = TOP_DESTINATIONS.map((path) => localePath(locale, path));

  const rules = {
    prerender: [
      {
        urls,
        eagerness: "moderate",
      },
    ],
    prefetch: [
      {
        where: {
          href_matches: `/${locale}/*`,
        },
        eagerness: "conservative",
      },
    ],
  };

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
