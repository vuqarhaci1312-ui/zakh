export function uniqueImages(images: string[]) {
  return [...new Set(images.filter(Boolean))];
}

export function getTourGalleryImages(
  primaryImage: string,
  options?: { gallery?: string[]; countryHero?: string },
) {
  const items = [primaryImage, ...(options?.gallery ?? [])];
  if (options?.countryHero && options.countryHero !== primaryImage) {
    items.push(options.countryHero);
  }
  return uniqueImages(items);
}
