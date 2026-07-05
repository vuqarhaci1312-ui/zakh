export const RELATED_PACKAGES_SECTION = {
  titleBefore: "Popular",
  titleAccent: "Tours",
} as const;

export const RELATED_PACKAGES = [
  {
    id: "one-trip-three-countries",
    title: "1 Trip - 3 Countries",
    description:
      "Azerbaijan, Turkiye and Georgia — one seamless journey across three unforgettable destinations.",
    href: "/tour-packages",
    image: "/related-packages/three-countries.png",
    alt: "Georgia, Turkiye and Azerbaijan tour package",
  },
  {
    id: "turkiye-tours",
    title: "Turkiye Tours",
    description:
      "Discover Türkiye with tailor-made holidays, expert guides, and premium travel services.",
    href: "/destinations/turkiye",
    image: "/tours/turkey.webp",
    alt: "Turkiye tour package",
  },
  {
    id: "uae-tours",
    title: "United Arab Emirates Tours",
    description:
      "Experience the UAE with VIP welcoming, luxury stays, and carefully planned travel packages.",
    href: "/destinations/uae",
    image: "/tours/uae.webp",
    alt: "United Arab Emirates tour package",
  },
] as const;
