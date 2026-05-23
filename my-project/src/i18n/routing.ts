import { defineRouting } from "next-intl/routing";
export type Locale = "uk" | "en";
export const locales: Locale[] = ["uk", "en"];

export const routing = defineRouting({
  locales,

  defaultLocale: "uk",

  localePrefix: "as-needed",
});
