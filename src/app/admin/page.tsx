"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/admin/api";
import styles from "./admin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zakher.travel");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginAdmin(email.trim().toLowerCase(), password);
      router.replace("/?edit=1");
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

  return (
    <div className={styles.adminRoot}>
      <div className={styles.loginShell}>
        <form className={styles.loginCard} onSubmit={handleSubmit}>
          <h1 className={styles.loginTitle}>Zakher Admin</h1>
          <p className={styles.loginSubtitle}>Sign in to manage translations and content.</p>

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
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
