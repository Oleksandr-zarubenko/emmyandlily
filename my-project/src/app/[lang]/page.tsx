import { AboutUs } from "@/page-components/AboutUs";
import { Contacts } from "@/page-components/Contacts";
import { HeroSection } from "@/page-components/HeroSection";
import { ProductsSection } from "@/page-components/ProductsSection";
import FreeDelivery from "@/components/FreeDelivery";

import { getClient } from "../../utils/apollo-client";
import { Metadata } from "next/types";
import { Locale } from "@/i18n/routing";
import { DatoHomeData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";
import { StructuredData } from "@/components/StructuredData";
import { createHomeSchema } from "@/utils/schema";
import { getSalesDriveData } from "@/server/actions/salesdrive";
import { homeQueryByLocale } from "@/server/dato/queries/home";

import Video from "@/page-components/Video";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const local = lang as Locale;
  const metadataByLocale = {
    uk: {
      title: "Emmy & Lily | Шампуні та догляд для собак",
      description:
        "Emmy & Lily - шампуні та засоби догляду для собак. Дбайливі формули для чистої, блискучої та доглянутої шерсті.",
    },
    en: {
      title: "Emmy & Lily | Dog Shampoos and Coat Care",
      description:
        "Emmy & Lily offers dog shampoos and coat care products designed to keep your dog's coat clean, soft, and healthy-looking.",
    },
  } as const;
  const meta = metadataByLocale[local];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getCanonicalUrl(local),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: getCanonicalUrl(local),
      siteName: "Emmy & Lily",
      images: [
        {
          url: "/favicon/android-chrome-512x512.png",
          width: 512,
          height: 512,
        },
        {
          url: "/favicon/android-chrome-192x192.png",
          width: 192,
          height: 192,
          alt: "Emmy and Lily - dog`s shampoo brand.",
        },
      ],
      locale: local === "uk" ? "uk_UA" : "en_US",
      type: "website",
    },
  };
}

async function getHomeData(local: Locale): Promise<DatoHomeData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:home:${local}`);

  const { data } = await getClient().query({
    query: homeQueryByLocale[local],
  });
  if (!data) {
    throw new Error("Failed to load homepage data from DatoCMS");
  }
  return data;
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const [data, salesDriveData] = await Promise.all([
    getHomeData(local),
    getSalesDriveData(local),
  ]);

  return (
    <div className="bg-bg_secondary flex grow flex-col">
      <StructuredData
        id="home-schema"
        schema={createHomeSchema({ lang: local, products: data.allProducts })}
      />
      <HeroSection data={data} lang={local} salesDriveData={salesDriveData} />
      <Video data={data} />
      {data?.promoOffer?.title && (
        <FreeDelivery text={data?.promoOffer?.title} />
      )}

      <ProductsSection
        data={data}
        lang={local}
        salesDriveData={salesDriveData}
      />
      <AboutUs data={data} />
      <Contacts data={data} />
      <PixelPageView eventName="HomePageView" />
    </div>
  );
}
