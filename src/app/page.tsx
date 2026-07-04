import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import WeMembersOf from "@/components/WeMembersOf/WeMembersOf";

const WhyChooseUsFeatures = dynamic(
  () => import("@/components/WhyChooseUsFeatures/WhyChooseUsFeatures"),
);
const ExploreDestinations = dynamic(
  () => import("@/components/ExploreDestinations/ExploreDestinations"),
);
const RelatedPackages = dynamic(() => import("@/components/RelatedPackages/RelatedPackages"));
const CustomerReviews = dynamic(() => import("@/components/CustomerReviews/CustomerReviews"));
// Globe section disabled for now — restore: import CheckFlightsGlobe and add <CheckFlightsGlobe /> below CustomerReviews
// const CheckFlightsGlobe = dynamic(() => import("@/components/CheckFlightsGlobe/CheckFlightsGlobe"));

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <WhyChooseUsFeatures />
      <WhyChooseUs />
      <WeMembersOf />
      <ExploreDestinations />
      <RelatedPackages />
      <CustomerReviews />
    </main>
  );
}
