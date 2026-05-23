import { routing, type Locale } from "@/i18n/routing";

const FALLBACK_SITE_URL = "https://www.emmyandlily.com";

const normalizeSiteUrl = (url: string): string => {
  const normalized = url.replace(/\/$/, "");
  if (normalized === "http://emmyandlily.com") {
    return FALLBACK_SITE_URL;
  }
  if (normalized === "https://emmyandlily.com") {
    return FALLBACK_SITE_URL;
  }
  return normalized;
};

export const getSiteUrl = (): string =>
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL);

export const getLocalizedPath = (lang: Locale, path = ""): string => {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return lang === routing.defaultLocale
    ? normalizedPath || "/"
    : `/${lang}${normalizedPath}`;
};

export const getCanonicalUrl = (lang: Locale, path = ""): string =>
  `${getSiteUrl()}${getLocalizedPath(lang, path)}`;

export const getLanguageAlternates = (
  path = ""
): Record<Locale | "x-default", string> => {
  const alternates = Object.fromEntries(
    routing.locales.map((locale) => [locale, getCanonicalUrl(locale, path)])
  ) as Record<Locale, string>;

  return {
    ...alternates,
    "x-default": getCanonicalUrl(routing.defaultLocale, path),
  };
};
