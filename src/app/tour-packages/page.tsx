import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import TourPackagesSection from "@/components/TourPackages/TourPackagesSection";

export const metadata: Metadata = {
  title: "Tour Packages | Zakher Travel",
  description:
    "Browse Zakher Travel tour packages across Azerbaijan, Turkiye, Georgia, UAE, Central Asia, and Europe. Explore destinations and individual tours.",
};

export default function TourPackagesPage() {
  return (
    <>
      <Navigation />
      <main>
        <TourPackagesSection />
      </main>
    </>
  );
}
