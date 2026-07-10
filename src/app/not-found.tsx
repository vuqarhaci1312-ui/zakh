import type { Metadata } from "next";
import Link from "next/link";
import { DEFAULT_LOCALE } from "@/lib/seo/site-config";
import { localePath } from "@/lib/i18n/locale-path";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        padding: "4rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>404</h1>
        <p style={{ marginBottom: "1.5rem", color: "#52525b" }}>
          The page you are looking for could not be found.
        </p>
        <Link
          href={localePath(DEFAULT_LOCALE, "/")}
          style={{ color: "#ff8c00", fontWeight: 600 }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
