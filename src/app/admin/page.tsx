"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAdminMe, loginAdmin } from "@/lib/admin/api";
import { getAdminMode, setAdminMode, type AdminLoginMode } from "@/lib/admin/admin-mode";
import styles from "./admin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zakher.travel");
  const [password, setPassword] = useState("");
  const [loginMode, setLoginMode] = useState<AdminLoginMode>("normal");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    getAdminMe()
      .then(() => {
        const mode = getAdminMode() ?? "normal";
        router.replace(mode === "language" ? "/az/?edit=1" : "/admin/dashboard");
      })
      .catch(() => setCheckingSession(false));
  }, [router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin(email.trim().toLowerCase(), password);
      setAdminMode(loginMode);
      router.replace(loginMode === "language" ? "/az/?edit=1" : "/admin/dashboard");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
        setError("API ilə əlaqə qurulmadı. NEXT_PUBLIC_API_URL düzgün qurulubmu yoxlayın.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <div className={styles.adminRoot}>
        <div className={styles.loginShell}>
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>Yoxlanılır...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminRoot}>
      <div className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={handleSubmit}>
          <h1 className={styles.loginTitle}>Zakher Admin</h1>
          <p className={styles.loginSubtitle}>Giriş rejimini seçin və hesab məlumatlarını daxil edin.</p>

          <div className={styles.loginModeGrid}>
            <button
              type="button"
              className={`${styles.loginModeCard}${loginMode === "language" ? ` ${styles.loginModeCardActive}` : ""}`}
              onClick={() => setLoginMode("language")}
            >
              <strong>Language</strong>
              <span>Saytda məzmun redaktəsi (4 dil)</span>
            </button>
            <button
              type="button"
              className={`${styles.loginModeCard}${loginMode === "normal" ? ` ${styles.loginModeCardActive}` : ""}`}
              onClick={() => setLoginMode("normal")}
            >
              <strong>Normal</strong>
              <span>Admin panel — kataloq, turlar, sosial media...</span>
            </button>
          </div>

          {error ? <p className={styles.errorText}>{error}</p> : null}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.primaryButton} disabled={loading}>
            {loading ? "Giriş edilir..." : loginMode === "language" ? "Language ilə daxil ol" : "Admin panelə daxil ol"}
          </button>
        </form>
      </div>
    </div>
  );
}
