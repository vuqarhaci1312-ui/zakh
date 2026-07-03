import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import BranchesSection from "@/components/OurBranches/BranchesSection";

export const metadata: Metadata = {
  title: "Our Branches | Zakher Travel",
  description:
    "Explore Zakher Travel branch destinations across Azerbaijan, Türkiye, Central Asia, Europe, the Middle East, and beyond.",
};

export default function OurBranchesPage() {
  return (
    <>
      <Navigation />
      <main>
        <BranchesSection />
      </main>
    </>
  );
}
