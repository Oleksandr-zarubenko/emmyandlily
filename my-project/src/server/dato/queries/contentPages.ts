import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";

export type OfferData = {
  offer: {
    offertext: string;
  };
};

export type PolicyData = {
  policy: {
    policytext: string;
  };
};

export const offerQueryByLocale = {
  en: gql`
    {
      offer {
        offertext
      }
    }
  ` as TypedDocumentNode<OfferData>,
  uk: gql`
    {
      offer(locale: uk) {
        offertext
      }
    }
  ` as TypedDocumentNode<OfferData>,
} satisfies Record<Locale, TypedDocumentNode<OfferData>>;

export const policyQueryByLocale = {
  en: gql`
    {
      policy {
        policytext
      }
    }
  ` as TypedDocumentNode<PolicyData>,
  uk: gql`
    {
      policy(locale: uk) {
        policytext
      }
    }
  ` as TypedDocumentNode<PolicyData>,
} satisfies Record<Locale, TypedDocumentNode<PolicyData>>;
