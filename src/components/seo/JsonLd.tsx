import {
  ORGANIZATION,
  SITE_NAME,
  SITE_URL,
  type Locale,
} from "@/lib/seo/site-config";
import { absoluteUrl } from "@/lib/seo/metadata";
import { localePath } from "@/lib/i18n/locale-path";
import {
  BRANCH_GEO,
  DESTINATION_GEO,
  LOGO_ID,
  NAV_ID,
  ORG_ID,
  WEBSITE_ID,
  branchEntityId,
  destinationEntityId,
  imageEntityId,
  offerEntityId,
  serviceEntityId,
  tourEntityId,
} from "@/lib/seo/entity-ids";

type JsonLdNode = Record<string, unknown>;

function stripContext(node: JsonLdNode): JsonLdNode {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function asJsonLdGraph(nodes: JsonLdNode[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(stripContext),
  };
}

export function JsonLd({ data }: { data: JsonLdNode | JsonLdNode[] }) {
  const payload = Array.isArray(data)
    ? asJsonLdGraph(data)
    : data["@graph"]
      ? data
      : data["@context"]
        ? data
        : { "@context": "https://schema.org", ...data };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@type": ["Organization", "TravelAgency"],
    "@id": ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: { "@id": LOGO_ID },
    image: { "@id": LOGO_ID },
    foundingDate: ORGANIZATION.foundingDate,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    address: ORGANIZATION.address,
    sameAs: ORGANIZATION.sameAs,
    areaServed: ORGANIZATION.areaServed.map((name) => ({
      "@type": "Country",
      name,
    })),
    knowsAbout: ORGANIZATION.knowsAbout,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+994-12-310-09-32",
        contactType: "customer service",
        email: "incoming@zakher.travel",
        availableLanguage: ["Azerbaijani", "English", "Russian", "Arabic"],
        areaServed: "Worldwide",
      },
    ],
  };
}

export function logoImageJsonLd() {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: ORGANIZATION.logo,
    contentUrl: ORGANIZATION.logo,
    caption: ORGANIZATION.name,
    copyrightNotice: ORGANIZATION.name,
    creator: { "@id": ORG_ID },
    creditText: ORGANIZATION.name,
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
    about: { "@id": ORG_ID },
    hasPart: { "@id": NAV_ID },
  };
}

export function siteNavigationJsonLd(locale: Locale) {
  const items = [
    { name: "Home", path: "/" },
    { name: "Tour Packages", path: "/tour-packages" },
    { name: "Our Services", path: "/our-services" },
    { name: "Our Branches", path: "/our-branches" },
    { name: "Our Events", path: "/our-events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact-us" },
  ];

  return {
    "@type": "ItemList",
    "@id": NAV_ID,
    name: "Main navigation",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function webPageJsonLd(input: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  speakableSelectors?: string[];
  primaryImagePath?: string;
  aboutDestinationSlug?: string;
  aboutTour?: { countrySlug: string; tourSlug: string };
  aboutBranchSlug?: string;
}) {
  const url = absoluteUrl(localePath(input.locale, input.path));
  const about = input.aboutTour
    ? { "@id": tourEntityId(input.aboutTour.countrySlug, input.aboutTour.tourSlug) }
    : input.aboutDestinationSlug
      ? { "@id": destinationEntityId(input.aboutDestinationSlug) }
      : input.aboutBranchSlug
        ? { "@id": branchEntityId(input.aboutBranchSlug) }
        : { "@id": ORG_ID };

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about,
    publisher: { "@id": ORG_ID },
    inLanguage: input.locale,
    ...(input.primaryImagePath
      ? { primaryImageOfPage: { "@id": imageEntityId(input.primaryImagePath) } }
      : {}),
    ...(input.speakableSelectors?.length
      ? {
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: input.speakableSelectors,
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  locale: Locale,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localePath(locale, item.path)),
    })),
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function touristTripJsonLd(input: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  image?: string;
  countryName: string;
  countrySlug?: string;
  tourSlug?: string;
  price?: string;
}) {
  const url = absoluteUrl(localePath(input.locale, input.path));
  const tripId =
    input.countrySlug && input.tourSlug
      ? tourEntityId(input.countrySlug, input.tourSlug)
      : `${url}#tour`;

  const offer =
    input.price && input.countrySlug && input.tourSlug
      ? parseOffer(input.price, url, offerEntityId(input.countrySlug, input.tourSlug))
      : parseOffer(input.price, url);

  return {
    "@type": "TouristTrip",
    "@id": tripId,
    name: input.name,
    description: input.description,
    url,
    ...(input.image
      ? { image: { "@id": imageEntityId(input.image) } }
      : {}),
    touristType: "Leisure travelers",
    provider: { "@id": ORG_ID },
    itinerary: input.countrySlug
      ? { "@id": destinationEntityId(input.countrySlug) }
      : {
          "@type": "Place",
          name: input.countryName,
        },
    ...(offer ? { offers: { "@id": offer["@id"] as string } } : {}),
    ...(offer ? { _offerNode: offer } : {}),
  };
}

export function localBusinessJsonLd(input: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  address?: string;
  email?: string;
  telephone?: string;
  image?: string;
  slug?: string;
}) {
  const url = absoluteUrl(localePath(input.locale, input.path));
  const geo = input.slug ? BRANCH_GEO[input.slug] : undefined;
  const imagePath = input.image;

  return {
    "@type": "TravelAgency",
    "@id": input.slug ? branchEntityId(input.slug) : `${url}#branch`,
    name: `${SITE_NAME} — ${input.name}`,
    description: input.description,
    url,
    ...(imagePath
      ? { image: { "@id": imageEntityId(imagePath) } }
      : { image: { "@id": LOGO_ID } }),
    email: input.email,
    telephone: input.telephone,
    address: input.address
      ? {
          "@type": "PostalAddress",
          streetAddress: input.address,
          ...(geo ? { addressCountry: geo.countryCode } : {}),
        }
      : undefined,
    ...(geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.lat,
            longitude: geo.lng,
          },
        }
      : {}),
    parentOrganization: { "@id": ORG_ID },
    ...(input.slug && DESTINATION_GEO[input.slug]
      ? { areaServed: { "@id": destinationEntityId(input.slug) } }
      : {}),
  };
}

export function touristDestinationJsonLd(input: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  image?: string;
}) {
  const path = `/destinations/${input.slug}`;
  const url = absoluteUrl(localePath(input.locale, path));
  const geo = DESTINATION_GEO[input.slug];

  return {
    "@type": ["TouristDestination", "Place"],
    "@id": destinationEntityId(input.slug),
    name: input.name,
    description: input.description,
    url,
    ...(input.image
      ? { image: { "@id": imageEntityId(input.image) } }
      : {}),
    ...(geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: geo.lat,
            longitude: geo.lng,
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: geo.countryCode,
          },
          containedInPlace: {
            "@type": "Country",
            name: input.name,
            addressCountry: geo.countryCode,
          },
        }
      : {}),
    touristType: "Leisure travelers",
    provider: { "@id": ORG_ID },
  };
}

export function itemListJsonLd(input: {
  name: string;
  items: { name: string; url: string; image?: string; position: number; itemId?: string }[];
  listId?: string;
}) {
  return {
    "@type": "ItemList",
    ...(input.listId ? { "@id": input.listId } : {}),
    name: input.name,
    numberOfItems: input.items.length,
    itemListElement: input.items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.itemId ? { item: { "@id": item.itemId } } : {}),
      ...(item.image && !item.itemId ? { image: absoluteUrl(item.image) } : {}),
    })),
  };
}

export function collectionPageJsonLd(input: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteUrl(localePath(input.locale, input.path));
  return {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: input.locale,
  };
}

export function imageObjectJsonLd(input: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  const absolute = absoluteUrl(input.url);
  return {
    "@type": "ImageObject",
    "@id": imageEntityId(input.url),
    contentUrl: absolute,
    url: absolute,
    caption: input.caption,
    copyrightNotice: ORGANIZATION.name,
    creator: { "@id": ORG_ID },
    creditText: ORGANIZATION.name,
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
  };
}

export function serviceCatalogJsonLd(input: {
  locale: Locale;
  services: { name: string; description: string; slug?: string }[];
}) {
  return {
    "@type": "OfferCatalog",
    "@id": `${SITE_URL}/our-services#catalog`,
    name: `${SITE_NAME} Services`,
    provider: { "@id": ORG_ID },
    itemListElement: input.services.map((service, index) => {
      const slug =
        service.slug ??
        service.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return {
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          "@id": serviceEntityId(slug),
          name: service.name,
          description: service.description,
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
        },
      };
    }),
  };
}

export function definedTermSetJsonLd(input: {
  name: string;
  terms: { name: string; description: string }[];
}) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/our-services#taxonomy`,
    name: input.name,
    hasDefinedTerm: input.terms.map((term) => ({
      "@type": "DefinedTerm",
      name: term.name,
      description: term.description,
    })),
  };
}

export function eventListJsonLd(input: {
  locale: Locale;
  events: { name: string; image?: string; description?: string }[];
}) {
  const pageUrl = absoluteUrl(localePath(input.locale, "/our-events"));
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#events`,
    name: "Zakher Travel Events",
    numberOfItems: input.events.length,
    itemListElement: input.events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Event",
        name: event.name,
        description: event.description ?? event.name,
        image: event.image ? absoluteUrl(event.image) : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        organizer: { "@id": ORG_ID },
        url: pageUrl,
      },
    })),
  };
}

/** Flatten tour schema: extract embedded offer node into graph siblings. */
export function expandTourGraphNodes(tourNode: JsonLdNode): JsonLdNode[] {
  const offer = tourNode._offerNode as JsonLdNode | undefined;
  if (!offer) return [tourNode];
  const { _offerNode: _, ...cleanTour } = tourNode;
  return [cleanTour, offer];
}

function parseOffer(price: string | undefined, url: string, offerId?: string) {
  if (!price) return undefined;
  const match = price.match(/([\d.,]+)\s*([A-Z]{3})?/i);
  if (!match) return undefined;
  const amount = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(amount)) return undefined;
  const currency = (match[2] || "USD").toUpperCase();

  return {
    "@type": "Offer",
    "@id": offerId ?? `${url}#offer`,
    url,
    price: amount,
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    seller: { "@id": ORG_ID },
    priceSpecification: {
      "@type": "PriceSpecification",
      price: amount,
      priceCurrency: currency,
    },
  };
}
