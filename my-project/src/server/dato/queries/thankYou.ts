import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";

export type ThankYouData = {
  thankyoupage: {
    maintext: string;
    buttontext: string;
    additionaltext: string;
  };
};

export const thankYouQueryByLocale = {
  en: gql`
    {
      thankyoupage {
        additionaltext
        buttontext
        maintext
      }
    }
  ` as TypedDocumentNode<ThankYouData>,
  uk: gql`
    {
      thankyoupage(locale: uk) {
        additionaltext
        buttontext
        maintext
      }
    }
  ` as TypedDocumentNode<ThankYouData>,
} satisfies Record<Locale, TypedDocumentNode<ThankYouData>>;
