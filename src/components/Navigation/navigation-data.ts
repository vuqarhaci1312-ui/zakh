export const SKYWALK_CDN =
  "https://cdn.prod.website-files.com/686560aec3f1efe3779c1934";

export const NAV_LOGO = "/hero/ztravel.png";

export type NavChildLink = {
  href: string;
  label: string;
};

export type NavPillLink = {
  href: string;
  label: string;
  children?: readonly NavChildLink[];
};

export const NAV_PILL_LINKS: readonly NavPillLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/our-services", label: "Our Services" },
      { href: "/our-branches", label: "Our Branches" },
      { href: "/our-events", label: "Our Events" },
    ],
  },
  { href: "/tour-packages", label: "Tour Packages" },
  { href: "/social-media", label: "Social Media" },
  { href: "/contact-us", label: "Contact Us" },
];

export const NAV_LINKS = NAV_PILL_LINKS;

export const MOBILE_TABS = [
  { href: "/", label: "Home", type: "link" as const },
  { href: "/about", label: "About", type: "link" as const },
  { href: "/our-services", label: "Services", type: "link" as const },
  { href: "/tour-packages", label: "Tours", type: "link" as const },
  { label: "Menu", type: "menu" as const },
] as const;
