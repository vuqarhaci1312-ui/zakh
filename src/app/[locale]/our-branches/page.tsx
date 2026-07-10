import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import BranchesSection from "@/components/OurBranches/BranchesSection";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/our-branches",
    title: getStaticTranslation(locale, "meta.branches.title", "Our Branches | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.branches.description",
      "Explore Zakher Travel branch destinations across Azerbaijan, Türkiye, Central Asia, Europe, and the Middle East.",
    ),
  });
}

export default async function OurBranchesPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.branches.title", "Our Branches | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.branches.description",
    "Explore Zakher Travel branch destinations.",
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ locale, path: "/our-branches", title, description })} />
      <Navigation />
      <main>
        <BranchesSection />
      </main>
    </>
  );
}
