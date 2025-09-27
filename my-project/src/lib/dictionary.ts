import { Locale } from "@/i18n/routing";
import "server-only";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  uk: () => import("@/dictionaries/uk.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]() ?? dictionaries.uk();
