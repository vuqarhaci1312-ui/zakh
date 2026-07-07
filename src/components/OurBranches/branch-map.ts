import type { BranchContact } from "./branch-details-data";

export function getBranchMapQuery(contact: BranchContact): string {
  const address = contact.address?.trim() ?? "";
  const label = contact.locationLabel.trim();

  if (address && (address.length > 24 || /\d/.test(address))) {
    return address;
  }

  return label || address;
}

export function getBranchMapEmbedUrl(query: string): string {
  return `https://maps.google.com/maps?width=400&height=220&hl=en&q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
}

export function getBranchMapLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
