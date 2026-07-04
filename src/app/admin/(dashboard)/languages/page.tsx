import Link from "next/link";
import {
  ADMIN_LANGUAGE_SECTIONS,
  ADMIN_PAGE_GROUPS,
  getSectionsByGroup,
} from "@/lib/admin/page-sections";
import styles from "../../admin.module.css";

export default function AdminLanguagesOverviewPage() {
  return (
    <div>
      <div className={styles.dashboardHero}>
        <h1>Languages</h1>
        <p>
          Saytın hər səhifəsi üçün ayrıca tərcümə bölməsi. Dəyişmək istədiyiniz səhifəni seçin və
          AZ, EN, RU, AR dillərini redaktə edin.
        </p>
      </div>

      {ADMIN_PAGE_GROUPS.map((group) => {
        const sections = getSectionsByGroup(group.id);
        if (!sections.length) return null;

        return (
          <section key={group.id} style={{ marginBottom: 40 }}>
            <h2
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#94a3b8",
              }}
            >
              {group.labelAz}
            </h2>
            <div className={styles.sectionGrid}>
              {sections.map((section) => (
                <Link
                  key={section.id}
                  href={`/admin/languages/${section.id}`}
                  className={styles.sectionCard}
                >
                  <div className={styles.sectionCardTop}>
                    <span className={styles.sectionCardIcon}>{section.labelAz.charAt(0)}</span>
                    <span className={styles.sectionCardGroup}>{group.labelAz}</span>
                  </div>
                  <h3>{section.labelAz}</h3>
                  <p>{section.descriptionAz}</p>
                  <div className={styles.sectionCardFooter}>
                    <span>{section.namespaces.length} namespace</span>
                    <span>Edit →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <p style={{ fontSize: 13, color: "#94a3b8" }}>
        {ADMIN_LANGUAGE_SECTIONS.length} page sections available
      </p>
    </div>
  );
}
