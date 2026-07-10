import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/components/DestinationDetail/DestinationDetail";
import {
  getAllDestinationSlugs,
  getDestinationDetail,
  isRealFaqQuestion,
} from "@/components/DestinationDetail/destination-detail-data";
import { COUNTRY_TOURS } from "@/components/DestinationDetail/country-tours-data";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  imageObjectJsonLd,
  itemListJsonLd,
  touristDestinationJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/seo/metadata";
import { localePath } from "@/lib/i18n/locale-path";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale, withLocales } from "@/lib/seo/locale-params";
import { SITE_URL } from "@/lib/seo/site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return withLocales(getAllDestinationSlugs().map((slug) => ({ slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const detail = getDestinationDetail(slug);
  const countryIndex = COUNTRY_TOURS.findIndex((c) => c.slug === slug);

  if (!detail) {
    return { title: "Destination Not Found", robots: { index: false } };
  }

  const name =
    countryIndex >= 0
      ? getStaticTranslation(locale, `country.countries.${countryIndex}.name`, detail.title)
      : detail.title;
  const description =
    countryIndex >= 0
      ? getStaticTranslation(
          locale,
          `country.countries.${countryIndex}.description`,
          detail.description,
        )
      : detail.description;
  const suffix = getStaticTranslation(locale, "meta.destination.titleSuffix", "Tours");

  return buildPageMetadata({
    locale,
    path: `/destinations/${slug}`,
    title: `${name} ${suffix}`,
    description,
    image: detail.heroImage,
  });
}

export default async function DestinationPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const detail = getDestinationDetail(slug);
  const countryIndex = COUNTRY_TOURS.findIndex((c) => c.slug === slug);

  if (!detail) {
    notFound();
  }

  const name =
    countryIndex >= 0
      ? getStaticTranslation(locale, `country.countries.${countryIndex}.name`, detail.title)
      : detail.title;
  const description =
    countryIndex >= 0
      ? getStaticTranslation(
          locale,
          `country.countries.${countryIndex}.description`,
          detail.description,
        )
      : detail.description;
  const path = `/destinations/${slug}`;

  const hasTours = detail.tours.length > 0;

  const faqs = (detail.faqs ?? []).map((faq, index) => ({
    question: hasTours
      ? getStaticTranslation(
          locale,
          `country.generalFaqs.${index}.question`,
          faq.question,
        )
      : getStaticTranslation(
          locale,
          `country.countries.${countryIndex}.faqs.${index}.question`,
          faq.question,
        ),
    answer: hasTours
      ? getStaticTranslation(
          locale,
          `country.generalFaqs.${index}.answer`,
          faq.answer,
        )
      : getStaticTranslation(
          locale,
          `country.countries.${countryIndex}.faqs.${index}.answer`,
          faq.answer,
        ),
  }));

  const schemaFaqs = faqs.filter((faq) => isRealFaqQuestion(faq.question));

  const schemas = [
    webPageJsonLd({
      locale,
      path,
      title: name,
      description,
      speakableSelectors: [".faq-answer", "[data-seo-summary]"],
      primaryImagePath: detail.heroImage,
      aboutDestinationSlug: slug,
    }),
    breadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Tour Packages", path: "/tour-packages" },
        { name, path },
      ],
      locale,
    ),
    touristDestinationJsonLd({
      locale,
      slug,
      name,
      description,
      image: detail.heroImage,
    }),
    ...(detail.heroImage
      ? [
          imageObjectJsonLd({
            url: detail.heroImage,
            caption: name,
            width: 1200,
            height: 630,
          }),
        ]
      : []),
    ...(detail.tours.length
      ? [
          itemListJsonLd({
            name: `Tours in ${name}`,
            listId: `${absoluteUrl(localePath(locale, path))}#tour-list`,
            items: detail.tours.map((tour, index) => ({
              name: tour.title,
              url: absoluteUrl(
                localePath(locale, `/destinations/${slug}/${tour.slug}`),
              ),
              position: index + 1,
              itemId: `${SITE_URL}/destinations/${slug}/${tour.slug}#tour`,
            })),
          }),
        ]
      : []),
    ...(schemaFaqs.length ? [faqPageJsonLd(schemaFaqs)] : []),
  ];

  return (
    <main className="main-wrapper">
      <JsonLd data={schemas} />
      <DestinationDetail data={detail} />
    </main>
  );
}
