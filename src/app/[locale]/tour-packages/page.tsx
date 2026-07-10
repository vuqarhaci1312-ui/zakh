import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import TourPackagesSection from "@/components/TourPackages/TourPackagesSection";
import { COUNTRY_TOURS } from "@/components/DestinationDetail/country-tours-data";
import { getToursForCountry } from "@/components/DestinationDetail/tour-details-data";
import {
  JsonLd,
  collectionPageJsonLd,
  itemListJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo/metadata";
import { localePath } from "@/lib/i18n/locale-path";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";
import { destinationEntityId, tourEntityId } from "@/lib/seo/entity-ids";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/tour-packages",
    title: getStaticTranslation(locale, "meta.tourPackages.title", "Tour Packages | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.tourPackages.description",
      "Browse Zakher Travel tour packages across Azerbaijan, Turkiye, Georgia, UAE, Central Asia, and Europe.",
    ),
  });
}

export default async function TourPackagesPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.tourPackages.title", "Tour Packages | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.tourPackages.description",
    "Browse Zakher Travel tour packages.",
  );

  const destinationItems = COUNTRY_TOURS.map((country, index) => ({
    name: country.name,
    url: absoluteUrl(localePath(locale, `/destinations/${country.slug}`)),
    position: index + 1,
    itemId: destinationEntityId(country.slug),
  }));

  const tourItems = COUNTRY_TOURS.flatMap((country) =>
    getToursForCountry(country.slug).map((tour) => ({
      country,
      tour,
    })),
  ).map(({ country, tour }, index) => ({
    name: tour.title,
    url: absoluteUrl(
      localePath(locale, `/destinations/${country.slug}/${tour.slug}`),
    ),
    position: index + 1,
    itemId: tourEntityId(country.slug, tour.slug),
  }));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            locale,
            path: "/tour-packages",
            title,
            description,
            speakableSelectors: [".hero-title", "[data-seo-summary]"],
          }),
          collectionPageJsonLd({
            locale,
            path: "/tour-packages",
            title,
            description,
          }),
          itemListJsonLd({
            name: "Tour Destinations",
            listId: `${absoluteUrl(localePath(locale, "/tour-packages"))}#destinations`,
            items: destinationItems,
          }),
          itemListJsonLd({
            name: "Tour Packages",
            listId: `${absoluteUrl(localePath(locale, "/tour-packages"))}#tours`,
            items: tourItems.slice(0, 50),
          }),
        ]}
      />
      <Navigation />
      <main>
        <TourPackagesSection />
      </main>
    </>
  );
}
