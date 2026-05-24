import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Locale } from "@/i18n/routing";

export type StaticPageUpdatesResponse = {
  mainSection?: { _updatedAt?: string | null };
  offer?: { _updatedAt?: string | null };
  policy?: { _updatedAt?: string | null };
};

export const staticPageUpdatesQueryByLocale = {
  en: gql`
    {
      mainSection {
        _updatedAt
      }
      offer {
        _updatedAt
      }
      policy {
        _updatedAt
      }
    }
  ` as TypedDocumentNode<StaticPageUpdatesResponse>,
  uk: gql`
    {
      mainSection(locale: uk) {
        _updatedAt
      }
      offer(locale: uk) {
        _updatedAt
      }
      policy(locale: uk) {
        _updatedAt
      }
    }
  ` as TypedDocumentNode<StaticPageUpdatesResponse>,
} satisfies Record<Locale, TypedDocumentNode<StaticPageUpdatesResponse>>;
