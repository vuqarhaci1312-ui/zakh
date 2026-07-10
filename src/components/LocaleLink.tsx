"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { localePath } from "@/lib/i18n/locale-path";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

export default function LocaleLink({ href, ...rest }: LocaleLinkProps) {
  const { locale } = useLanguage();
  return <Link href={localePath(locale, href)} {...rest} />;
}

export function useLocaleHref(href: string) {
  const { locale } = useLanguage();
  return localePath(locale, href);
}
