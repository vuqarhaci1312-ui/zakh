export const CDN = "https://cdn.prod.website-files.com/69302ef953d83110f866c37b";

/** Public GCS bucket with Cloud CDN backend (elevenmedia-em-2026). */
export const HERO_CDN_BASE = "https://storage.googleapis.com/zakher-static-cdn";

export const HERO_VIDEO = {
  src: `${HERO_CDN_BASE}/hero/explore-azerbaijan-hero.mp4`,
  poster: "",
} as const;

export const HERO_HEADLINE = {
  beforeAccent: "Your ",
  accent: "online and offline",
  afterAccent: " supplier in the world since 2016",
} as const;

export const HERO_DESCRIPTION =
  "The Zakher Travel Group of Companies team has committed to living and working with honesty and sincerity. We stand behind our word and honor our commitments.";

export const HERO_PRIMARY_CTA = {
  label: "Discover more",
  href: "/tour-packages",
} as const;
