/**
 * Individual tour pages per country, mirroring the structure of the live
 * Zakher Travel site (test.zakher.travel): country -> tours list -> tour detail.
 * All texts are carried over from the original tour pages.
 */

export type TourMetaItem = { label: string; value: string };
export type TourSection = { heading?: string; body: string };

export type TourDetail = {
  slug: string;
  title: string;
  /** Short line shown on the tour card in the country page. */
  excerpt: string;
  image: string;
  meta: TourMetaItem[];
  /** Economy / VIP transport package notes. */
  packages?: string[];
  inclusions?: string[];
  exclusions?: string[];
  sections: TourSection[];
  price?: string;
};

const PRIVATE_TOUR_INCLUSIONS = [
  "Pick-up & drop-off at your hotel (inside Baku)",
  "Personal English-speaking guide (standard package)",
  "Personal driver & air-conditioned vehicle",
];

const PRIVATE_TOUR_EXCLUSIONS = ["Any meals", "Personal expenses", "Insurance"];

const CAR_PACKAGES = [
  "Economy package: professional driver, personal comfortable transportation during tours (Mercedes Viano/Vito), and guide service.",
  "VIP package: a wide range of luxury cars (Mercedes S class, E class, V class, etc.).",
];

const JEEP_PACKAGE = [
  "Economy package: professional driver, personal comfortable transportation during tours (Jeep 4\u00d74), and guide service.",
];

const ZAKHER_SERVICES_SECTION: TourSection = {
  heading: "Tourism and travel-related services provided by Zakher agency",
  body: "Reservation of hotels at relevant prices; air ticket sales; professional guide-translators (male and female); transfer services; organization of tours for individuals, groups and families; organization of regional & city tours; hunting tours; shopping tours; photography tours; legal services; VIP services; visa-support services; and travel insurance.",
};

export const TOURS_BY_COUNTRY: Record<string, TourDetail[]> = {
  azerbaijan: [
    {
      slug: "golf-azerbaijan",
      title: "Zakher Travel \u2014 First Golf Agency in Azerbaijan",
      excerpt: "Golf holidays at The National Azerbaijan Golf Club and Dreamland Golf Club, with special packages from 500 USD.",
      image: "/tours/azerbaijan/golf-azerbaijan.webp",
      meta: [
        { label: "Category", value: "Golf packages" },
        { label: "Since", value: "2018" },
        { label: "Locations", value: "Guba & Baku" },
      ],
      sections: [
        {
          heading: "The National Azerbaijan Golf Club",
          body: "The National Azerbaijan Golf Club is located in the area of the Guba Palace Hotel in the north-west of Azerbaijan, sitting at the foot of the breathtaking Caucasus Mountains. Designed by Jon Hunt from International Golf Design, this was the first golf course to open in the \u201cland of fire.\u201d During the summer of 2014, less than two months after its official unveiling, it hosted the country\u2019s inaugural professional event \u2014 the Azerbaijan Challenge Open.\nA fully equipped clubhouse offers luxurious locker rooms, a professional shop, and a truly unique dining experience. Positioned within 75 hectares of idyllic Azerbaijani topography, the undulating fairways and deep bunkers create a lasting impression, while accessible landing zones and greens give a \u201clook hard, play easy\u201d feel. Distance from Baku to Guba: 168 km.",
        },
        {
          heading: "Dreamland Golf Club",
          body: "At Dreamland you will find everything about the Dye Course \u2014 from green fees and hire charges to hole-by-hole flyover videos. The luxury clubhouse is a place to eat, drink and socialize, with a golf shop, dress code, and the hole-in-one Roll of Honour. Dreamland is an IMG Golf club. Distance from Baku: 22 km.",
        },
        {
          heading: "Special Golf Package \u2014 3 nights in Guba (from 540 USD per pax)",
          body: "Guba Palace Hotel 5*, Deluxe King room with mountain view.\nIncludes: 3 nights accommodation in Guba, buffet breakfast, 3 rounds of golf at The National Golf Club Guba, private car with driver, golf car, Guba city tour, Shahdag or Khinalig Village tour, all transfers (Baku\u2013Guba\u2013Baku), and all taxes.",
        },
        {
          heading: "Special Golf Package \u2014 3 nights in Baku (from 800 USD for 2 pax)",
          body: "Accommodation: Fairmont Hotel 5* (Deluxe King City View), Dreamland Hotel 4*, or Mercure Baku City Hotel 5* (from 500 USD per pax).\nProgram: Day 1 \u2014 transfer to hotel; Day 2 \u2014 Baku city tour; Day 3 \u2014 1 round of golf at Dreamland Golf Club and Absheron tour; Day 4 \u2014 transfer to airport.\nIncludes: 3 nights accommodation, buffet breakfast, 1 round of golf, private car with driver, golf car, Baku city tour, Absheron tour, all transfers and taxes.\nNot included: flight tickets, visa, meals and drinks, personal expenditures, guide.",
        },
        {
          heading: "Special Golf Package \u2014 7 nights in Azerbaijan (from 1600 USD for 2 pax)",
          body: "Accommodation: Guba Palace Hotel 5* and Fairmont Hotel 5* (or Dreamland Hotel 4* / Mercure Baku City Hotel 5*).\nProgram: Day 1 \u2014 transfer and 1 round of golf at The National Golf Club Guba; Day 2 \u2014 golf and Guba city tour; Day 3 \u2014 golf and Shahdag or Khinalig Village tour; Day 4 \u2014 return to Baku; Day 5 \u2014 Baku city tour; Day 6 \u2014 1 round of golf at Dreamland Golf Club; Day 7 \u2014 Absheron tour; Day 8 \u2014 transfer to airport.\nIncludes: 3 nights in Guba + 4 nights in Baku, buffet breakfast, 4 rounds of golf (3 in Guba, 1 in Baku), city tours, private car with driver, golf car, all transfers and taxes.\nNot included: flight tickets, visa, meals and drinks, personal expenditures, guide.",
        },
        {
          heading: "Reservation",
          body: "For reservation please contact us: info@zakher.travel, +994 50 253 22 00.",
        },
      ],
      price: "From 500 USD",
    },
    {
      slug: "north-gates-tour",
      title: "\u201cThe North Gates\u201d Tour \u2014 Gusar + Shahdag + Laza",
      excerpt: "Full-day trip to the north of Azerbaijan: Beshbarmag Mountain, Shahdag resort, and the waterfalls of Laza.",
      image: "/tours/azerbaijan/north-gates-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (10\u201312 hrs)" },
        { label: "Route", value: "\u2248220 km one way" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Gusar \u2013 Shahdag \u2013 Laza \u2013 Baku",
          body: "09:30 \u2014 departure from Baku to Gusar with a stop near Beshbarmag Mountain. On the way you will see the arched bridge across the Gudiyalchay river and the Red Village in Guba district, home to one of the largest communities of Mountain Jews in the world.\n13:00\u201314:00 \u2014 dinner at a local restaurant (for extra payment).\n15:00 \u2014 arrival at the summer & winter touristic complex Shahdag.\n16:00 \u2014 trip to Laza, an exotic area with a large number of waterfalls and an opportunity for horse riding.\n17:00\u201320:00 \u2014 departure to Baku.",
        },
        {
          heading: "Gusar",
          body: "Gusar is the last major settlement in the north of Azerbaijan, called \u201cThe North Gates\u201d as it borders the Republic of Dagestan. The population consists of Lezgins \u2014 an original nationality with a rich culture known for hospitality. Four of the nine climatic zones are found in Gusar. The region is famous for the Shahdag summer\u2013winter complex, operating all year round: a popular ski resort in winter and a camp site on the slopes of the Greater Caucasus in summer. Part of the territory belongs to Shahdag National Park \u2014 the largest in Azerbaijan. Historical monuments include the fortress walls in Enih village (13th century), the 1544 tomb of Sheikh Juneyd, and the 18th-century mosques of Kohne Khudat and Khuray. The folklore ensemble \u201cLezginka\u201d keeps alive the famous Caucasian dance of the same name.",
        },
        {
          heading: "Laza",
          body: "Laza village lies on the north-east outskirts of the Main Caucasian Ridge, at the foot of the \u201cShah Yaylag\u201d plateau and the 4,242 m Shahdag peak, at an altitude of 1,300 m on an ancient caravan route. Its population consists mostly of ethnic Lezgins whose history is closely connected with Caucasian Albania, one of the most ancient states on the territory of Azerbaijan. In winter most of the waterfalls freeze and climbing competitions are organized on the frozen falls.",
        },
      ],
    },
    {
      slug: "absheron-tour",
      title: "Absheron Tour",
      excerpt: "Ateshgah fire temple, the burning mountain Yanardag, and the Gala open-air museum in 3 hours.",
      image: "/tours/azerbaijan/absheron-tour.webp",
      meta: [
        { label: "Duration", value: "3 hours" },
        { label: "Category", value: "Private tour" },
        { label: "Pick-up", value: "Your hotel (within Baku)" },
        { label: "Language", value: "English (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Absheron \u2013 Ateshgah \u2013 Yanar Dag \u2013 Gala",
          body: "Indulge in an independent tour with a private driver. Your personal guide will help you design the perfect itinerary, escorting you to the attractions of the Absheron peninsula and offering insider tips on where to go and what to see. Request stops to snap photos, grab a souvenir, or take a stroll around your favorite spots.",
        },
        {
          heading: "Highlights",
          body: "Heydar Aliyev Center \u2014 the 619,000-square-foot complex designed by architect Zaha Hadid.\nAteshgah Temple \u2014 the Temple of Eternal Fire.\nYanardag \u2014 the eternally burning mountain.\n\u201cGala\u201d Archaeological and Ethnographic Museum Complex \u2014 an outdoor museum.\nBina Equestrian Center \u2014 home of the Karabakh horse, a mountain-steppe racing and riding breed found only in Azerbaijan.\nHeydar Mosque \u2014 the biggest mosque in the Caucasus.",
        },
      ],
    },
    {
      slug: "baku-night-tour",
      title: "Baku Night Tour",
      excerpt: "Panoramic Baku by night: Highland Park, Flame Towers, the boulevard, and Fountain Square.",
      image: "/tours/azerbaijan/baku-night-tour.webp",
      meta: [
        { label: "Duration", value: "2 hours" },
        { label: "Category", value: "Private tour" },
        { label: "Pick-up", value: "Your hotel (within Baku)" },
        { label: "Language", value: "English (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "About the tour",
          body: "Spend an independent night tour of Baku with a private driver and guide. Your personal guide will help you design the perfect 2-hour itinerary, escorting you to Baku attractions and offering insider tips on where to go and what to see in the capital. Visit the main attractions and request stops to snap photos, grab a souvenir, or take a stroll around your favorite spots.",
        },
        {
          heading: "Highlights",
          body: "Highland Park \u2014 panoramic view of Baku Bay from the highest point of the city.\nNational Flag Square \u2014 one of the highest flags in the world.\nFlame Towers \u2014 the trio of skyscrapers that defines Baku\u2019s skyline.\nThe Funicular \u2014 Baku\u2019s modernized funicular system.\nCarpet Museum \u2014 the State Museum of Azerbaijani Carpets and Applied Arts.\nBaku Boulevard (Seaside Park) \u2014 the promenade along Baku\u2019s seafront.\nLittle Venice \u2014 the water park in Baku.\nGovernment House, the State Philharmonic Hall, and Fountain Square \u2014 the most famous street of Baku.",
        },
      ],
    },
    {
      slug: "jeep-safari-1",
      title: "Extreme Jeep Safari 1",
      excerpt: "Off-road 4\u00d74 adventure to the Kyanizadag volcano and the Gobustan petroglyphs.",
      image: "/tours/azerbaijan/jeep-safari-1.webp",
      meta: [
        { label: "Duration", value: "5\u20136 hours" },
        { label: "Route", value: "\u224865 km one way" },
        { label: "Season", value: "March\u2013October" },
        { label: "Category", value: "Private tour, Jeep 4\u00d74" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: JEEP_PACKAGE,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Sangachal \u2013 Kyanizadag volcano \u2013 Boyukdash \u2013 Baku",
          body: "Museum of Petroglyphs (outdoor museum) \u2014 Gobustan is located approximately 65 km from Baku. Prehistoric rock drawings \u2014 petroglyphs \u2014 are an art \u201carchive\u201d of human evolution on Earth. The largest such outdoor archive in Azerbaijan is in Gobustan, at the Baku State Reserve of History, Ethnography and Arts, near the Caspian Sea on the ancient Shirvan road. In the mountains of Beyukdash, Kichikdash, Djingirdag and Shighgaya are concentrated rock paintings, ancient camps, and tombstones from the Stone Age onward, reflecting the culture, economy, worldview, customs, and traditions of the ancient peoples of Azerbaijan.",
        },
        {
          heading: "Trip to the Mud Volcanoes",
          body: "By the number of mud volcanoes Azerbaijan takes first place in the world: approximately 350 of the 800 existing mud volcanoes are found here, most of them concentrated in the Gobustan region.",
        },
      ],
    },
    {
      slug: "jeep-safari-2",
      title: "Extreme Jeep Safari 2",
      excerpt: "The long 9-hour off-road route across the Dolangaz and Kyanizadag volcanoes.",
      image: "/tours/azerbaijan/jeep-safari-2.webp",
      meta: [
        { label: "Duration", value: "9 hours" },
        { label: "Route", value: "\u224870 km one way" },
        { label: "Season", value: "March\u2013October" },
        { label: "Category", value: "Private tour, Jeep 4\u00d74" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: JEEP_PACKAGE,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading:
            "Itinerary: Baku \u2013 Dolangaz volcano \u2013 Gyorgyachin \u2013 Boyukdash \u2013 Kyanizadag \u2013 Jingirdag \u2013 Baku",
          body: "Museum of Petroglyphs (outdoor museum) \u2014 Gobustan is located approximately 65 km from Baku. Prehistoric rock drawings \u2014 petroglyphs \u2014 are an art \u201carchive\u201d of human evolution on Earth. In the mountains of Beyukdash, Kichikdash, Djingirdag and Shighgaya are concentrated rock paintings, ancient camps, and tombstones from the Stone Age onward.",
        },
        {
          heading: "Active Mud Volcanoes of the Dashgil Group",
          body: "East of the Gobustan museum lies the group of active Dashgil volcanoes. You will climb to the very crater of the mud volcanoes and watch the gurgling liquid clay. The scenery makes you feel like you are on Mars \u2014 scientists draw this analogy because the Gobustan surface is remarkably similar to the Martian one.",
        },
      ],
    },
    {
      slug: "sheki-tour",
      title: "Tour to Sheki \u2014 Ancient Khanate",
      excerpt: "The Khan's Palace built without nails, the Kish Albanian temple, and mountain caravanserais.",
      image: "/tours/azerbaijan/sheki-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (12\u201313 hrs)" },
        { label: "Route", value: "\u2248320 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: [
        ...PRIVATE_TOUR_INCLUSIONS,
        "Visiting the following places of interest: Diri Baba Mausoleum, Juma Mosque, Lahij village",
      ],
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Shemakha \u2013 Ismayilli \u2013 Gabala \u2013 Oguz \u2013 Sheki \u2013 Baku",
          body: "Sheki is an ancient historical city in the southern foothills of the Greater Caucasus, 300 km north-west of Baku. Archaeological evidence suggests Sheki is one of the oldest settlements in the Caucasus, with findings dating back more than 2,500 years.",
        },
        {
          heading: "Sheki",
          body: "Many historical monuments are preserved in their original form. The main sight is the majestic Sheki Khan\u2019s Palace with its magnificent wall paintings, constructed in the 18th century without using a single nail. Other popular places: the ancient Albanian temple in Kish settlement, Gelersen-Gerersen fortress (8th\u20139th centuries), numerous caravanserais, the house of Sheki Khans, Juma Mosque (18th century), the minaret of the Gileili mosque, medieval baths, the theater, the historical museum, and the house-museum of writer M. F. Akhundov.",
        },
        {
          heading: "Optional places to visit",
          body: "Diri Baba Mausoleum, Juma Mosque in Shemakha, the ancient city of Kabalaka, the Tufandag summer\u2013winter complex, Nij village with its ancient Albanian temple, Nohur Lake, the Palace of Sheki Khans, and the caravanserai.",
        },
      ],
    },
    {
      slug: "gobustan-jeep-safari",
      title: "Jeep Safari in the Gobustan Reserve",
      excerpt: "4\u00d74 route through the Dashgil volcano and the prehistoric rock art of Gobustan.",
      image: "/tours/azerbaijan/gobustan-jeep-safari.webp",
      meta: [
        { label: "Duration", value: "5\u20136 hours" },
        { label: "Route", value: "\u224865 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour, Jeep 4\u00d74" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: JEEP_PACKAGE,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Alat \u2013 Dashgil volcano \u2013 Kichik Dash \u2013 Boyukdash \u2013 Baku",
          body: "Museum of Petroglyphs (outdoor museum) \u2014 Gobustan is located approximately 65 km from Baku. Prehistoric rock drawings \u2014 petroglyphs \u2014 are an art \u201carchive\u201d of human evolution on Earth. The largest such archive is at the Baku State Reserve of History, Ethnography and Arts, a rocky massif at the southeast end of the Great Caucasus Range near the Caspian Sea.",
        },
        {
          heading: "Mud volcanoes and the Dashgil group",
          body: "Azerbaijan holds first place in the world by the number of mud volcanoes \u2014 about 350 of the existing 800, mostly in the Gobustan region. You will get very close to the active Dashgil group, climb to the craters, and watch the gurgling liquid clay \u2014 landscapes so unearthly that they are compared to the surface of Mars.",
        },
      ],
    },
    {
      slug: "gobustan-jeep-safari-extreme",
      title: "Jeep Safari on the Gobustan Reserve + Extreme",
      excerpt: "The extended 9-hour extreme version with the ascent to the Kyanizadag volcano.",
      image: "/tours/azerbaijan/gobustan-jeep-safari-extreme.webp",
      meta: [
        { label: "Duration", value: "9 hours" },
        { label: "Route", value: "\u224870 km one way" },
        { label: "Season", value: "March\u2013October" },
        { label: "Category", value: "Private tour, Jeep 4\u00d74" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: JEEP_PACKAGE,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading:
            "Itinerary: Baku \u2013 Alat \u2013 Dashgil volcano \u2013 Kichik Dash \u2013 Boyukdash \u2013 Kyanizadag ascent \u2013 Jingirdag \u2013 Baku",
          body: "Visit the Gobustan Museum of Petroglyphs \u2014 prehistoric rock drawings carved on the walls of caves, rocks, and stone blocks in the Beyukdash, Kichikdash, Djingirdag and Shighgaya mountains \u2014 reflecting the culture, economy, worldview, customs, and traditions of the ancient peoples of Azerbaijan.",
        },
        {
          heading: "Trip to the Mud Volcanoes",
          body: "About 350 of the world\u2019s 800 mud volcanoes are found in Azerbaijan, most of them concentrated in the Gobustan region. The extreme route adds the ascent to the Kyanizadag volcano for the most adventurous travelers.",
        },
      ],
    },
    {
      slug: "gobustan-mud-volcano-tour",
      title: "Museum Gobustan and Mud Volcanoes Tour",
      excerpt: "UNESCO-listed rock art and the bubbling mud volcanoes in a comfortable 5-hour trip.",
      image: "/tours/azerbaijan/gobustan-mud-volcano-tour.webp",
      meta: [
        { label: "Duration", value: "5 hours" },
        { label: "Route", value: "\u224865 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour, Jeep 4\u00d74" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: JEEP_PACKAGE,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Gobustan \u2013 Mud Volcanoes \u2013 Baku",
          body: "The Gobustan Museum of Petroglyphs is located approximately 65 km from Baku. Prehistoric rock drawings \u2014 petroglyphs \u2014 are an art \u201carchive\u201d of human evolution. In the mountains of Beyukdash, Kichikdash, Djingirdag and Shighgaya are rock paintings, ancient camps, and tombstones from the Stone Age onward, reflecting the culture and traditions of ancient Azerbaijan.",
        },
        {
          heading: "Trip to the Mud Volcanoes",
          body: "By the number of mud volcanoes Azerbaijan takes first place in the world: approximately 350 of the existing 800 are found here, most of them concentrated in the Gobustan region.",
        },
      ],
    },
    {
      slug: "old-city-excursion",
      title: "Old City Excursion (Walking Tour)",
      excerpt: "Maiden Tower, Shirvanshah's Palace, and medieval caravanserais of Icheri Sheher on foot.",
      image: "/tours/azerbaijan/old-city-excursion.webp",
      meta: [
        { label: "Duration", value: "2.5 hours" },
        { label: "Category", value: "Private walking tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Old City \u2014 Icheri Sheher",
          body: "Understanding the development of medieval Icheri Sheher and urban life in Baku is key to understanding the current economic, material, and moral culture of present-day Azerbaijan.",
        },
        {
          heading: "Highlights",
          body: "Maiden Tower \u2014 the symbol of Baku in the southeastern part of Icheri Sheher.\nJuma Mosque (12th century) \u2014 a center of the social, political, and cultural life of medieval Azerbaijan.\nOld caravanserais \u2014 the 14th-century Multani Caravanserai on Qulle Street and the Bukhara Caravanserai opposite, shelters for merchants on the caravan routes.\nBathhouses \u2014 half-underground hammams, warm in winter and cool in summer.\nKhanegahs \u2014 dwellings of the Sufis along the trade routes.\nShirvanshah\u2019s Palace (12th\u201315th century) \u2014 the last residence of the rulers of Shirvan, built after the capital moved to Baku following the 1191 earthquake.\nMuseum of Miniature Books \u2014 4,350 miniature books from 62 countries on display.\nThe Mugham Theatre \u2014 a 15th-century two-floored caravanserai with an octagonal courtyard.\nFountain Square, the National History Museum, a sea trip along Baku Bay, and Baku\u2019s largest shopping malls.",
        },
      ],
    },
    {
      slug: "azerbaijani-cuisine-tour",
      title: "Tastes and Flavors of Azerbaijani Cuisine",
      excerpt: "A gastronomic journey: tandir breakfast, the eastern bazaar, sturgeon kebab, and shah-plov.",
      image: "/tours/azerbaijan/azerbaijani-cuisine-tour.webp",
      meta: [
        { label: "Duration", value: "5 hours" },
        { label: "Category", value: "Private tour" },
        { label: "Pick-up", value: "Your hotel (within Baku)" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "About the tour",
          body: "Spend a day like a real Baku citizen and try the best dishes in authentic restaurants. This excursion opens the world of the richest Azerbaijani cuisine: a gastronomic journey through the Old City, the colorful Baku bazaar, and the coast of the Caspian Sea. In one day you will learn new shades of flavors and try local delicacies \u2014 the most delicious lamb and sturgeon, fragrant wines, countless spices, and dried fruits.",
        },
        {
          heading: "Program",
          body: "Breakfast in the Old Town \u2014 rustic butter, cheese, honey, hot cakes freshly baked in tandir, tea or coffee.\nThe eastern bazaar \u2014 one of the oldest Baku bazaars: the specifics of Azerbaijani cuisine, its main ingredients and spices; taste and buy spices, dried fruits, fresh Caspian black caviar, and exclusive Azerbaijani teas.\nLunch \u2014 shish kebab from freshly caught sturgeon or lamb, shah-plov, and other traditional dishes at a traditional restaurant.\nAuthentic dishes and secret recipes \u2014 a stroll through the iconic sights of the Old Town with tea or wine tasting.\nOrganizational details \u2014 food and drinks are paid separately; transportation is included. Tell us your culinary preferences in advance.",
        },
      ],
    },
    {
      slug: "gabala-tour",
      title: "Tour to Gabala \u2014 the Capital of Caucasian Albania",
      excerpt: "Ancient Kabalaka, the Tufandag ropeway, Nohur Lake, and the Seven Beauties waterfall.",
      image: "/tours/azerbaijan/gabala-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (10\u201311 hrs)" },
        { label: "Route", value: "\u2248220 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Shamakhi \u2013 Gabala \u2013 Baku",
          body: "Gabala is a unique and beautiful region on the bank of the Demiraparanchay River, overlooking the highest peak of Azerbaijan \u2014 Bazardyuzyu (4,466 m). The main sight is the ruins of an ancient town 15 km from the city center: \u201cKabalaka,\u201d mentioned in 1st-century historical sources and for 600 years the capital of Caucasian Albania.",
        },
        {
          heading: "Places of interest",
          body: "The ancient village of Nij with its Albanian temple (4th\u20137th centuries) \u2014 homeland of the Azerbaijani-Udi ethnic group, descendants of the Caucasian Albanians; the ancient defensive tower (9th\u201311th centuries); and Ustajan Tower (9th\u201314th centuries). Modern hotel and resort infrastructure serves the most demanding travelers, and every summer Gabala hosts international music festivals.",
        },
        {
          heading: "Optional places to visit",
          body: "The ancient town of Kabalaka, Gabala Land entertainment center, the Tufandag summer\u2013winter touristic complex, the ropeway, Nij village and its Albanian temple, Gabala Shooting Center, Nohur Lake, and the \u201cSeven Beauties\u201d waterfall.",
        },
      ],
    },
    {
      slug: "khinalig-tour",
      title: "Tour to Khinalig \u2014 2,200 Meters Above Sea Level",
      excerpt: "The 5,000-year-old mountain village of Noah's descendants, via Guba and the Caucasus gorges.",
      image: "/tours/azerbaijan/khinalig-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (10\u201312 hrs)" },
        { label: "Route", value: "\u2248220 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Guba \u2013 Khinalig \u2013 Baku",
          body: "Khinalig is the oldest settlement in Azerbaijan, on the northern slope of the Main Caucasian Ridge at an altitude of 2,100\u20132,200 m. Its residents consider themselves direct descendants of the biblical Noah, and the village\u2019s history goes back more than 5,000 years. For centuries it was cut off from civilization by hard-to-reach mountains with dangerous rocky cliffs.",
        },
        {
          heading: "Khinalig",
          body: "Today there are about 380 houses, 200\u2013300 years old, built so closely on the steep slopes that the roof of one house serves as the patio of the one above. The inhabitants have retained their traditional way of life, culture, and original language.",
        },
        {
          heading: "Guba",
          body: "Guba district is a favorite destination 168 km from Baku: the shady Gechresh forest, Tangaalti gorge, the Velvelichay river, and the famous Afurdja waterfall, listed among the \u201cNature Monuments of Azerbaijan.\u201d The Red Village here is home to one of the largest communities of Mountain Jews in the world. Guba is famous for its apples and is a recognized carpet-weaving center; it was visited by Alexandre Dumas, Bestuzhev-Marlinsky, and Thor Heyerdahl.",
        },
      ],
    },
    {
      slug: "quba-tour",
      title: "Tour to the North \u2014 Forests and Mountains of Quba",
      excerpt: "Apple orchards, the Red Town, mountain waterfalls, and the Shahdag complex in one day.",
      image: "/tours/azerbaijan/quba-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (10\u201312 hrs)" },
        { label: "Route", value: "\u2248220 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Program",
          body: "09:30 \u2014 departure from Baku to Guba with a stop near Beshbarmag Mountain; the arched bridge across the Gudiyalchay river and the Red Village on the way.\n13:00\u201314:00 \u2014 dinner at a local restaurant (extra payment).\n15:00 \u2014 arrival at the Shahdag summer & winter touristic complex.\n16:00 \u2014 trip to Laza, an exotic area with many waterfalls and horse-riding opportunities.\n17:00\u201320:00 \u2014 departure to Baku.",
        },
        {
          heading: "Guba",
          body: "Famous for apples and carpet-making, Guba is one of the major and oldest cities of Azerbaijan, 165 km north of Baku, with unique nature, a pleasant climate, and gorgeous air. It is a popular getaway and the gateway to Azerbaijan\u2019s most interesting remote mountain villages.",
        },
        {
          heading: "Places of interest",
          body: "Guba fruit gardens fed by crystal-clear melt water; presentation of the national sweet \u201cBukme\u201d; the fabled village of Khinalig; Chanlibel Lake \u2014 one of the most beautiful lakes of Azerbaijan; the Guba Genocide Memorial Complex; Qechresh Forest with its natural springs; the \u201cNazli Bulag\u201d spring; the \u201cMest Dergah\u201d waterfall with wooden cottages; the Red Town \u2014 primary settlement of Mountain Jews (about 4,000 people); the Guba carpet workshop; Azerbaijan National Golf Club \u2014 the first golf course of the \u201cland of fire\u201d; Guba bazaar; the Guba sweet factory; and the Shahdag Tourism Complex with cable car rides and skiing.",
        },
      ],
    },
    {
      slug: "lahij-tour",
      title: "Tour to the Village of Artisans \u2014 Lahij",
      excerpt: "Medieval coppersmiths' town with cobbled streets, via the ancient capital Shemakha.",
      image: "/tours/azerbaijan/lahij-tour.webp",
      meta: [
        { label: "Duration", value: "1 day (9\u201310 hrs)" },
        { label: "Route", value: "\u2248180 km one way" },
        { label: "Season", value: "All season" },
        { label: "Category", value: "Private tour" },
        { label: "Language", value: "English, Arabic (others on request)" },
      ],
      packages: CAR_PACKAGES,
      inclusions: PRIVATE_TOUR_INCLUSIONS,
      exclusions: PRIVATE_TOUR_EXCLUSIONS,
      sections: [
        {
          heading: "Itinerary: Baku \u2013 Shemakha \u2013 Lahij \u2013 Baku",
          body: "Shemakha is an ancient capital of Azerbaijan, founded in the 5th century BC. In the 9th\u201316th centuries it was the capital of the Shirvan khanate, residence of the Shirvanshahs, and one of the most beautiful cities of the East. The main sight is the 11th\u201312th-century Gulistan fortress; also the Seven Domes (Yeddi Gumbez) mausoleum, the 10th-century Juma Mosque \u2014 the oldest in the Caucasus after Derbent \u2014 and ruins from the 10th\u201317th centuries. Today Shemakha is a winemaking and carpet-weaving center and the hometown of many Azerbaijani poets.",
        },
        {
          heading: "Lahij",
          body: "The high-altitude village of Lahij in Ismayilli region is an original monument of ancient architecture, founded in the 3rd\u20134th century BC. In this medieval town, famous far beyond the Caucasus, cobbled streets and ancient squares are preserved in their original form. Here you will find copper, leather, and wood articles, peculiar samples of cold steel, and many workshops where hereditary blacksmiths still create household items \u2014 you can watch the process and buy freshly made goods. Remarkably, the water and sewage system was built more than 1,500 years ago, and no one knows where it starts, where it ends, or how it works.",
        },
      ],
    },
  ],

  turkiye: [
    {
      slug: "istanbul-tour",
      title: "Istanbul Tour",
      excerpt: "Hagia Sophia, Topkapi Palace, the Blue Mosque, and a Bosphorus cruise.",
      image: "/tours/turkiye/istanbul-tour.webp",
      meta: [
        { label: "City", value: "Istanbul" },
        { label: "Category", value: "City tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Hagia Sophia\nTopkapi Palace and the Basilica Cistern\nSultanahmet Square & the Blue Mosque\nGrand Palace Mosaics Museum\nMuseum of Turkish & Islamic Arts\nIstanbul Archaeology Museums\nDolmabahce Palace\nTaksim and Istiklal Street\nGalata Tower and Sirkeci\nBosphorus cruise\nCemberlitas",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "istanbul-shopping-tour",
      title: "Istanbul Shopping Tour",
      excerpt: "From the Grand Bazaar to Istinye Park: the full shopping map of Istanbul.",
      image: "/tours/turkiye/istanbul-shopping-tour.webp",
      meta: [
        { label: "City", value: "Istanbul" },
        { label: "Category", value: "Shopping tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Spice Bazaar and Grand Bazaar\nIstanbul Cevahir mall\nZorlu Center and Istinye Park (luxury brands)\nMall of Istanbul and Via/Port outlet (with options for kids)\nEmaar Square (skyview, aquarium, luxury brands)\nVadistanbul and Venezia Mega Outlet\nAqua Florya (the biggest aquarium)\nKanyon, Palladium, and Buyaka malls\nVialand theme park attractions",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "sapanca-tour",
      title: "Sapanca Tour",
      excerpt: "Sapanca Lake, the Kartepe snow hill, and waterfalls near Istanbul.",
      image: "/tours/turkiye/sapanca-tour.webp",
      meta: [
        { label: "Region", value: "Sapanca / Kartepe" },
        { label: "Category", value: "Nature tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Sapanca Lake\nOrganic house visit\nKartepe (snow hill)\nWaterfalls",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "bursa-tour",
      title: "Bursa Tour",
      excerpt: "Uludag cable car, the Grand Mosque, silk market, and a 600-year-old Turkish bath.",
      image: "/tours/turkiye/bursa-tour.webp",
      meta: [
        { label: "City", value: "Bursa" },
        { label: "Category", value: "City tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Bursa Ulu Camii (Grand Mosque)\nCable car (teleferik) up Uludag mountain\nTurkish delight manufacturing\nHoney manufacturing\nJam and preserves manufacturing\nThe silk market\nA 600-year-old antique Turkish bath\nZoopark",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "trabzon-rize-tour",
      title: "Trabzon & Rize Tour",
      excerpt: "Uzungol lake, tea factories, the Sumela Monastery, and the Elevit plateau.",
      image: "/tours/turkiye/trabzon-rize-tour.webp",
      meta: [
        { label: "Region", value: "Trabzon / Rize" },
        { label: "Category", value: "Nature tour" },
      ],
      sections: [
        {
          heading: "Trabzon program",
          body: "Uzungol tour\nTea factory visit\nYapay waterfalls\nHidir Nebi tour\nFirtina Valley and Ayder tour\nSera Lake tour\nSumela Monastery",
        },
        {
          heading: "Rize program",
          body: "Agaran waterfall\nElevit plateau\nZil Polovit castle",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "antalya-tour",
      title: "Antalya Tour",
      excerpt: "The Land of Legends, Duden waterfall, Pamukkale, diving, and rafting.",
      image: "/tours/turkiye/antalya-tour.webp",
      meta: [
        { label: "City", value: "Antalya" },
        { label: "Category", value: "Resort tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "The Land of Legends theme park\nDuden Waterfall\nAntalya cable car\nPamukkale\nAntalya diving\nAntalya river rafting",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
  ],

  georgia: [
    {
      slug: "tbilisi-tour",
      title: "Tbilisi Tour",
      excerpt: "Old city, Narikala fortress by cable car, sulfur baths, and the Chronicles of Georgia.",
      image: "/tours/georgia/tbilisi-tour.webp",
      meta: [
        { label: "City", value: "Tbilisi" },
        { label: "Recommended", value: "1 night / 2 days" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Tbilisi old city tour: the Bridge of Peace, Rike Park, cable car trip to Narikala fortress, Mother of Georgia, Jumma Mosque, the sulfur baths district, Leghvtakhevi waterfall, and Mtatsminda amusement park.\nTbilisi shopping tour: East Point Shopping Mall, Tbilisi City Mall, and Galleria Mall.\nTbilisi lakes tour: Lisi Lake and Turtle Lake.\nThe Chronicles of Georgia.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "batumi-tour",
      title: "Batumi Tour",
      excerpt: "The Black Sea boulevard, Ali & Nino, Piazza Square, and the botanical garden.",
      image: "/tours/georgia/batumi-tour.webp",
      meta: [
        { label: "City", value: "Batumi" },
        { label: "Recommended", value: "3 nights / 4 days" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Batumi Drama Theater, the Neptune monument, the astronomic clock, and Medea monument square.\nThe Armenian church, Saint Nicholas Church, Piazza Square, and \u201cOrta Jame\u201d Mosque.\nBatumi sea port, the moving sculpture Ali & Nino, the old and new boulevards, Mtirala National Park, and the Botanical Garden of Batumi.\nMakhuntseti waterfall, Machakhela National Park, and the Dendrological Park.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "gudauri-kazbegi-tour",
      title: "Gudauri & Kazbegi Tour",
      excerpt: "The Caucasus high road: Ananuri fortress, Gudauri, and Gergeti Trinity Church by 4\u00d74.",
      image: "/tours/georgia/gudauri-kazbegi-tour.webp",
      meta: [
        { label: "Region", value: "Gudauri / Kazbegi" },
        { label: "Recommended", value: "1 night / 2 days" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Gudauri tour in the Caucasus Mountains: the Zhinvali water reservoir, Ananuri Fortress, and the Gudauri viewpoint.\nKazbegi tour: drive up Kazbegi Mountain by 4\u00d74, visit Gergeti Trinity Church, and Juta.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "borjomi-bakuriani-tour",
      title: "Borjomi & Bakuriani Tour",
      excerpt: "Mineral springs, the Uplistsikhe cave town, Rabati Castle, and the Bakuriani ski resort.",
      image: "/tours/georgia/borjomi-bakuriani-tour.webp",
      meta: [
        { label: "Region", value: "Borjomi / Bakuriani" },
        { label: "Category", value: "Nature & history" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Borjomi tour and the mineral (central) park.\nUplistsikhe cave town.\nRabati Castle tour.\nVardzia cave resort.\nBakuriani tour (ski resort).",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "kakheti-tour",
      title: "Kakheti Tour",
      excerpt: "Sighnaghi — the city of Love — Bodbe monastery, and the wineries of Kakheti.",
      image: "/tours/georgia/kakheti-tour.webp",
      meta: [
        { label: "Region", value: "Kakheti" },
        { label: "Category", value: "Wine & culture" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Sighnaghi city tour \u2014 the \u201ccity of Love.\u201d\nBodbe monastery.\nTsinandali estate and the Khareba winery.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "dashbashi-tour",
      title: "Dashbashi Tour",
      excerpt: "Tsalka canyon, the Dashbashi waterfall, and the glass Diamond Bridge.",
      image: "/tours/georgia/dashbashi-tour.webp",
      meta: [
        { label: "Region", value: "Tsalka / Dashbashi" },
        { label: "Category", value: "Nature tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Tsalka waterfall.\nTsalka and Dashbashi villages.\nThe Diamond Bridge over the Dashbashi canyon.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "kutaisi-tour",
      title: "Kutaisi Tour",
      excerpt: "Prometheus Cave, the Sataplia reserve, and Martvili Canyon.",
      image: "/tours/georgia/kutaisi-tour.webp",
      meta: [
        { label: "City", value: "Kutaisi" },
        { label: "Category", value: "Nature & city tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Kutaisi city tour.\nPrometheus Cave and the Sataplia nature reserve.\nMartvili Canyon tour.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
  ],

  uae: [],

  kazakhstan: [
    {
      slug: "almaty-tour",
      title: "Kazakhstan \u2014 Almaty Tour",
      excerpt: "7-day program: Big Almaty Lake, Shymbulak, Medeu, Kok-Tobe, and Issyk Lake.",
      image: "/tours/kazakhstan/almaty-tour.webp",
      meta: [
        { label: "Duration", value: "7 days" },
        { label: "City", value: "Almaty" },
        { label: "Category", value: "Group / family tour" },
      ],
      sections: [
        {
          heading: "Day 1 \u2014 Arrival & city tour",
          body: "Transfer from Almaty International Airport to the hotel and rest. Almaty city tour: Arbat Street (downtown), President Park, and a national night with dinner at the Alasha restaurant.",
        },
        {
          heading: "Day 2 \u2014 Big Almaty Lake",
          body: "Ile-Alatau National Park, Alma-Arasan village, the Big Almatinka\u2013Prokhodnaya river and spring, Zailiyskiy Alatau Mountain, Big Almaty Lake, lunch at Alpen Rose Resort, and a birds show (starting 17:00).",
        },
        {
          heading: "Day 3 \u2014 Shymbulak & Medeu",
          body: "Shymbulak ski complex by gondola road (cable car), the Medeu high-altitude ice rink \u2014 an outdoor speed skating and bandy rink \u2014 and Dostyk Mall.",
        },
        {
          heading: "Day 4 \u2014 Issyk Lake",
          body: "Issyk Lake and boat tours, lunch at Stetson Rancho Resort (horse center), the river, and the Turgen (Ayuly) waterfalls.",
        },
        {
          heading: "Day 5 \u2014 Kok-Tobe",
          body: "Kok-Tobe entertainment park (cable car and fast coaster), Central Park, the Dolphinarium, and the Zoo Park.",
        },
        {
          heading: "Day 6 \u2014 Shopping",
          body: "Shopping tour: Mega Mall, Esentai Mall, Barakholka shopping, a local chocolate boutique, and the Green Bazaar.",
        },
        {
          heading: "Day 7 \u2014 Departure",
          body: "Transfer from the hotel to the airport.",
        },
      ],
    },
  ],

  uzbekistan: [
    {
      slug: "tashkent-tour",
      title: "Tashkent Tour",
      excerpt: "Chorsu Bazaar, the Khast-Imam Ensemble, Chimgan Mountains, and Charvak Lake.",
      image: "/tours/uzbekistan/tashkent-tour.webp",
      meta: [
        { label: "City", value: "Tashkent" },
        { label: "Category", value: "City tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Tashkent downtown walking street and city park\nChorsu Bazaar\nBesh Qozon (Central Asia Plov Centre)\nTashkent TV tower\nTimur and Independence squares\nChimgan Mountains and Charvak Lake\nPanorama cable car and Tashkentland\nShayhantahur Ensemble and the Kaffal-Shashi mausoleum\nKhast-Imam Ensemble and the Madrasah of Barak Khan\nJuma Mosque and Kukeldash Madrasah\nMausoleum of Sheikh Zayniddin, Minor Mosque, and Almazar Madrasah\nState Museum of History of Uzbekistan",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "samarkand-tour",
      title: "Samarkand Tour",
      excerpt: "Registan Square, Shah-i-Zinda, Bibi-Khanym, and the Gur-Emir Mausoleum.",
      image: "/tours/uzbekistan/samarkand-tour.webp",
      meta: [
        { label: "City", value: "Samarkand" },
        { label: "Category", value: "Silk Road heritage" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Shah-i-Zinda necropolis\nSiab Bazaar\nBibi-Khanym Mosque\nRegistan Square\nSher-Dor Madrasah\nGur-Emir Mausoleum\nUlugbek Madrasah\nTillya-Kori Madrasah",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "amirsoy-tour",
      title: "Amirsoy Tour",
      excerpt: "Chimgan mountains, cable car, mountain lakes, horse riding, and skiing.",
      image: "/tours/uzbekistan/amirsoy-tour.webp",
      meta: [
        { label: "Region", value: "Chimgan / Amirsoy" },
        { label: "Category", value: "Mountain resort" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Chimgan Mountains\nChimgan cable car\nMountain lakes\nHorseback riding\nAmirsoy ski resort",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "bukhara-tour",
      title: "Bukhara Tour",
      excerpt: "The Ark citadel, Poi Kalyan, Lyabi-Hauz, and the trading domes of old Bukhara.",
      image: "/tours/uzbekistan/bukhara-tour.webp",
      meta: [
        { label: "City", value: "Bukhara" },
        { label: "Category", value: "Silk Road heritage" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Old Bukhara\nThe Samanid Mausoleum and the Ark of Bukhara\nMir-i-Arab Madrasa and Toqi Zargaron\nUlugbek and Abdulaziz Khan madrasahs\nTaqi-Telpakfurushon market\nThe Lyabi-Hauz ensemble\nToqi Sarrofon bazaar\nPoi Kalyan Mosque\nNodir Devon Begi madrasah and khanaka\nMagoki Attor Mosque",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "khiva-tour",
      title: "Khiva Tour",
      excerpt: "Itchan Kala walls, Kalta Minor, and the palaces of the ancient khanate.",
      image: "/tours/uzbekistan/khiva-tour.webp",
      meta: [
        { label: "City", value: "Khiva" },
        { label: "Category", value: "Silk Road heritage" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Kalta Minor Minaret\nMuhammad Amin-khan Madrasah\nIslam Khodja Minaret and Juma Mosque\nThe walls of Itchan Kala\nTash-Hauli Palace\nMahmud Pahlavan Mausoleum\nThe watchtower of Kunya-Ark Citadel\nAllakuli Khan Madrasah",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
  ],

  kyrgyzstan: [
    {
      slug: "bishkek-tour",
      title: "Kyrgyzstan \u2014 Bishkek Tour",
      excerpt: "6-day program: Burana Tower, Ala-Archa park, Chunkurchak valley, and hot springs.",
      image: "/tours/kyrgyzstan/bishkek-tour.webp",
      meta: [
        { label: "Duration", value: "6 days / 7 nights" },
        { label: "City", value: "Bishkek" },
        { label: "Category", value: "Group / family tour" },
      ],
      sections: [
        {
          heading: "Day 1 \u2014 Bishkek city tour",
          body: "Panfilov Entertainment Park, Duboviy (Oak) Park, Central Ala-Too Square, and the Pobeda (Victory) Monument.",
        },
        {
          heading: "Day 2 \u2014 Kegety tour",
          body: "Burana Tower and the stone balbals, Kegety Valley, and the Kegety waterfalls.",
        },
        {
          heading: "Day 3 \u2014 Ala-Archa tour",
          body: "Ala-Archa Gorge National Park and the Alamedin River (perfect for a picnic by the water). Acquaintance with the traditional ethno complex Supara: everything traditionally Kyrgyz, with a full range of authentic Kyrgyz meals served in comfortably furnished yurts and wooden patio seating.",
        },
        {
          heading: "Day 4 \u2014 Chunkurchak tour",
          body: "Chunkurchak Valley, the Chunkurchak ski area, and the ethno resort \u201cSupara Chunkurchak\u201d \u2014 suitable for resting, picnics in the valley, short hikes, and breathing ozonized mountain air.",
        },
        {
          heading: "Day 5 \u2014 Alamedin tour",
          body: "Alamedin waterfalls, the \u201cTeplie Klyuchi\u201d hot springs, and the Alamedin River.",
        },
        {
          heading: "Day 6 \u2014 Shopping day",
          body: "Asia Mall, Ala-Archa Trade Centre, Bishkek Park, and the honey exhibition fair.",
        },
      ],
    },
  ],

  russia: [
    {
      slug: "moscow-tour",
      title: "Moscow Tours",
      excerpt: "The Red Square, Kremlin, city cable car, river cruises, and exclusive extras.",
      image: "/tours/russia/moscow-tour.webp",
      meta: [
        { label: "City", value: "Moscow" },
        { label: "Category", value: "City programs" },
      ],
      sections: [
        {
          heading: "City tour",
          body: "Observing Moscow from the top of the city: the Moscow cable car (ski resort) with a tea/coffee break, the Moscow City 360 observation deck, Afimall shopping center, and the most famous walking street of Moscow \u2014 the Arbat.",
        },
        {
          heading: "Downtown tour (walking day)",
          body: "The Red Square, St. Basil's Cathedral, the Kremlin tour, Alexander Garden, Zaryadye Park, the historical luxury mall GUM, a walk down Nikolskaya Street, and the historical Kids' Mall and entertainment.",
        },
        {
          heading: "Royal park and shopping",
          body: "Tsaritsyno Royal Park, the biggest shopping mall in Moscow \u2014 Vegas, a night walking tour on the Arbat, and discovering Moscow\u2019s historical underground.",
        },
        {
          heading: "Outside tour",
          body: "Royal Elizabeth\u2019s springs and lakes park, the Moscow Oceanarium, ice skating and entertainment at Vegas, a bear tour, husky tour, big buggy and snowmobiles, deer rides, ATVs, and a tank experience.",
        },
        {
          heading: "Cultural tour",
          body: "Izmailovo Kremlin, Moscow Cathedral Mosque, the Moscow Zoo, Dreamland, and a 2.5-hour Moscow river cruise with dinner available.",
        },
        {
          heading: "Extra exclusive tours",
          body: "Military polygon, skydiving with parachute, fishing, hunting, a helicopter tour, the most famous museums of Moscow, the Grand (Bolshoi) Theatre, and the Tretyakov Gallery.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "st-petersburg-tour",
      title: "St. Petersburg Tour",
      excerpt: "The Hermitage, Peterhof, the bridge-raising night, and rooftop walks.",
      image: "/tours/russia/st-petersburg-tour.webp",
      meta: [
        { label: "City", value: "St. Petersburg" },
        { label: "Category", value: "City programs" },
      ],
      sections: [
        {
          heading: "City tour",
          body: "The Hermitage, a Nevsky Avenue walking tour, the Sweet House, the Chocolate Museum, a boat tour, and a Russian folk dance show in a palace.",
        },
        {
          heading: "Outside tour",
          body: "Peterhof Park, the Faberg\u00e9 Museum, the botanic garden and zoo, a shopping tour, and the famous St. Petersburg bridge-raising tour.",
        },
        {
          heading: "Extra tours",
          body: "The porcelain factory, balloon flights, museum tours of St. Petersburg, a roof tour, and a private boat tour.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "sochi-tour",
      title: "Sochi Tours",
      excerpt: "Rosa Khutor, Krasnaya Polyana, Sky Park, the Olympic Park, and the sea.",
      image: "/tours/russia/sochi-tour.webp",
      meta: [
        { label: "City", value: "Sochi" },
        { label: "Category", value: "Resort programs" },
      ],
      sections: [
        {
          heading: "Rosa Khutor tour",
          body: "The riverside walking street, the health trail with small waterfalls, cable cars, summer tubing for children, rodelbahn (fast coaster), paragliding, and the cultural-ethnographic center \u201cMy Russia.\u201d",
        },
        {
          heading: "Krasnaya Polyana and Gorky Gorod tours",
          body: "Polikar waterfalls, a bow shooting range, husky tours, an adventure park for children, the Galaktika/Laura shopping mall, the aviary complex of the Caucasus Natural Reserve, Gorky Gorod mall, the souvenirs bazaar, quad bike safaris, and Zipline Fly Gorky.",
        },
        {
          heading: "Entertaining tour",
          body: "The bee garden, the \u201cMouth of the Dragon\u201d waterfall, Sky Park, trout fishing, the Olympic Park, Sochi Park, and Formula-1 style karting.",
        },
        {
          heading: "Sochi city and outside tours",
          body: "City: the botanic garden, funicular, Navaginskaya street, a walk along the Corniche, a yacht tour, More-Mall, the circus, and the zoo.\nOutside: Mount Akhun, the agrotouristic complex Farm Exarcho, the aquarium, the dolphinarium in Riviera Park, and a balloon tour.",
        },
        {
          heading: "Extra tours",
          body: "Jeep tours, river rafting, a traditional Russian hammam, helicopter tours, and picnic tours.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
  ],

  "czech-republic": [],

  poland: [
    {
      slug: "krakow-city-tour",
      title: "Krakow City Tour",
      excerpt: "Old town walk, Wawel Hill, Kazimierz, and sightseeing by electric golf car.",
      image: "/tours/poland/krakow-city-tour.webp",
      meta: [
        { label: "City", value: "Krakow" },
        { label: "Category", value: "City tour" },
      ],
      sections: [
        {
          heading: "Walking tour of the old town",
          body: "St. Florian\u2019s Gate, Wawel Hill with the Royal Castle and the Royal Cathedral, the Main Market Square, New Square in Kazimierz, Szeroka Street, and St. Mary\u2019s Basilica. Visits to handmade souvenir shops and antique shops, the Jagiellonian University district, Planty Park, and Energylandia.",
        },
        {
          heading: "Sightseeing by electric vehicle (golf car)",
          body: "The old town and Market Square, the Cloth Hall and Town Hall, St. Mary\u2019s Church, the Juliusz Slowacki Theatre, the Barbican, St. Peter and Paul\u2019s Church, Kazimierz with the Tempel and Old synagogues, Szeroka Street and Remuh Synagogue, and the Ghetto \u2014 Ghetto Heroes Square, the \u201cUnder the Eagle\u201d Pharmacy, and Oskar Schindler\u2019s Factory.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "zakopane-tour",
      title: "Zakopane Tour",
      excerpt: "Gubalowka funicular, the Great Krokiew ski jump, and Koscieliska Valley.",
      image: "/tours/poland/zakopane-tour.webp",
      meta: [
        { label: "Town", value: "Zakopane" },
        { label: "Category", value: "Mountain tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "The Gubalowka funicular and the \u201cWielka Krokiew\u201d ski jump.\nKrupowki Street, Gubalowka Hill, Willa Koliba \u2014 the Museum of Zakopane Style \u2014 and Powstancow Slaskich street.\nKoscieliska street and the Zakopane Style Museum in Villa Koliba, Pilsudskiego street.\nKoscieliska Valley with an optional horse-and-carriage ride, and Kalatowki Valley.\nThe Regional Museum, thermal pools, and traditional Zakopane mountaineers\u2019 cottages.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "wieliczka-salt-mine-tour",
      title: "Wieliczka & Bochnia Salt Mines",
      excerpt: "UNESCO underground world: salt chapels, brine lakes, and 135 m descents.",
      image: "/tours/poland/wieliczka-salt-mine-tour.webp",
      meta: [
        { label: "Sites", value: "Wieliczka / Bochnia" },
        { label: "Tour length", value: "\u22482 hours underground" },
      ],
      sections: [
        {
          heading: "Wieliczka Salt Mine",
          body: "The Wieliczka Salt Mine was one of the first 12 sites in the world designated a UNESCO World Heritage Site and is one of the most visited tourist sites anywhere. The 2-hour tour covers only 1% of the underground world: winding corridors almost 3 km long, 800 steps, and a descent to a depth of 135 meters through the Danilowicz Shaft. Explore a vast labyrinth of tunnels and chambers and admire intricate statues, chandeliers, and other art carved directly in the salt rock.",
        },
        {
          heading: "Bochnia Salt Mine",
          body: "Hear the story of Duke Boleslaw V the Chaste and Duchess Kinga, ride the underground railway, go down the world\u2019s longest underground slide, and sail a ferry on the brine lake flooding the chamber. Visit a network of chambers with unusual geological structures, a stable, an exhibition of wooden tread-wheels, and the Chapel of Saint Kinga at a depth of 212 meters underground.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "auschwitz-tour",
      title: "Auschwitz-Birkenau Memorial and Museum",
      excerpt: "A guided memorial visit to both parts of the former camp complex.",
      image: "/tours/poland/auschwitz-tour.webp",
      meta: [
        { label: "Site", value: "Auschwitz-Birkenau" },
        { label: "Category", value: "Memorial tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Visit the Auschwitz-Birkenau complex and learn about its terrible history from a professional guide. See the infamous \u201cArbeit Macht Frei\u201d entrance gate, the barracks where prisoners were kept, and the gas chambers. The tour covers both parts of the camp \u2014 Auschwitz I and Auschwitz II-Birkenau \u2014 and ends at the wailing wall, where visitors pay their respects to the victims of the Nazi Holocaust.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "jewish-quarter-tour",
      title: "Jewish Quarter Walk (Kazimierz)",
      excerpt: "4-hour Jewish history and heritage tour of Krakow, including Schindler's Factory.",
      image: "/tours/poland/jewish-quarter-tour.webp",
      meta: [
        { label: "Duration", value: "4 hours" },
        { label: "District", value: "Kazimierz" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Trace the story of Krakow\u2019s Jewish community through the centuries and during WWII. Explore Kazimierz \u2014 the city\u2019s historical Jewish district \u2014 with its synagogues, monuments, and kosher restaurants. Visit the Old Synagogue, Remuh Synagogue and Cemetery, hear how the people of Kazimierz were herded into the Jewish ghetto, learn how Steven Spielberg filmed Schindler\u2019s List here, and visit the Oskar Schindler\u2019s Factory museum to see how Schindler saved many Jewish lives.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
    {
      slug: "krakow-shopping-tour",
      title: "Krakow Shopping Tour",
      excerpt: "Art galleries, amber artisans, local designers, and Polish pottery traditions.",
      image: "/tours/poland/krakow-shopping-tour.webp",
      meta: [
        { label: "City", value: "Krakow" },
        { label: "Category", value: "Shopping tour" },
      ],
      sections: [
        {
          heading: "Program",
          body: "Breakfast at the hotel, then a day among Krakow\u2019s makers: small art galleries with a diversity of handmade products and original Polish design; coffee with an urban artisan specializing in amber jewelry \u2014 learn how to recognize real amber from fakes; shopping for unique clothes and shoes made in Krakow by local designers; and an introduction to local pottery traditions and their different styles.",
        },
        ZAKHER_SERVICES_SECTION,
      ],
    },
  ],

  ukraine: [
    {
      slug: "kyiv-tour",
      title: "Kyiv City Tour",
      excerpt: "8-day program: Pechersk Lavra, the Carpathians, Bukovel, and Lviv.",
      image: "/tours/ukraine/kyiv-tour.webp",
      meta: [
        { label: "Duration", value: "8 days" },
        { label: "Cities", value: "Kyiv, Carpathians, Lviv" },
      ],
      sections: [
        {
          heading: "Day 1 \u2014 Walking tour",
          body: "A walk to Poshtova Ploshcha (the Dnieper River station) and a ride on the Kyiv Metro to the deepest metro station in the world \u2014 Arsenalna (105.5 m below the surface). The Motherland Monument (102 m), the Museum of the History of Ukraine in WWII, the Park of Eternal Glory, Kyiv Pechersk Lavra, Khreshchatyk \u2014 the main street of Kyiv \u2014 the Kyiv Passage, Independence Square (Maidan Nezalezhnosti), Sofia\u2019s Square, the Kyiv funicular (Saint Volodymyr Hill), Andrew\u2019s Descent, and the Landscape Alley.",
        },
        {
          heading: "Day 2 \u2014 By car",
          body: "Shchekavytsia mountain, Heydar Aliyev Square, Khreshchaty Park with the People\u2019s Friendship Arch, the Golden Gate, and the National Botanical Garden.",
        },
        {
          heading: "Day 3 \u2014 Shopping in Kyiv",
          body: "Globus Mall, Ocean Plaza, Gulliver Mall, the Bessarabian market, and Lavina Mall.",
        },
        {
          heading: "Day 4\u20135 \u2014 Outside Kyiv",
          body: "Day 4: the Museum of Folk Architecture and Folkways of Ukraine, Feofaniya Park, and Mezhyhirya National Park (the former residence of the fourth President of Ukraine).\nDay 5: the \u201c12 Months\u201d contact zoo, Pushcha-Vodytsia Park, and Koncha-Zaspa Park.",
        },
        {
          heading: "Day 6\u20137 \u2014 Uman & the Carpathian Mountains",
          body: "Day 6: the Uman district.\nDay 7: Vysokyi Verkh mountain with its cable car, Synevyr Lake \u2014 the largest lake in the Ukrainian Carpathians \u2014 and the resort of Bukovel, the largest ski resort in Eastern Europe.",
        },
        {
          heading: "Day 8 \u2014 Lviv city tour",
          body: "The Lviv Theatre of Opera and Ballet; Market Square with its 45 old architectural buildings and 4 fountains \u2014 the Town Hall, the Black House, the Venetian House (Chocolate Museum), and the Pharmacy Museum; High Castle Hill; and the Vernissage market.",
        },
      ],
    },
  ],
};

export function getToursForCountry(countrySlug: string): TourDetail[] {
  return TOURS_BY_COUNTRY[countrySlug] ?? [];
}

export function getTourDetail(
  countrySlug: string,
  tourSlug: string
): TourDetail | undefined {
  return getToursForCountry(countrySlug).find((tour) => tour.slug === tourSlug);
}
