"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import { COUNTRY_TOURS } from "@/components/DestinationDetail/country-tours-data";
import {
  getTourDetail,
  getToursForCountry,
} from "@/components/DestinationDetail/tour-details-data";
import { BRANCH_DETAILS } from "@/components/OurBranches/branch-details-data";
import { useTranslationsState } from "@/contexts/TranslationsContext";

const META_BY_PATH: Record<string, { title: string; description: string }> = {
  "/": {
    title: "meta.home.title",
    description: "meta.home.description",
  },
  "/about": {
    title: "meta.about.title",
    description: "meta.about.description",
  },
  "/contact-us": {
    title: "meta.contact.title",
    description: "meta.contact.description",
  },
  "/our-services": {
    title: "meta.services.title",
    description: "meta.services.description",
  },
  "/tour-packages": {
    title: "meta.tourPackages.title",
    description: "meta.tourPackages.description",
  },
  "/social-media": {
    title: "meta.social.title",
    description: "meta.social.description",
  },
  "/our-events": {
    title: "meta.events.title",
    description: "meta.events.description",
  },
  "/our-branches": {
    title: "meta.branches.title",
    description: "meta.branches.description",
  },
};

const DEFAULT_META = {
  title: "meta.home.title",
  description: "meta.home.description",
};

type ResolvedMeta = {
  title: string;
  description: string;
};

function resolveDynamicMeta(pathname: string, t: (key: string, fallback: string) => string): ResolvedMeta | null {
  const destinationMatch = pathname.match(/^\/destinations\/([^/]+)$/);
  if (destinationMatch) {
    const slug = destinationMatch[1];
    const countryIndex = COUNTRY_TOURS.findIndex((country) => country.slug === slug);

    if (countryIndex < 0) {
      return {
        title: t("meta.notFound.destination", "Destination Not Found"),
        description: t(
          "meta.destination.descriptionFallback",
          "Explore tour packages and destinations with Zakher Travel.",
        ),
      };
    }

    const country = COUNTRY_TOURS[countryIndex];
    const name = t(`country.countries.${countryIndex}.name`, country.name);
    const description = t(`country.countries.${countryIndex}.description`, country.description);
    const suffix = t("meta.destination.titleSuffix", "Tours");

    return {
      title: `${name} ${suffix} | Zakher Travel`,
      description,
    };
  }

  const tourMatch = pathname.match(/^\/destinations\/([^/]+)\/([^/]+)$/);
  if (tourMatch) {
    const [, countrySlug, tourSlug] = tourMatch;
    const detail = getTourDetail(countrySlug, tourSlug);

    if (!detail) {
      return {
        title: t("meta.notFound.tour", "Tour Not Found"),
        description: t(
          "meta.destination.descriptionFallback",
          "Explore tour packages and destinations with Zakher Travel.",
        ),
      };
    }

    const tours = getToursForCountry(countrySlug);
    const tourIndex = tours.findIndex((item) => item.slug === tourSlug);
    const title = t(`tours.byCountry.${countrySlug}.${tourIndex}.title`, detail.title);
    const description = t(`tours.byCountry.${countrySlug}.${tourIndex}.excerpt`, detail.excerpt);

    return {
      title: `${title} | Zakher Travel`,
      description,
    };
  }

  const branchMatch = pathname.match(/^\/our-branches\/([^/]+)$/);
  if (branchMatch) {
    const slug = branchMatch[1];
    const branchIndex = BRANCH_DETAILS.findIndex((branch) => branch.slug === slug);

    if (branchIndex < 0) {
      return {
        title: t("meta.notFound.branch", "Branch Not Found"),
        description: t("meta.branches.description", DEFAULT_META.description),
      };
    }

    const branch = BRANCH_DETAILS[branchIndex];
    const title = t(`branches.details.${branchIndex}.title`, branch.title);
    const description = t(`branches.details.${branchIndex}.description.0`, branch.description[0]);

    return {
      title: `${title} | ${t("meta.branches.title", "Our Branches — Zakher Travel")}`,
      description,
    };
  }

  return null;
}

export default function LocaleDocumentMeta() {
  const pathname = usePathname();
  const { t, locale, loading } = useTranslationsState();

  const resolvedMeta = useMemo(() => {
    if (loading) {
      return null;
    }

    const staticConfig = META_BY_PATH[pathname];
    if (staticConfig) {
      return {
        title: t(staticConfig.title, "Zakher Travel"),
        description: t(
          staticConfig.description,
          "Professional travel agency in Azerbaijan offering tour packages, visa support and unforgettable travel experiences.",
        ),
      };
    }

    return resolveDynamicMeta(pathname, t);
  }, [loading, pathname, t]);

  useEffect(() => {
    if (loading) {
      return;
    }

    const title = resolvedMeta?.title ?? t(DEFAULT_META.title, "Zakher Travel");
    const description =
      resolvedMeta?.description ??
      t(
        DEFAULT_META.description,
        "Professional travel agency in Azerbaijan offering tour packages, visa support and unforgettable travel experiences.",
      );

    if (title) {
      document.title = title;
    }

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    if (description) {
      meta.setAttribute("content", description);
    }

    document.documentElement.lang = locale;
  }, [loading, locale, resolvedMeta, t]);

  return null;
}
