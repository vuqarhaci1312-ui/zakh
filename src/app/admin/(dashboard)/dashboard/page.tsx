import Link from "next/link";
import { ADMIN_LANGUAGE_SECTIONS, ADMIN_PAGE_GROUPS } from "@/lib/admin/page-sections";
import styles from "../../admin.module.css";

export default function AdminDashboardPage() {
  const pageCount = ADMIN_LANGUAGE_SECTIONS.filter((s) => s.group === "pages").length;

  return (
    <div>
      <div className={styles.dashboardHero}>
        <h1>Dashboard</h1>
        <p>
          Welcome to Zakher Travel content management. Manage translations by page, review content
          sections and keep all four languages in sync.
        </p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <strong>{ADMIN_LANGUAGE_SECTIONS.length}</strong>
          <span>Content sections</span>
        </div>
        <div className={styles.statCard}>
          <strong>4</strong>
          <span>Languages (AZ, EN, RU, AR)</span>
        </div>
        <div className={styles.statCard}>
          <strong>{pageCount}</strong>
          <span>Site pages</span>
        </div>
        <div className={styles.statCard}>
          <strong>{ADMIN_PAGE_GROUPS.length}</strong>
          <span>Content groups</span>
        </div>
      </div>

      <h2
        style={{
          margin: "0 0 16px",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Quick access
      </h2>
      <div className={styles.sectionGrid}>
        {ADMIN_LANGUAGE_SECTIONS.slice(0, 6).map((section) => (
          <Link
            key={section.id}
            href={`/admin/languages/${section.id}`}
            className={styles.sectionCard}
          >
            <div className={styles.sectionCardTop}>
              <span className={styles.sectionCardIcon}>{section.labelAz.charAt(0)}</span>
            </div>
            <h3>{section.labelAz}</h3>
            <p>{section.descriptionAz}</p>
            <div className={styles.sectionCardFooter}>
              <span>{section.label}</span>
              <span>Edit →</span>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ marginTop: 24 }}>
        <Link href="/admin/languages" style={{ color: "#ff8c00", fontWeight: 600, textDecoration: "none" }}>
          View all page sections →
        </Link>
      </p>
    </div>
  );
}
