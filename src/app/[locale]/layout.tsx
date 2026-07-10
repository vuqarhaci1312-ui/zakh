import { notFound } from "next/navigation";
import {
  JsonLd,
  logoImageJsonLd,
  organizationJsonLd,
  siteNavigationJsonLd,
  websiteJsonLd,
} from "@/components/seo/JsonLd";
import SpeculationRules from "@/components/seo/SpeculationRules";
import { LOCALES, isLocale, type Locale } from "@/lib/seo/site-config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw as Locale;

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          logoImageJsonLd(),
          websiteJsonLd(locale),
          siteNavigationJsonLd(locale),
        ]}
      />
      <SpeculationRules locale={locale} />
      {children}
    </>
  );
}
