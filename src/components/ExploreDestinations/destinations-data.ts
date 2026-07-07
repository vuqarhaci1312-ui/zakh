import { POPULAR_TOUR_ITEMS } from "../LagoonCollection/lagoon-collection-data";

export const DESTINATION_SECTION = {
  eyebrow: "Destinations",
  title: "Our Tour Packages",
  linkHref: "https://test.zakher.travel/tour-packages",
} as const;

export interface DestinationItem {
  id: string;
  name: string;
  href: string;
  imageAlt: string;
  packages: string;
  image: string;
  scrollDelay: number;
}

export const DESTINATIONS: DestinationItem[] = POPULAR_TOUR_ITEMS.filter(
  (item) => item.id !== "kazakhstan-uzbekistan-tour",
).map((item, index) => ({
  id: item.id,
  name: item.title,
  href: item.href,
  imageAlt: item.imageAlt,
  packages: item.tag,
  image: item.image,
  scrollDelay: 200 + index * 100,
}));

export const SLIDE_IN_ANIMATION = {
  duration: 1,
  ease: "power4.out",
  y: 100,
  start: "top bottom",
} as const;

export const HEADER_DELAYS = {
  eyebrow: 200,
  title: 300,
} as const;
