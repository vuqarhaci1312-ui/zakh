import { SKYWALK_CDN } from "@/components/Navigation/navigation-data";

export const ABOUT_HERO = {
  title: "Zakher Travel",
  subtitle:
    "Your online and offline supplier in the world since 2016 — professional travel agency in Azerbaijan.",
  backgroundImage: `${SKYWALK_CDN}/686c1f73c63a17299cee245d_Frame%20427322154.avif`,
  planeImage: `${SKYWALK_CDN}/686d3d152baa0da6e3aa7f21_sdgfv.avif`,
  planeSrcSet: `${SKYWALK_CDN}/686d3d152baa0da6e3aa7f21_sdgfv-p-500.avif 500w, ${SKYWALK_CDN}/686d3d152baa0da6e3aa7f21_sdgfv-p-800.avif 800w, ${SKYWALK_CDN}/686d3d152baa0da6e3aa7f21_sdgfv.avif 2500w`,
} as const;

export const ABOUT_INTRO = {
  image: "/about/about-who-we-are.png",
} as const;

export const DMC_PARTNER = {
  image: "/about/dmc-partner.png",
  title: "Why Choose Zakher as Your DMC Partner?",
  paragraphs: [
    "With extensive local expertise and a trusted network of partners across Azerbaijan, Türkiye, Kazakhstan, Kyrgyzstan, Uzbekistan, Georgia, Poland, Czech Republic, Russia, and the UAE, Zakher Travel delivers seamless destination management services tailored to the needs of international travel agencies, tour operators, corporate clients, and event organizers.",
    "From MICE and incentive travel to luxury experiences, group tours, and corporate events, we provide end-to-end planning, reliable logistics, carefully selected suppliers, and on-the-ground operational support. Our regional presence enables us to create authentic, high-quality travel experiences while ensuring every journey is managed with professionalism, efficiency, and attention to detail.",
  ],
} as const;

export const ABOUT_INTRO_BODY = [
  "Zakher Travel Group of Companies was established in 2016 and soon managed to make an outstanding achievement in the travel industry. Over the years, we have welcomed thousands of visitors from the GCC region and beyond, crafting exceptional travel experiences across a diverse range of destinations — including Azerbaijan, Türkiye, Poland, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Russia, the Czech Republic, Ukraine, and the UAE.",
  "Since our founding, we have expanded our presence by opening branches across several countries and building strong partnerships with more than 2,000 travel companies worldwide. Our team of over 50 experienced professionals specializes in designing tailor-made holidays and delivering high-quality travel services to meet the unique needs of every client.",
  "As a fully licensed tour operator, we take pride in bringing international travelers to our handpicked destinations. We place particular emphasis on promoting Azerbaijan — the Pearl of the Caucasus — where ancient history meets vibrant modern life. From breathtaking natural landscapes and impressive architectural landmarks to a rich and diverse cultural heritage, Azerbaijan offers an unforgettable travel experience.",
  "With four distinct seasons, each offering its own unique beauty and charm, our destinations can be enjoyed all year round. Travelers will always discover something new and inspiring, making the journey worth repeating.",
] as const;

export const ABOUT_MEMBERS = {
  title: "We Are Members Of",
  titleBefore: "We Are",
  titleAccent: "Members Of",
} as const;

export const MEMBER_LOGOS = [
  { src: "/about/members/gta.jpg", alt: "GTA" },
  { src: "/about/members/tursab.png", alt: "TURSAB" },
  { src: "/about/members/kato.png", alt: "KATO" },
  { src: "/about/members/iata.png", alt: "IATA" },
  { src: "/about/members/asosiyasiya.jpg", alt: "Association" },
  { src: "/about/members/iso.jpg", alt: "ISO" },
] as const;

export const ABOUT_CHARITY = {
  title: "Charity",
  image: "/about/charity.png",
  paragraphs: [
    "We are a full service travel agency that provides customized excellence for the tourism needs of business and leisure clients.",
    "Zakher Travel officially started its activity in 2016 and soon managed to make an outstanding achievement. We received thousands of tourists from the GCC region and other locations, helping to introduce them to the charming treasures of Azerbaijan, Türkiye, Georgia, Russia, Kazakhstan, Kyrgyzstan, Uzbekistan, Poland, Albania, Hungary, Czechia, Slovakia, Germany, Ukraine, UAE.",
    "As a tour operator, we established our cooperation with more than 800 travel companies through official contracts. Our professional and friendly staff of 100 people provide tailor-made holidays to our customers.",
  ],
} as const;

export const ABOUT_CERTIFICATES = {
  title: "Certificates",
} as const;

export const CERTIFICATE_IMAGES = [
  "/about/certificates/1-1-DN07EFQI.jpg",
  "/about/certificates/2-2-DjErKR8H.jpg",
  "/about/certificates/3-3-D96OeoLK.jpg",
  "/about/certificates/4-4-nzu0V3KC.jpg",
  "/about/certificates/5-5-D6pr13We.jpg",
  "/about/certificates/6-6-CN7Q_0KL.jpg",
  "/about/certificates/7-7-D42PotE8.jpg",
  "/about/certificates/8-8-BtoIgphG.jpg",
  "/about/certificates/9-9-CRijNeQb.jpg",
  "/about/certificates/10-10-MEeTCo_B.jpg",
  "/about/certificates/11-11-CQFSgfuQ.jpg",
  "/about/certificates/12-12-3LLVgBBU.jpg",
  "/about/certificates/13-13-eeWg2h3W.jpg",
  "/about/certificates/14-14-DeUV-R7w.jpg",
  "/about/certificates/15-15-C4PU2L0g.jpg",
  "/about/certificates/16-16-qIrMCxfp.jpg",
  "/about/certificates/17-17-DDnlkB0A.jpg",
  "/about/certificates/18-18-D2JXOnuI.jpg",
  "/about/certificates/19-19-BKdEe105.jpg",
  "/about/certificates/20-20-BH2KJmdO.jpg",
  "/about/certificates/21-certif8-CtPAxdtX.jpg",
] as const;

export const ABOUT_VALUES = {
  title: "WHY CHOOSE US?",
  subtitle:
    "One management for 10 tourist destinations, a B2B online platform, online payments, and world-class service.",
} as const;

export const PLUS_ICON = `${SKYWALK_CDN}/686560aec3f1efe3779c1a00_plus_3524388.svg`;

export const VALUE_CARDS = [
  {
    id: "management",
    title: "1 management - 10 tourist destinations",
    description:
      "Offering and managing 10 tourist destinations. Offline support (by call, by e-mail, by Whatsapp) 24/7.",
    backgroundImage: `${SKYWALK_CDN}/686c24c9025545d793212f74_Frame%20427322135.avif`,
    variant: "01" as const,
  },
  {
    id: "b2b",
    title: "B2b online platform",
    description:
      "A B2B online platform that enables businesses to buy services from other businesses online, streamlining transactions and business-to-business interactions.",
    backgroundImage: `${SKYWALK_CDN}/686c24c9fa399a77fbd661e0_Frame%20427322136.avif`,
    variant: "02" as const,
  },
  {
    id: "service",
    title: "World Class Service",
    description:
      "World-class service is a commitment to consistently exceeding customer expectations with personalized, proactive, and memorable interactions.",
    backgroundImage: `${SKYWALK_CDN}/686c24c923af813ad0d4baaf_Frame%20427322137.avif`,
    variant: "03" as const,
  },
] as const;

export const FLEET_CARD = {
  title: "Our Tour Packages",
  description:
    "Explore Azerbaijan, Turkiye, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Russia, Czech Republic, Poland, UAE, and Ukraine with tailor-made holidays from Zakher Travel.",
  backgroundImage: `${SKYWALK_CDN}/686c3076fe217aa1e973c30e_rgevd.avif`,
} as const;
