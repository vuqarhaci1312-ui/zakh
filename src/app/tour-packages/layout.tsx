import "../our-services/avenora.css";
import "./tour-packages.css";
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

export default function TourPackagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`avenora-page tour-packages-page ${interTight.variable}`}>
      <div className="page-wrapper">{children}</div>
    </div>
  );
}
