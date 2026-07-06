export type PopularTourItem = {
  id: string;
  href: string;
  tag: string;
  title: string;
  duration: string;
  cities: string;
  guests: string;
  image: string;
  imageAlt: string;
};

export const LAGOON_COLLECTION_TITLE = "MOST POPULAR";
export const LAGOON_COLLECTION_TITLE_ACCENT = "TOURS";

export const POPULAR_TOUR_ITEMS: PopularTourItem[] = [
  {
    id: "azerbaijan-tour",
    href: "/destinations/azerbaijan",
    tag: "Tour Package",
    title: "Azerbaijan Tour",
    duration: "7",
    cities: "3",
    guests: "12",
    image: "/tours/azerbaijan.webp",
    imageAlt: "Azerbaijan tour package",
  },
  {
    id: "turkiye-tour",
    href: "/destinations/turkiye",
    tag: "Tour Package",
    title: "Turkiye Tours",
    duration: "8",
    cities: "4",
    guests: "10",
    image: "/tours/turkey.webp",
    imageAlt: "Turkiye tour package",
  },
  {
    id: "uae-tour",
    href: "/destinations/uae",
    tag: "Tour Package",
    title: "UAE Tours",
    duration: "6",
    cities: "2",
    guests: "8",
    image: "/tours/uae.webp",
    imageAlt: "United Arab Emirates tour package",
  },
  {
    id: "uzbekistan-tour",
    href: "/destinations/uzbekistan",
    tag: "Tour Package",
    title: "Uzbekistan Tour",
    duration: "9",
    cities: "5",
    guests: "14",
    image: "/tours/uzbekistan.webp",
    imageAlt: "Uzbekistan tour package",
  },
  {
    id: "kyrgyzstan-tour",
    href: "/destinations/kyrgyzstan",
    tag: "Tour Package",
    title: "Kyrgyzstan Tour",
    duration: "8",
    cities: "3",
    guests: "10",
    image: "/tours/kyrgyzstan.webp",
    imageAlt: "Kyrgyzstan tour package",
  },
  {
    id: "russia-tour",
    href: "/destinations/russia",
    tag: "Tour Package",
    title: "Russia Tour",
    duration: "7",
    cities: "2",
    guests: "12",
    image: "/tours/russia.webp",
    imageAlt: "Russia tour package",
  },
  {
    id: "czech-republic-tour",
    href: "/destinations/czech-republic",
    tag: "Tour Package",
    title: "Czech Republic Tour",
    duration: "6",
    cities: "2",
    guests: "8",
    image: "/tours/czechrepublic.webp",
    imageAlt: "Czech Republic tour package",
  },
  {
    id: "poland-tour",
    href: "/destinations/poland",
    tag: "Tour Package",
    title: "Poland Tour",
    duration: "7",
    cities: "3",
    guests: "10",
    image: "/tours/poland.webp",
    imageAlt: "Poland tour package",
  },
  {
    id: "ukraine-tour",
    href: "/destinations/ukraine",
    tag: "Tour Package",
    title: "Ukraine Tour",
    duration: "6",
    cities: "2",
    guests: "9",
    image: "/tours/ukraine.webp",
    imageAlt: "Ukraine tour package",
  },
  {
    id: "kazakhstan-uzbekistan-tour",
    href: "/tour-packages",
    tag: "Tour Package",
    title: "1 Trip - 2 Countries",
    duration: "10",
    cities: "2",
    guests: "12",
    image: "/tours/kazakhstan.webp",
    imageAlt: "Kazakhstan and Uzbekistan tour package",
  },
];

/** @deprecated Use POPULAR_TOUR_ITEMS */
export const LAGOON_COLLECTION_ITEMS = POPULAR_TOUR_ITEMS;

export type LagoonCollectionItem = PopularTourItem;
