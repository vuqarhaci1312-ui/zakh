"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./cms.module.css";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/catalogs", label: "Kataloqlar" },
  { href: "/admin/tours", label: "Tur paketləri" },
  { href: "/admin/social-media", label: "Sosial media" },
  { href: "/admin/events", label: "Tədbirlər" },
  { href: "/admin/certificates", label: "Sertifikatlar" },
  { href: "/admin/languages", label: "Dillər" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <span className={styles.sidebarMark}>Z</span>
        <div>
          <strong>Zakher CMS</strong>
          <small>Məzmun idarəetməsi</small>
        </div>
      </div>
      <nav className={styles.sidebarNav}>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.sidebarLink}${
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? ` ${styles.sidebarLinkActive}`
                : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
