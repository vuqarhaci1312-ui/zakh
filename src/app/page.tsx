import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs/WhyChooseUs"));
const LagoonCollection = dynamic(() => import("@/components/LagoonCollection/LagoonCollection"));
const ExploreDestinations = dynamic(
  () => import("@/components/ExploreDestinations/ExploreDestinations"),
);
const RelatedPackages = dynamic(() => import("@/components/RelatedPackages/RelatedPackages"));
const CheckFlightsGlobe = dynamic(() => import("@/components/CheckFlightsGlobe/CheckFlightsGlobe"));

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <WhyChooseUs />
      <LagoonCollection />
      <ExploreDestinations />
      <RelatedPackages />
      <CheckFlightsGlobe />
    </main>
  );
}
