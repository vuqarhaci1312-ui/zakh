import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  title: "Admin | Zakher Travel",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
