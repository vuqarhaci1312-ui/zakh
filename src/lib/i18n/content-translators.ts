import type { TranslateFn } from "@/lib/i18n/create-translator";
import type { TourDetail, BuiltTourFaq } from "@/components/DestinationDetail/tour-details-data";

export function tourKey(countrySlug: string, tourIndex: number, ...parts: string[]) {
  return [`tours.byCountry.${countrySlug}.${tourIndex}`, ...parts].join(".");
}

export function branchKey(branchIndex: number, ...parts: string[]) {
  return [`branches.details.${branchIndex}`, ...parts].join(".");
}

export function translateField(t: TranslateFn, key: string, fallback: string) {
  const value = t(key, fallback);
  return value.trim() ? value : fallback;
}

export function countryKey(countryIndex: number, ...parts: string[]) {
  return [`country.countries.${countryIndex}`, ...parts].join(".");
}

export function generalFaqKey(index: number, field: "question" | "answer") {
  return `country.generalFaqs.${index}.${field}`;
}

export function interpolateTranslation(
  template: string,
  vars: Record<string, string>,
): string {
  return Object.entries(vars).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value),
    template,
  );
}

export function getTourIndex(countrySlug: string, tourSlug: string, tours: TourDetail[]) {
  return tours.findIndex((tour) => tour.slug === tourSlug);
}

export function createTourTranslator(
  t: TranslateFn,
  countrySlug: string,
  tourIndex: number,
) {
  const prefix = `tours.byCountry.${countrySlug}.${tourIndex}`;

  return {
    field(field: string, fallback: string) {
      return t(`${prefix}.${field}`, fallback);
    },
    section(index: number, field: "heading" | "body", fallback: string) {
      return t(`${prefix}.sections.${index}.${field}`, fallback);
    },
    meta(index: number, field: "label" | "value", fallback: string) {
      return t(`${prefix}.meta.${index}.${field}`, fallback);
    },
    inclusion(index: number, fallback: string) {
      return t(`${prefix}.inclusions.${index}`, fallback);
    },
    exclusion(index: number, fallback: string) {
      return t(`${prefix}.exclusions.${index}`, fallback);
    },
    packageLine(index: number, fallback: string) {
      return t(`${prefix}.packages.${index}`, fallback);
    },
  };
}

export function createBranchTranslator(t: TranslateFn, branchIndex: number) {
  const prefix = `branches.details.${branchIndex}`;

  return {
    field(field: string, fallback: string) {
      return t(`${prefix}.${field}`, fallback);
    },
    description(index: number, fallback: string) {
      return t(`${prefix}.description.${index}`, fallback);
    },
    contact(field: string, fallback: string) {
      return t(`${prefix}.contact.${field}`, fallback);
    },
  };
}

export function createCountryTranslator(t: TranslateFn, countrySlug: string, countryIndex: number) {
  const prefix = `country.countries.${countryIndex}`;

  return {
    field(field: string, fallback: string) {
      return t(`${prefix}.${field}`, fallback);
    },
    faq(index: number, field: "question" | "answer", fallback: string) {
      return t(`${prefix}.faqs.${index}.${field}`, fallback);
    },
    stat(index: number, field: "label" | "value", fallback: string) {
      return t(`${prefix}.stats.${index}.${field}`, fallback);
    },
  };
}

export function resolveTourFaqs(
  t: TranslateFn,
  countrySlug: string,
  tourIndex: number,
  tour: TourDetail,
  faqs: BuiltTourFaq[],
): { question: string; answer: string }[] {
  const prefix = tourKey(countrySlug, tourIndex);
  const tourTitle = t(`${prefix}.title`, tour.title);

  return faqs.map((faq) => {
    switch (faq.kind) {
      case "overview":
        return {
          question: interpolateTranslation(
            t("ui.tourFaq.includedQuestion", `What is included in the ${tour.title}?`),
            { title: tourTitle },
          ),
          answer: t(`${prefix}.excerpt`, tour.excerpt),
        };
      case "duration": {
        const metaIndex = faq.metaIndex ?? 0;
        const meta = tour.meta[metaIndex];
        const value = t(
          tourKey(countrySlug, tourIndex, "meta", String(metaIndex), "value"),
          meta?.value ?? "",
        );
        const label = t(
          tourKey(countrySlug, tourIndex, "meta", String(metaIndex), "label"),
          meta?.label ?? "",
        );
        return {
          question: t("ui.tourFaq.durationQuestion", "How long does this tour take?"),
          answer: `${value} (${label}).`,
        };
      }
      case "packageInclusions":
        return {
          question: t("ui.tourFaq.packageQuestion", "What is included in the package?"),
          answer:
            (tour.inclusions ?? [])
              .map((item, index) =>
                t(tourKey(countrySlug, tourIndex, "inclusions", String(index)), item),
              )
              .join("; ") + ".",
        };
      case "booking":
        return {
          question: t(generalFaqKey(0, "question"), faq.question),
          answer: t(generalFaqKey(0, "answer"), faq.answer),
        };
      case "custom": {
        const customIndex = faq.customIndex ?? 0;
        return {
          question: t(
            tourKey(countrySlug, tourIndex, "faqs", String(customIndex), "question"),
            faq.question,
          ),
          answer: t(
            tourKey(countrySlug, tourIndex, "faqs", String(customIndex), "answer"),
            faq.answer,
          ),
        };
      }
      default:
        return { question: faq.question, answer: faq.answer };
    }
  });
}
