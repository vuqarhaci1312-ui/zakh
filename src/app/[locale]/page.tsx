import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import WeMembersOf from "@/components/WeMembersOf/WeMembersOf";
import {
  JsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { isLocale, type Locale } from "@/lib/seo/site-config";

const WhyChooseUsFeatures = dynamic(
  () => import("@/components/WhyChooseUsFeatures/WhyChooseUsFeatures"),
);
const RelatedPackages = dynamic(() => import("@/components/RelatedPackages/RelatedPackages"));
const CustomerReviews = dynamic(() => import("@/components/CustomerReviews/CustomerReviews"));

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ edit?: string }>;
};

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const { edit } = await searchParams;
  const locale = (isLocale(raw) ? raw : "az") as Locale;
  const title = getStaticTranslation(locale, "meta.home.title", "Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.home.description",
    "Professional travel agency in Azerbaijan offering Baku city tours, Azerbaijan tour packages, visa support and unforgettable travel experiences across the Caucasus.",
  );
  const metadata = buildPageMetadata({ locale, path: "/", title, description });
  if (edit === "1") {
    return { ...metadata, robots: { index: false, follow: false } };
  }
  return metadata;
}

export default async function Home({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "az") as Locale;
  const title = getStaticTranslation(locale, "meta.home.title", "Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.home.description",
    "Professional travel agency in Azerbaijan offering Baku city tours and tour packages.",
  );

  return (
    <main>
      <JsonLd
        data={webPageJsonLd({
          locale,
          path: "/",
          title,
          description,
          speakableSelectors: ["[data-speakable='hero-title']", "[data-seo-summary]"],
        })}
      />
      <Navigation />
      <Hero />
      <WhyChooseUsFeatures />
      <WhyChooseUs />
      <WeMembersOf />
      <RelatedPackages />
      <CustomerReviews />
    </main>
  );
}
