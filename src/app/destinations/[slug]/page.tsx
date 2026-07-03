import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/components/DestinationDetail/DestinationDetail";
import {
  getAllDestinationSlugs,
  getDestinationDetail,
} from "@/components/DestinationDetail/destination-detail-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getDestinationDetail(slug);

  if (!detail) {
    return { title: "Destination Not Found" };
  }

  return {
    title: `${detail.title} | Zakher Travel`,
    description: detail.description,
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getDestinationDetail(slug);

  if (!detail) {
    notFound();
  }

  return (
    <main className="main-wrapper">
      <DestinationDetail data={detail} />
    </main>
  );
}
