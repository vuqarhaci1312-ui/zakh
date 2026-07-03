export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  enabled?: boolean;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    id: "languages",
    label: "Languages",
    href: "/admin/languages",
    enabled: true,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/admin/dashboard",
    enabled: true,
  },
];
