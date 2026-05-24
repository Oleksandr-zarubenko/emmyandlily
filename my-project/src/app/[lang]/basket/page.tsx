import Basket from "@/page-components/Basket";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { DatoBasketData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";
import { getSalesDriveData } from "@/server/actions/salesdrive";
import { basketQueryByLocale } from "@/server/dato/queries/basket";

async function getBasketData(local: Locale): Promise<DatoBasketData> {
  "use cache";
  cacheLife("hours");
  cacheTag(`dato:basket:${local}`);

  const { data } = await getClient().query({
    query: basketQueryByLocale[local],
  });
  if (!data) {
    throw new Error("Failed to load basket data from DatoCMS");
  }
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const metadataByLocale = {
    uk: {
      title: "Кошик | Emmy & Lily",
      description:
        "Перегляньте товари у кошику Emmy & Lily, перевірте кількість, застосуйте промокод і перейдіть до оформлення замовлення.",
    },
    en: {
      title: "Basket | Emmy & Lily",
      description:
        "Review the items in your Emmy & Lily basket, update quantities, apply a promo code, and continue to checkout.",
    },
  } as const;

  return {
    title: metadataByLocale[lang].title,
    description: metadataByLocale[lang].description,
    alternates: {
      canonical: getCanonicalUrl(lang, "/basket"),
      languages: getLanguageAlternates("/basket"),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function BasketPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const [data, salesDriveData] = await Promise.all([
    getBasketData(local),
    getSalesDriveData(local),
  ]);
  // console.log({ datafromDatoCRM: data });

  return (
    <>
      <Basket data={data} lang={lang} salesDriveData={salesDriveData} />
      <PixelPageView eventName="BasketPageView" />
    </>
  );
}
