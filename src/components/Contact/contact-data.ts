export const CONTACT_SECTION = {
  description:
    "Contact us for questions, reservations, or tailor-made tour offers. Our team is ready to assist you 24/7.",
} as const;

export const CONTACT_OFFICES = [
  {
    label: "Head Office",
    address: "73 Huseyn Javid Ave, 16 floor, Baku 1073, Azerbaijan",
  },
  {
    label: "UAE Office",
    address: "SAIF Zone, Gate 3 building Q1-09. Office 103\\A, Sharjah, UAE",
  },
] as const;

export const CONTACT_OFFICE_PHONE = {
  href: "tel:+994123100932",
  value: "+994 12 310 09 32",
} as const;

export const CONTACT_MOBILE_PHONES = [
  { href: "tel:+994502532209", value: "+994 50 253 22 09" },
  { href: "tel:+971565902100", value: "+971 56 590 21 00" },
] as const;

export const CONTACT_WHATSAPP = {
  href: "https://wa.me/994502532200",
  value: "+994 50 253 22 00",
} as const;

export const CONTACT_EMAIL = {
  href: "mailto:info@zakher.travel",
  value: "info@zakher.travel",
} as const;

export const CONTACT_MAP_EMBED =
  "https://maps.google.com/maps?width=600&height=400&hl=en&q=Zakher+Travel+Baku&t=&z=15&ie=UTF8&iwloc=B&output=embed";
