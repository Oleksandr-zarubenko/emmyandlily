import { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/product/ProductPageContent";
import { Locale, routing } from "@/i18n/routing";
import {
  getAllProducts,
  getProductBySlug,
  getSecondModalData,
} from "@/server/dato/products";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { getProductSlug } from "@/utils/productSlug";

const stripMarkdown = (text: string): string =>
  text.replace(/[#*_`[\]()]/g, "").replace(/\s+/g, " ").trim();

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

  const cleanTitle = stripMarkdown(product.heading);
  const cleanDescription = stripMarkdown(product.description).slice(0, 160);

  return {
    title: `${cleanTitle} | Emmy and Lily`,
    description: cleanDescription,
    alternates: {
      canonical: getCanonicalUrl(local, `/product/${slug}`),
      languages: getLanguageAlternates(`/product/${slug}`),
    },
    openGraph: {
      title: `${cleanTitle} | Emmy and Lily`,
      description: cleanDescription,
      url: getCanonicalUrl(local, `/product/${slug}`),
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
  const [product, secondmodal] = await Promise.all([
    getProductBySlug(local, slug),
    getSecondModalData(local),
  ]);
  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: stripMarkdown(product.heading),
    description: stripMarkdown(product.description),
    image: product.productpicture.url,
    sku: product.id,
    offers: product.capacity.map((capacity) => {
      return {
        "@type": "Offer",
        priceCurrency: "UAH",
        price: capacity.price ? String(capacity.price) : "0",
        availability: "https://schema.org/InStock",
      };
    }),
  };

  return (
    <>
      <ProductPageContent product={product} lang={local} secondmodal={secondmodal} />
      <Script
        id={`product-schema-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
