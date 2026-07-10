import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import FollowUsSection from "@/components/SocialMedia/FollowUsSection";
import InstagramSection from "@/components/SocialMedia/InstagramSection";
import YouTubeSection from "@/components/SocialMedia/YouTubeSection";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  return buildPageMetadata({
    locale,
    path: "/social-media",
    title: getStaticTranslation(locale, "meta.social.title", "Social Media | Zakher Travel"),
    description: getStaticTranslation(
      locale,
      "meta.social.description",
      "Follow Zakher Travel on Facebook, Instagram, YouTube, TikTok, LinkedIn, and more.",
    ),
  });
}

export default async function SocialMediaPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const title = getStaticTranslation(locale, "meta.social.title", "Social Media | Zakher Travel");
  const description = getStaticTranslation(
    locale,
    "meta.social.description",
    "Follow Zakher Travel on social media.",
  );

  return (
    <>
      <JsonLd data={webPageJsonLd({ locale, path: "/social-media", title, description })} />
      <Navigation />
      <main>
        <FollowUsSection />
        <InstagramSection />
        <YouTubeSection />
      </main>
    </>
  );
}
