import { notFound } from "next/navigation";
import InterceptProductModalContent from "@/components/product/InterceptProductModalContent";
import { Locale, routing } from "@/i18n/routing";
import { getAllProducts, getProductBySlug, getSecondModalData } from "@/server/dato/products";
import { getProductSlug } from "@/utils/productSlug";

export async function generateStaticParams() {
  const params = await Promise.all(
    routing.locales.map(async (lang) => {
      const products = await getAllProducts(lang as Locale);
      return products.map((product) => ({
        lang,
        slug: getProductSlug(product),
      }));
    })
  );
  return params.flat();
}

export default async function ProductModalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const local = lang as Locale;
  const [product, secondmodal] = await Promise.all([
    getProductBySlug(local, slug),
    getSecondModalData(local),
  ]);
  if (!product) notFound();

  return <InterceptProductModalContent product={product} lang={local} secondmodal={secondmodal} />;
}
