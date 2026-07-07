import type { SocialPlatformId } from "./SocialIcons";

export const FOLLOW_US_SECTION = {
  badge: "Follow Us",
  title: "Stay connected with Zakher Travel.",
  description:
    "Follow us on social media for travel inspiration, tour updates, and exclusive offers across all our destinations.",
} as const;

export const INSTAGRAM_SECTION = {
  badge: "Instagram",
  title: "Zakher Travel on Instagram",
  description:
    "Regional accounts sharing destination highlights, tour moments, and travel tips from our teams around the world.",
} as const;

export const YOUTUBE_SECTION = {
  badge: "YouTube",
  title: "Watch Us on YouTube",
  description: "Explore our destinations and travel experiences on video.",
  embedUrl: "https://www.youtube.com/embed/-9BRrj8_3u0?si=qBlpCTdO2L4FOcCk",
  channelUrl: "https://www.youtube.com/@zakher.travel/videos",
} as const;

export type SocialLink = {
  id: SocialPlatformId;
  label: string;
  title: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    title: "Join us on Facebook",
    href: "https://www.facebook.com/zakher.travel/",
  },
  {
    id: "x",
    label: "X",
    title: "Join us on X",
    href: "https://x.com/ZakherTravel",
  },
  {
    id: "wechat",
    label: "WeChat",
    title: "Join us on WeChat",
    href: "/social-media/wechat-qr.png",
  },
  {
    id: "telegram",
    label: "Telegram",
    title: "Join us on Telegram",
    href: "/social-media/telegram-qr.png",
  },
  {
    id: "youtube",
    label: "YouTube",
    title: "Join us on YouTube",
    href: "https://www.youtube.com/@zakher.travel/videos",
  },
  {
    id: "tiktok",
    label: "TikTok",
    title: "Join us on TikTok",
    href: "https://www.tiktok.com/@zakher.travel",
  },
  {
    id: "instagram",
    label: "Instagram",
    title: "Join us on Instagram",
    href: "https://www.instagram.com/zakher.travel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    title: "Join us on LinkedIn",
    href: "https://www.linkedin.com/company/zakher-travel/?originalSubdomain=az",
  },
  {
    id: "snapchat",
    label: "Snapchat",
    title: "Join us on Snapchat",
    href: "https://www.snapchat.com/add/zakher.travel?share_id=xcskqGRxSJqpOlKuNBPjHA&locale=en_AZ",
  },
  {
    id: "tripadvisor",
    label: "Tripadvisor",
    title: "Join us on Tripadvisor",
    href: "https://www.tripadvisor.com/Attraction_Review-g293934-d34177573-Reviews-Zakher_Travel-Baku_Absheron_Region.html",
  },
];

export type InstagramAccount = {
  username: string;
  href: string;
  image: string;
  avatar: string;
};

const PROFILE = "/social-media/profile.webp";

export const INSTAGRAM_ACCOUNTS: InstagramAccount[] = [
  {
    username: "zakher_travel_azerbaijan",
    href: "https://www.instagram.com/zakher_travel_azerbaijan?igsh=MXBrbjd2enM0aDZ6ag==",
    image: PROFILE,
    avatar: PROFILE,
  },
  {
    username: "Zakher.Travel",
    href: "https://www.instagram.com/zakher.travel?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: PROFILE,
    avatar: PROFILE,
  },
  {
    username: "Zakher_Travel_Turkiye",
    href: "https://www.instagram.com/zakher.travel.turkiye?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/turkiye.webp",
    avatar: "/social-media/turkiye.webp",
  },
  {
    username: "Zakher_Travel_UAE",
    href: "https://www.instagram.com/zakher_travel_uae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: PROFILE,
    avatar: PROFILE,
  },
  {
    username: "Zakher_Travel_Kyrgyzstan",
    href: "https://www.instagram.com/zakher.travel.kyrgyzstan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/kyrgyzstan.webp",
    avatar: "/social-media/kyrgyzstan.webp",
  },
  {
    username: "Zakher_Travel_Kazakhstan",
    href: "https://www.instagram.com/zakher.travel.kazakhstan/?utm_source=ig_web_button_share_sheet",
    image: "/social-media/kazakhstan.webp",
    avatar: "/social-media/kazakhstan.webp",
  },
  {
    username: "Zakher_Travel_Europe",
    href: "https://www.instagram.com/zakher.travel.europe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/europe.webp",
    avatar: "/social-media/europe.webp",
  },
  {
    username: "Zakher_Travel_Az",
    href: "https://www.instagram.com/zakhertravel.az?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: PROFILE,
    avatar: PROFILE,
  },
  {
    username: "Zakher_Travel_Russia",
    href: "https://www.instagram.com/zakher.travel.russia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/russia.webp",
    avatar: "/social-media/russia.webp",
  },
  {
    username: "Zakher_Travel_Uzbekistan",
    href: "https://www.instagram.com/zakher.travel.uzbekistan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/uzbekistan.webp",
    avatar: "/social-media/uzbekistan.webp",
  },
  {
    username: "Zakher.Travel_Georgia",
    href: "https://www.instagram.com/zakher.travel.georgia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    image: "/social-media/georgia.webp",
    avatar: "/social-media/georgia.webp",
  },
];
