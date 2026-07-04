"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import TranslationEditor from "@/components/admin/TranslationEditor";
import { getPageSection } from "@/lib/admin/page-sections";

type PageProps = {
  params: Promise<{ section: string }>;
};

export default function AdminLanguageSectionPage({ params }: PageProps) {
  const { section: sectionId } = use(params);
  const section = getPageSection(sectionId);

  if (!section) {
    notFound();
  }

  return <TranslationEditor section={section} />;
}
