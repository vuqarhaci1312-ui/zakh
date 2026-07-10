import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import EventsListSection from "@/components/OurEvents/EventsListSection";
import { EVENTS } from "@/components/OurEvents/events-data";
import {
  JsonLd,
  eventListJsonLd,
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
    path: "/our-events",
    title: getStaticTranslation(locale, "meta.events.title", "Our Events | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.events.description",
      "Zakher Travel at international tourism exhibitions and travel trade events since 2016.",
    ),
  });
}

export default async function OurEventsPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.events.title", "Our Events | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.events.description",
    "Zakher Travel at international tourism exhibitions.",
  );

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ locale, path: "/our-events", title, description }),
          eventListJsonLd({
            locale,
            events: EVENTS.slice(0, 20).map((event) => ({
              name: event.title,
              description: event.description,
              image: event.images[0],
            })),
          }),
        ]}
      />
      <Navigation />
      <main>
        <EventsListSection />
      </main>
    </>
  );
}
