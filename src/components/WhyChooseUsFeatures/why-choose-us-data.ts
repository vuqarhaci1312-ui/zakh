export interface WhyChooseUsCard {
  id: string;
  title: string;
  description: string;
}

export const WHY_CHOOSE_US_SECTION = {
  eyebrow: "Our Advantages",
  title: "Why",
  titleAccent: "Choose Us",
  subtitle:
    "Everything you need for seamless travel — from destination management to world-class support.",
} as const;

export const WHY_CHOOSE_US_CARDS: WhyChooseUsCard[] = [
  {
    id: "management",
    title: "Management — 10 Tourist Destinations",
    description:
      "Offering and managing 10 tourist destinations. Offline support (by call, by e-mail, by WhatsApp) 24/7.",
  },
  {
    id: "b2b-platform",
    title: "B2B Online Platform",
    description:
      "A B2B (business-to-business) online platform is a digital marketplace or e-commerce solution that enables businesses to buy services from other businesses online. These platforms facilitate transactions, streamline processes, and often offer features tailored for the complexities of business-to-business interactions.",
  },
  {
    id: "online-payment",
    title: "Online Payment",
    description:
      "Online payments involve transactions conducted over the internet to pay for goods or services, either purchased online or offline. They utilize secure platforms and various methods, including credit/debit card transactions, digital wallets, and bank transfers. These payments are crucial for e-commerce and online banking.",
  },
  {
    id: "world-class-service",
    title: "World Class Service",
    description:
      "World-class service is a commitment to consistently exceeding customer expectations and providing exceptional experiences across all interactions. It goes beyond basic customer service by focusing on personalized, proactive, and memorable interactions. This includes understanding customer needs, anticipating their requests, and going the extra mile to create satisfaction and loyalty.",
  },
];
