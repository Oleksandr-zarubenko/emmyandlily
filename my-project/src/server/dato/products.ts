import { cacheLife, cacheTag } from "next/cache";
import { Locale } from "@/i18n/routing";
import { DatoProduct, DatoSecondModal } from "@/types/dato";
import { getProductIdFromSlug } from "@/utils/productSlug";
import { getClient } from "@/utils/apollo-client";
import {
  productsQueryByLocale,
  secondModalQueryByLocale,
} from "@/server/dato/queries/products";

export async function getAllProducts(lang: Locale): Promise<DatoProduct[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:products:${lang}`);

  const { data } = await getClient().query({
    query: productsQueryByLocale[lang],
  });
  if (!data?.allProducts) {
    throw new Error("Failed to load products from DatoCMS");
  }
  return data.allProducts;
}

export async function getProductBySlug(
  lang: Locale,
  slug: string
): Promise<DatoProduct | null> {
  const id = getProductIdFromSlug(slug);
  if (!id) return null;
  const products = await getAllProducts(lang);
  return products.find((product) => product.id === id) ?? null;
}

export async function getSecondModalData(lang: Locale): Promise<DatoSecondModal> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:secondmodal:${lang}`);

  const { data } = await getClient().query({
    query: secondModalQueryByLocale[lang],
  });
  if (!data?.secondmodal) {
    throw new Error("Failed to load second modal data from DatoCMS");
  }
  return data.secondmodal;
}
