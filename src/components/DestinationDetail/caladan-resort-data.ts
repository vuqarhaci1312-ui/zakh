export const CALADAN_CDN =
  "https://cdn.prod.website-files.com/69833b76e5b4bee55e87302b";

export const CALADAN_SITE_CDN =
  "https://cdn.prod.website-files.com/69833b76e5b4bee55e873012";

export const CALADAN_RESORT_DETAIL = {
  tag: "Tour Package",
  title: "Zakher Travel Tour Package",
  description:
    "Explore handpicked destinations with tailor-made holidays, expert guides, visa support, and world-class service from a fully licensed tour operator since 2016.",
  heroImage: `${CALADAN_CDN}/69b049a16076b1b2188d012d_rumman-amin-s3o2rkTkF7I-unsplash.avif`,
  galleryThumbs: [
    `${CALADAN_CDN}/69aff4e4994822e17b6f0992_pexels-ksu-eli-studio-78564297-9116633.avif`,
    `${CALADAN_CDN}/69aff4e43f566491a0dc0953_pexels-leorossatti-2598638.avif`,
    `${CALADAN_CDN}/69aff4e4dee9b8f08dc2f5be_pexels-stijn-dijkstra-1306815-29989229.avif`,
  ],
  gallerySlides: [
    `${CALADAN_CDN}/69b2be0f339d350d98ea211e_pexels-asadphoto-1591361.avif`,
    `${CALADAN_CDN}/69a9a1ee7506720691b0a6a6_pexels-jonathanborba-13911220%20(1).avif`,
    `${CALADAN_CDN}/69a9a43eeca7b6045e93b8cd_pexels-freestockpro-1007657.avif`,
  ],
  amenities: [
    {
      icon: `${CALADAN_CDN}/69aff42e187f3f897abe2017_icon-resorts-2.svg`,
      label: "Air tickets",
    },
    {
      icon: `${CALADAN_CDN}/69aff441918013650c57c318_icon-resorts-5.svg`,
      label: "Hotels booking",
    },
    {
      icon: `${CALADAN_CDN}/69aff491c10b9b98c5a5835d_icon-resorts-3.svg`,
      label: "Visas",
    },
    {
      icon: `${CALADAN_CDN}/69aff48c48d633038023bc29_icon-resorts-4.svg`,
      label: "Travel insurance",
    },
    {
      icon: `${CALADAN_CDN}/69aff43776a3218a12504220_icon-resorts-1.svg`,
      label: "Private transfers",
    },
    {
      icon: `${CALADAN_CDN}/69aff4954a43cfc7e8bf6360_icon-resorts.svg`,
      label: "Expert guide",
    },
    {
      icon: `${CALADAN_CDN}/69aff4b96e9b92b546ac2871_icon-resorts-6.svg`,
      label: "VIP welcoming",
    },
    {
      icon: `${CALADAN_CDN}/69aff479fa0d7ec5018ef50f_icon-resorts-8.svg`,
      label: "Group packages",
    },
    {
      icon: `${CALADAN_CDN}/69aff4b3f014f81531ce3f5a_icon-resorts-7.svg`,
      label: "24/7 offline support",
    },
  ],
  review: {
    headline: "Trusted travel partner since 2016",
    quote:
      "Zakher Travel made our journey seamless from start to finish. Professional staff, excellent hotels, and unforgettable experiences across the Caucasus.",
    name: "Zakher Travel Guest",
    role: "International Traveler",
  },
  faqs: [
    {
      question: "What destinations does Zakher Travel offer?",
      answer:
        "We offer tour packages across Azerbaijan, Türkiye, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Russia, Czech Republic, Poland, UAE, and Ukraine.",
    },
    {
      question: "Do you provide visa support?",
      answer:
        "Yes. We assist with visas, travel insurance, air tickets, hotel bookings, and complete tailor-made holiday planning.",
    },
    {
      question: "How can I book a tour package?",
      answer:
        "Contact us at info@zakher.travel or +994123100932. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
    },
  ],
  roomSummary: [
    { value: "7", label: "Days" },
    { value: "5", label: "Cities" },
    { value: "4", label: "Hotels" },
    { value: "2", label: "Travelers" },
  ],
  price: "On request",
  related: [
    {
      slug: "turkiye",
      tag: "Tour Package",
      title: "Turkiye Tours",
      image: `${CALADAN_CDN}/69b037b7b9f0bc0f27d8889d_dinuka-lankaloka-HKr5cn6S0q0-unsplash.avif`,
      stats: [
        { value: "7", label: "Days" },
        { value: "3", label: "Cities" },
        { value: "2", label: "Travelers" },
      ],
    },
    {
      slug: "georgia",
      tag: "Tour Package",
      title: "Georgia Tours",
      image: `${CALADAN_CDN}/69b03783cb355b95794c522e_pexels-roman-odintsov-5667901.avif`,
      stats: [
        { value: "5", label: "Days" },
        { value: "2", label: "Cities" },
        { value: "2", label: "Travelers" },
      ],
    },
  ],
};

export type CaladanResortDetail = {
  tag: string;
  title: string;
  description: string;
  heroImage: string;
  galleryThumbs: string[];
  gallerySlides: string[];
  amenities: { icon: string; label: string }[];
  review: {
    headline: string;
    quote: string;
    name: string;
    role: string;
  };
  faqs: { question: string; answer: string }[];
  roomSummary: { value: string; label: string }[];
  price: string;
  related: {
    slug: string;
    tag: string;
    title: string;
    image: string;
    stats: { value: string; label: string }[];
  }[];
};
