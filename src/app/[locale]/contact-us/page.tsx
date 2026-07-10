import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import ContactSection from "@/components/Contact/ContactSection";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/contact-us",
    title: getStaticTranslation(locale, "meta.contact.title", "Contact Us | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.contact.description",
      "Contact Zakher Travel head office in Baku or UAE office for tour packages, bookings, and travel support.",
    ),
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.contact.title", "Contact Us | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.contact.description",
    "Contact Zakher Travel for tour packages and travel support.",
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ locale, path: "/contact-us", title, description })} />
      <Navigation />
      <main>
        <ContactSection />
      </main>
    </>
  );
}
