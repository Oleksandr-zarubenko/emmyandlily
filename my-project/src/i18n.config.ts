export const i18n = {
  defaultLocale: "ua",
  locales: [ "ua"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
