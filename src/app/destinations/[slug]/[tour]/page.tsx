import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryTour } from "@/components/DestinationDetail/country-tours-data";
import {
  getTourDetail,
  getToursForCountry,
  TOURS_BY_COUNTRY,
} from "@/components/DestinationDetail/tour-details-data";
import TourDetailView from "@/components/DestinationDetail/TourDetailView";

type PageProps = {
  params: Promise<{ slug: string; tour: string }>;
};

export function generateStaticParams() {
  return Object.entries(TOURS_BY_COUNTRY).flatMap(([slug, tours]) =>
    tours.map((tour) => ({ slug, tour: tour.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, tour } = await params;
  const detail = getTourDetail(slug, tour);

  if (!detail) {
    return { title: "Tour Not Found" };
  }

  return {
    title: `${detail.title} | Zakher Travel`,
    description: detail.excerpt,
  };
}

export default async function TourPage({ params }: PageProps) {
  const { slug, tour } = await params;
  const country = getCountryTour(slug);
  const detail = getTourDetail(slug, tour);

  if (!country || !detail) {
    notFound();
  }

  const allTours = getToursForCountry(slug);
  const tourIndex = allTours.findIndex((item) => item.slug === detail.slug);

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

  return (
    <main className="main-wrapper">
      <TourDetailView
        countrySlug={slug}
        countryName={country.name}
        tour={detail}
        tourIndex={tourIndex}
        otherTours={otherTours}
      />
    </main>
  );
}
