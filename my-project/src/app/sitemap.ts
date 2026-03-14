import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCanonicalUrl } from "@/utils/seo";
import { getAllProducts } from "@/server/dato/products";
import { getProductSlug } from "@/utils/productSlug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/offer", "/privacy-policy"];
  const now = new Date();
  const staticUrls = routing.locales.flatMap((lang) =>
    pages.map((path) => ({
      url: getCanonicalUrl(lang, path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const localizedProducts = await Promise.all(
    routing.locales.map(async (lang) => {
      const products = await getAllProducts(lang);

      return products.map((product) => ({
        url: getCanonicalUrl(lang, `/product/${getProductSlug(product)}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    })
  );

  return [...staticUrls, ...localizedProducts.flat()];
}
