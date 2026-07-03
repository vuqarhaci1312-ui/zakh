import type { Metadata } from "next";
import BrochuresSection from "@/components/OurServices/BrochuresSection";
import Navigation from "@/components/Navigation/Navigation";
import OurServiceSection from "@/components/OurServices/OurServiceSection";
import TravelExperiencesSection from "@/components/OurServices/TravelExperiencesSection";

export const metadata: Metadata = {
  title: "Our Services | Zakher Travel",
  description:
    "Tourist services, real estate, medical travel, MICE event planning, and downloadable tour brochures from Zakher Travel — your online and offline supplier since 2016.",
};

export default function OurServicesPage() {
  return (
    <>
      <Navigation />
      <main>
        <OurServiceSection />
        <TravelExperiencesSection />
        <BrochuresSection />
      </main>
    </>
  );
}
