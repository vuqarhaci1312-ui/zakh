const CDN_BASE =
  "https://cdn.prod.website-files.com/69b2a2adca3cdacc51788e5b";

export type UxoralCounterColumn = {
  target: string;
  variant: "three" | "four";
  valueClass?: "normal" | "brand" | "white";
};

export type StatCardVariant = "_01" | "_02" | "_03" | "_04" | "_05";

export interface StatCardData {
  id: StatCardVariant;
  title: string;
  count: string;
  description: string;
  icon: string;
  iconAlt: string;
}

export const STAT_SECTION = {
  eyebrow: "Statistics",
  ctaLabel: "Contact Us",
  ctaHref: "/contact-us",
  card3CtaLabel: "Get in Touch",
  descriptionParts: [
    { text: "Trusted by partners and " },
    { text: "travelers worldwide", accent: true },
    { text: " — delivering exceptional travel experiences " },
    { text: "since 2016", accent: true },
    { text: "." },
  ],
} as const;

export const STAT_MISSION = {
  card1Top:
    "2100 travel partners across the globe cooperate with Zakher Travel as their trusted B2B supplier.",
  card2ImageCaption:
    "10 tourist destinations across Europe and Asia — offered, booked, and managed from one platform.",
  card3Highlight:
    "Backed by 400 partner hotels, a dedicated team of 60 travel professionals, and more than 80,000 tourists welcomed since 2016 — we deliver reliable travel at scale.",
  card3Footer:
    "Licensed tour operator since 2016 — your online and offline travel partner across 10 destinations.",
} as const;

export const STAT_CARDS: StatCardData[] = [
  {
    id: "_01",
    title: "Partners",
    count: "2100",
    description:
      "From independent agencies to international tour operators, more than 2100 travel companies rely on our contracts, inventory, and 24/7 support to serve their clients worldwide.",
    icon: `${CDN_BASE}/69b7a4c3737a812eb4e10a92_icon-18.svg`,
    iconAlt: "Partners icon",
  },
  {
    id: "_02",
    title: "Destinations",
    count: "10",
    description:
      "Azerbaijan, Türkiye, Georgia, and seven more countries — each destination with curated tours, transfers, guides, and hotel options handled by our in-house team.",
    icon: `${CDN_BASE}/69b7a83c6d4473b8ebbeb0d0_icon-22.svg`,
    iconAlt: "Destinations icon",
  },
  {
    id: "_03",
    title: "Hotels",
    count: "400",
    description:
      "400 hotels available for direct booking across all our destinations, from city hotels to resort properties.",
    icon: `${CDN_BASE}/69b7a9021981b395c1cc2bb4_icon-19.svg`,
    iconAlt: "Hotels icon",
  },
  {
    id: "_04",
    title: "Tourists",
    count: "80000+",
    description:
      "Over 80,000 visitors from the GCC, Europe, and beyond have traveled with us — from group tours to tailor-made holidays.",
    icon: `${CDN_BASE}/69b7abef6e4e230d77171d3a_icon-20.svg`,
    iconAlt: "Tourists icon",
  },
  {
    id: "_05",
    title: "Staff",
    count: "60",
    description:
      "60 experienced travel professionals — reservation, operations, and destination experts — delivering world-class service every day.",
    icon: `${CDN_BASE}/69b7acfcb87bafd882b8ebb0_icon-21.svg`,
    iconAlt: "Staff icon",
  },
];

function splitDigits(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) {
    return { digits: value.split(""), suffix: "" };
  }
  return { digits: match[1].split(""), suffix: match[2] ?? "" };
}

function appendSuffixColumn(
  columns: UxoralCounterColumn[],
  suffix: string,
  light: boolean,
) {
  columns.push({
    target: suffix,
    variant: "four",
    valueClass: suffix === "+" ? (light ? "white" : "brand") : light ? "white" : "normal",
  });
}

export function buildUxoralCounterColumns(
  value: string,
  options?: { light?: boolean; suffix?: string },
): UxoralCounterColumn[] {
  const light = options?.light ?? false;
  const { digits, suffix } = splitDigits(value);

  const columns: UxoralCounterColumn[] = digits.map((digit, index) => ({
    target: digit,
    variant: index === 0 ? "three" : "four",
    valueClass: light ? "white" : undefined,
  }));

  const resolvedSuffix = options?.suffix ?? suffix;
  if (resolvedSuffix) {
    appendSuffixColumn(columns, resolvedSuffix, light);
  }

  return columns;
}
