export const AVENORA_CDN =

  "https://cdn.prod.website-files.com/6a13e532999601af0ed6354d";



export const SERVICE_ICON_PATHS = [

  "M3.21618 8.8431V10.4508L16.0781 10.4508V8.8431L3.21618 8.8431ZM12.8626 10.4508V12.0586H14.4704V10.4508H12.8626ZM11.2549 12.0586V13.6663H12.8626V12.0586H11.2549ZM9.64715 13.6663V15.2741L11.2549 15.2741V13.6663H9.64715ZM12.8626 8.8431V7.23535L14.4704 7.23535V8.8431H12.8626Z",

  "M11.2555 12.0583L11.2555 5.62728H12.8633L12.8633 12.0583H11.2555ZM9.64779 13.666L9.64779 4.01953L11.2555 4.01953L11.2555 13.666H9.64779Z",

] as const;



export const OUR_SERVICES_SECTION = {

  badge: "Our Services",

  title: "Professional travel services for every kind of journey.",

} as const;



export const TRAVEL_EXPERIENCES_SECTION = {

  badge: "Popular Tours",

  title: "Discover our most requested tour packages.",

  description:

    "From multi-country adventures to single-destination escapes, choose the journey that fits your travel plans and we will shape the experience around it.",

} as const;



export interface OurServiceItem {

  number: string;

  title: string;

  titleAccent?: string;

  description: string;

  image: string;

  imageSrcSet?: string;

  alt: string;

  gridLayout?: boolean;

}



export interface TravelExperienceItem {

  badge: string;

  title: string;

  titleAccent?: string;

  description: string;

  image: string;

  imageSrcSet?: string;

  alt: string;

  hideMobile?: boolean;

}



export const OUR_SERVICES: OurServiceItem[] = [

  {

    number: "01",

    title: "Tourist services",
    titleAccent: "services",

    description:

      "Honeymoon packages; private and shuttle transfers, tours; VIP welcoming; group packages; guide; air tickets; hotels booking; visas; travel insurance; off road tours; hunting tours; helicopter tours; golf tour package.",

    image: `${AVENORA_CDN}/6a1a98e70e4017306fc13af5_image%2015%20(1).webp`,

    imageSrcSet: `${AVENORA_CDN}/6a1a98e70e4017306fc13af5_image%2015%20(1)-p-500.webp 500w, ${AVENORA_CDN}/6a1a98e70e4017306fc13af5_image%2015%20(1)-p-800.webp 800w, ${AVENORA_CDN}/6a1a98e70e4017306fc13af5_image%2015%20(1)-p-1080.webp 1080w, ${AVENORA_CDN}/6a1a98e70e4017306fc13af5_image%2015%20(1).webp 1604w`,

    alt: "Tourist travel services",

  },

  {

    number: "02",

    title: "Real estate services",
    titleAccent: "services",

    description:

      "We provide assistance in a range of real estate services in Azerbaijan, starting from selling and renting private and commercial real estate, and providing legal advice with help of lawyers accredited by embassies.",

    image: `${AVENORA_CDN}/6a1c3d6981c60eedf1b87071_image%20156.webp`,

    alt: "Real estate services in Azerbaijan",

    gridLayout: true,

  },

  {

    number: "03",

    title: "Medical Services",
    titleAccent: "Medical",

    description:

      "We offer therapeutic, cosmetic and natural services, as we offer complete treatment trip programs that include transportation, accommodation, arranging appointments and reservations with the best doctors and clinics.",

    image: `${AVENORA_CDN}/6a1c3d67e8d9bae930c25080_image%20157.webp`,

    alt: "Medical travel services",

    gridLayout: true,

  },

  {

    number: "04",

    title: "Meetings, Incentives, Conferences and Exhibitions",

    description:

      "Services for organizing various private, public, and official events.",

    image: `${AVENORA_CDN}/6a2122d55f2930f34b4cbda7_Lone%20Trekker%20in%20the%20Majestic%20Mountains.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a2122d55f2930f34b4cbda7_Lone%20Trekker%20in%20the%20Majestic%20Mountains-p-500.webp 500w, ${AVENORA_CDN}/6a2122d55f2930f34b4cbda7_Lone%20Trekker%20in%20the%20Majestic%20Mountains-p-800.webp 800w, ${AVENORA_CDN}/6a2122d55f2930f34b4cbda7_Lone%20Trekker%20in%20the%20Majestic%20Mountains-p-1080.webp 1080w, ${AVENORA_CDN}/6a2122d55f2930f34b4cbda7_Lone%20Trekker%20in%20the%20Majestic%20Mountains.webp 1200w`,

    alt: "Event and conference travel services",

    gridLayout: true,

  },

];



export const TRAVEL_EXPERIENCES: TravelExperienceItem[] = [

  {

    badge: "Tour 01",

    title: "1 Trip - 3 Countries",
    titleAccent: "3 Countries",

    description:

      "Azerbaijan, Turkiye and Georgia in one seamless multi-country journey.",

    image: `${AVENORA_CDN}/6a16bdac19d64adee6a7a658_image%20140.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdac19d64adee6a7a658_image%20140-p-500.webp 500w, ${AVENORA_CDN}/6a16bdac19d64adee6a7a658_image%20140-p-800.webp 800w, ${AVENORA_CDN}/6a16bdac19d64adee6a7a658_image%20140.webp 892w`,

    alt: "Multi-country tour package",

  },

  {

    badge: "Tour 02",

    title: "Turkiye Tours",
    titleAccent: "Turkiye",

    description:

      "Explore Türkiye with curated itineraries, premium hotels, and expert local guides.",

    image: `${AVENORA_CDN}/6a16bdaca9126473ae8749da_image%20138.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdaca9126473ae8749da_image%20138-p-500.webp 500w, ${AVENORA_CDN}/6a16bdaca9126473ae8749da_image%20138-p-800.webp 800w, ${AVENORA_CDN}/6a16bdaca9126473ae8749da_image%20138.webp 892w`,

    alt: "Turkiye tour package",

  },

  {

    badge: "Tour 03",

    title: "Georgia Tours",
    titleAccent: "Georgia",

    description:

      "Discover Georgia's culture, nature, and hospitality with tailor-made travel programs.",

    image: `${AVENORA_CDN}/6a16bdac61659e805dce87ca_image%20139.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdac61659e805dce87ca_image%20139-p-500.webp 500w, ${AVENORA_CDN}/6a16bdac61659e805dce87ca_image%20139-p-800.webp 800w, ${AVENORA_CDN}/6a16bdac61659e805dce87ca_image%20139.webp 892w`,

    alt: "Georgia tour package",

  },

  {

    badge: "Tour 04",

    title: "Kazakhstan Tours",
    titleAccent: "Kazakhstan",

    description:

      "Experience Kazakhstan with thoughtfully planned routes, transfers, and accommodation.",

    image: `${AVENORA_CDN}/6a16bdacc342f36bcf05cf7f_image%20142.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdacc342f36bcf05cf7f_image%20142-p-500.webp 500w, ${AVENORA_CDN}/6a16bdacc342f36bcf05cf7f_image%20142-p-800.webp 800w, ${AVENORA_CDN}/6a16bdacc342f36bcf05cf7f_image%20142.webp 892w`,

    alt: "Kazakhstan tour package",

  },

  {

    badge: "Tour 05",

    title: "Czech Republic Tours",
    titleAccent: "Czech Republic",

    description:

      "Visit the Czech Republic with complete travel support from Zakher Travel.",

    image: `${AVENORA_CDN}/6a16bdbdd28d076e04d7eb64_image%20141.webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdbdd28d076e04d7eb64_image%20141-p-500.webp 500w, ${AVENORA_CDN}/6a16bdbdd28d076e04d7eb64_image%20141-p-800.webp 800w, ${AVENORA_CDN}/6a16bdbdd28d076e04d7eb64_image%20141.webp 892w`,

    alt: "Czech Republic tour package",

    hideMobile: true,

  },

  {

    badge: "Tour 06",

    title: "United Arab Emirates Tours",
    titleAccent: "United Arab Emirates",

    description:

      "Luxury UAE experiences with VIP welcoming, hotels, and seamless travel planning.",

    image: `${AVENORA_CDN}/6a16bdacf92bfac9cc198003_image%20143%20(1).webp`,

    imageSrcSet: `${AVENORA_CDN}/6a16bdacf92bfac9cc198003_image%20143%20(1)-p-500.webp 500w, ${AVENORA_CDN}/6a16bdacf92bfac9cc198003_image%20143%20(1)-p-800.webp 800w, ${AVENORA_CDN}/6a16bdacf92bfac9cc198003_image%20143%20(1).webp 892w`,

    alt: "United Arab Emirates tour package",

    hideMobile: true,

  },

];

