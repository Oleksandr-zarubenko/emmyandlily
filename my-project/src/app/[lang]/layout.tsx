import cn from "classnames";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Logo } from "../../components/icons/Logo";
import "../globals.css";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";
import { Locale } from "../../i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "@/components/locale-switcher";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

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
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const { navigation } = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body
        className={cn(roboto.className, "relative flex flex-grow flex-col")}
      >
        <header className="absolute inset-x-0 z-20 md:pt-9">
          <div className="fixed inset-x-0  top-0 ml-auto tems-end bg-white backdrop-blur py-4 px-6 md:hidden xl:hidden">
            {/* <MobileMenu navigation={navigation} /> */}
            <Logo />
            <div className="mt-10 flex justify-center text-center">   <LocaleSwitcher /></div>

          </div>
          <div className="container invisible content-center items-center justify-between md:flex md:flex-row md:visible xl:visible smOnly:absolute">
            <div className="h-6 w-40">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            {/* <nav className="flex flex-col items-center md:flex-row md:gap-4 xl:gap-10">
              <h2 className="sr-only">Main navigation</h2>
              <Link
                className="duration-300 hover:text-primary"
                href="#who-we-are"
              >
                {navigation.WhoWeAre}
              </Link>
              <Link
                className="duration-300 hover:text-primary"
                href="#products"
              >
                {navigation.OurProducts}
              </Link>
              <Link
                className="duration-300 hover:text-primary"
                href="#about-us"
              >
                {navigation.AboutUs}
              </Link>
              <Link
                className="duration-300 hover:text-primary"
                href="#contacts"
              >
                {navigation.Contacts}
              </Link>
            </nav> */}
            <LocaleSwitcher />
          </div>
        </header>

        {children}
        {/* <footer className="bg-primary py-12">
          <div className="container flex flex-col items-center">
            <div className="mb-4 h-6 w-40 md:mb-9 md:w-80">
              <Link href="">
                <Logo />
              </Link>
            </div>
            <nav className="mx-10 flex flex-wrap justify-between gap-4 text-t12 md:flex-row md:gap-10 md:text-t16">
              <h2 className="sr-only">Auxillary navigation</h2>
              <Link
                className="duration-300 hover:text-white"
                href="#who-we-are"
              >
                {navigation.WhoWeAre}
              </Link>
              <Link className="duration-300 hover:text-white" href="#products">
                {navigation.OurProducts}
              </Link>
              <Link className="duration-300 hover:text-white" href="#about-us">
                {navigation.AboutUs}
              </Link>
              <Link className="duration-300 hover:text-white" href="#contacts">
                {navigation.Contacts}
              </Link>
            </nav>
          </div>
        </footer> */}
      </body>
    </html>
  );
}
