import { routing, type Locale } from "@/i18n/routing";

const FALLBACK_SITE_URL = "https://www.emmyandlily.com";

export const getSiteUrl = (): string =>
  (process.env.NEXT_PUBLIC_SITE_URL || process.env.HOSTNAME || FALLBACK_SITE_URL).replace(
    /\/$/,
    ""
  );

export const getLocalizedPath = (lang: Locale, path = ""): string => {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `/${lang}${normalizedPath}`;
};

export const getCanonicalUrl = (lang: Locale, path = ""): string =>
  `${getSiteUrl()}${getLocalizedPath(lang, path)}`;

export const getLanguageAlternates = (path = ""): Record<Locale, string> =>
  Object.fromEntries(
    routing.locales.map((locale) => [locale, getCanonicalUrl(locale, path)])
  ) as Record<Locale, string>;
