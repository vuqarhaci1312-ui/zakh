export const WHO_WE_ARE_HERO = {
  titleBefore: "Who",
  titleAccent: "We Are?",
} as const;

export const WHO_WE_ARE_BODY = [
  "Zakher Travel Group of Companies officially started its activity in 2016 and soon managed to make an outstanding achievement. It received thousands of tourists from the GCC region and other countries and began to introduce them to the charming treasures not only of Azerbaijan, but also of countries such as Türkiye, Poland, Georgia, Kazakhstan, Kyrgyzstan, Uzbekistan, Russia, the Czech Republic, Ukraine, and the UAE. Over the years of our existence, we have opened branches in these countries. We are a tour operator and we have contracts with more than 2,000 travel companies. We provide tailor-made holidays to our customers with our expert staff of 50 and more people and professional services.",
  "It is one of few companies that brings tourists from all over the world to visit our destinations. It does its utmost to introduce to tourists this historical and contemporary country, the Pearl of the Caucasus, characterized by charming nature, historical and architectural monuments, and rich cultural heritage.",
  "Tourists can visit our destinations any time of the year because of the distinctiveness of seasons and the fact that each season has its own climatic features. You can even visit more than once a year, and each time you'll find something new.",
] as const;

export const WHO_WE_ARE_ASSETS = {
  heroImage: "/about/about-who-we-are.png",
  companyProfilePdf: "/about/company-profile/profile-2026.pdf",
  companyProfileLabel: "Zakher Travel Company Profile 2026",
  downloadLabel: "Download",
  companyProfileSlides: Array.from(
    { length: 11 },
    (_, index) =>
      `/about/company-profile/page-${String(index + 1).padStart(2, "0")}.jpg`,
  ),
} as const;
