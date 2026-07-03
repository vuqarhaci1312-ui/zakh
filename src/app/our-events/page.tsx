import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import EventsListSection from "@/components/OurEvents/EventsListSection";

export const metadata: Metadata = {
  title: "Our Events | Zakher Travel",
  description:
    "Zakher Travel at international tourism exhibitions, roadshows, and travel trade events across the GCC, Europe, Asia, and beyond since 2016.",
};

export default function OurEventsPage() {
  return (
    <>
      <Navigation />
      <main>
        <EventsListSection />
      </main>
    </>
  );
}
