export type Locale = "uk" | "en";
export const locales: Locale[] = ["uk", "en"];
type I18n = {
  defaultLocale: Locale;
  locales: readonly Locale[];
};
export const i18n: I18n = {
  defaultLocale: "uk",
  locales,
} as const;
