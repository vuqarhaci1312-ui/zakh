"use client";

import { useRef, useState } from "react";
import { uploadAdminFile } from "@/lib/admin/content-api";
import adminStyles from "@/app/admin/admin.module.css";
import styles from "./cms.module.css";

type MediaUploaderProps = {
  label: string;
  folder: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
};

export default function MediaUploader({
  label,
  folder,
  value,
  onChange,
  accept = "image/*,.pdf,video/mp4",
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const result = await uploadAdminFile(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.mediaUploader}>
      <div className={styles.formField}>
        <label>{label}</label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL və ya fayl yükləyin"
        />
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      <div className={styles.rowActions}>
        <button type="button" className={adminStyles.secondaryButton} disabled={uploading} onClick={() => inputRef.current?.click()}>
          {uploading ? "Yüklənir..." : "Fayl yüklə"}
        </button>
        {value ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className={adminStyles.ghostButton}>
            Önizləmə
          </a>
        ) : null}
      </div>
      {error ? <p className={adminStyles.errorText}>{error}</p> : null}
      {value && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(value) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className={styles.mediaPreview} />
      ) : null}
    </div>
  );
}
