"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import styles from "../admin.module.css";
import { getAdminMe, logoutAdmin, clearAdminToken, type AdminUser } from "@/lib/admin/api";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminMe()
      .then((data) => setUser(data.user))
      .catch(() => {
        clearAdminToken();
        router.replace("/admin");
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function handleLogout() {
    await logoutAdmin();
    router.replace("/admin");
  }

  if (loading) {
    return (
      <div className={styles.adminRoot}>
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className={styles.adminRoot}>
      <div className={styles.appShell}>
        <AdminHeader user={user} onLogout={() => void handleLogout()} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
