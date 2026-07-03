const CDN_BASE =
  "https://cdn.prod.website-files.com/69b2a2adca3cdacc51788e5b";

export type StatCardVariant = "_01" | "_02" | "_03" | "_04" | "_05";
export type StatCardTheme = "light" | "dark" | "primary";
export type IconWrapVariant = "gradient" | "white" | "black";

export interface StatCardData {
  id: StatCardVariant;
  title: string;
  count: string;
  description: string;
  icon: string;
  iconAlt: string;
  theme: StatCardTheme;
  iconWrap: IconWrapVariant;
  titleWhite?: boolean;
  countWhite?: boolean;
  descriptionLight?: boolean;
  descriptionWhite?: boolean;
}

export const STAT_SECTION = {
  descriptionParts: [
    { text: "Trusted by partners and " },
    { text: "travelers worldwide", accent: true },
    { text: " — delivering exceptional travel experiences " },
    { text: "since 2016", accent: true },
    { text: "." },
  ],
} as const;

export const STAT_CARDS: StatCardData[] = [
  {
    id: "_01",
    title: "Partners",
    count: "2100",
    description: "Travel companies cooperating with Zakher Travel worldwide.",
    icon: `${CDN_BASE}/69b7a4c3737a812eb4e10a92_icon-18.svg`,
    iconAlt: "Partners icon",
    theme: "light",
    iconWrap: "gradient",
  },
  {
    id: "_02",
    title: "Destinations",
    count: "10",
    description: "Tourist destinations offered and managed from one platform.",
    icon: `${CDN_BASE}/69b7a83c6d4473b8ebbeb0d0_icon-22.svg`,
    iconAlt: "Destinations icon",
    theme: "dark",
    iconWrap: "white",
    titleWhite: true,
    countWhite: true,
    descriptionWhite: true,
  },
  {
    id: "_03",
    title: "Hotels",
    count: "400+",
    description: "Hotels available for booking across our destinations.",
    icon: `${CDN_BASE}/69b7a9021981b395c1cc2bb4_icon-19.svg`,
    iconAlt: "Hotels icon",
    theme: "light",
    iconWrap: "gradient",
  },
  {
    id: "_04",
    title: "Tourists",
    count: "81487",
    description: "Visitors welcomed and served by our team over the years.",
    icon: `${CDN_BASE}/69b7abef6e4e230d77171d3a_icon-20.svg`,
    iconAlt: "Tourists icon",
    theme: "primary",
    iconWrap: "white",
    titleWhite: true,
    countWhite: true,
    descriptionWhite: true,
  },
  {
    id: "_05",
    title: "Staff",
    count: "60+",
    description: "Experienced professionals delivering world-class service.",
    icon: `${CDN_BASE}/69b7acfcb87bafd882b8ebb0_icon-21.svg`,
    iconAlt: "Staff icon",
    theme: "dark",
    iconWrap: "white",
    titleWhite: true,
    countWhite: true,
    descriptionWhite: true,
  },
];
