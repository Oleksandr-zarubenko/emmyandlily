import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import Order from "@/page-components/Order";
import { DatoOrderData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";
import { getSalesDriveData } from "@/server/actions/salesdrive";
import { orderQueryByLocale } from "@/server/dato/queries/order";

async function getOrderData(local: Locale): Promise<DatoOrderData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:order:${local}`);

  const { data } = await getClient().query({
    query: orderQueryByLocale[local],
  });
  if (!data) {
    throw new Error("Failed to load order data from DatoCMS");
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
      title: "Оформлення замовлення | Emmy & Lily",
      description:
        "Оформіть замовлення Emmy & Lily: перевірте кошик, виберіть доставку та оплату і завершіть покупку.",
    },
    en: {
      title: "Checkout | Emmy & Lily",
      description:
        "Complete your Emmy & Lily order: review your basket, choose delivery and payment, and finish checkout.",
    },
  } as const;

  return {
    title: metadataByLocale[lang].title,
    description: metadataByLocale[lang].description,
    alternates: {
      canonical: getCanonicalUrl(lang, "/order"),
      languages: getLanguageAlternates("/order"),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang }: { lang: Locale } = await params;
  const [data, salesDriveData] = await Promise.all([
    getOrderData(lang),
    getSalesDriveData(lang),
  ]);
  // console.log({ datoCRM: data });

  return (
    <>
      <Order data={data} lang={lang} salesDriveData={salesDriveData} />{" "}
      <PixelPageView eventName="CheckoutPageView" />
    </>
  );
}
