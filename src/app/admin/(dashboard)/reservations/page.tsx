"use client";

import { useEffect, useState } from "react";
import adminStyles from "@/app/admin/admin.module.css";
import AdminPageHeader from "@/components/admin/cms/AdminPageHeader";
import cmsStyles from "@/components/admin/cms/cms.module.css";
import {
  contentAdminApi,
  type ReservationRecord,
  type ReservationStatus,
} from "@/lib/admin/content-api";

const STATUS_LABELS: Record<ReservationStatus, string> = {
  new: "Yeni",
  contacted: "Əlaqə saxlanılıb",
  confirmed: "Təsdiqlənib",
  cancelled: "Ləğv edilib",
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("az-AZ");
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("az-AZ");
}

export default function ReservationsAdminPage() {
  const [items, setItems] = useState<ReservationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await contentAdminApi.reservations.list();
      setItems(data.items);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Yükləmə alınmadı");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: ReservationStatus) {
    await contentAdminApi.reservations.updateStatus(id, status);
    await load();
  }

  async function removeItem(id: string) {
    if (!window.confirm("Bu rezervasiyanı silmək istəyirsiniz?")) return;
    await contentAdminApi.reservations.remove(id);
    await load();
  }

  return (
    <div>
      <AdminPageHeader
        title="Rezervasiyalar"
        description="Tur paketləri səhifəsindən gələn rezerv sorğuları."
      />

      {error ? <p className={adminStyles.errorText}>{error}</p> : null}
      {loading ? <p>Yüklənir...</p> : null}

      {!loading && items.length === 0 ? (
        <div className={cmsStyles.card}>
          <p style={{ margin: 0 }}>Hələ rezervasiya yoxdur.</p>
        </div>
      ) : null}

      {!loading && items.length > 0 ? (
        <div className={cmsStyles.cardGrid}>
          {items.map((item) => (
            <article key={item.id} className={cmsStyles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                <div>
                  <h2 style={{ margin: "0 0 8px" }}>
                    {item.firstName} {item.lastName}
                  </h2>
                  <p style={{ margin: 0, color: "#64748b" }}>
                    {item.tourTitle} · {item.countrySlug}/{item.tourSlug}
                  </p>
                </div>
                <select
                  value={item.status}
                  onChange={(event) =>
                    void updateStatus(item.id, event.target.value as ReservationStatus)
                  }
                >
                  {(Object.keys(STATUS_LABELS) as ReservationStatus[]).map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gap: 8, marginTop: 16 }}>
                <div>
                  <strong>Mövzu:</strong> {item.subject}
                </div>
                <div>
                  <strong>Tarix:</strong> {formatDate(item.dateFrom)} – {formatDate(item.dateTo)}
                </div>
                {item.phone ? (
                  <div>
                    <strong>Telefon:</strong> {item.phone}
                  </div>
                ) : null}
                {item.email ? (
                  <div>
                    <strong>E-poçt:</strong> {item.email}
                  </div>
                ) : null}
                <div>
                  <strong>Göndərilib:</strong> {formatDateTime(item.createdAt)}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button
                  type="button"
                  className={adminStyles.dangerButton}
                  onClick={() => void removeItem(item.id)}
                >
                  Sil
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
