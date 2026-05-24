import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";
import type { DatoLayoutData } from "@/types/dato";

export const layoutQueryByLocale = {
  en: gql`
    {
      navigation {
        whoweare
        ourproducts
        aboutus
        contacts
        policy
        offer
      }
    }
  ` as TypedDocumentNode<DatoLayoutData>,
  uk: gql`
    {
      navigation(locale: uk) {
        whoweare
        ourproducts
        aboutus
        contacts
        policy
        offer
      }
    }
  ` as TypedDocumentNode<DatoLayoutData>,
} satisfies Record<Locale, TypedDocumentNode<DatoLayoutData>>;
