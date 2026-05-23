import type {
  BreadcrumbList,
  CollectionPage,
  Graph,
  ItemList,
  ListItem,
  Offer,
  Organization,
  Product,
  PropertyValue,
  WebPage,
  WebSite,
} from "schema-dts";
import type { Locale } from "@/i18n/routing";
import type { DatoProduct } from "@/types/dato";
import type { SalesDriveProduct } from "@/types/salesdrive";
import { getCanonicalUrl, getSiteUrl } from "@/utils/seo";
import { getProductSlug } from "@/utils/productSlug";

const BRAND_NAME = "Emmy & Lily";
const LOGO_PATH = "/favicon/android-chrome-512x512.png";

export const stripSchemaText = (text: string): string =>
  text
    .replace(/[#*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getLanguageCode = (lang: Locale): string =>
  lang === "uk" ? "uk-UA" : "en-US";

const getLogoUrl = (): string => `${getSiteUrl()}${LOGO_PATH}`;

const createOrganization = (): Organization => ({
  "@type": "Organization",
  "@id": `${getSiteUrl()}#organization`,
  name: BRAND_NAME,
  url: getSiteUrl(),
  logo: getLogoUrl(),
});

const createWebSite = (lang: Locale): WebSite => ({
  "@type": "WebSite",
  "@id": `${getCanonicalUrl(lang)}#website`,
  url: getCanonicalUrl(lang),
  name: BRAND_NAME,
  publisher: {
    "@id": `${getSiteUrl()}#organization`,
  },
  inLanguage: getLanguageCode(lang),
});

const createBreadcrumbList = (
  items: Array<{ name: string; url: string }>
): BreadcrumbList => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(
    (item, index): ListItem => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })
  ),
});

const getProductImages = (product: DatoProduct): string[] => {
  const images = [
    product.productpicture.url,
    ...product.productSlider.map((image) => image.url),
  ];

  return Array.from(new Set(images.filter(Boolean)));
};

const getProductOffers = (
  product: DatoProduct,
  productUrl: string,
  salesDriveProducts: SalesDriveProduct[] = []
): Offer[] | undefined => {
  const offers = product.capacity.reduce<Offer[]>((acc, capacity) => {
    const salesDriveProduct = salesDriveProducts.find(
      (item) => item.id === capacity.idCrm
    );
    const price = salesDriveProduct?.price ?? capacity.price;

    if (price === null || price === undefined) {
      return acc;
    }

    acc.push({
      "@type": "Offer",
      sku: capacity.idCrm,
      url: productUrl,
      priceCurrency: "UAH",
      price: String(price),
      availability:
        salesDriveProduct?.available === "false"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    });

    return acc;
  }, []);

  return offers.length ? offers : undefined;
};

const getProductProperties = (product: DatoProduct): PropertyValue[] =>
  product.capacity.map((capacity) => ({
    "@type": "PropertyValue",
    name: "Volume",
    propertyID: "volume",
    value: capacity.ml,
    unitText: "ml",
  }));

export const createHomeSchema = ({
  lang,
  products,
}: {
  lang: Locale;
  products: DatoProduct[];
}): Graph => {
  const url = getCanonicalUrl(lang);
  const productList: ItemList = {
    "@type": "ItemList",
    "@id": `${url}#products`,
    name: lang === "uk" ? "Товари Emmy & Lily" : "Emmy & Lily products",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: products.length,
    itemListElement: products.map(
      (product, index): ListItem => ({
        "@type": "ListItem",
        position: index + 1,
        url: getCanonicalUrl(lang, `/product/${getProductSlug(product)}`),
        name: stripSchemaText(product.heading),
      })
    ),
  };
  const webPage: CollectionPage = {
    "@type": "CollectionPage",
    "@id": `${url}#webpage`,
    url,
    name: BRAND_NAME,
    isPartOf: {
      "@id": `${url}#website`,
    },
    about: {
      "@id": `${getSiteUrl()}#organization`,
    },
    mainEntity: {
      "@id": `${url}#products`,
    },
    inLanguage: getLanguageCode(lang),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [createOrganization(), createWebSite(lang), webPage, productList],
  };
};

export const createProductPageSchema = ({
  lang,
  product,
  salesDriveProducts = [],
}: {
  lang: Locale;
  product: DatoProduct;
  salesDriveProducts?: SalesDriveProduct[];
}): Graph => {
  const productUrl = getCanonicalUrl(
    lang,
    `/product/${getProductSlug(product)}`
  );
  const productName = stripSchemaText(product.heading);
  const offers = getProductOffers(product, productUrl, salesDriveProducts);
  const productSchema: Product = {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: productName,
    description: stripSchemaText(product.description),
    image: getProductImages(product),
    sku: product.id,
    productID: product.id,
    url: productUrl,
    brand: {
      "@id": `${getSiteUrl()}#organization`,
    },
    manufacturer: {
      "@id": `${getSiteUrl()}#organization`,
    },
    category: product.category?.map((category) => category.name),
    additionalProperty: getProductProperties(product),
    ...(offers ? { offers } : {}),
  };
  const breadcrumb = createBreadcrumbList([
    {
      name: BRAND_NAME,
      url: getCanonicalUrl(lang),
    },
    {
      name: lang === "uk" ? "Товари" : "Products",
      url: `${getCanonicalUrl(lang)}#products`,
    },
    {
      name: productName,
      url: productUrl,
    },
  ]);
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": `${productUrl}#webpage`,
    url: productUrl,
    name: `${productName} | ${BRAND_NAME}`,
    isPartOf: {
      "@id": `${getCanonicalUrl(lang)}#website`,
    },
    about: {
      "@id": `${productUrl}#product`,
    },
    mainEntity: {
      "@id": `${productUrl}#product`,
    },
    breadcrumb,
    inLanguage: getLanguageCode(lang),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      createOrganization(),
      createWebSite(lang),
      webPage,
      breadcrumb,
      productSchema,
    ],
  };
};

export const createContentPageSchema = ({
  lang,
  path,
  title,
  description,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
}): Graph => {
  const url = getCanonicalUrl(lang, path);
  const webPage: WebPage = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: {
      "@id": `${getCanonicalUrl(lang)}#website`,
    },
    publisher: {
      "@id": `${getSiteUrl()}#organization`,
    },
    breadcrumb: createBreadcrumbList([
      {
        name: BRAND_NAME,
        url: getCanonicalUrl(lang),
      },
      {
        name: title,
        url,
      },
    ]),
    inLanguage: getLanguageCode(lang),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [createOrganization(), createWebSite(lang), webPage],
  };
};
