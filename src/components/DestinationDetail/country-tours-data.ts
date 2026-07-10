/**
 * Tour package content per country, sourced from the live Zakher Travel site
 * (test.zakher.travel/tour-packages and its per-country tour pages).
 */

export type CountryTourFaq = {
  question: string;
  answer: string;
};

export type CountryTourData = {
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  faqsTitle: string;
  faqs: CountryTourFaq[];
  stats: { value: string; label: string }[];
};

const BOOKING_FAQ: CountryTourFaq = {
  question: "How can I book this tour package?",
  answer:
    "Contact us at incoming@zakher.travel or +994 12 310 09 32. Our team provides offline support by call, e-mail, and WhatsApp 24/7. Economy and VIP transport packages are available on request.",
};

export const COUNTRY_TOURS: CountryTourData[] = [
  {
    slug: "azerbaijan",
    name: "Azerbaijan",
    heroImage: "/tours/azerbaijan.webp",
    description:
      "Azerbaijan, often called the \u201cLand of Fire,\u201d is where East meets West and ancient civilizations have left their mark. From the bustling streets of Baku to historic towns and ancient monuments, the country offers a rich cultural experience. Its landscapes \u2014 from the Caspian Sea coastline to high plateaus, mountains, and lush valleys \u2014 create a harmony that enchants travelers with heritage, nature, and vibrant culture.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Absheron Tour \u2014 3 hours, private",
        answer:
          "Itinerary: Absheron \u2013 Ateshgah \u2013 Yanar Dag \u2013 Gala. Pick-up and drop-off at your hotel within Baku.\nHighlights: Heydar Aliyev Center designed by Zaha Hadid, Ateshgah \u201cTemple of Eternal Fire,\u201d Yanardag \u2014 the eternally burning mountain, Gala Archaeological and Ethnographic Museum Complex, Bina Equestrian Center with the famous Karabakh horses, and Heydar Mosque \u2014 the biggest mosque in the Caucasus.",
      },
      {
        question: "Baku Night Tour \u2014 2 hours, private",
        answer:
          "An independent night tour of Baku with a private driver and guide.\nHighlights: Highland Park with panoramic views of Baku Bay, National Flag Square, Flame Towers, the Funicular, Carpet Museum, Baku Boulevard (Seaside Park), Little Venice, Government House, State Philharmonic Hall, and Fountain Square \u2014 the most famous street of Baku.",
      },
      {
        question: "Old City Excursion (Walking Tour) \u2014 2.5 hours",
        answer:
          "A walking tour through medieval Icheri Sheher.\nHighlights: Maiden Tower \u2014 the symbol of Baku, the 12th-century Juma Mosque, the Multani and Bukhara caravanserais, historic bathhouses and khanegahs, Shirvanshah\u2019s Palace (12th\u201315th century), the Museum of Miniature Books, the Mugham Theatre, Fountain Square, the National History Museum, a sea trip along Baku Bay, and Baku\u2019s shopping malls.",
      },
      {
        question: "Museum Gobustan and Mud Volcanoes Tour \u2014 5 hours",
        answer:
          "Itinerary: Baku \u2013 Gobustan \u2013 Mud Volcanoes \u2013 Baku (approx. 65 km one way, all season, Jeep 4\u00d74).\nVisit the Gobustan Museum of Petroglyphs \u2014 prehistoric rock drawings carved by primitive men in the Beyukdash, Kichikdash, Djingirdag and Shighgaya mountains \u2014 then trip to the mud volcanoes: about 350 of the world\u2019s 800 mud volcanoes are found in Azerbaijan, most of them in Gobustan.",
      },
      {
        question: "Extreme Jeep Safari \u2014 Gobustan Reserve, 5\u20139 hours",
        answer:
          "Itinerary: Baku \u2013 Alat \u2013 Volcano Dashgil \u2013 Kichik Dash \u2013 Boyukdash \u2013 ascent to the Kyanizadag volcano \u2013 Jingirdag \u2013 Baku (approx. 70 km one way, March\u2013October, Jeep 4\u00d74).\nClimb to the very crater of active mud volcanoes of the Dashgil group and watch the gurgling liquid clay \u2014 scenery so unusual that scientists compare it to the surface of Mars.",
      },
      {
        question: "Tour to Gabala \u2014 the capital of Caucasian Albania, 1 day",
        answer:
          "Itinerary: Baku \u2013 Shamakhi \u2013 Gabala \u2013 Baku (approx. 220 km one way, all season, 10\u201311 hours).\nGabala overlooks Bazardyuzyu, the highest peak of Azerbaijan (4,466 m). Visit the ruins of ancient Kabalaka \u2014 for 600 years the capital of Caucasian Albania \u2014 the ancient village of Nij with its Albanian temple, Tufandag summer\u2013winter complex and ropeway, Nohur Lake, and the \u201cSeven Beauties\u201d waterfall.",
      },
      {
        question: "Tour to Khinalig \u2014 2,200 meters above sea level, 1 day",
        answer:
          "Itinerary: Baku \u2013 Guba \u2013 Khinalig \u2013 Baku (approx. 220 km one way, all season, 10\u201312 hours).\nKhinalig is the oldest settlement in Azerbaijan, over 5,000 years old, whose residents consider themselves descendants of the biblical Noah. On the way explore Guba \u2014 famous for its apples, carpet weaving, the Gechresh forest, Tangaalti gorge, Afurdja waterfall, and the Red Village, home to one of the world\u2019s largest communities of Mountain Jews.",
      },
      {
        question: "Tour to Sheki \u2014 Ancient Khanate, 1 day",
        answer:
          "Itinerary: Baku \u2013 Shemakha \u2013 Ismayilli \u2013 Gabala \u2013 Oguz \u2013 Sheki \u2013 Baku (approx. 320 km one way, all season, 12\u201313 hours).\nSheki is one of the oldest settlements in the Caucasus with findings dating back more than 2,500 years. See the majestic Sheki Khan\u2019s Palace built without a single nail, the ancient Albanian temple in Kish, Gelersen-Gerersen fortress, caravanserais, Juma Mosque, and medieval baths. Optional stops include the Diri Baba Mausoleum and Nohur Lake.",
      },
      {
        question: "\u201cThe North Gates\u201d Tour \u2014 Gusar + Shahdag + Laza, 1 day",
        answer:
          "Itinerary: Baku \u2013 Gusar \u2013 Shahdag \u2013 Laza \u2013 Baku (approx. 220 km one way, 10\u201312 hours).\n09:30 departure from Baku with a stop near Beshbarmag Mountain; arched bridge across Gudiyalchay river and the Red Village on the way. Arrival at the Shahdag summer\u2013winter tourism complex \u2014 Azerbaijan\u2019s first ski resort \u2014 then a trip to Laza village, an exotic area with majestic waterfalls and horse-riding opportunities.",
      },
      {
        question: "Tour to the North \u2014 Forests and Mountains of Quba, 1 day",
        answer:
          "Itinerary: Baku \u2013 Guba \u2013 Baku (approx. 220 km one way, all season, 10\u201312 hours).\nHighlights: Guba fruit gardens, the fabled Khinalig village, Chanlibel Lake, Guba Genocide Memorial Complex, Qechresh Forest, \u201cNazli Bulag\u201d spring, \u201cMest Dergah\u201d waterfall, Red Town, the Guba carpet workshop, Azerbaijan National Golf Club, Guba bazaar and sweet factory, and the Shahdag Tourism Complex with cable car rides and skiing.",
      },
      {
        question: "Tour to the village of artisans \u2014 Lahij, 1 day",
        answer:
          "Itinerary: Baku \u2013 Shemakha \u2013 Lahij \u2013 Baku (approx. 180 km one way, all season, 9\u201310 hours).\nVisit Shemakha, the ancient capital of Shirvan, with Gulistan fortress, the Seven Domes mausoleum, and the 10th-century Juma Mosque. Then explore Lahij \u2014 a medieval high-altitude village founded in the 3rd\u20134th century BC, with cobbled streets, hereditary blacksmiths and coppersmiths, and a 1,500-year-old water system.",
      },
      {
        question: "Tastes and Flavors of Azerbaijani Cuisine \u2014 5 hours",
        answer:
          "A full-day gastronomic journey: traditional breakfast in the Old City with tandir bread, honey, and cheese; the colorful eastern bazaar with spices, dried fruits, and Caspian black caviar; lunch with sturgeon or lamb kebab and shah-plov at an authentic restaurant; and a stroll through the Old Town with tea or wine tasting.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "12", label: "Tours" },
      { value: "10", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "turkiye",
    name: "Turkiye",
    heroImage: "/tours/turkey.webp",
    description:
      "Often described as a bridge between East and West, Turkiye is a land where civilizations have met for thousands of years. With a history stretching back over 10,000 years, it has been home to ancient empires whose traces are visible in its cities, monuments, and traditions. Its diverse landscapes range from Mediterranean and Aegean coastlines to high plateaus, mountains, and fertile valleys.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Istanbul Tour",
        answer:
          "Hagia Sophia, Topkapi Palace, Basilica Cistern, Sultanahmet Square & Blue Mosque, Grand Palace Mosaics Museum, Museum of Turkish & Islamic Arts, Istanbul Archaeology Museums, Dolmabahce Palace, Taksim and Istiklal Street, Galata Tower, Sirkeci, Bosphorus cruise, and Cemberlitas.",
      },
      {
        question: "Istanbul Shopping Tour",
        answer:
          "Spice Bazaar and Grand Bazaar, Istanbul Cevahir, Zorlu Center, Istinye Park (luxury brands), Mall of Istanbul, Via/Port outlet with kids' options, Emaar Square (skyview and aquarium), Vadistanbul, Venezia Mega Outlet, Aqua Florya with the biggest aquarium, Kanyon, Palladium, Buyaka, and Vialand theme park.",
      },
      {
        question: "Sapanca Tour",
        answer:
          "Sapanca Lake, organic house visit, Kartepe snow hill, and waterfalls \u2014 a relaxing nature escape close to Istanbul.",
      },
      {
        question: "Bursa Tour",
        answer:
          "Bursa Ulu Camii, cable car up Uludag mountain, Turkish delight, honey and jam manufacturing visits, the silk market, a 600-year-old antique Turkish bath, and the zoo park.",
      },
      {
        question: "Trabzon & Rize Tour",
        answer:
          "Uzungol, a tea factory, Yapay waterfalls, Hidir Nebi, Firtina Valley and Ayder, Sera Lake, and Sumela Monastery. In Rize: Agaran waterfall, Elevit plateau, and Zil Polovit castle.",
      },
      {
        question: "Antalya Tour",
        answer:
          "The Land of Legends theme park, Duden Waterfall, Antalya cable car, Pamukkale, diving, and river rafting.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "7", label: "Tours" },
      { value: "6", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "georgia",
    name: "Georgia",
    heroImage: "/tours/georgia.png",
    description:
      "Georgia, with a history spanning over 8,000 years, offers landscapes ranging from the peaks of the Caucasus Mountains to fertile valleys and subtropical coasts. Ancient traditions live alongside modern life, creating a warm and resilient society. Georgia\u2019s identity is deeply tied to its land, language, and historical continuity.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Tbilisi Tour \u2014 recommended 1 night / 2 days",
        answer:
          "Tbilisi old city tour: Bridge of Peace, Rike Park, cable car to Narikala fortress, Mother of Georgia, Jumma Mosque, the sulfur baths district, Leghvtakhevi waterfall, and Mtatsminda amusement park. Also: shopping at East Point, Tbilisi City Mall and Galleria Mall, Lisi and Turtle lakes, and the Chronicles of Georgia.",
      },
      {
        question: "Batumi Tour \u2014 recommended 3 nights / 4 days",
        answer:
          "Batumi Drama Theater, the Neptune monument, the astronomic clock, Medea monument square, the Armenian church, Saint Nicholas Church, Piazza Square, \u201cOrta Jame\u201d Mosque, the sea port, the moving sculpture Ali & Nino, old and new boulevards, Mtirala National Park, the Botanical Garden, Makhuntseti waterfall, Machakhela National Park, and the Dendrological Park.",
      },
      {
        question: "Gudauri & Kazbegi Tour \u2014 recommended 1 night / 2 days",
        answer:
          "Gudauri in the Caucasus Mountains: Zhinvali water reservoir, Ananuri Fortress, and the Gudauri viewpoint. Kazbegi tour: drive up Kazbegi Mountain by 4\u00d74 and visit Gergeti Trinity Church and Juta.",
      },
      {
        question: "Borjomi & Bakuriani Tour",
        answer:
          "Borjomi mineral (central) park, Uplistsikhe cave town, Rabati Castle, Vardzia cave resort, and the Bakuriani ski resort.",
      },
      {
        question: "Kakheti Tour",
        answer:
          "Sighnaghi city tour \u2014 the \u201ccity of Love\u201d \u2014 plus Bodbe, Tsinandali, and the Khareba winery.",
      },
      {
        question: "Dashbashi & Kutaisi Tours",
        answer:
          "Dashbashi: Tsalka waterfall, Tsalka and Dashbashi villages, and the Diamond Bridge. Kutaisi: city tour, Prometheus Cave, Sataplia nature reserve, and Martvili Canyon.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "7", label: "Tours" },
      { value: "8", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "uae",
    name: "UAE",
    heroImage: "/tours/uae.webp",
    description:
      "Known as a symbol of rapid development and innovation, the United Arab Emirates has transformed from a desert-based society into a global hub within a few decades. Its landscape is defined by vast deserts, coastal areas along the Arabian Gulf, and modern urban centers rising from arid land. Rooted in Bedouin traditions and Islamic values, the UAE reflects a balance between heritage, environment, and technological progress.",
    faqsTitle: "FAQs",
    faqs: [
      {
        question: "What services does Zakher Travel provide in the UAE?",
        answer:
          "Hotel reservations at relevant prices, air ticket sales, professional guide-translators, transfer services, tours for individuals, groups and families, regional and city tours, shopping and photography tours, VIP services, visa support, and travel insurance.",
      },
      {
        question: "Where is the Zakher Travel UAE office?",
        answer:
          "Zakher Travel FZC is located at Sharjah International Airport Free Zone, Sharjah, UAE. Phone: +971 56 590 2100, e-mail: incoming@zakher.travel.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "6", label: "Days" },
      { value: "2", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "kazakhstan",
    name: "Kazakhstan",
    heroImage: "/tours/kazakhstan.png",
    description:
      "Kazakhstan, the heart of the Great Steppes, stretches across vast plains, deserts, serene lakes, and towering mountains. Here, nomadic heritage blends with modern urban life, creating a dynamic and multicultural society. Travelers are fascinated by its breathtaking nature, nomadic exoticism, and a striking modern contrast.",
    faqsTitle: "Tour Program \u2014 Almaty, 7 Days",
    faqs: [
      {
        question: "Day 1\u20132 \u2014 Almaty city & Big Almaty Lake",
        answer:
          "Day 1: transfer from Almaty International Airport, Almaty city tour, Arbat Street, President Park, Kok-Tobe entertainment park (cable car and fast coaster), and a national dinner at Alasha restaurant.\nDay 2: Ile-Alatau National Park, Alma-Arasan village, the Big Almatinka\u2013Prokhodnaya river and spring, Zailiyskiy Alatau Mountain, Big Almaty Lake, lunch at Alpen Rose Resort, and a birds show.",
      },
      {
        question: "Day 3\u20134 \u2014 Shymbulak, Medeu & Issyk Lake",
        answer:
          "Day 3: Shymbulak ski complex by gondola, the Medeu high-altitude ice rink, and Dostyk Mall.\nDay 4: Issyk Lake with boat tours, lunch at Stetson Rancho horse center, and the river.",
      },
      {
        question: "Day 5\u20136 \u2014 Kolsai Lake, Charyn Canyon & shopping",
        answer:
          "Day 5: Kolsai Lake and Charyn Canyon tour.\nDay 6: shopping tour \u2014 Mega Mall, Esentai Mall, Barakholka, a local chocolate boutique, and the Green Bazaar.",
      },
      {
        question: "Day 7 \u2014 Departure",
        answer: "Transfer from the hotel to Almaty International Airport.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "7", label: "Days" },
      { value: "1", label: "City" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "uzbekistan",
    name: "Uzbekistan",
    heroImage: "/tours/uzbekistan.webp",
    description:
      "Uzbekistan, a jewel of the Great Silk Road, boasts cities like Samarkand, Bukhara, and Khiva, where stunning architecture and vibrant arts tell the story of a thriving past. Rich traditions and colorful history make every visit unforgettable. Travelers enjoy its history, art, and ancient culture.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Tashkent Tour",
        answer:
          "Tashkent downtown walking street, city park, Chorsu Bazaar, Besh Qozon plov center, the TV tower, Timur and Independence squares, Chimgan Mountains, Charvak Lake, panorama cable car, Khast-Imam Ensemble, Barak Khan Madrasah, Juma Mosque, Kukeldash Madrasah, Minor Mosque, and the State Museum of History of Uzbekistan.",
      },
      {
        question: "Samarkand Tour",
        answer:
          "Shah-i-Zinda, Siab Bazaar, Bibi-Khanym Mosque, Registan Square with the Sher-Dor, Ulugbek, and Tillya-Kori madrasahs, and the Gur-Emir Mausoleum.",
      },
      {
        question: "Amirsoy Tour",
        answer:
          "Chimgan Mountains, the Chimgan cable car, mountain lakes, horseback riding, and the Amirsoy ski resort.",
      },
      {
        question: "Bukhara Tour",
        answer:
          "Old Bukhara: the Samanid Mausoleum, the Ark of Bukhara, Mir-i-Arab Madrasa, Toqi Zargaron, Ulugbek and Abdulaziz Khan madrasahs, Taqi-Telpakfurushon market, the Lyabi-Hauz ensemble, Toqi Sarrofon bazaar, Poi Kalyan Mosque, Nodir Devon Begi madrasah and khanaka, and Magoki Attor Mosque.",
      },
      {
        question: "Khiva Tour",
        answer:
          "Kalta Minor Minaret, Muhammad Amin-khan Madrasah, Islam Khodja Minaret, Juma Mosque, the walls of Itchan Kala, Tash-Hauli Palace, Mahmud Pahlavan Mausoleum, the watchtower of Kunya-Ark Citadel, and Allakuli Khan Madrasah.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "5", label: "Tours" },
      { value: "5", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "kyrgyzstan",
    name: "Kyrgyzstan",
    heroImage: "/tours/kyrgyzstan.webp",
    description:
      "Often called the land of celestial mountains, Kyrgyzstan is an ancient homeland of nomadic culture with a history rooted in freedom and close connection to nature. The country is dominated by dramatic mountain ranges, alpine meadows, glaciers, and high-altitude lakes. Kyrgyzstan preserves strong traditions of oral heritage, horsemanship, and communal values.",
    faqsTitle: "Tour Program \u2014 Bishkek, 6 Days / 7 Nights",
    faqs: [
      {
        question: "Day 1\u20132 \u2014 Bishkek city & Kegety",
        answer:
          "Day 1: Bishkek city tour \u2014 Panfilov Entertainment Park, Duboviy Park, Central Ala-Too Square, and the Pobeda Monument.\nDay 2: Kegety tour \u2014 Burana Tower and the stone balbals, Kegety Valley, and Kegety waterfalls.",
      },
      {
        question: "Day 3\u20134 \u2014 Ala-Archa & Chunkurchak",
        answer:
          "Day 3: Ala-Archa Gorge National Park, the Alamedin River, and the traditional ethno complex Supara with authentic Kyrgyz cuisine served in yurts.\nDay 4: Chunkurchak Valley, Chunkurchak ski area, and the ethno resort \u201cSupara Chunkurchak\u201d \u2014 ideal for picnics, short hikes, and fresh mountain air.",
      },
      {
        question: "Day 5\u20136 \u2014 Alamedin & shopping",
        answer:
          "Day 5: Alamedin waterfalls, the \u201cTeplie Klyuchi\u201d hot springs, and the Alamedin River.\nDay 6: shopping day \u2014 Asia Mall, Ala-Archa Trade Centre, Bishkek Park, and the honey exhibition fair.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "6", label: "Days" },
      { value: "1", label: "City" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "russia",
    name: "Russia",
    heroImage: "/tours/russia.webp",
    description:
      "Spanning Eastern Europe and Northern Asia, Russia is one of the world\u2019s most geographically vast and culturally complex countries. Its landscapes range from tundra and taiga forests to mountains, rivers, steppes, and Arctic coastlines. Russia is known for its cultural depth, literary tradition, and astonishing natural landscapes.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Moscow Tours",
        answer:
          "City tour: Moscow cable car, the Moscow City 360 observation deck, Afimall, and Arbat Street.\nDowntown walking day: the Red Square, St. Basil's Cathedral, the Kremlin, Alexander Garden, Zaryadye Park, GUM, and Nikolskaya Street.\nAlso: Tsaritsyno Royal Park, Vegas Mall, the Moscow Oceanarium, Izmailovo Kremlin, Moscow Cathedral Mosque, the zoo, a Moscow river cruise, plus exclusive extras \u2014 helicopter tours, the Bolshoi Theatre, and the Tretyakov Gallery.",
      },
      {
        question: "St. Petersburg Tour",
        answer:
          "City tour: the Hermitage, Nevsky Avenue walking tour, the Sweet House, the Chocolate Museum, a boat tour, and a Russian folk dance show in a palace.\nOutside tour: Peterhof Park, Faberg\u00e9 Museum, the botanic garden and zoo, shopping, and the famous bridge-raising tour. Extras: the porcelain factory, balloon flights, museum and roof tours, and private boat trips.",
      },
      {
        question: "Sochi Tours",
        answer:
          "Rosa Khutor: the riverside walking street, waterfalls, cable cars, summer tubing, rodelbahn, paragliding, and the ethnographic center \u201cMy Russia.\u201d\nKrasnaya Polyana and Gorky Gorod: Polikar waterfalls, husky tours, adventure park, Galaktika mall, and zipline. Also: Olympic Park, Sochi Park, the Riviera dolphinarium, Mount Akhun, yacht tours, and extras like jeep tours, river rafting, and helicopter rides.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "3", label: "Cities" },
      { value: "15+", label: "Tours" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    heroImage: "/tours/czechrepublic.webp",
    description:
      "Known for its medieval cities and rich cultural legacy, the Czech Republic has been a center of art, philosophy, and craftsmanship for centuries. The country\u2019s landscape is characterized by rolling hills, river valleys, forests, and historic towns integrated into the natural environment. This balance between nature and urban heritage contributes to its cultural refinement and architectural harmony.",
    faqsTitle: "FAQs",
    faqs: [
      {
        question: "What services does Zakher Travel provide in the Czech Republic?",
        answer:
          "Hotel reservations at relevant prices, air ticket sales, professional guide-translators, transfer services, tours for individuals, groups and families, regional and city tours, shopping and photography tours, VIP services, visa support, and travel insurance.",
      },
      {
        question: "How can I reach the European office?",
        answer:
          "Phone: +48 666 362 201, e-mail: incoming@zakher.travel. Our team provides offline support by call, e-mail, and WhatsApp 24/7.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "6", label: "Days" },
      { value: "2", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "poland",
    name: "Poland",
    heroImage: "/tours/poland.webp",
    description:
      "Located in the heart of Europe, Poland has a long and complex history marked by resilience and cultural continuity. Its landscapes include vast plains, forests, lakes, and a Baltic Sea coastline, as well as mountain ranges in the south. Poland is rich in historical landmarks, intellectual traditions, and cultural heritage.",
    faqsTitle: "Tour Programs",
    faqs: [
      {
        question: "Krakow City Tour",
        answer:
          "Walking tour of the old town: St. Florian\u2019s Gate, Wawel Hill with the Royal Castle and Cathedral, the Main Market Square, Kazimierz with New Square and Szeroka Street, St. Mary\u2019s Basilica, handmade souvenir and antique shops, the Jagiellonian University district, Planty Park, and Energylandia. Optional sightseeing by electric golf car covering the Cloth Hall, Town Hall, Barbican, the synagogues of Kazimierz, Ghetto Heroes Square, and Oskar Schindler\u2019s Factory.",
      },
      {
        question: "Zakopane Tour",
        answer:
          "Gubalowka funicular, the \u201cWielka Krokiew\u201d ski jump, Krupowki Street, Willa Koliba \u2014 the Museum of Zakopane Style, Koscieliska street and valley with optional horse-and-carriage ride, Kalatowki Valley, the Regional Museum, thermal pools, and traditional mountaineers\u2019 cottages.",
      },
      {
        question: "Wieliczka & Bochnia Salt Mines",
        answer:
          "Wieliczka Salt Mine \u2014 one of the first 12 UNESCO World Heritage Sites in the world: a 2-hour route through winding corridors, 800 steps, and a descent to 135 meters underground, with statues and chandeliers carved directly in salt rock. Bochnia Salt Mine: underground vaults with a railway ride, the world\u2019s longest underground slide, a ferry on the brine lake, and the Chapel of Saint Kinga at 212 meters underground.",
      },
      {
        question: "Auschwitz-Birkenau Memorial and Museum",
        answer:
          "Visit the largest concentration camp of the Nazi Holocaust with a professional guide: the infamous \u201cArbeit Macht Frei\u201d gate, the barracks and gas chambers, both Auschwitz I and Auschwitz II-Birkenau, and the wailing wall where visitors pay their respects to the victims.",
      },
      {
        question: "Jewish Quarter Walk \u2014 4 hours",
        answer:
          "Trace the story of Krakow\u2019s Jewish community through the centuries: explore Kazimierz with its synagogues, monuments and kosher restaurants, visit the Old Synagogue and Remuh Synagogue and Cemetery, hear about the WWII ghetto, see locations where Steven Spielberg filmed Schindler\u2019s List, and visit the Oskar Schindler\u2019s Factory museum.",
      },
      {
        question: "Krakow Shopping Tour",
        answer:
          "Small art galleries with handmade products and original Polish design, coffee with an urban artisan specializing in amber jewelry \u2014 learn to tell real amber from fakes \u2014 unique clothes and shoes made in Krakow by local designers, and local pottery traditions.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "6", label: "Tours" },
      { value: "3", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
  {
    slug: "ukraine",
    name: "Ukraine",
    heroImage: "/tours/ukraine.webp",
    description:
      "Ukraine, a land of fertile plains, majestic mountains, and vibrant rivers, reflects centuries of culture through its cities and countryside. Kyiv\u2019s golden domes, Lviv\u2019s charming streets, and the Carpathian Mountains highlight its natural beauty. The country is known for resilience, hospitality, and rich folk heritage.",
    faqsTitle: "Tour Program \u2014 Kyiv, 8 Days",
    faqs: [
      {
        question: "Day 1\u20132 \u2014 Kyiv walking & city tour",
        answer:
          "Day 1 (walking): Poshtova Ploshcha, a ride on the Kyiv Metro to Arsenalna \u2014 the deepest metro station in the world (105.5 m), the Motherland Monument, the WWII History Museum, Kyiv Pechersk Lavra, Khreshchatyk, Independence Square, Sofia\u2019s Square, the funicular, Andrew\u2019s Descent, and the Landscape Alley.\nDay 2 (by car): Shchekavytsia mountain, Heydar Aliyev Square, Khreshchaty Park with the People\u2019s Friendship Arch, the Golden Gate, and the National Botanical Garden.",
      },
      {
        question: "Day 3\u20135 \u2014 Shopping & around Kyiv",
        answer:
          "Day 3 (shopping): Globus Mall, Ocean Plaza, Gulliver Mall, the Bessarabian market, and Lavina Mall.\nDay 4: the Museum of Folk Architecture, Feofaniya Park, and Mezhyhirya National Park.\nDay 5: the \u201c12 Months\u201d contact zoo, Pushcha-Vodytsia Park, and Koncha-Zaspa Park.",
      },
      {
        question: "Day 6\u20138 \u2014 Uman, Carpathians & Lviv",
        answer:
          "Day 6: the Uman district.\nDay 7 (Carpathian Mountains): Vysokyi Verkh mountain and cable car, Synevyr Lake \u2014 the largest lake in the Ukrainian Carpathians \u2014 and Bukovel, the largest ski resort in Eastern Europe.\nDay 8 (Lviv): the Theatre of Opera and Ballet, Market Square with the Town Hall, Black House, Venetian House (Chocolate Museum) and Pharmacy Museum, High Castle Hill, and the Vernissage market.",
      },
      BOOKING_FAQ,
    ],
    stats: [
      { value: "8", label: "Days" },
      { value: "3", label: "Cities" },
      { value: "2+", label: "Travelers" },
    ],
  },
];

export function getCountryTour(slug: string): CountryTourData | undefined {
  return COUNTRY_TOURS.find((country) => country.slug === slug);
}
