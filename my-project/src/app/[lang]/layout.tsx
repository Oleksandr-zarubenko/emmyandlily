import cn from "classnames";
import type { Metadata } from "next";
import { Libre_Franklin, Roboto } from "next/font/google";
import { gql } from "@apollo/client";
import { Logo } from "../../components/icons/Logo";
import "../globals.css";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";
import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "@/components/locale-switcher";
import { Bag } from "@/components/icons/Bag";
import { getClient } from "../../utils/apollo-client";
import { AddedToCartProvider } from "@/components/context/addedToCart";
const libre = Libre_Franklin({
  weight: ["400"],
  style: ['normal', 'italic'],
  subsets: ["latin"],
});


const queryEN = gql`
{
navigation {
  whoweare
  ourproducts
  aboutus
  contacts
  
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

    <html lang={lang}>
      <body
        className={cn(libre.className, "relative flex flex-grow flex-col bg-white")}
      >
        < AddedToCartProvider >
          <header className=" absolute inset-x-0 z-20 pt-6 pb-4 border-black border-b-2 px-[80px]">
            {/* <div className="fixed inset-x-0 top-0 ml-auto flex items-end bg-bg_primary/60 backdrop-blur xl:hidden">
            <MobileMenu navigation={navigation} />
          </div> */}
            <div className="container   invisible content-center items-center justify-between md:flex md:flex-row xl:visible smOnly:absolute">
              <div className="h-6 w-40">
                <Link href={`/${lang}`}>
                  <Logo color="#333333" />
                </Link>
              </div>
              <nav className="flex flex-col text-t16 items-center md:flex-row md:gap-4 xl:gap-10">
                <h2 className="sr-only">Main navigation</h2>
                {/* <Link
                className="duration-300 hover:text-primary"
                href="#who-we-are"
              >
                {navigation.WhoWeAre}
              </Link> */}
                <Link
                  className="duration-300 text-[#0B0605] hover:text-primary"
                  href="#products"
                >
                  {data.navigation.ourproducts}
                </Link>
                <Link
                  className="duration-300 hover:text-primary"
                  href="#about-us"
                >
                  {data.navigation.aboutus}
                </Link>
                <Link
                  className="duration-300 hover:text-primary"
                  href="#contacts"
                >
                  {data.navigation.contacts}
                </Link>
                {/* <LocaleSwitcher lang={lang} /> */}
                <Link className="duration-300 text-white hover:text-white" href="/basket">
                  <Bag color="black" />
                </Link>
              </nav>

            </div>
          </header>

          {children}
          <footer className="bg-black py-14 grow">
            <div className="container flex items-center justify-between">
              <div className="mb-4 h-12 w-40 md:mb-0 md:w-[305px]">
                <Link href="">
                  <Logo color="white" />
                </Link>
              </div>
              <div>
                <nav className="mx-10 flex flex-wrap justify-between gap-4 text-t12 text-center md:flex-row md:gap-10 md:text-t16 ">
                  <h2 className="sr-only text-white">Auxillary navigation</h2>
                  {/* <Link
                className="duration-300 text-white hover:text-white"
                href="#who-we-are"
              >
                {navigation.WhoWeAre}
              </Link> */}
                  <Link className="flex items-center duration-300 text-white hover:text-white" href="#products">
                    {data.navigation.ourproducts}
                  </Link>
                  <Link className=" flex items-center duration-300 text-white hover:text-white" href="#about-us">
                    {data.navigation.aboutus}
                  </Link>
                  <Link className=" flex items-center duration-300 text-white hover:text-white" href="#contacts">
                    {data.navigation.contacts}
                  </Link>
                  <Link className="flex items-center duration-300 text-white hover:text-white" href="/basket">
                    <Bag color="white" />
                  </Link>
                </nav>
              </div>
            </div>
          </footer>
        </ AddedToCartProvider >
      </body>
    </html>

  );
}