import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import Script from "next/script";
import Order from "@/page-components/Order";
import { DatoOrderData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
const queryEN = gql`
  {
    order {
      order
      confirmTheOrder
      confirmTheOrderBtn
      delivery
      deliveryMethod
      deliveryTime
      deliveryTime2
      discount
      eMail
      enterYourDetails
      fillInTheDetails
      freeDel
      heading
      lastName
      next
      noDelivery
      payment
      personalData
      phoneNumber
      receiver
      recipientData
      selectCountryAndCity
      total
      totalAmountToBePaid
      wantToReceive
      yourName
      yourOrder
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
    delivery {
      deliveryMethod {
        description
        id
        idD
        name
        price
        img {
          alt
          url
          width
        }
      }
    }

    allPromocods {
      promoCodName {
        promocod
        namePartner
        discount
      }
    }
  }
`;

const queryUA = gql`
  {
    order(locale: uk) {
      order
      confirmTheOrder
      confirmTheOrderBtn
      delivery
      deliveryMethod
      deliveryTime
      deliveryTime2
      discount
      eMail
      enterYourDetails
      fillInTheDetails
      freeDel
      heading
      lastName
      next
      noDelivery
      payment
      personalData
      phoneNumber
      receiver
      recipientData
      selectCountryAndCity
      total
      totalAmountToBePaid
      wantToReceive
      yourName
      yourOrder
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
    delivery(locale: uk) {
      deliveryMethod {
        description
        id
        idD
        name
        price
        img {
          alt
          url
          width
        }
      }
    }

    allPromocods(locale: uk) {
      promoCodName {
        promocod
        namePartner
        discount
      }
    }
  }
`;

async function getOrderData(local: Locale): Promise<DatoOrderData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:order:${local}`);

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<DatoOrderData>({ query });
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
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang }: { lang: Locale } = await params;
  const data = await getOrderData(lang);
  // console.log({ datoCRM: data });

  return (
    <>
      <Order data={data} lang={lang} />{" "}
      <Script
        id="facebook-pixel-order-page"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('track', 'Order Page View');
            }
          `,
        }}
      />
    </>
  );
}
