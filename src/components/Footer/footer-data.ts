import type { SocialPlatformId } from "@/components/SocialMedia/SocialIcons";

export type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links?: FooterLink[];
  contact?: {
    address: string;
    phones: { href: string; value: string }[];
    email: { href: string; value: string };
  };
  social?: { id: SocialPlatformId; label: string; href: string }[];
};

export const FOOTER_LOGO = "/hero/ztravel.png";

export const FOOTER_TAGLINE =
  "Your online and offline supplier in the world since 2016";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Contact",
    contact: {
      address: "Azerbaijan, Baku, Huseyn Javid Ave 73, AZ1073",
      phones: [
        { href: "tel:+994502532209", value: "+994 50 253 22 09" },
        { href: "tel:+971565902100", value: "+971 56 590 21 00" },
        { href: "tel:+994123100932", value: "+994 12 310 09 32" },
      ],
      email: { href: "mailto:info@zakher.travel", value: "info@zakher.travel" },
    },
  },
  {
    title: "Information",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/our-branches", label: "Our Branches" },
      { href: "/contact-us", label: "Contact Us" },
    ],
  },
  {
    title: "Our Menu",
    links: [
      {
        href: "/our-events",
        label: "Our Events",
      },
      { href: "/tour-packages", label: "Tour Packages" },
      { href: "/our-services", label: "Services" },
      { href: "/our-services", label: "Our Brochures" },
    ],
  },
  {
    title: "Social Media",
    social: [
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/zakher-travel/?originalSubdomain=az",
      },
      {
        id: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/zakher.travel/",
      },
      {
        id: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/zakhertravel.az?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
      },
      {
        id: "snapchat",
        label: "Snapchat",
        href: "https://www.snapchat.com/add/zakher.travel?share_id=xcskqGRxSJqpOlKuNBPjHA&locale=en_AZ",
      },
      {
        id: "youtube",
        label: "Youtube",
        href: "https://www.youtube.com/@zakher.travel/videos",
      },
      {
        id: "tiktok",
        label: "Tiktok",
        href: "https://www.tiktok.com/@zakher.travel",
      },
      {
        id: "telegram",
        label: "Telegram",
        href: "https://t.me/",
      },
      {
        id: "wechat",
        label: "WeChat",
        href: "https://www.wechat.com/",
      },
      {
        id: "x",
        label: "X",
        href: "https://x.com/ZakherTravel",
      },
      {
        id: "tripadvisor",
        label: "Tripadvisor",
        href: "https://www.tripadvisor.com/",
      },
    ],
  },
];

export const FOOTER_COPYRIGHT_SUFFIX = "— All rights reserved";

export const MOBILE_FOOTER_LINKS: FooterLink[] = [
  { href: "/about", label: "About Us" },
  { href: "/our-services", label: "Services" },
  { href: "/tour-packages", label: "Tours" },
  { href: "/our-branches", label: "Branches" },
  { href: "/our-events", label: "Events" },
  { href: "/contact-us", label: "Contact" },
];

export const FOOTER_SOCIAL =
  FOOTER_COLUMNS.find((column) => column.social)?.social ?? [];

export const FOOTER_CONTACT =
  FOOTER_COLUMNS.find((column) => column.contact)?.contact;
