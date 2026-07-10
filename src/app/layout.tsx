import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bricolage_Grotesque, Inter_Tight, Playfair_Display } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers";
import WhatsAppFloatButton from "@/components/WhatsAppFloat/WhatsAppFloatButton";
import { isRtlLocale, type Locale } from "@/lib/i18n/language-data";
import { DEFAULT_LOCALE, isLocale } from "@/lib/seo/site-config";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = rootMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const headerLocale = headerStore.get("x-locale");
  const locale: Locale =
    headerLocale && isLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    <html
      lang={locale}
      dir={isRtlLocale(locale) ? "rtl" : "ltr"}
      className={`${interTight.variable} ${bricolageGrotesque.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.prod.website-files.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers initialLocale={locale}>
          {children}
          <Footer />
          <WhatsAppFloatButton />
        </Providers>
      </body>
    </html>
  );
}
