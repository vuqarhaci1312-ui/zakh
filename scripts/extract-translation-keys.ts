/**
 * Extracts translatable strings from site data modules and writes seed JSON.
 * Run: npx tsx scripts/extract-translation-keys.ts
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

type SeedItem = { key: string; locale: string; value: string; namespace: string };

const TRANSLATABLE_KEYS = new Set([
  "label",
  "title",
  "description",
  "name",
  "value",
  "body",
  "heading",
  "excerpt",
  "question",
  "answer",
  "beforeAccent",
  "accent",
  "afterAccent",
  "text",
  "badge",
  "titleAccent",
  "alt",
  "imageAlt",
  "username",
  "language",
  "address",
  "tagline",
  "subtitle",
  "eyebrow",
  "cta",
  "price",
  "category",
  "location",
  "duration",
  "groupSize",
  "season",
  "note",
  "summary",
  "caption",
  "role",
  "company",
  "eventTitle",
  "locationLabel",
  "iconAlt",
  "countriesTitle",
  "toursTitle",
  "copyrightSuffix",
  "headline",
  "quote",
  "count",
]);

const SKIP_KEYS = new Set([
  "href",
  "src",
  "slug",
  "image",
  "poster",
  "flag",
  "avatar",
  "id",
  "type",
  "external",
  "platform",
  "splineUrl",
  "imageSrcSet",
  "video",
  "embed",
  "phone",
  "email",
  "whatsapp",
  "map",
  "cdn",
  "url",
  "link",
  "path",
  "icon",
  "images",
  "gallery",
  "metaImage",
  "heroImage",
  "since",
  "year",
  "number",
  "width",
  "height",
]);

const items: SeedItem[] = [];
const seen = new Set<string>();

function namespaceFromKey(key: string) {
  return key.split(".")[0] ?? "general";
}

function add(key: string, value: string, locale = "en", forceNumeric = false) {
  const trimmed = value.trim();
  if (!trimmed) return;
  if (trimmed.length < 2 && !/^[.,!?;:…]$/.test(trimmed)) return;
  if (/^https?:\/\//.test(trimmed)) return;
  if (/^\/[\w/-]+$/.test(trimmed) && !trimmed.includes(" ")) return;
  if (!forceNumeric && trimmed.length > 1 && /^[\d+().\s-]+$/.test(trimmed)) return;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(trimmed)) return;
  if (/^\/tours\//.test(trimmed)) return;
  if (/^\/events\//.test(trimmed)) return;
  if (/^\/brochures\//.test(trimmed)) return;
  if (/^\/branches\//.test(trimmed)) return;
  if (/^\/social-media\//.test(trimmed)) return;
  if (/^\/hero\//.test(trimmed)) return;
  if (/^\/logo\//.test(trimmed)) return;
  if (/^\/related-packages\//.test(trimmed)) return;
  if (/\.webp$|\.png$|\.jpg$|\.jpeg$|\.mp4$|\.pdf$/i.test(trimmed)) return;

  const dedupe = `${locale}:${key}`;
  if (seen.has(dedupe)) return;
  seen.add(dedupe);

  items.push({ key, locale, value, namespace: namespaceFromKey(key) });
}

function walk(obj: unknown, prefix: string) {
  if (obj == null) return;

  if (typeof obj === "string") {
    add(prefix, obj);
    return;
  }

  if (Array.isArray(obj)) {
    obj.forEach((entry, index) => walk(entry, `${prefix}.${index}`));
    return;
  }

  if (typeof obj === "object") {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      if (SKIP_KEYS.has(key)) continue;

      const nextPrefix = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string" && TRANSLATABLE_KEYS.has(key)) {
        add(nextPrefix, value, "en", key === "count");
      } else if (typeof value === "object") {
        walk(value, nextPrefix);
      }
    }
  }
}

async function loadData() {
  const modules: { prefix: string; loader: () => Promise<Record<string, unknown>> }[] = [
    {
      prefix: "nav",
      loader: async () => {
        const m = await import("../src/components/Navigation/navigation-data.ts");
        return {
          pillLinks: m.NAV_PILL_LINKS,
          links: m.NAV_LINKS,
          mobileTabs: m.MOBILE_TABS,
          menuTitle: "Menu",
          languageLabel: "Language",
        };
      },
    },
    {
      prefix: "hero",
      loader: async () => {
        const m = await import("../src/components/Hero/hero-data.ts");
        return {
          headline: m.HERO_HEADLINE,
          tagline: m.HERO_TAGLINE,
          description: m.HERO_DESCRIPTION,
          cta: m.HERO_PRIMARY_CTA,
        };
      },
    },
    {
      prefix: "footer",
      loader: async () => {
        const m = await import("../src/components/Footer/footer-data.ts");
        return {
          tagline: m.FOOTER_TAGLINE,
          columns: m.FOOTER_COLUMNS,
          copyrightSuffix: m.FOOTER_COPYRIGHT_SUFFIX,
          mobileLinks: m.MOBILE_FOOTER_LINKS,
        };
      },
    },
    {
      prefix: "contact",
      loader: async () => {
        const m = await import("../src/components/Contact/contact-data.ts");
        return { section: m.CONTACT_SECTION, offices: m.CONTACT_OFFICES };
      },
    },
    {
      prefix: "about",
      loader: async () => import("../src/components/About/about-data.ts"),
    },
    {
      prefix: "services",
      loader: async () => import("../src/components/OurServices/our-services-data.ts"),
    },
    {
      prefix: "brochures",
      loader: async () => import("../src/components/OurServices/brochures-data.ts"),
    },
    {
      prefix: "branches",
      loader: async () => ({
        ...(await import("../src/components/OurBranches/branches-data.ts")),
        details: (await import("../src/components/OurBranches/branch-details-data.ts")).BRANCH_DETAILS,
      }),
    },
    {
      prefix: "events",
      loader: async () => import("../src/components/OurEvents/events-data.ts"),
    },
    {
      prefix: "social",
      loader: async () => import("../src/components/SocialMedia/social-media-data.ts"),
    },
    {
      prefix: "lagoon",
      loader: async () => import("../src/components/LagoonCollection/lagoon-collection-data.ts"),
    },
    {
      prefix: "packages",
      loader: async () => import("../src/components/RelatedPackages/related-packages-data.ts"),
    },
    {
      prefix: "reviews",
      loader: async () => import("../src/components/CustomerReviews/customer-reviews-data.ts"),
    },
    {
      prefix: "tourPackages",
      loader: async () => import("../src/components/TourPackages/tour-packages-data.ts"),
    },
    {
      prefix: "destinations",
      loader: async () => import("../src/components/ExploreDestinations/destinations-data.ts"),
    },
    {
      prefix: "stats",
      loader: async () => import("../src/components/WhyChooseUs/stats-data.ts"),
    },
    {
      prefix: "whyChooseUs",
      loader: async () => import("../src/components/WhyChooseUsFeatures/why-choose-us-data.ts"),
    },
    {
      prefix: "country",
      loader: async () => ({
        countries: (await import("../src/components/DestinationDetail/country-tours-data.ts")).COUNTRY_TOURS,
        detail: (await import("../src/components/DestinationDetail/destination-detail-data.ts")),
      }),
    },
    {
      prefix: "tours",
      loader: async () => ({
        byCountry: (await import("../src/components/DestinationDetail/tour-details-data.ts")).TOURS_BY_COUNTRY,
      }),
    },
    {
      prefix: "caladan",
      loader: async () => import("../src/components/DestinationDetail/caladan-resort-data.ts"),
    },
    {
      prefix: "languages",
      loader: async () => {
        const m = await import("../src/lib/i18n/language-data.ts");
        return { list: m.LANGUAGES };
      },
    },
  ];

  const uiStrings = {
    "ui.menu": "Menu",
    "ui.language": "Language",
    "ui.closeMenu": "Close menu",
    "ui.openMenu": "Open menu",
    "ui.sendMessage": "Send Message",
    "contact.pageTitle.before": "Contact",
    "contact.pageTitle.accent": "Us",
    "ui.yourName": "Your Name",
    "ui.yourEmail": "Your Email",
    "ui.yourPhone": "Your Phone",
    "ui.yourMessage": "Your Message",
    "ui.officePhone": "Office Phone",
    "ui.mobilePhone": "Mobile Phone",
    "ui.whatsapp": "WhatsApp",
    "ui.email": "Email",
    "ui.explore": "Explore",
    "ui.viewAll": "View all",
    "ui.readMore": "Read more",
    "ui.faqs": "FAQs",
    "ui.booking": "Booking",
    "ui.bookingContact":
      "For reservation please contact us: incoming@zakher.travel or +994 12 310 09 32. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
    "ui.tourDetails": "Tour Details",
    "ui.transportPackages": "Transport Packages",
    "ui.tours": "Tours",
    "ui.backToHome": "Back to home",
    "ui.loading": "Loading...",
    "ui.noResults": "No results found",
    "ui.search": "Search",
    "ui.save": "Save",
    "ui.cancel": "Cancel",
    "ui.delete": "Delete",
    "ui.addKey": "Add translation key",
    "ui.export": "Export",
    "ui.import": "Import",
    "meta.home.title": "Zakher Travel",
    "meta.home.description":
      "Professional travel agency in Azerbaijan offering Baku city tours, Azerbaijan tour packages, visa support and unforgettable travel experiences across the Caucasus.",
    "meta.about.title": "About Us — Zakher Travel",
    "meta.about.description": "Learn about Zakher Travel — professional tour operator in Azerbaijan since 2016.",
    "meta.contact.title": "Contact Us — Zakher Travel",
    "meta.contact.description": "Contact Zakher Travel for tour bookings, visa support and custom travel packages.",
    "meta.services.title": "Our Services — Zakher Travel",
    "meta.services.description": "Professional travel services including tours, visa support, transfers and hotel bookings.",
    "meta.tourPackages.title": "Tour Packages — Zakher Travel",
    "meta.tourPackages.description": "Explore tour packages across Azerbaijan, Türkiye, Georgia, UAE and more.",
    "meta.social.title": "Social Media — Zakher Travel",
    "meta.social.description": "Follow Zakher Travel on social media for tours, destinations and travel news.",
    "meta.events.title": "Our Events — Zakher Travel",
    "meta.events.description": "International travel exhibitions and roadshows featuring Zakher Travel.",
    "meta.branches.title": "Our Branches — Zakher Travel",
    "meta.branches.description": "Zakher Travel branch offices worldwide — local support and reservations.",
    "hero.tagline.afterAccent": ".",
    "ui.aboutIntro.titleBefore": "Who",
    "ui.aboutIntro.titleAccent": "We Are?",
    "ui.aboutIntro.imageAlt": "Zakher Travel team",
    "ui.aboutHero.planeAlt": "White plane.",
    "ui.aboutFleet.titleBefore": "Our Tour",
    "ui.aboutFleet.titleAccent": "Packages",
    "ui.certificates.carousel": "Certificates carousel",
    "ui.certificates.open": "Open certificate",
    "ui.certificates.preview": "Certificate preview",
    "ui.servicesHeading.before": "Professional",
    "ui.servicesHeading.accent": "travel services",
    "ui.servicesHeading.after": "for every kind of journey.",
    "ui.experiencesHeading.before": "Discover our most requested",
    "ui.experiencesHeading.accent": "tour packages",
    "ui.experiencesHeading.after": ".",
    "ui.brochuresHeading.before": "Download our",
    "ui.brochuresHeading.accent": "tour catalogs",
    "ui.brochuresHeading.after": " and booklets.",
    "ui.branchesHeading.before": "Our",
    "ui.branchesHeading.accent": "Branches",
    "ui.allBranches": "← All branches",
    "ui.contactUs": "Contact Us",
    "ui.eventsHeading.before": "International travel exhibitions and",
    "ui.eventsHeading.accent": "roadshows",
    "ui.eventsHeading.after": ".",
    "ui.previousImage": "Previous image",
    "ui.nextImage": "Next image",
    "ui.tourPackagesEyebrow.before": "Tour",
    "ui.tourPackagesEyebrow.accent": "Packages",
    "ui.tourPackagesHeading.before": "Our Tour",
    "ui.tourPackagesHeading.accent": "Packages",
    "ui.toursAccent": "Tours",
    "ui.viewAllIn": "View all in",
    "ui.allDestinations": "All destinations",
    "ui.tourSingular": "tour",
    "ui.tourPackagesPickCountry": "Pick a destination to browse tours — no endless scrolling.",
    "ui.noToursForCountry": "Tour programs for this destination are coming soon.",
    "ui.showMoreTours": "Show all",
    "ui.showLess": "Show less",
    "ui.page": "Page",
    "ui.pageOf": "of",
    "ui.previousPage": "Previous",
    "ui.nextPage": "Next",
    "ui.eventsTotal": "events",
    "ui.eventsPagination": "Events pages",
    "ui.exploreDestination": "Explore",
    "ui.followUsHeading.before": "Stay connected with",
    "ui.followUsHeading.accent": "Zakher Travel.",
    "ui.youtubeHeading.before": "Watch Us on",
    "ui.youtubeHeading.accent": "YouTube",
    "ui.youtubeViewAll": "View all videos on YouTube",
    "ui.instagramHeading.accent": "Zakher Travel",
    "ui.instagramHeading.after": " on Instagram",
    "ui.instagramFollow": "Follow",
    "ui.instagramSubtitle": "Zakher Travel",
    "ui.instagramLikes": "Liked by zakher.travel and others",
    "ui.instagramCaption":
      "Tours, destinations, and travel moments from our team.",
    "ui.instagramViewProfile": "View profile on Instagram",
    "ui.amenities": "Amenities",
    "ui.reviews": "Reviews",
    "ui.gallery": "Gallery",
    "ui.moreDestinations.before": "More",
    "ui.moreDestinations.accent": "Destinations",
    "ui.tourPackage": "Tour Package",
    "ui.previousSlide": "Previous slide",
    "ui.nextSlide": "Next slide",
    "ui.destinationCarousel": "Destination carousel",
    "ui.office": "Office",
    "ui.mobile": "Mobile",
    "ui.interactiveGlobe": "Interactive globe",
    "ui.packagesAccent": "Packages",
    "country.generalFaqs.0.question": "How can I book a tour?",
    "country.generalFaqs.0.answer":
      "Contact us at incoming@zakher.travel or +994 12 310 09 32. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
    "country.generalFaqs.1.question": "Which transport packages are available?",
    "country.generalFaqs.1.answer":
      "Economy package: professional driver, personal comfortable transportation during tours (Mercedes Viano/Vito), and guide service.\nVIP package: a wide range of luxury cars (Mercedes S class, E class, V class, etc.).",
    "country.generalFaqs.2.question": "What other services does Zakher Travel provide?",
    "country.generalFaqs.2.answer":
      "Hotel reservations at relevant prices, air ticket sales, professional guide-translators, transfer services, tours for individuals, groups and families, regional and city tours, hunting, shopping and photography tours, legal services, VIP services, visa support, and travel insurance.",
    "ui.subject": "Subject",
    "ui.message": "Message",
    "ui.messagePlaceholder": "Leave a message here",
    "ui.contactMapTitle": "Zakher Travel office location",
    "ui.contactFormSuccess":
      "Your email client should open with your message ready to send.",
    "ui.heroSection": "Hero",
    "ui.zakherTravelHome": "Zakher Travel home",
    "ui.footerQuickLinks": "Footer quick links",
    "ui.socialMediaSection": "Social media",
    "ui.selectLanguage": "Select language",
    "ui.navigationMenu": "Navigation menu",
    "ui.navigateTo": "Navigate to",
    "ui.onInstagram": " on Instagram",
    "ui.countryFlag": " flag",
    "ui.youtubePlayer": "YouTube video player",
    "ui.mailtoName": "Name:",
    "ui.mailtoPhone": "Phone:",
    "ui.mailtoEmail": "Email:",
    "ui.mailtoDefaultSubject": "Contact from zakher.travel",
    "ui.inclusionsExclusions": "Inclusions & Exclusions",
    "meta.notFound.destination": "Destination Not Found",
    "meta.notFound.tour": "Tour Not Found",
    "meta.notFound.branch": "Branch Not Found",
    "meta.destination.titleSuffix": "Tours",
    "meta.destination.descriptionFallback":
      "Explore tour packages and destinations with Zakher Travel.",
    "stats.STAT_SECTION.title": "STATISTICS",
    "stats.STAT_SECTION.eyebrow": "Statistics",
    "lagoon.LAGOON_COLLECTION_TITLE": "MOST POPULAR",
    "lagoon.LAGOON_COLLECTION_TITLE_ACCENT": "TOURS",
  };

  for (const [key, value] of Object.entries(uiStrings)) {
    add(key, value);
  }

  for (const mod of modules) {
    const data = await mod.loader();
    walk(data, mod.prefix);
  }
}

async function main() {
  await loadData();
  items.sort((a, b) => a.key.localeCompare(b.key));

  const outDir = path.join(root, "server", "prisma", "seeds");
  fs.mkdirSync(outDir, { recursive: true });

  const enPath = path.join(outDir, "en.json");
  fs.writeFileSync(enPath, JSON.stringify(items, null, 2));

  console.log(`Extracted ${items.length} English translation keys → ${enPath}`);
}

main().catch(console.error);
