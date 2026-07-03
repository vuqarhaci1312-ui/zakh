const CDN_BASE =
  "https://cdn.prod.website-files.com/690a4d8aaeb6104a7e587deb";

export const DESTINATION_SECTION = {
  eyebrow: "Destinations",
  title: "Our Tour Packages",
  linkHref: "https://test.zakher.travel/tour-packages",
} as const;

export interface DestinationItem {
  id: string;
  name: string;
  packages: string;
  image: string;
  imageSrcSet?: string;
  scrollDelay: number;
}

export const DESTINATIONS: DestinationItem[] = [
  {
    id: "azerbaijan",
    name: "Azerbaijan",
    packages: "Tour Packages",
    image: `${CDN_BASE}/69185262b86ac92397dc5822_destination-image1.webp`,
    imageSrcSet: `${CDN_BASE}/69185262b86ac92397dc5822_destination-image1-p-500.webp 500w, ${CDN_BASE}/69185262b86ac92397dc5822_destination-image1-p-800.webp 800w, ${CDN_BASE}/69185262b86ac92397dc5822_destination-image1-p-1080.webp 1080w, ${CDN_BASE}/69185262b86ac92397dc5822_destination-image1-p-1600.webp 1600w, ${CDN_BASE}/69185262b86ac92397dc5822_destination-image1.webp 1644w`,
    scrollDelay: 200,
  },
  {
    id: "turkiye",
    name: "Turkiye",
    packages: "Tour Packages",
    image: `${CDN_BASE}/69185261211d778782b5de38_destination-image2.webp`,
    imageSrcSet: `${CDN_BASE}/69185261211d778782b5de38_destination-image2-p-500.webp 500w, ${CDN_BASE}/69185261211d778782b5de38_destination-image2-p-800.webp 800w, ${CDN_BASE}/69185261211d778782b5de38_destination-image2-p-1080.webp 1080w, ${CDN_BASE}/69185261211d778782b5de38_destination-image2-p-1600.webp 1600w, ${CDN_BASE}/69185261211d778782b5de38_destination-image2.webp 1644w`,
    scrollDelay: 300,
  },
  {
    id: "georgia",
    name: "Georgia",
    packages: "Tour Packages",
    image: `${CDN_BASE}/69185260297b32f6709f9226_destination-image3.webp`,
    imageSrcSet: `${CDN_BASE}/69185260297b32f6709f9226_destination-image3-p-500.webp 500w, ${CDN_BASE}/69185260297b32f6709f9226_destination-image3-p-800.webp 800w, ${CDN_BASE}/69185260297b32f6709f9226_destination-image3-p-1080.webp 1080w, ${CDN_BASE}/69185260297b32f6709f9226_destination-image3-p-1600.webp 1600w, ${CDN_BASE}/69185260297b32f6709f9226_destination-image3.webp 1644w`,
    scrollDelay: 400,
  },
  {
    id: "uae",
    name: "UAE",
    packages: "Tour Packages",
    image: `${CDN_BASE}/69185261349460d06000e67c_destination-image4.webp`,
    imageSrcSet: `${CDN_BASE}/69185261349460d06000e67c_destination-image4-p-500.webp 500w, ${CDN_BASE}/69185261349460d06000e67c_destination-image4-p-800.webp 800w, ${CDN_BASE}/69185261349460d06000e67c_destination-image4-p-1080.webp 1080w, ${CDN_BASE}/69185261349460d06000e67c_destination-image4-p-1600.webp 1600w, ${CDN_BASE}/69185261349460d06000e67c_destination-image4.webp 1644w`,
    scrollDelay: 500,
  },
  {
    id: "kazakhstan",
    name: "Kazakhstan",
    packages: "Tour Packages",
    image: `${CDN_BASE}/6918525c349460d06000e5a6_destination-image5.webp`,
    imageSrcSet: `${CDN_BASE}/6918525c349460d06000e5a6_destination-image5-p-500.webp 500w, ${CDN_BASE}/6918525c349460d06000e5a6_destination-image5-p-800.webp 800w, ${CDN_BASE}/6918525c349460d06000e5a6_destination-image5-p-1080.webp 1080w, ${CDN_BASE}/6918525c349460d06000e5a6_destination-image5-p-1600.webp 1600w, ${CDN_BASE}/6918525c349460d06000e5a6_destination-image5.webp 1644w`,
    scrollDelay: 600,
  },
  {
    id: "uzbekistan",
    name: "Uzbekistan",
    packages: "Tour Packages",
    image: `${CDN_BASE}/69185261c60a0860556690bb_destination-image6.webp`,
    imageSrcSet: `${CDN_BASE}/69185261c60a0860556690bb_destination-image6-p-500.webp 500w, ${CDN_BASE}/69185261c60a0860556690bb_destination-image6-p-800.webp 800w, ${CDN_BASE}/69185261c60a0860556690bb_destination-image6-p-1080.webp 1080w, ${CDN_BASE}/69185261c60a0860556690bb_destination-image6-p-1600.webp 1600w, ${CDN_BASE}/69185261c60a0860556690bb_destination-image6.webp 1644w`,
    scrollDelay: 700,
  },
];

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
