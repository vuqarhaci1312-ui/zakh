import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import { JsonLd, webPageJsonLd } from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale } from "@/lib/seo/locale-params";
import { SITE_NAME } from "@/lib/seo/site-config";

type PageProps = { params: Promise<{ locale: string }> };

const CONTENT = {
  en: {
    title: "Terms of Use",
    description: "Terms governing the use of Zakher Travel websites and travel services.",
    body: [
      "By accessing zakher.travel or booking services with Zakher Travel Group of Companies, you agree to these Terms of Use.",
      "Tour packages, prices, itineraries, and availability are subject to change. Final booking confirmations, inclusions, and exclusions are provided in writing by our team.",
      "You are responsible for providing accurate traveler information, valid travel documents, visas, and insurance as required for your destination.",
      "Cancellations, changes, and refunds follow the conditions stated in your booking confirmation and applicable supplier policies.",
      "Website content is provided for informational purposes. Zakher Travel is not liable for temporary service interruptions or third-party website content linked from our pages.",
      "For questions about these terms, contact info@zakher.travel or +994 12 310 09 32.",
    ],
  },
  az: {
    title: "İstifadə Şərtləri",
    description: "Zakher Travel vebsaytı və səyahət xidmətlərinin istifadəsini tənzimləyən şərtlər.",
    body: [
      "zakher.travel saytına daxil olmaqla və ya Zakher Travel Şirkətlər Qrupundan xidmət bron etməklə bu İstifadə Şərtlərini qəbul edirsiniz.",
      "Tur paketləri, qiymətlər, marşrutlar və mövcudluq dəyişə bilər. Yekun təsdiq, daxil olan və olmayan xidmətlər komandamız tərəfindən yazılı şəkildə təqdim olunur.",
      "Səyahətçi məlumatlarının, etibarlı sənədlərin, viza və sığortanın təmin edilməsi sizin məsuliyyətinizdədir.",
      "Ləğvetmə, dəyişiklik və geri ödənişlər bron təsdiqində və təchizatçı siyasətlərində göstərilən şərtlərə əsasən aparılır.",
      "Sayt məzmunu məlumat məqsədlidir. Müvəqqəti fasilələr və üçüncü tərəf keçidləri üçün Zakher Travel məsuliyyət daşımır.",
      "Suallar üçün: info@zakher.travel və ya +994 12 310 09 32.",
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
    path: "/terms",
    title: getStaticTranslation(locale, "meta.terms.title", `${content.title} | ${SITE_NAME}`),
    description: getStaticTranslation(locale, "meta.terms.description", content.description),
  });
}

export default async function TermsPage({ params }: PageProps) {
  const locale = parseLocale((await params).locale);
  const content = getContent(locale);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          locale,
          path: "/terms",
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
