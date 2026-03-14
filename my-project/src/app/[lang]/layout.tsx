import cn from "classnames";
import type { Metadata } from "next";
import Footer from "@/components/footer/footer";
import { Open_Sans } from "next/font/google";
import { Abril_Fatface } from "next/font/google";
import { gql } from "@apollo/client";

import "../globals.css";
import { Locale } from "@/i18n/routing";
import { getClient } from "../../utils/apollo-client";
import Header from "@/components/header/header";
import { Suspense } from "react";
import { FacebookPixelEvents } from "@/components/pixel-events";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { DatoLayoutData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { getSiteUrl } from "@/utils/seo";

const libre = Open_Sans({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre",
});

const abril = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin-ext"],
  variable: "--font-abril",
});

const queryEN = gql`
  {
    navigation {
      whoweare
      ourproducts
      aboutus
      contacts
      policy
      offer
    }
  }
`;

const queryUA = gql`
  {
    navigation(locale: uk) {
      whoweare
      ourproducts
      aboutus
      contacts
      policy
      offer
    }
  }
`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Emmy and Lily - dog`s shampoo brand.",
  description:
    "Emmy and Lily - dog`s shampoo brand. We need to be healthy and beautiful, so we have been looking for the best hair products for a long time to be shiny, smooth, and well-combed. However, we have never found a one-size-fits-all solution that meets our needs. That's how demanding we are! Then, we had the idea to invent our super formula for hair health. Our friends helped us a little, but they wouldn't have managed without us! So we invite you to the world of beauty! Try our formula, and let us know if you like it!",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

async function getLayoutData(lang: Locale): Promise<DatoLayoutData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:layout:${lang}`);

  const query = lang === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<DatoLayoutData>({ query });
  if (!data) {
    throw new Error("Failed to load layout data from DatoCMS");
  }
  return data;
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  if (!hasLocale(routing.locales, local)) {
    notFound();
  }
  setRequestLocale(lang);
  const data = await getLayoutData(local);

  return (
    <html
      className={`${abril.variable} ${libre.variable}`}
      lang={lang}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta
          name="msvalidate.01"
          content="4CC5472328D38C599ED3D0D8DE1788DB"
        />
      </head>
      <body
        className={cn(libre.className, "relative flex grow flex-col bg-white")}
      >
        <NextIntlClientProvider>
          <Header data={data} lang={local} />
          <Suspense fallback={null}>
            <FacebookPixelEvents />
          </Suspense>
          {children}
          <Footer data={data} />
        </NextIntlClientProvider>

        <div id="modal-root" />
        <Analytics />
      </body>
    </html>
  );
}
