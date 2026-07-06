import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import ContactSection from "@/components/Contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | Zakher Travel",
  description:
    "Contact Zakher Travel head office in Baku or UAE office for tour packages, bookings, and travel support.",
};

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactSection />
      </main>
    </>
  );
}
