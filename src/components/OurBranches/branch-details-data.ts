export type BranchContact = {
  locationLabel: string;
  address?: string;
  phones?: string[];
  email?: string;
  website?: string;
  mapLink?: string;
};

export type BranchDetail = {
  slug: string;
  title: string;
  description: string[];
  contact: BranchContact;
  image: string;
};

export const BRANCH_DETAILS: BranchDetail[] = [
  {
    slug: "azerbaijan",
    title: "Azerbaijan",
    description: [
      "Azerbaijan, often called the “Land of Fire,” is where East meets West and ancient civilizations have left their mark. From the bustling streets of Baku to historic towns and ancient monuments, the country offers a rich cultural experience.",
      "Its landscapes—from the Caspian Sea coastline to high plateaus, mountains, and lush valleys—create a harmony that enchants travelers with heritage, nature, and vibrant culture.",
    ],
    contact: {
      locationLabel: "Baku, Azerbaijan",
      address: "73 Huseyn Javid Ave, Baku 1073",
      phones: ["+994 12 310 09 32", "+994 50 253 22 09"],
      email: "incoming@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/azerbaijan.jpg",
  },
  {
    slug: "turkiye",
    title: "Turkiye",
    description: [
      "Often described as a bridge between East and West, Turkey is a land where civilizations have met for thousands of years. With a history stretching back over 10,000 years, it has been home to ancient empires whose traces are visible in its cities, monuments, and traditions.",
      "Turkey is rich in cultural heritage and historical depth. Its diverse landscapes range from Mediterranean and Aegean coastlines to high plateaus, mountains, and fertile valleys, creating a dynamic connection between nature, history, and modern life.",
    ],
    contact: {
      locationLabel: "Trabzon, Türkiye",
      address: "Çarşı, Tabakhane Sk., 61200 Ortahisar/Trabzon, Türkiye",
      phones: ["+905521792820"],
      email: "turkiye@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/turkiye.jpg",
  },
  {
    slug: "kazakhstan",
    title: "Kazakhstan",
    description: [
      "Kazakhstan, the heart of the Great Steppes, stretches across vast plains, deserts, serene lakes, and towering mountains. Here, nomadic heritage blends with modern urban life, creating a dynamic and multicultural society.",
      "Travelers are fascinated by its breathtaking nature, nomadic exoticism, and a striking modern contrast.",
    ],
    contact: {
      locationLabel: "Almaty, Kazakhstan",
      address: "Nurlytau Business Center, Almaty, Kazakhstan",
      phones: ["+7 707 253 2200"],
      email: "kazakhstan@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/kazakhstan.jpg",
  },
  {
    slug: "kyrgyzstan",
    title: "Kyrgyzstan",
    description: [
      "Often called the land of celestial mountains, Kyrgyzstan is an ancient homeland of nomadic culture with a history rooted in freedom and close connection to nature. The country is dominated by dramatic mountain ranges, alpine meadows, glaciers, and high-altitude lakes.",
      "These landscapes have shaped a culture based on mobility, endurance, and harmony with the environment. Kyrgyzstan preserves strong traditions of oral heritage, horsemanship, and communal values.",
    ],
    contact: {
      locationLabel: "Bishkek, Kyrgyzstan",
      address: "Chuykova 134/1 22, Bishkek",
      phones: ["+996777532200", "+971565902100"],
      email: "kyrgyzstan@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/kyrgyzstan.jpg",
  },
  {
    slug: "uzbekistan",
    title: "Uzbekistan",
    description: [
      "Uzbekistan, a jewel of the Great Silk Road, boasts cities like Samarkand, Bukhara, and Khiva, where stunning architecture and vibrant arts tell the story of a thriving past.",
      "Rich traditions and colorful history make every visit unforgettable. Travelers enjoy its history, art, and ancient culture.",
    ],
    contact: {
      locationLabel: "Uzbekistan",
      address: "Uzbekistan",
      phones: ["+998971119386"],
      email: "uzbekistan@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/uzbekistan.jpg",
  },
  {
    slug: "georgia",
    title: "Georgia",
    description: [
      "Georgia, with a history spanning over 8,000 years, offers landscapes ranging from the peaks of the Caucasus Mountains to fertile valleys and subtropical coasts. Ancient traditions live alongside modern life, creating a warm and resilient society.",
      "Georgia’s identity is deeply tied to its land, language, and historical continuity.",
    ],
    contact: {
      locationLabel: "Tbilisi, Georgia",
      address: "str Merab Kostava St, Tbilisi 0179, Georgia",
      phones: ["+995579992200", "+995597991910"],
      email: "georgia@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/georgia.jpg",
  },
  {
    slug: "poland",
    title: "Poland",
    description: [
      "Located in the heart of Europe, Poland has a long and complex history marked by resilience and cultural continuity. Its landscapes include vast plains, forests, lakes, and a Baltic Sea coastline, as well as mountain ranges in the south.",
      "Poland is rich in historical landmarks, intellectual traditions, and cultural heritage.",
    ],
    contact: {
      locationLabel: "Poland",
      address: "Poland",
      phones: ["+48666362201"],
      email: "incoming@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/poland.jpg",
  },
  {
    slug: "czech-republic",
    title: "Czech Republic",
    description: [
      "Known for its medieval cities and rich cultural legacy, the Czech Republic has been a center of art, philosophy, and craftsmanship for centuries. The country’s landscape is characterized by rolling hills, river valleys, forests, and historic towns integrated into the natural environment.",
      "This balance between nature and urban heritage contributes to its cultural refinement and architectural harmony.",
    ],
    contact: {
      locationLabel: "Czech Republic",
      address: "Czech Republic",
      phones: ["+48666362201"],
      email: "incoming@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/czech-republic.jpg",
  },
  {
    slug: "russia",
    title: "Russia",
    description: [
      "Spanning Eastern Europe and Northern Asia, Russia is one of the world’s most geographically vast and culturally complex countries. Its landscapes range from tundra and taiga forests to mountains, rivers, steppes, and Arctic coastlines.",
      "This immense natural diversity has shaped regional identities and historical development. Russia is known for its cultural depth, literary tradition and astonishing natural landscapes.",
    ],
    contact: {
      locationLabel: "Moscow, Russia",
      address: "Moscow, str. Kirpichniye Viyemki, 2, corp 1",
      phones: ["+79995532220"],
      email: "russia@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/russia.jpg",
  },
  {
    slug: "uae",
    title: "United Arab Emirates",
    description: [
      "Known as a symbol of rapid development and innovation, the United Arab Emirates has transformed from a desert-based society into a global hub within a few decades. Its landscape is defined by vast deserts, coastal areas along the Arabian Gulf, and modern urban centers rising from arid land.",
      "Rooted in Bedouin traditions and Islamic values, the UAE reflects a balance between heritage, environment, and technological progress.",
    ],
    contact: {
      locationLabel: "Zakher Travel FZC",
      address: "Sharjah International Airport - منطقة حرة - Sharjah - UAE",
      phones: ["+971565902100"],
      email: "incoming@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/uae.jpeg",
  },
  {
    slug: "ukraine",
    title: "Ukraine",
    description: [
      "Ukraine, a land of fertile plains, majestic mountains, and vibrant rivers, reflects centuries of culture through its cities and countryside. Kyiv’s golden domes, Lviv’s charming streets, and the Carpathian Mountains highlight its natural beauty.",
      "The country is known for resilience, hospitality, and rich folk heritage.",
    ],
    contact: {
      locationLabel: "Ukraine",
      address: "Ukraine",
      email: "incoming@zakher.travel",
      website: "zakher.travel",
    },
    image: "/branches/details/ukraine.jpg",
  },
  {
    slug: "saudi-arabia",
    title: "Saudi Arabia",
    description: [
      "Saudi Arabia, a land of deep heritage and rapid transformation, stands at the heart of the Arabian Peninsula. From Riyadh’s modern business districts to Jeddah’s Red Sea coastline and the Kingdom’s historic sites, the country offers a compelling blend of tradition, hospitality, and innovation.",
      "Through our Saudi Arabia branch, Zakher Travel supports international partners with destination management, MICE programs, group travel, and luxury itineraries across the Kingdom — backed by local expertise and reliable on-the-ground coordination.",
    ],
    contact: {
      locationLabel: "Riyadh, Saudi Arabia",
      address: "Riyadh, Saudi Arabia",
      email: "ksa@zakher.travel",
      website: "zakher.travel",
      mapLink: "https://maps.app.goo.gl/BGmg7r576opqB5aT6?g_st=ic",
    },
    image: "/branches/details/saudi-arabia.png",
  },
];

export const BRANCH_DETAILS_BY_SLUG = Object.fromEntries(
  BRANCH_DETAILS.map((branch) => [branch.slug, branch]),
) as Record<string, BranchDetail>;

export function getBranchDetail(slug: string): BranchDetail | undefined {
  return BRANCH_DETAILS_BY_SLUG[slug];
}
