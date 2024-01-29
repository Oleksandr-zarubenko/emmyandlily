import cn from "classnames";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Logo } from "../components/icons/Logo";
import "./globals.css";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emmy and Lili - dog`s shampoo brand.",
  description:
    "Emmy and Lili - dog`s shampoo brand. We need to be healthy and beautiful, so we have been looking for the best hair products for a long time to be shiny, smooth, and well-combed. However, we have never found a one-size-fits-all solution that meets our needs. That's how demanding we are! Then, we had the idea to invent our super formula for hair health. Our friends helped us a little, but they wouldn't have managed without us! So we invite you to the world of beauty! Try our formula, and let us know if you like it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(roboto.className, "relative flex flex-grow flex-col")}
      >
        <header className="absolute inset-x-0 z-20 md:pt-9">
          <div className="bg_secondary fixed inset-x-0 top-0 ml-auto flex items-end bg-bg_primary/60 backdrop-blur md:hidden">
            <MobileMenu />
          </div>
          <div className="container invisible content-center items-center justify-between md:visible md:flex md:flex-row smOnly:absolute">
            <div className="h-6 w-40">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <nav className="flex flex-col items-center md:flex-row md:gap-4 xl:gap-10">
              <h2 className="sr-only">Main navigation</h2>
              <Link href="#who-we-are">Who We Are</Link>
              <Link href="#products">Our Products</Link>
              <Link href="#about-us">About Us</Link>
              <Link href="#contacts">Contacts</Link>
              <Link
                href="#contacts"
                className="block rounded-xl bg-primary p-3 text-white"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </header>

        {children}
        <footer className="bg-primary py-12">
          <div className="container flex flex-col items-center">
            <div className="mb-4 h-12 w-60 md:mb-9 md:w-80">
              <Link href="">
                <Logo />
              </Link>
            </div>
            <nav className="flex flex-col gap-4 text-t16 md:flex-row md:gap-10">
              <h2 className="sr-only">Auxillary navigation</h2>
              <Link href="#who-we-are">Who We Are</Link>
              <Link href="#products">Our Products</Link>
              <Link href="#about-us">About Us</Link>
              <Link href="#contacts">Contacts</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
