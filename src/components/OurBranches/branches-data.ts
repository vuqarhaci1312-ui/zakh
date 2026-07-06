export type BranchItem = {
  id: string;
  name: string;
  flag: string;
  slug: string;
};

export const OUR_BRANCHES_SECTION = {
  badge: "Our Branches",
  description:
    "Explore Zakher Travel offices and partner destinations across the Caucasus, Central Asia, Europe, and the Middle East.",
} as const;

export const BRANCHES: BranchItem[] = [
  {
    id: "azerbaijan",
    name: "Azerbaijan",
    flag: "/branches/azerbaijan.jpg",
    slug: "azerbaijan",
  },
  {
    id: "turkiye",
    name: "Turkiye",
    flag: "/branches/turkiye.png",
    slug: "turkiye",
  },
  {
    id: "kazakhstan",
    name: "Kazakhstan",
    flag: "/branches/kazakhstan.jpg",
    slug: "kazakhstan",
  },
  {
    id: "kyrgyzstan",
    name: "Kyrgyzstan",
    flag: "/branches/kyrgyzstan.jpg",
    slug: "kyrgyzstan",
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    flag: "/branches/uzbekistan.jpeg",
    slug: "uzbekistan",
  },
  {
    id: "georgia",
    name: "Georgia",
    flag: "/branches/georgia.jpg",
    slug: "georgia",
  },
  {
    id: "poland",
    name: "Poland",
    flag: "/branches/poland.jpg",
    slug: "poland",
  },
  {
    id: "czech-republic",
    name: "Czech Republic",
    flag: "/branches/czech-republic.jpg",
    slug: "czech-republic",
  },
  {
    id: "russia",
    name: "Russia",
    flag: "/branches/russia.jpg",
    slug: "russia",
  },
  {
    id: "uae",
    name: "UAE",
    flag: "/branches/uae.png",
    slug: "uae",
  },
  {
    id: "ukraine",
    name: "Ukraine",
    flag: "/branches/ukraine.jpg",
    slug: "ukraine",
  },
];
