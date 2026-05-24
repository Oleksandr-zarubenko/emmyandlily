import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";
import type { DatoProduct, DatoSecondModal } from "@/types/dato";

export type ProductsResponse = {
  allProducts: DatoProduct[];
};

export type SecondModalResponse = {
  secondmodal: DatoSecondModal;
};

export const productsQueryByLocale = {
  en: gql`
    {
      allProducts(first: 200) {
        id
        _updatedAt
        heading
        description
        category {
          id
          name
        }
        productpicture {
          alt
          url
        }
        method
        composit
        activecomp
        activeComponents
        composition
        methodOfUse
        advantage1
        advantage2
        advantage3
        productSlider {
          id
          alt
          url
        }
        capacity {
          idCrm
          ml
        }
      }
    }
  ` as TypedDocumentNode<ProductsResponse>,
  uk: gql`
    {
      allProducts(locale: uk, first: 200) {
        id
        _updatedAt
        heading
        description
        category {
          id
          name
        }
        productpicture {
          alt
          url
        }
        method
        composit
        activecomp
        activeComponents
        composition
        methodOfUse
        advantage1
        advantage2
        advantage3
        productSlider {
          id
          alt
          url
        }
        capacity {
          idCrm
          ml
        }
      }
    }
  ` as TypedDocumentNode<ProductsResponse>,
} satisfies Record<Locale, TypedDocumentNode<ProductsResponse>>;

export const secondModalQueryByLocale = {
  en: gql`
    {
      secondmodal {
        goToCart
        itemAddedToCart
        returnToShopping
      }
    }
  ` as TypedDocumentNode<SecondModalResponse>,
  uk: gql`
    {
      secondmodal(locale: uk) {
        goToCart
        itemAddedToCart
        returnToShopping
      }
    }
  ` as TypedDocumentNode<SecondModalResponse>,
} satisfies Record<Locale, TypedDocumentNode<SecondModalResponse>>;
