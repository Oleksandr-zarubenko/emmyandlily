import { MetadataRoute } from "next";
import { gql, type TypedDocumentNode } from "@apollo/client";
import { routing, type Locale } from "@/i18n/routing";
import { getCanonicalUrl } from "@/utils/seo";
import { getAllProducts } from "@/server/dato/products";
import { getProductSlug } from "@/utils/productSlug";
import { getClient } from "@/utils/apollo-client";

type SitemapEntry = MetadataRoute.Sitemap[number];
type StaticPath = "" | "/offer" | "/privacy-policy";
type SitemapMeta = Required<Pick<SitemapEntry, "changeFrequency" | "priority">>;
type StaticPageUpdates = Record<StaticPath, Date | undefined>;

const STATIC_PATHS = ["", "/offer", "/privacy-policy"] as const satisfies readonly StaticPath[];

const STATIC_SITEMAP_META = {
  "": {
    changeFrequency: "daily",
    priority: 1,
  },
  "/offer": {
    changeFrequency: "monthly",
    priority: 0.4,
  },
  "/privacy-policy": {
    changeFrequency: "yearly",
    priority: 0.3,
  },
} as const satisfies Record<StaticPath, SitemapMeta>;

const PRODUCT_SITEMAP_META = {
  changeFrequency: "weekly",
  priority: 0.8,
} as const satisfies SitemapMeta;

const staticPageUpdatesQueryEN = gql`
  {
    mainSection {
      _updatedAt
    }
    offer {
      _updatedAt
    }
    policy {
      _updatedAt
    }
  }
` as TypedDocumentNode<StaticPageUpdatesResponse>;

const staticPageUpdatesQueryUA = gql`
  {
    mainSection(locale: uk) {
      _updatedAt
    }
    offer(locale: uk) {
      _updatedAt
    }
    policy(locale: uk) {
      _updatedAt
    }
  }
` as TypedDocumentNode<StaticPageUpdatesResponse>;

type StaticPageUpdatesResponse = {
  mainSection?: { _updatedAt?: string | null };
  offer?: { _updatedAt?: string | null };
  policy?: { _updatedAt?: string | null };
};

const toLastModified = (value?: string | null): Date | undefined =>
  value ? new Date(value) : undefined;

const createSitemapEntry = ({
  url,
  lastModified,
  changeFrequency,
  priority,
}: SitemapEntry): SitemapEntry => ({
  url,
  ...(lastModified ? { lastModified } : {}),
  changeFrequency,
  priority,
});

async function getStaticPageUpdates(lang: Locale): Promise<StaticPageUpdates> {
  "use cache";
  const query = lang === "uk" ? staticPageUpdatesQueryUA : staticPageUpdatesQueryEN;
  const { data } = await getClient().query({
    query,
  });

  return {
    "": toLastModified(data?.mainSection?._updatedAt),
    "/offer": toLastModified(data?.offer?._updatedAt),
    "/privacy-policy": toLastModified(data?.policy?._updatedAt),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  const staticUrls = await Promise.all(
    routing.locales.map(async (lang) => {
      const updates = await getStaticPageUpdates(lang);

      return STATIC_PATHS.map((path) =>
        createSitemapEntry({
          url: getCanonicalUrl(lang, path),
          lastModified: updates[path],
          ...STATIC_SITEMAP_META[path],
        })
      );
    })
  );

  const localizedProducts = await Promise.all(
    routing.locales.map(async (lang) => {
      const products = await getAllProducts(lang);

      return products.map((product) =>
        createSitemapEntry({
          url: getCanonicalUrl(lang, `/product/${getProductSlug(product)}`),
          lastModified: toLastModified(product._updatedAt),
          ...PRODUCT_SITEMAP_META,
        })
      );
    })
  );

  return [...staticUrls.flat(), ...localizedProducts.flat()];
}
