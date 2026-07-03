import type { StatCardVariant } from "./stats-data";

export interface StatCardAnimation {
  id: StatCardVariant;
  x: number;
  y: number;
}

export const STAT_CARD_ANIMATIONS: StatCardAnimation[] = [
  { id: "_01", x: 100, y: 100 },
  { id: "_02", x: -100, y: 100 },
  { id: "_03", x: -100, y: -100 },
  { id: "_04", x: 50, y: -50 },
  { id: "_05", x: 100, y: -100 },
];

export const STAT_SCROLL_TRIGGER = {
  start: "top top",
  end: "center center",
  scrub: 0.8,
} as const;

export const STAT_DESKTOP_MEDIA = "(min-width: 992px)";
