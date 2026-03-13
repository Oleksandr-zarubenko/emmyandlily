import { DatoProduct } from "@/types/dato";

const SLUG_SEPARATOR = "--p-";

const normalizeHeading = (value: string): string =>
  value
    .replace(/[#*`]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яіїєґ\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const getProductSlug = (product: Pick<DatoProduct, "id" | "heading">): string => {
  const base = normalizeHeading(product.heading) || "product";
  return `${base}${SLUG_SEPARATOR}${product.id}`;
};

export const getProductIdFromSlug = (slug: string): string | null => {
  const index = slug.lastIndexOf(SLUG_SEPARATOR);
  if (index === -1) return null;
  const id = slug.slice(index + SLUG_SEPARATOR.length).trim();
  return id || null;
};
