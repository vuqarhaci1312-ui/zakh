import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";
import { ORGANIZATION, SITE_NAME } from "@/lib/seo/site-config";

type PageProps = { params: Promise<{ locale: string }> };

const CONTENT = {
  en: {
    title: "Privacy Policy",
    description: "How Zakher Travel collects, uses, and protects your personal information.",
    body: [
      "Zakher Travel Group of Companies (“Zakher Travel”, “we”, “us”) respects your privacy and is committed to protecting personal data you share with us when using zakher.travel or contacting our offices.",
      "We may collect contact details (name, email, phone), travel preferences, and booking-related information needed to provide tour packages, destination management, and customer support.",
      "Personal data is used to respond to inquiries, process reservations, improve our services, and communicate offers you request. We do not sell personal data to third parties.",
      "Data may be shared with trusted partners (hotels, transport providers, payment processors) only as required to deliver booked services, or when required by law.",
      "You may request access, correction, or deletion of your personal data by contacting info@zakher.travel or +994 12 310 09 32.",
      `Our head office is located at ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.postalCode}, Azerbaijan.`,
    ],
  },
  az: {
    title: "Məxfilik Siyasəti",
    description: "Zakher Travel şəxsi məlumatlarınızı necə toplayır, istifadə edir və qoruyur.",
    body: [
      "Zakher Travel Şirkətlər Qrupu (“Zakher Travel”) zakher.travel saytından və ofislərimizdən istifadə edərkən paylaşdığınız şəxsi məlumatların qorunmasına sadiqdir.",
      "Biz tur paketləri, təyinat idarəetməsi və müştəri dəstəyi üçün ad, e-poçt, telefon, səyahət üstünlükləri və bron məlumatlarını toplaya bilərik.",
      "Şəxsi məlumatlar sorğulara cavab vermək, rezervasiyaları emal etmək və xidmətləri təkmilləşdirmək üçün istifadə olunur. Biz şəxsi məlumatları üçüncü tərəflərə satmırıq.",
      "Məlumatlar yalnız bron edilmiş xidmətlərin göstərilməsi üçün etibarlı tərəfdaşlarla və ya qanun tələb etdikdə paylaşılır.",
      "Məlumatlarınıza giriş, düzəliş və ya silinmə üçün info@zakher.travel və ya +994 12 310 09 32 ilə əlaqə saxlayın.",
      `Baş ofisimiz: ${ORGANIZATION.address.streetAddress}, ${ORGANIZATION.address.addressLocality}, ${ORGANIZATION.address.postalCode}, Azərbaycan.`,
    ],
  },
} as const;

function getContent(locale: string) {
  return locale === "az" ? CONTENT.az : CONTENT.en;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocale((await params).locale);
  const content = getContent(locale);
  return buildPageMetadata({
    locale,
    path: "/privacy-policy",
    title: getStaticTranslation(locale, "meta.privacy.title", `${content.title} | ${SITE_NAME}`),
    description: getStaticTranslation(locale, "meta.privacy.description", content.description),
  });
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          locale,
          path: "/privacy-policy",
          title: content.title,
          description: content.description,
        })}
      />
      <Navigation />
      <main style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>{content.title}</h1>
        {content.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} style={{ marginBottom: "1rem", lineHeight: 1.7, color: "#3f3f46" }}>
            {paragraph}
          </p>
        ))}
      </main>
    </>
  );
}
