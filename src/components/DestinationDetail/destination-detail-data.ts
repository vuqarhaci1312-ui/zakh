import {
  CALADAN_CDN,
  CALADAN_RESORT_DETAIL,
  CALADAN_SITE_CDN,
  type CaladanResortDetail,
} from "./caladan-resort-data";
import { COUNTRY_TOURS, getCountryTour, type CountryTourFaq } from "./country-tours-data";
import { getToursForCountry, type TourDetail } from "./tour-details-data";

export { CALADAN_CDN, CALADAN_SITE_CDN };

export type TourCardData = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  stats: { value: string; label: string }[];
};

export type DestinationDetailData = CaladanResortDetail & {
  slug: string;
  faqsTitle?: string;
  toursTitle?: string;
  tours: TourCardData[];
};

const GENERAL_FAQS: CountryTourFaq[] = [
  {
    question: "How can I book a tour?",
    answer:
      "Contact us at incoming@zakher.travel or +994 12 310 09 32. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
  },
  {
    question: "Which transport packages are available?",
    answer:
      "Economy package: professional driver, personal comfortable transportation during tours (Mercedes Viano/Vito), and guide service.\nVIP package: a wide range of luxury cars (Mercedes S class, E class, V class, etc.).",
  },
  {
    question: "What other services does Zakher Travel provide?",
    answer:
      "Hotel reservations at relevant prices, air ticket sales, professional guide-translators, transfer services, tours for individuals, groups and families, regional and city tours, hunting, shopping and photography tours, legal services, VIP services, visa support, and travel insurance.",
  },
];

function toTourCard(tour: TourDetail): TourCardData {
  return {
    slug: tour.slug,
    title: tour.title,
    excerpt: tour.excerpt,
    image: tour.image,
    stats: tour.meta.slice(0, 2).map((item) => ({
      value: item.value,
      label: item.label,
    })),
  };
}

function getRelatedDestinations(currentSlug: string) {
  return COUNTRY_TOURS.filter((country) => country.slug !== currentSlug)
    .slice(0, 2)
    .map((country) => ({
      slug: country.slug,
      tag: "Tour Package",
      title: `${country.name} Tours`,
      image: country.heroImage,
      stats: country.stats,
    }));
}

export function getDestinationDetail(slug: string): DestinationDetailData | null {
  const country = getCountryTour(slug);
  if (!country) {
    return null;
  }

  const tours = getToursForCountry(slug);
  const hasTours = tours.length > 0;

  return {
    ...CALADAN_RESORT_DETAIL,
    slug,
    title: `${country.name} Tour Packages`,
    description: country.description,
    heroImage: country.heroImage,
    toursTitle: hasTours ? `Tours in ${country.name}` : undefined,
    tours: tours.map(toTourCard),
    faqsTitle: hasTours ? "FAQs" : country.faqsTitle,
    faqs: hasTours ? GENERAL_FAQS : country.faqs,
    roomSummary: country.stats,
    related: getRelatedDestinations(slug),
  };
}

export function getAllDestinationSlugs(): string[] {
  return COUNTRY_TOURS.map((country) => country.slug);
}
