import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import WhoWeAreDetailSection from "@/components/About/WhoWeAreDetailSection";
import styles from "@/components/About/About.module.css";

export const metadata: Metadata = {
  title: "Who We Are | Zakher Travel",
  description:
    "Learn about Zakher Travel Group of Companies — our history since 2016, international exhibitions, quality policy, and company profile.",
};

export default function WhoWeArePage() {
  return (
    <>
      <Navigation />
      <main className={styles.aboutPage}>
        <WhoWeAreDetailSection />
      </main>
    </>
  );
}
