"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import adminStyles from "@/app/admin/admin.module.css";
import cmsStyles from "@/components/admin/cms/cms.module.css";
import AdminPageHeader from "@/components/admin/cms/AdminPageHeader";
import { contentAdminApi } from "@/lib/admin/content-api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    contentAdminApi.stats().then(setStats).catch(() => setStats(null));
  }, []);

  const cards = [
    { href: "/admin/catalogs", label: "Kataloqlar", count: stats?.brochures },
    { href: "/admin/tours", label: "Tur paketləri", count: stats?.tours },
    { href: "/admin/reservations", label: "Rezervasiyalar", count: stats?.reservations },
    { href: "/admin/social-media", label: "Sosial media", count: (stats?.socialLinks ?? 0) + (stats?.instagram ?? 0) },
    { href: "/admin/events", label: "Tədbirlər", count: stats?.events },
    { href: "/admin/certificates", label: "Sertifikatlar", count: stats?.certificates },
    { href: "/admin/languages", label: "Dillər", count: "4 dil" },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Zakher Travel məzmun idarəetmə paneli. Sol menyudan modul seçin."
      />

      <div className={adminStyles.statsGrid}>
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={adminStyles.statCard}>
            <strong>{card.count ?? "—"}</strong>
            <span>{card.label}</span>
          </Link>
        ))}
      </div>

      <div className={`${cmsStyles.card} ${cmsStyles.cardGrid}`}>
        <h2 style={{ margin: 0 }}>Tez başlanğıc</h2>
        <p style={{ margin: 0, color: "#64748b" }}>
          Hər modulda 4 dil tab-ı var (AZ, EN, RU, AR). Publish etmək üçün bütün dillər doldurulmalıdır.
          Draft save ilə yarımçıq saxlaya bilərsiniz.
        </p>
      </div>
    </div>
  );
}
