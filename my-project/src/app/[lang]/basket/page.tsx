import { gql } from "@apollo/client";
import Basket from "@/page-components/Basket";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { DatoBasketData } from "@/types/dato";
import { cacheLife } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";
const queryEN = gql`
  {
    basket {
      additionalInformation
      payment
      delivery
      guarantee
      heading
      name
      number
      payment
      price
      privacy
      sum
      delete
      toOrder
      total
      dropdown
      dropdown1
      dropdown2
      dropdown3
    }

    productsSection {
      heading
      text
    }
    allProducts {
      heading
      description
      id
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
      advantage1
      advantage2
      advantage3
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }

      methodOfUse

      capacity {
        ml
        idCrm
      }
    }
    allPromocods {
      promoCodName {
        promocod
        namePartner
        discount
      }
    }
    secondmodal {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

const queryUA = gql`
  {
    basket(locale: uk) {
      additionalInformation
      delete
      delivery
      guarantee
      heading
      name
      number
      payment
      price
      privacy
      sum
      dropdown
      dropdown1
      dropdown2
      dropdown3
      toOrder
      total
    }

    productsSection(locale: uk) {
      heading
      text
    }
    allProducts(locale: uk) {
      heading
      description
      id
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
      advantage1
      advantage2
      advantage3
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }

      methodOfUse

      capacity {
        ml
        idCrm
      }
    }
    allPromocods(locale: uk) {
      promoCodName {
        promocod
        namePartner
        discount
      }
    }
    secondmodal(locale: uk) {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

async function getBasketData(local: Locale): Promise<DatoBasketData> {
  "use cache: remote";
  cacheLife("hours");

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<DatoBasketData>({ query });
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
  const data = await getBasketData(local);
  // console.log({ datafromDatoCRM: data });

  return (
    <>
      <Basket data={data} lang={lang} />
      <PixelPageView eventName="BasketPageView" />
    </>
  );
}
