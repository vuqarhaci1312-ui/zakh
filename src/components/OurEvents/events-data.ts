export type EventItem = {
  id: string;
  title: string;
  description?: string;
  images: string[];
  video?: string;
};

export const OUR_EVENTS_SECTION = {
  badge: "Our Events",
  title: "International travel exhibitions and roadshows.",
  description:
    "Zakher Travel represents our country at numerous large-scale international events across the GCC, Europe, Asia, and beyond.",
} as const;

export const EVENTS_PER_PAGE = 5;

export const EVENTS: EventItem[] = [
  {
    "id": "event-01",
    "title": "Roadshow, Kuwait 2025",
    "images": [
      "/events/kuwait-D58CHs-K.jpg",
      "/events/kuwait1-adsKJiWv.jpg",
      "/events/kuwait2-B629ltNz.jpg",
      "/events/kuwat4-CZB93gvS.jpg"
    ]
  },
  {
    "id": "event-02",
    "title": "Roadshow 2025 in Khobar, Saudi Arabia",
    "images": [
      "/events/khobar-BsGriLaF.jpg",
      "/events/khobar1-DWtAl_ne.jpg"
    ]
  },
  {
    "id": "event-03",
    "title": "Roadshow 2025 in Jeddah, Saudi Arabia",
    "images": [
      "/events/jeddah-DHacNbkQ.jpg",
      "/events/jeddah1-DCViyzMi.jpg"
    ]
  },
  {
    "id": "event-04",
    "title": "Roadshow 2025 Abu Dhabi",
    "images": [
      "/events/abudhabi-DVxlsdRx.jpg",
      "/events/abudhabi1-Dkymg6-R.jpg",
      "/events/abudhabi3-chA3hHRr.jpg"
    ]
  },
  {
    "id": "event-05",
    "title": "Roadshow 2025 Doha, Qatar",
    "images": [
      "/events/doha-CCi4e8-2.jpg",
      "/events/doha1-ChzZcPE-.jpg"
    ]
  },
  {
    "id": "event-06",
    "title": "Roadshow 2025, Muscat, Oman",
    "images": [
      "/events/oman-BU7N-4lK.jpg"
    ]
  },
  {
    "id": "event-07",
    "title": "Saudi Travel Market agreement, 2025",
    "images": [
      "/events/travel-market-CMB2Wo9L.jpg",
      "/events/travel-market1-98wJOVjG.jpg",
      "/events/travel-market2-Ct3F8eLF.jpg",
      "/events/travel-market3-DUaj88GQ.jpg"
    ]
  },
  {
    "id": "event-08",
    "title": "Zakher Travel participation in Warsaw exhibition, Poland, 2025",
    "images": [
      "/events/warsaw-Dd_SzkZS.jpg"
    ]
  },
  {
    "id": "event-09",
    "title": "Asia's Leading Travel Show in Mumbai, India, 2025",
    "images": [
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.32%20(1).jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.32%20(2).jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.32.jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.33%20(1).jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.33%20(2).jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.33%20(3).jpeg",
      "/events/ITF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.33.jpeg"
    ]
  },
  {
    "id": "event-10",
    "title": "Shusha city exbition in Abu Dhabi, 2025, Embassy of United Arab Emirates",
    "images": [
      "/events/shusha-gk7E6rgQ.jpg"
    ]
  },
  {
    "id": "event-11",
    "title": "Tourism exhibition in Doha, Qatar, 2025",
    "images": [
      "/events/exibition-BQ1JmItU.jpg",
      "/events/exbition1-Kz5J18e7.jpg"
    ]
  },
  {
    "id": "event-12",
    "title": "EMITT Istanbul, Turkey, 2025",
    "images": [
      "/events/EMITT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.09%20(1).jpeg",
      "/events/EMITT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.09%20(2).jpeg",
      "/events/EMITT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.09.jpeg",
      "/events/EMITT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.10%20(1).jpeg",
      "/events/EMITT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.10.jpeg"
    ]
  },
  {
    "id": "event-13",
    "title": "Arabian Travel Market (ATM), Dubai, UAE, 2025",
    "images": [
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.15%20(1).jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.15%20(2).jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.15.jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.16%20(1).jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.16%20(2).jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.16.jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.17%20(1).jpeg",
      "/events/ATM2025/WhatsApp%20Image%202026-07-03%20at%2012.24.17.jpeg"
    ]
  },
  {
    "id": "event-14",
    "title": "IMEX Frankfurt, Germany, 2025",
    "images": [
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.18%20(1).jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.18%20(2).jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.18%20(3).jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.18.jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.19%20(1).jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.19%20(2).jpeg",
      "/events/IMEXFRANKFURT2025/WhatsApp%20Image%202026-07-03%20at%2012.24.19.jpeg"
    ]
  },
  {
    "id": "event-15",
    "title": "ITB Shanghai, China, 2025",
    "images": [
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20%20(1).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20%20(2).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20%20(3).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20%20(4).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20%20(5).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.20.jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.21%20(1).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.21%20(2).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.21%20(3).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.21.jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22%20(1).jpeg",
      "/events/ITBCHINA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22.jpeg"
    ]
  },
  {
    "id": "event-16",
    "title": "Georgian Wine and Regions Festival, Georgia, 2025",
    "images": [
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22%20(1).jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22%20(2).jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22%20(3).jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.22.jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.23%20(1).jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.23%20(2).jpeg",
      "/events/GEORGIA2025/WhatsApp%20Image%202026-07-03%20at%2012.24.23.jpeg"
    ]
  },
  {
    "id": "event-17",
    "title": "Istanbul ATF (Antalya Tourism Fair), Turkey, 2025",
    "images": [
      "/events/ATF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.33.jpeg",
      "/events/ATF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(1).jpeg",
      "/events/ATF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(2).jpeg",
      "/events/ATF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(3).jpeg",
      "/events/ATF2025/WhatsApp%20Image%202026-07-03%20at%2012.24.34.jpeg"
    ]
  },
  {
    "id": "event-18",
    "title": "IMEX America, Las Vegas, USA, 2025",
    "images": [
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(1).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(2).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.34%20(3).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.34.jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(1).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(2).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(3).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(4).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(5).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(6).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(7).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(8).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35%20(9).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.35.jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.36%20(1).jpeg",
      "/events/IMEX%20Las%20Vegas%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.36.jpeg"
    ]
  },
  {
    "id": "event-20",
    "title": "IBTM World, Barcelona, Spain.",
    "images": [
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.36%20(1).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.36%20(2).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.36.jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.37%20(1).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.37%20(2).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.37%20(3).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.37%20(4).jpeg",
      "/events/IBTM%20Barcelona%202025/WhatsApp%20Image%202026-07-03%20at%2012.24.37.jpeg"
    ]
  },
  {
    "id": "event-21",
    "title": "Zakher Travel at ITB Asia Singapore tourism exhibition, 2024",
    "images": [
      "/events/singapure-exh-CppVIJgO.jpg"
    ]
  },
  {
    "id": "event-22",
    "title": "Zakher Travel participate at IMeX Frankfurt 2024 MICE exhibition Germany",
    "images": [
      "/events/germany-u367ra8D.jpg",
      "/events/germany1-yH3BSV8-.jpg",
      "/events/germany2-DIIcQpEu.jpg",
      "/events/germany4-BtBMhalP.jpg"
    ]
  },
  {
    "id": "event-23",
    "title": "(24.04.2024) Zakher Travel participated at tourism b2b workshop in Amman, Kingdom of Jordan",
    "description": "We were honored to represent our country and the company. Special thanks to: Mr. Majdi Al Yaqoub (Member of Parliament, Tourism and Antiquities Committee) H.E. Mr. Eldar Salimov (Ambassador of Azerbaijan to Jordan) Mr Ahmad Alhmoud (Marketing Director of Jordan Tourism Board)",
    "images": [
      "/events/jordan-C_jexKFs.jpg",
      "/events/12-3LLVgBBU.jpg"
    ]
  },
  {
    "id": "event-24",
    "title": "Tourism exhibition in Moscow, Russia 2025",
    "images": [
      "/events/moscow-BnFdqkKJ.jpg"
    ]
  },
  {
    "id": "event-25",
    "title": "Zakher Travel Georgia team at ITB Berlin tourism exhibition, 2024",
    "images": [
      "/events/georgia3-CtUX4ppS.jpg",
      "/events/georgia2-4-YnSe_1.jpg",
      "/events/georgia4-B6-VY0xJ.jpg",
      "/events/berlin-Lhqq_t4L.jpg"
    ]
  },
  {
    "id": "event-26",
    "title": "MITT Moscow, Russia, 2024",
    "images": [
      "/events/mitt-moscow-C2wzGMpd.jpeg"
    ]
  },
  {
    "id": "event-27",
    "title": "Arabian Travel Market (ATM), Dubai, UAE, 2024",
    "images": [
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.38%20(1).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.38.jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(1).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(2).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(3).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(4).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(5).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39%20(6).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.39.jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40%20(1).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40%20(2).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40%20(3).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40%20(4).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40%20(5).jpeg",
      "/events/ATM2024/WhatsApp%20Image%202026-07-03%20at%2012.24.40.jpeg"
    ]
  },
  {
    "id": "event-28",
    "title": "Qatar Travel Mart (QTM), Doha, Qatar.TTW, 2024",
    "images": [
      "/events/qatar_travel_mart_logo-CmEPJb-9.jpeg"
    ]
  },
  {
    "id": "event-29",
    "title": "TITF Tashkent, Uzbekistan, 2024",
    "images": [
      "/events/titf2024-fF7v07z8.png"
    ]
  },
  {
    "id": "event-30",
    "title": "Presentation of Azerbaijan's Tourism Potential, UAE, 2024",
    "images": [
      "/events/az-uae-GAdJd4n6.jpeg"
    ]
  },
  {
    "id": "event-31",
    "title": "COP 29, Baku, Azerbaijan",
    "images": [
      "/events/cop-DQLMkjPG.jpeg"
    ]
  },
  {
    "id": "event-32",
    "title": "Zakher Travel representatives met with Mr Maksat Usubalyev Vise president of Tourism Development Support Fund of the Kyrgyz Republic",
    "images": [
      "/events/kyrgyz1-pKhA2YWa.jpg",
      "/events/kyrgyz2-BQ8Q1duh.jpg"
    ],
    "video": "/events/kyrgyz4-DbMjz1CM.mp4"
  },
  {
    "id": "event-33",
    "title": "Mrs Saltanat Midin President of the Kyrgyz Association of Tour Organizations",
    "images": [
      "/events/13-eeWg2h3W.jpg",
      "/events/kyrgyz-asociat1-CBVGNMQL.jpg"
    ]
  },
  {
    "id": "event-34",
    "title": "UAE National Day, 2023",
    "images": [
      "/events/uae1-BFfWbrRD.jpg",
      "/events/uae2-IfetPNeO.jpg"
    ]
  },
  {
    "id": "event-35",
    "title": "Arabian Travel Market exhibition, Dubai, UAE 2023",
    "images": [
      "/events/dubai1-Pt2LhUnA.jpg",
      "/events/dubai2-BwpUEuzr.jpg"
    ]
  },
  {
    "id": "event-36",
    "title": "London WTM, London, United Kingdom 2023",
    "images": [
      "/events/london-ChGLPZS0.jpg"
    ]
  },
  {
    "id": "event-37",
    "title": "EMITT Turkiye, 12-15 April 2023, Istanbul, Turkey.2023",
    "images": [
      "/events/emitt-2023-DBNUJmgg.jpg"
    ]
  },
  {
    "id": "event-38",
    "title": "Arabian Travel Market (ATM), 1-4 May 2023, Dubai, UAE",
    "images": [
      "/events/atm2023-CcHviS2f.png"
    ]
  },
  {
    "id": "event-39",
    "title": "IBTM World, 28-30 November 2023, Barcelona, Spain.",
    "images": [
      "/events/ibtm-2023-BQFMr-WL.png"
    ]
  },
  {
    "id": "event-40",
    "title": "Kazakhstan International Tourism Exhibition (KITF), 20-22 April, Almaty, Kazakhstan, 2022",
    "images": [
      "/events/kazakh1-2dbvH6vO.jpg"
    ]
  },
  {
    "id": "event-41",
    "title": "Turkiye EMITT, 9-12 February, Buyukshehir, 2022",
    "images": [
      "/events/turkey6-DSoq9jgc.jpg"
    ]
  },
  {
    "id": "event-42",
    "title": "\"Arabian Travel Market 2022\"(ATM) in Dubai, the UAE 9-12 May 2022",
    "images": [
      "/events/atm-2022-CombVPh5.jpeg"
    ]
  },
  {
    "id": "event-43",
    "title": "\"Riyadh Travel Mart\" 22-24 May,2022, Saudi Arabia",
    "images": [
      "/events/Riyadh-Travel-Fair-2023-BH9Z-yF_.png"
    ]
  },
  {
    "id": "event-44",
    "title": "\"IMEX Frankfurt\" 31 May- 2 June,2022, Frankfurt, Germany",
    "images": [
      "/events/IMEX--9068-DVtf_ygC.jpeg"
    ]
  },
  {
    "id": "event-45",
    "title": "IMEX America, 11-13 October, Las Vegas, USA, 2022",
    "images": [
      "/events/america2022-D9BL4Vy5.jpg"
    ]
  },
  {
    "id": "event-46",
    "title": "World Travel Market (WTM) London, 7-9 November, London, UK, 2022",
    "images": [
      "/events/travelmart-DwL2d4ly.jpg"
    ]
  },
  {
    "id": "event-47",
    "title": "Arabian Travel Market (ATM), 16-19 May, Dubai, UAE, 2021",
    "images": [
      "/events/images-uae-DqHCrIBh.jpeg"
    ]
  },
  {
    "id": "event-48",
    "title": "IBM World Barcelona, 29 Nov - 2 Dec, Barcelona, Spain, 2021",
    "images": [
      "/events/IBTM-World-Barcelona-reveals-first-details-of-in-person-event-BXPnR1wt.jpg"
    ]
  },
  {
    "id": "event-49",
    "title": "Dubai, UAE.Riyadh Travel Fair (RTF), Riyadh, Saudi Arabia, 2019",
    "images": [
      "/events/arab2019-UFhaafac.png"
    ]
  },
  {
    "id": "event-50",
    "title": "\"Arabian Travel Market 2019\" (ATM) in Dubai, the UAE. 28 April - 1 May",
    "images": [
      "/events/atm-dubai-Bl27lMqW.jpg"
    ]
  },
  {
    "id": "event-51",
    "title": "Jeddah International Travel & Tourism Exhibition, 28 February – 2 March 2018, Jeddah, Saudi Arabia.",
    "images": [
      "/events/jttx-CnnGPpQj.jpg"
    ]
  },
  {
    "id": "event-52",
    "title": "Arabian Travel Market 2018, 22-25 April, Dubai, UAE",
    "images": [
      "/events/atm2018-BjaqSeuS.png"
    ]
  },
  {
    "id": "event-53",
    "title": "The 100th of Anniversary of the establishment of the Azerbaijan Democratic Republic 14 May, 2018, Abu Dhabi, United Arab Emirates",
    "images": [
      "/events/flag2018-BHhXT0xY.jpeg"
    ]
  },
  {
    "id": "event-54",
    "title": "Pakistan Travel Mart, 02-04 October 2018, Karachi, Pakistan",
    "images": [
      "/events/Pakistan-Travel-Mart-DWX2J8UU.jpg"
    ]
  },
  {
    "id": "event-55",
    "title": "Asia’s Leading Travel Trade Show, 17-19 October 2018, Marina Bay Sands, Singapore.",
    "images": [
      "/events/ITB-ASIA-2017-4-CSkg0F7G.jpg"
    ]
  },
  {
    "id": "event-56",
    "title": "SATTE (South Asia's Travel & Tourism Exchange), India, 2018",
    "images": [
      "/events/SATTE-2026_400x400-2Dbl7P2-.png"
    ]
  },
  {
    "id": "event-57",
    "title": "Arabian Travel Market 2017, 24-27 April, Dubai, UAE",
    "images": [
      "/events/atm-2019-DIhFrKip.jpg"
    ]
  },
  {
    "id": "event-58",
    "title": "25th Anniversary of the establishment of the diplomatic relations between the Azerbaijan Republic and the United Arab Emirates, Independence Day of Azerbaijan, 17 October 2017, Abu Dhabi, United Arab Emirates",
    "images": [
      "/events/flags-az-uae-DKj3jFz9.jpg"
    ]
  },
  {
    "id": "event-59",
    "title": "Independence Day of Azerbaijan, 17 October 2017, Abu Dhabi, United Arab Emirates",
    "images": [
      "/events/flag-azerbaijan-xL8YbwW8.jpg"
    ]
  }
] as const;
