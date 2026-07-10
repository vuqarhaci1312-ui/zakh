import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import BranchDetailSection from "@/components/OurBranches/BranchDetailSection";
import {
  BRANCH_DETAILS,
  getBranchDetail,
} from "@/components/OurBranches/branch-details-data";
import {
  JsonLd,
  breadcrumbJsonLd,
  imageObjectJsonLd,
  localBusinessJsonLd,
  webPageJsonLd,
} from "@/components/seo/JsonLd";
import { getStaticTranslation } from "@/lib/seo/get-static-translation";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { parseLocale, withLocales } from "@/lib/seo/locale-params";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return withLocales(BRANCH_DETAILS.map((branch) => ({ slug: branch.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const branch = getBranchDetail(slug);
  const branchIndex = BRANCH_DETAILS.findIndex((item) => item.slug === slug);

  if (!branch) {
    return { title: "Branch Not Found | Zakher Travel", robots: { index: false } };
  }

  const title = getStaticTranslation(
    locale,
    `branches.details.${branchIndex}.title`,
    branch.title,
  );
  const description = getStaticTranslation(
    locale,
    `branches.details.${branchIndex}.description.0`,
    branch.description[0],
  );

  return buildPageMetadata({
    locale,
    path: `/our-branches/${slug}`,
    title: `${title} | Our Branches`,
    description,
    image: branch.image,
  });
}

export default async function BranchDetailPage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const branch = getBranchDetail(slug);
  const branchIndex = BRANCH_DETAILS.findIndex((item) => item.slug === slug);

  if (!branch) {
    notFound();
  }

  const title = getStaticTranslation(
    locale,
    `branches.details.${branchIndex}.title`,
    branch.title,
  );
  const description = getStaticTranslation(
    locale,
    `branches.details.${branchIndex}.description.0`,
    branch.description[0],
  );
  const path = `/our-branches/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            locale,
            path,
            title,
            description,
            primaryImagePath: branch.image,
            aboutBranchSlug: branch.slug,
          }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Our Branches", path: "/our-branches" },
              { name: title, path },
            ],
            locale,
          ),
          localBusinessJsonLd({
            locale,
            path,
            name: title,
            description,
            address: branch.contact.address,
            email: branch.contact.email,
            telephone: branch.contact.phones?.[0],
            image: branch.image,
            slug: branch.slug,
          }),
          ...(branch.image
            ? [
                imageObjectJsonLd({
                  url: branch.image,
                  caption: title,
                  width: 720,
                  height: 540,
                }),
              ]
            : []),
        ]}
      />
      <Navigation />
      <main>
        <BranchDetailSection branch={branch} />
      </main>
    </>
  );
}
