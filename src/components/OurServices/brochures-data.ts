/**
 * Brochure catalog carried over from the live Zakher Travel site
 * (test.zakher.travel/ourservices, "Our Brochures" section).
 * PDFs are served from the live site to avoid bundling ~150 MB of files.
 */

const PDF_BASE = "https://test.zakher.travel/pdf";

export const BROCHURES_SECTION = {
  badge: "Our Brochures",
  title: "Download our tour catalogs and booklets.",
  description:
    "Printable brochures for every destination we operate — available in English, Arabic, Russian, German, and Chinese.",
} as const;

export const BROCHURES_MOBILE_PAGE_SIZE = 6;

export interface BrochureItem {
  title: string;
  language: string;
  image: string;
  file: string;
}

export const BROCHURES: BrochureItem[] = [
  {
    title: "Azerbaijan catalog",
    language: "EN",
    image: "/brochures/maiden-tower.webp",
    file: `${PDF_BASE}/inside_press_eng.pdf`,
  },
  {
    title: "Azerbaijan catalog",
    language: "EN",
    image: "/brochures/shusha.webp",
    file: `${PDF_BASE}/inside_press_eng%20(1).pdf`,
  },
  {
    title: "Azerbaijan catalog",
    language: "RU",
    image: "/brochures/flame-tower.webp",
    file: `${PDF_BASE}/inside_press_rus.pdf`,
  },
  {
    title: "Azerbaijan catalog",
    language: "AR",
    image: "/brochures/icherisheher.webp",
    file: `${PDF_BASE}/inside_press_ereb.pdf`,
  },
  {
    title: "Azerbaijan catalog",
    language: "Chinese",
    image: "/brochures/nature.webp",
    file: `${PDF_BASE}/inside_press_china.pdf`,
  },
  {
    title: "Azerbaijan tours",
    language: "AR",
    image: "/brochures/ski.webp",
    file: `${PDF_BASE}/Zakher-booklet_arab_2022-3.pdf`,
  },
  {
    title: "Azerbaijan tours",
    language: "EN",
    image: "/brochures/sheki.webp",
    file: `${PDF_BASE}/Zakher-booklet_eng_2022-1.pdf`,
  },
  {
    title: "Azerbaijan tours",
    language: "RU",
    image: "/brochures/nature2.webp",
    file: `${PDF_BASE}/Zakher_booklet_yeni-2_rus.pdf`,
  },
  {
    title: "Azerbaijani Restaurants",
    language: "EN",
    image: "/brochures/nature-restaurants.webp",
    file: `${PDF_BASE}/az-restorants-03-scaled.jpg`,
  },
  {
    title: "Ukraine catalog",
    language: "AR",
    image: "/brochures/ukraine.webp",
    file: `${PDF_BASE}/Zakher_Ukraina_broshura.pdf`,
  },
  {
    title: "Ukraine tours",
    language: "EN/AR",
    image: "/brochures/ukraine2.webp",
    file: `${PDF_BASE}/Zakher_booklet_Ukraine_c.pdf`,
  },
  {
    title: "Ukraine tours",
    language: "EN/AR",
    image: "/brochures/ukraine3.webp",
    file: `${PDF_BASE}/Zakher_booklet_Ukraine_c%20(1).pdf`,
  },
  {
    title: "Russia Sochi tours",
    language: "EN/AR",
    image: "/brochures/russia.webp",
    file: `${PDF_BASE}/Zakher_booklet_Sochi_A4_lazer_print.pdf`,
  },
  {
    title: "Russia tours",
    language: "AR",
    image: "/brochures/russia4.webp",
    file: `${PDF_BASE}/russia-brashour.pdf-arabic.pdf`,
  },
  {
    title: "Russia tours",
    language: "EN",
    image: "/brochures/russia3.webp",
    file: `${PDF_BASE}/russia-brashour.pdf`,
  },
  {
    title: "Russia tours",
    language: "RU",
    image: "/brochures/russia2.webp",
    file: `${PDF_BASE}/russia-brashour.ai-ru.pdf`,
  },
  {
    title: "Poland tours",
    language: "EN/AR",
    image: "/brochures/poland.webp",
    file: `${PDF_BASE}/Zakher_booklet_Poland_c.pdf`,
  },
  {
    title: "Kyrgyzstan tours",
    language: "EN",
    image: "/brochures/kyrgyzstan.webp",
    file: `${PDF_BASE}/kyrg.pdf-EN.pdf`,
  },
  {
    title: "Kyrgyzstan tours",
    language: "AR",
    image: "/brochures/kyrgyzstan2.webp",
    file: `${PDF_BASE}/kyrg.pdf-AR.pdf`,
  },
  {
    title: "Kyrgyzstan tours",
    language: "RU",
    image: "/brochures/kyrgyzstan3.webp",
    file: `${PDF_BASE}/kyrg.pdf-RU.pdf`,
  },
  {
    title: "Kyrgyzstan Hotels and Restaurants",
    language: "EN",
    image: "/brochures/kyrgyzstan4.webp",
    file: `${PDF_BASE}/Best-Hotels-and-Resturant-Kyrgizisatan.pdf`,
  },
  {
    title: "Turkiye tours",
    language: "EN/AR",
    image: "/brochures/turkiye.webp",
    file: `${PDF_BASE}/turkiya.BOOKLET.pdf`,
  },
  {
    title: "Kazakhstan tours",
    language: "EN/AR",
    image: "/brochures/kazakhstan1.webp",
    file: `${PDF_BASE}/kazakhstan-tour.pdf`,
  },
  {
    title: "Kazakhstan Hotels and Restaurants",
    language: "EN",
    image: "/brochures/kazakhstan2.webp",
    file: `${PDF_BASE}/Kazakhstan-flayer-.jpeg`,
  },
  {
    title: "Uzbekistan tours",
    language: "EN/AR",
    image: "/brochures/uzbekistan.webp",
    file: `${PDF_BASE}/UZBEKISTAN-tours-booklet.pdf`,
  },
  {
    title: "Georgia tours",
    language: "AR",
    image: "/brochures/georgia1.webp",
    file: `${PDF_BASE}/georgia-arabic.pdf`,
  },
  {
    title: "Georgia tours",
    language: "EN",
    image: "/brochures/georgia7.webp",
    file: `${PDF_BASE}/georgia-english.pdf`,
  },
  {
    title: "Georgia tours",
    language: "DE",
    image: "/brochures/georgia1.webp",
    file: `${PDF_BASE}/georgia-german.pdf`,
  },
];
