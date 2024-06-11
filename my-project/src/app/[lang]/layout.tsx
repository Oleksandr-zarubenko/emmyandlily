import cn from "classnames";
import type { Metadata } from "next";
import Footer from "@/components/footer/footer";
import { Open_Sans } from "next/font/google";
import { Abril_Fatface } from "next/font/google";
import { gql } from "@apollo/client";
import { Analytics } from "@vercel/analytics/react";

import "../globals.css";
import { Locale } from "../../i18n.config";
import { getClient } from "../../utils/apollo-client";
import { AddedToCartProvider } from "@/components/context/addedToCart";
import Header from "@/components/header/header";
import { Suspense } from "react";
import { FacebookPixelEvents } from "@/components/pixel-events";

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
  title: "Emmy and Lili - dog`s shampoo brand.",
  description:
    "Emmy and Lili - dog`s shampoo brand. We need to be healthy and beautiful, so we have been looking for the best hair products for a long time to be shiny, smooth, and well-combed. However, we have never found a one-size-fits-all solution that meets our needs. That's how demanding we are! Then, we had the idea to invent our super formula for hair health. Our friends helped us a little, but they wouldn't have managed without us! So we invite you to the world of beauty! Try our formula, and let us know if you like it!",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: `${process.env.HOSTNAME}/favicon/favicon-32x32.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: `${process.env.HOSTNAME}/favicon/favicon-16x16.png`,
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: `${process.env.HOSTNAME}/favicon/apple-touch-icon.png`,
    },
  ],
};

export default async function RootLayout({
  children,
  params,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const query = lang == "ua" ? queryUA : queryEN;
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <html lang={lang} className={`${abril.variable} ${libre.variable}`}>
      <body
        className={cn(
          libre.className,
          "relative flex flex-grow flex-col bg-white"
        )}
      >
        <AddedToCartProvider>
          <Header data={data} lang={lang} />
          <Suspense fallback={null}>
            <FacebookPixelEvents />
          </Suspense>
          {children}
          <Footer data={data} lang={lang} />
        </AddedToCartProvider>
        <Analytics />
      </body>
    </html>
  );
}
