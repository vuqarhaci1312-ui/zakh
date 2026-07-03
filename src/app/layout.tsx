import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter_Tight, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter-tight",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Zakher Travel",
  description:
    "Professional travel agency in Azerbaijan offering Baku city tours, Azerbaijan tour packages, visa support and unforgettable travel experiences across the Caucasus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${interTight.variable} ${bricolageGrotesque.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
