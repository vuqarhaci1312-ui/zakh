"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ADMIN_NAV_ITEMS } from "../admin-nav-config";
import styles from "../admin.module.css";
import { getAdminMe, logoutAdmin, type AdminUser } from "@/lib/admin/api";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminMe()
      .then((data) => setUser(data.user))
      .catch(() => router.replace("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await logoutAdmin();
    router.replace("/admin");
  }

  if (loading) {
    return (
      <div className={styles.adminRoot}>
        <div className={styles.loginShell}>Loading admin panel...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.adminRoot}>
      <div className={styles.dashboardShell}>
        <aside className={styles.sidebar}>
          <p className={styles.brand}>Zakher Admin</p>
          <nav className={styles.navList}>
            {ADMIN_NAV_ITEMS.filter((item) => item.enabled !== false).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${styles.navLink} ${pathname.startsWith(item.href) ? styles.navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className={styles.mainArea}>
          <header className={styles.topbar}>
            <h1 className={styles.topbarTitle}>Content Management</h1>
            <div className={styles.topbarActions}>
              <span>{user.email}</span>
              <button type="button" className={styles.secondaryButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </header>
          <main className={styles.content}>{children}</main>
        </div>
      </div>
    </div>
  );
}
