import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";
import type { DatoBasketData } from "@/types/dato";

export const basketQueryByLocale = {
  en: gql`
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
  ` as TypedDocumentNode<DatoBasketData>,
  uk: gql`
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
  ` as TypedDocumentNode<DatoBasketData>,
} satisfies Record<Locale, TypedDocumentNode<DatoBasketData>>;
