import { defineRouting } from "next-intl/routing";
export type Locale = "uk" | "en";
export const locales: Locale[] = ["uk", "en"];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "uk",
});
