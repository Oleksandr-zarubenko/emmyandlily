import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/product/ProductPageContent";
import { Locale, routing } from "@/i18n/routing";
import {
  getAllProducts,
  getProductBySlug,
  getSecondModalData,
} from "@/server/dato/products";
import { getSalesDriveData } from "@/server/actions/salesdrive";
import { getCanonicalUrl } from "@/utils/seo";
import { getProductSlug } from "@/utils/productSlug";
import { StructuredData } from "@/components/StructuredData";
import { createProductPageSchema, stripSchemaText } from "@/utils/schema";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const local = lang as Locale;
  const product = await getProductBySlug(local, slug);
  if (!product) {
    return {
      title: "Product not found | Emmy and Lily",
      robots: { index: false, follow: false },
    };
  }

  const cleanTitle = stripSchemaText(product.heading);
  const cleanDescription = stripSchemaText(product.description).slice(0, 160);
  const canonicalSlug = getProductSlug(product);
  const [ukProducts, enProducts] = await Promise.all([
    getAllProducts("uk"),
    getAllProducts("en"),
  ]);
  const ukProduct = ukProducts.find((item) => item.id === product.id);
  const enProduct = enProducts.find((item) => item.id === product.id);
  const alternatesByLocale = {
    uk: ukProduct
      ? getCanonicalUrl("uk", `/product/${getProductSlug(ukProduct)}`)
      : getCanonicalUrl("uk", `/product/${canonicalSlug}`),
    en: enProduct
      ? getCanonicalUrl("en", `/product/${getProductSlug(enProduct)}`)
      : getCanonicalUrl("en", `/product/${canonicalSlug}`),
  };

  return {
    title: `${cleanTitle} | Emmy and Lily`,
    description: cleanDescription,
    alternates: {
      canonical: getCanonicalUrl(local, `/product/${canonicalSlug}`),
      languages: alternatesByLocale,
    },
    openGraph: {
      title: `${cleanTitle} | Emmy and Lily`,
      description: cleanDescription,
      url: getCanonicalUrl(local, `/product/${canonicalSlug}`),
      type: "website",
      locale: local === "uk" ? "uk_UA" : "en_US",
      images: [
        {
          url: product.productpicture.url,
          alt: product.productpicture.alt ?? cleanTitle,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const local = lang as Locale;
  const [product, secondmodal, salesDriveData] = await Promise.all([
    getProductBySlug(local, slug),
    getSecondModalData(local),
    getSalesDriveData(local).catch(() => null),
  ]);
  if (!product) notFound();

  return (
    <>
      <ProductPageContent
        product={product}
        lang={local}
        secondmodal={secondmodal}
        salesDriveData={salesDriveData ?? { products: [], currencies: [] }}
      />
      <StructuredData
        id={`product-schema-${product.id}`}
        schema={createProductPageSchema({
          lang: local,
          product,
          salesDriveProducts: salesDriveData?.products,
        })}
      />
    </>
  );
}
