import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryTour, COUNTRY_TOURS } from "@/components/DestinationDetail/country-tours-data";
import {
  getTourDetail,
  getToursForCountry,
  TOURS_BY_COUNTRY,
  buildTourFaqs,
} from "@/components/DestinationDetail/tour-details-data";
import TourDetailView from "@/components/DestinationDetail/TourDetailView";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  imageObjectJsonLd,
  expandTourGraphNodes,
  touristTripJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { resolveTourFaqs } from "@/lib/i18n/content-translators";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale, withLocales } from "@/lib/seo/locale-params";

type PageProps = {
  params: Promise<{ locale: string; slug: string; tour: string }>;
  searchParams: Promise<{ from?: string }>;
};

export function generateStaticParams() {
  return withLocales(
    Object.entries(TOURS_BY_COUNTRY).flatMap(([slug, tours]) =>
      tours.map((tour) => ({ slug, tour: tour.slug })),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug, tour } = await params;
  const locale = parseLocale(raw);
  const detail = getTourDetail(slug, tour);
  const allTours = getToursForCountry(slug);
  const tourIndex = allTours.findIndex((item) => item.slug === tour);

  if (!detail) {
    return { title: "Tour Not Found", robots: { index: false } };
  }

  const title = getStaticTranslation(
    locale,
    `tours.byCountry.${slug}.${tourIndex}.title`,
    detail.title,
  );
  const description = getStaticTranslation(
    locale,
    `tours.byCountry.${slug}.${tourIndex}.excerpt`,
    detail.excerpt,
  );

  return buildPageMetadata({
    locale,
    path: `/destinations/${slug}/${tour}`,
    title,
    description,
    image: detail.image,
  });
}

export default async function TourPage({ params, searchParams }: PageProps) {
  const { locale: raw, slug, tour } = await params;
  const locale = parseLocale(raw);
  const { from } = await searchParams;
  const country = getCountryTour(slug);
  const detail = getTourDetail(slug, tour);

  if (!country || !detail) {
    notFound();
  }

  const allTours = getToursForCountry(slug);
  const tourIndex = allTours.findIndex((item) => item.slug === detail.slug);
  const countryIndex = COUNTRY_TOURS.findIndex((c) => c.slug === slug);
  const countryName = getStaticTranslation(
    locale,
    `country.countries.${countryIndex}.name`,
    country.name,
  );
  const title = getStaticTranslation(
    locale,
    `tours.byCountry.${slug}.${tourIndex}.title`,
    detail.title,
  );
  const description = getStaticTranslation(
    locale,
    `tours.byCountry.${slug}.${tourIndex}.excerpt`,
    detail.excerpt,
  );
  const path = `/destinations/${slug}/${tour}`;
  const tourFaqs = buildTourFaqs(detail);
  const translatedTourFaqs = resolveTourFaqs(
    (key, fallback) => getStaticTranslation(locale, key, fallback ?? ""),
    slug,
    tourIndex,
    detail,
    tourFaqs,
  );

  const otherTours = allTours
    .filter((item) => item.slug !== detail.slug)
    .slice(0, 4)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      image: item.image,
      index: allTours.findIndex((t) => t.slug === item.slug),
    }));

  const tripNodes = expandTourGraphNodes(
    touristTripJsonLd({
      locale,
      path,
      name: title,
      description,
      image: detail.image,
      countryName,
      countrySlug: slug,
      tourSlug: tour,
      price: detail.price,
    }),
  );

  return (
    <main className="main-wrapper">
      <JsonLd
        data={[
          webPageJsonLd({
            locale,
            path,
            title,
            description,
            primaryImagePath: detail.image,
            aboutTour: { countrySlug: slug, tourSlug: tour },
          }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Tour Packages", path: "/tour-packages" },
              { name: countryName, path: `/destinations/${slug}` },
              { name: title, path },
            ],
            locale,
          ),
          ...tripNodes,
          ...(detail.image
            ? [
                imageObjectJsonLd({
                  url: detail.image,
                  caption: title,
                  width: 1200,
                  height: 800,
                }),
              ]
            : []),
          ...(translatedTourFaqs.length ? [faqPageJsonLd(translatedTourFaqs)] : []),
        ]}
      />
      <TourDetailView
        countrySlug={slug}
        countryName={country.name}
        countryHeroImage={country.heroImage}
        tour={detail}
        tourIndex={tourIndex}
        otherTours={otherTours}
        backFrom={from}
        faqs={tourFaqs}
      />
    </main>
  );
}
