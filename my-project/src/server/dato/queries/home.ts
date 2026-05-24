import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";
import type { DatoHomeData } from "@/types/dato";

export const homeQueryByLocale = {
  en: gql`
    {
      mainSection {
        bigtext
        heading
        text
        btn
        inCart
        productId
        bottles {
          alt
          url
        }
      }
      videosection {
        heading
        text1
        text2
        text3
        text4
        videolink
      }
      allCategories {
        id
        name
      }
      aboutUsSection {
        heading
        text3
        text2
        text1
        image3 {
          alt
          url
        }
        image2 {
          alt
          url
        }
        image1 {
          alt
          url
        }
      }
      promoOffer {
        title
      }
      contactssection {
        heading
        text
        phone1
        email
        text2
        phone2
        socialsphrase
        tiktoklink
        instagramlink
      }
      productsSection {
        heading
        text
      }
      allProducts(first: 100) {
        preview
        heading
        description
        id
        category {
          name
          id
        }
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
      secondmodal {
        goToCart
        itemAddedToCart
        returnToShopping
      }
    }
  ` as TypedDocumentNode<DatoHomeData>,
  uk: gql`
    {
      mainSection(locale: uk) {
        bigtext
        heading
        text
        btn
        inCart
        productId
        bottles {
          alt
          url
        }
      }
      videosection(locale: uk) {
        heading
        text1
        text2
        text3
        text4
        videolink
      }
      aboutUsSection(locale: uk) {
        heading
        text3
        text2
        text1
        image3 {
          alt
          url
        }
        image2 {
          alt
          url
        }
        image1 {
          alt
          url
        }
      }
      promoOffer(locale: uk) {
        title
      }
      contactssection(locale: uk) {
        heading
        text
        phone1
        email
        text2
        phone2
        socialsphrase
        tiktoklink
        instagramlink
      }
      productsSection(locale: uk) {
        heading
        text
      }
      allCategories(locale: uk) {
        id
        name
      }
      allProducts(locale: uk, first: 100) {
        preview
        heading
        description
        id
        category {
          name
          id
        }
        productpicture {
          alt
          url
        }
        advantage1
        advantage2
        advantage3
        method
        composit
        activecomp
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
      secondmodal(locale: uk) {
        goToCart
        itemAddedToCart
        returnToShopping
      }
    }
  ` as TypedDocumentNode<DatoHomeData>,
} satisfies Record<Locale, TypedDocumentNode<DatoHomeData>>;
