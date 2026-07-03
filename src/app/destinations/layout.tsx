import "./caladan.css";
import { IBM_Plex_Mono } from "next/font/google";
import Navigation from "@/components/Navigation/Navigation";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export default function DestinationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className={`caladan-page ${ibmPlexMono.variable}`}>
        <div className="page-wrapper">{children}</div>
      </div>
    </>
  );
}
