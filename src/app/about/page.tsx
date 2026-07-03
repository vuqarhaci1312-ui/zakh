import type { Metadata } from "next";
import AboutHero from "@/components/About/AboutHero";
import AboutIntro from "@/components/About/AboutIntro";
import AboutMembers from "@/components/About/AboutMembers";
import AboutCharity from "@/components/About/AboutCharity";
import AboutCertificates from "@/components/About/AboutCertificates";
import Navigation from "@/components/Navigation/Navigation";
import styles from "@/components/About/About.module.css";

export const metadata: Metadata = {
  title: "About Us | Zakher Travel",
  description:
    "Zakher Travel Group of Companies — professional travel agency in Azerbaijan since 2016, offering tailor-made holidays across the Caucasus and beyond.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className={styles.aboutPage}>
        <AboutHero />
        <AboutIntro />
        <AboutMembers />
        <AboutCharity />
        <AboutCertificates />
      </main>
    </>
  );
}
