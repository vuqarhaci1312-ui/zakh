import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import WhoWeAreDetailSection from "@/components/About/WhoWeAreDetailSection";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import styles from "@/components/About/About.module.css";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/who-we-are",
    title: getStaticTranslation(locale, "meta.whoWeAre.title", "Who We Are | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.whoWeAre.description",
      "Learn about Zakher Travel Group of Companies — our history since 2016, international exhibitions, quality policy, and company profile.",
    ),
  });
}

export default async function WhoWeArePage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.whoWeAre.title", "Who We Are | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.whoWeAre.description",
    "Learn about Zakher Travel Group of Companies.",
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ locale, path: "/who-we-are", title, description })} />
      <Navigation />
      <main className={styles.aboutPage}>
        <WhoWeAreDetailSection />
      </main>
    </>
  );
}
