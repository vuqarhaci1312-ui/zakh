import type { TranslateFn } from "@/lib/i18n/create-translator";
import type { TourDetail } from "@/components/DestinationDetail/tour-details-data";

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
