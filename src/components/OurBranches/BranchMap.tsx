"use client";

import { getBranchMapEmbedUrl } from "./branch-map";
import styles from "./BranchDetail.module.css";

type BranchMapProps = {
  query: string;
  title: string;
  mapLink?: string;
};

export default function BranchMap({ query, title, mapLink }: BranchMapProps) {
  if (!query.trim()) {
    return null;
  }

  const map = (
    <iframe
      title={title}
      src={getBranchMapEmbedUrl(query)}
      className={styles.mapIframe}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );

  return (
    <div className={styles.mapWrap}>
      {mapLink ? (
        <a href={mapLink} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
          {map}
        </a>
      ) : (
        map
      )}
    </div>
  );
}
