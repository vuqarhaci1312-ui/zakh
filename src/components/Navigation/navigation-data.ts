export const SKYWALK_CDN =
  "https://cdn.prod.website-files.com/686560aec3f1efe3779c1934";

export const NAV_LOGO = "/hero/ztravel.png";

export const NAV_PILL_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-services", label: "Our Services" },
  { href: "/tour-packages", label: "Tour Packages" },
  { href: "/social-media", label: "Social Media" },
] as const;

export const NAV_LINKS = [
  ...NAV_PILL_LINKS,
  {
    href: "/contact-us",
    label: "Contact Us",
  },
] as const;

export const MOBILE_TABS = [
  { href: "/", label: "Home", type: "link" as const },
  { href: "/about", label: "About", type: "link" as const },
  { href: "/our-services", label: "Services", type: "link" as const },
  { href: "/tour-packages", label: "Tours", type: "link" as const },
  { label: "Menu", type: "menu" as const },
] as const;
