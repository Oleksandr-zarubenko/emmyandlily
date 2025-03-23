import Order from "@/page-components/Order";

import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
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
export default async function OrderPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = lang == "ua" ? queryUA : queryEN;
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <>
      <Order data={data} lang={lang} />{" "}
      <script
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
