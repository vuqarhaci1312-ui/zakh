import type { Metadata } from "next";
import BrochuresSection from "@/components/OurServices/BrochuresSection";
import Navigation from "@/components/Navigation/Navigation";
import OurServiceSection from "@/components/OurServices/OurServiceSection";
import { OUR_SERVICES } from "@/components/OurServices/our-services-data";
import {
  JsonLd,
  definedTermSetJsonLd,
  serviceCatalogJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/our-services",
    title: getStaticTranslation(locale, "meta.services.title", "Our Services | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.services.description",
      "Tourist services, real estate, medical travel, MICE event planning, and downloadable tour brochures from Zakher Travel.",
    ),
  });
}

export default async function OurServicesPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.services.title", "Our Services | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.services.description",
    "Tourist services and brochures from Zakher Travel.",
  );

  const services = OUR_SERVICES.map((service) => ({
    name: service.title,
    description: service.description,
  }));

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ locale, path: "/our-services", title, description }),
          serviceCatalogJsonLd({ locale, services }),
          definedTermSetJsonLd({
            name: "Zakher Travel Service Taxonomy",
            terms: services,
          }),
        ]}
      />
      <Navigation />
      <main>
        <OurServiceSection />
        <BrochuresSection />
      </main>
    </>
  );
}
