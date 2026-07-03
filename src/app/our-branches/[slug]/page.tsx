import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";
import BranchDetailSection from "@/components/OurBranches/BranchDetailSection";
import {
  BRANCH_DETAILS,
  getBranchDetail,
} from "@/components/OurBranches/branch-details-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BRANCH_DETAILS.map((branch) => ({ slug: branch.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchDetail(slug);

  if (!branch) {
    return { title: "Branch Not Found | Zakher Travel" };
  }

  return {
    title: `${branch.title} | Our Branches | Zakher Travel`,
    description: branch.description[0],
  };
}

export default async function BranchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const branch = getBranchDetail(slug);

  if (!branch) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <main>
        <BranchDetailSection branch={branch} />
      </main>
    </>
  );
}
