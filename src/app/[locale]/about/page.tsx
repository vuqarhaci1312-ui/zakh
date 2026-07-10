import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";
import AboutIntro from "@/components/About/AboutIntro";
import AboutDmcPartner from "@/components/About/AboutDmcPartner";
import AboutMembers from "@/components/About/AboutMembers";
import AboutCharity from "@/components/About/AboutCharity";
import AboutCertificates from "@/components/About/AboutCertificates";
import Navigation from "@/components/Navigation/Navigation";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import styles from "@/components/About/About.module.css";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale } from "@/lib/seo/site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "az") as Locale;
  return buildPageMetadata({
    locale,
    path: "/about",
    title: getStaticTranslation(locale, "meta.about.title", "About Us | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.about.description",
      "Zakher Travel Group of Companies — professional travel agency in Azerbaijan since 2016.",
    ),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "az") as Locale;
  const title = getStaticTranslation(locale, "meta.about.title", "About Us | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.about.description",
    "Zakher Travel Group of Companies — professional travel agency in Azerbaijan since 2016.",
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ locale, path: "/about", title, description })} />
      <Navigation />
      <main className={styles.aboutPage}>
        <AboutHero />
        <AboutIntro />
        <AboutDmcPartner />
        <AboutMembers />
        <AboutCharity />
        <AboutCertificates />
      </main>
    </>
  );
}
