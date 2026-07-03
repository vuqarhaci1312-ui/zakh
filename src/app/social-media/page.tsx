import type { Metadata } from "next";
import Navigation from "@/components/Navigation/Navigation";
import FollowUsSection from "@/components/SocialMedia/FollowUsSection";
import InstagramSection from "@/components/SocialMedia/InstagramSection";
import YouTubeSection from "@/components/SocialMedia/YouTubeSection";

export const metadata: Metadata = {
  title: "Social Media | Zakher Travel",
  description:
    "Follow Zakher Travel on Facebook, Instagram, YouTube, TikTok, LinkedIn, and more. Connect with our regional accounts across Azerbaijan, UAE, Europe, and beyond.",
};

export default function SocialMediaPage() {
  return (
    <>
      <Navigation />
      <main>
        <FollowUsSection />
        <InstagramSection />
        <YouTubeSection />
      </main>
    </>
  );
}
