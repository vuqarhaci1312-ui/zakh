export type AdminPageSection = {
  id: string;
  label: string;
  labelAz: string;
  description: string;
  descriptionAz: string;
  namespaces: string[];
  group: "pages" | "layout" | "content" | "system";
};

export type AdminPageGroup = {
  id: AdminPageSection["group"];
  label: string;
  labelAz: string;
};

export const ADMIN_PAGE_GROUPS: AdminPageGroup[] = [
  { id: "pages", label: "Pages", labelAz: "Səhifələr" },
  { id: "layout", label: "Layout", labelAz: "Struktur" },
  { id: "content", label: "Content", labelAz: "Məzmun" },
  { id: "system", label: "System", labelAz: "Sistem" },
];

export const ADMIN_LANGUAGE_SECTIONS: AdminPageSection[] = [
  {
    id: "home",
    label: "Home",
    labelAz: "Ana səhifə",
    description: "Hero banner, why choose us, statistics, lagoon collection, destinations and packages.",
    descriptionAz: "Hero banner, niyə bizi seçin, statistika, kolleksiya, marşrutlar və paketlər.",
    namespaces: ["hero", "whyChooseUs", "stats", "lagoon", "packages", "reviews", "destinations", "tourPackages", "meta"],
    group: "pages",
  },
  {
    id: "about",
    label: "About",
    labelAz: "Haqqımızda",
    description: "About page headings, story and team content.",
    descriptionAz: "Haqqımızda səhifəsinin başlıqları və mətnləri.",
    namespaces: ["about"],
    group: "pages",
  },
  {
    id: "contact",
    label: "Contact",
    labelAz: "Əlaqə",
    description: "Contact page form labels, titles and messages.",
    descriptionAz: "Əlaqə səhifəsi forması, başlıqlar və mesajlar.",
    namespaces: ["contact"],
    group: "pages",
  },
  {
    id: "navigation",
    label: "Navigation",
    labelAz: "Naviqasiya",
    description: "Main menu links and labels across the site.",
    descriptionAz: "Saytın əsas menyu linkləri və adları.",
    namespaces: ["nav"],
    group: "layout",
  },
  {
    id: "footer",
    label: "Footer",
    labelAz: "Footer",
    description: "Footer columns, links and copyright text.",
    descriptionAz: "Footer sütunları, linklər və müəllif hüququ mətni.",
    namespaces: ["footer"],
    group: "layout",
  },
  {
    id: "services",
    label: "Services",
    labelAz: "Xidmətlər",
    description: "Our services and Caladan section content.",
    descriptionAz: "Xidmətlər və Caladan bölməsinin mətnləri.",
    namespaces: ["services", "caladan"],
    group: "content",
  },
  {
    id: "tours",
    label: "Tours",
    labelAz: "Turlar",
    description: "Tour listings, country pages and destination details.",
    descriptionAz: "Tur siyahıları, ölkə səhifələri və marşrut detalları.",
    namespaces: ["tours", "country"],
    group: "content",
  },
  {
    id: "events",
    label: "Events",
    labelAz: "Tədbirlər",
    description: "Events page cards, dates and descriptions.",
    descriptionAz: "Tədbirlər səhifəsi kartları, tarixlər və təsvirlər.",
    namespaces: ["events"],
    group: "content",
  },
  {
    id: "branches",
    label: "Branches",
    labelAz: "Filiallar",
    description: "Branch locations, addresses and contact info.",
    descriptionAz: "Filial ünvanları və əlaqə məlumatları.",
    namespaces: ["branches"],
    group: "content",
  },
  {
    id: "social",
    label: "Social Media",
    labelAz: "Sosial media",
    description: "Social media section headings and labels.",
    descriptionAz: "Sosial media bölməsinin başlıqları və etiketləri.",
    namespaces: ["social"],
    group: "content",
  },
  {
    id: "brochures",
    label: "Brochures",
    labelAz: "Broşürlər",
    description: "Downloadable brochure titles and descriptions.",
    descriptionAz: "Broşür adları və təsvirləri.",
    namespaces: ["brochures"],
    group: "content",
  },
  {
    id: "ui",
    label: "Common UI",
    labelAz: "Ümumi UI",
    description: "Shared buttons, labels and reusable interface text.",
    descriptionAz: "Ortaq düymələr, etiketlər və interfeys mətnləri.",
    namespaces: ["ui"],
    group: "system",
  },
];

export function getPageSection(id: string) {
  return ADMIN_LANGUAGE_SECTIONS.find((section) => section.id === id);
}

export function getSectionsByGroup(group: AdminPageSection["group"]) {
  return ADMIN_LANGUAGE_SECTIONS.filter((section) => section.group === group);
}
