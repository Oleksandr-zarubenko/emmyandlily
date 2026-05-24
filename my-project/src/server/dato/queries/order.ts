import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";
import type { DatoOrderData } from "@/types/dato";

export const orderQueryByLocale = {
  en: gql`
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
  ` as TypedDocumentNode<DatoOrderData>,
  uk: gql`
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
  ` as TypedDocumentNode<DatoOrderData>,
} satisfies Record<Locale, TypedDocumentNode<DatoOrderData>>;
