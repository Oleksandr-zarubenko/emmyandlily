import cn from "classnames";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Logo } from "../components/icons/Logo";
import "./globals.css";
import { MobileMenu } from "@/components/MobileMenu";

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
              <a href="">
                <Logo />
              </a>
            </div>
            <nav className="flex flex-col items-center gap-10 md:flex-row">
              <h2 className="sr-only">Main navigation</h2>
              <a href="#products">Our Products</a>
              <a href="#about-us">About Us</a>
              <a href="#contacts">Contacts</a>
              <a
                href="#contacts"
                className="block rounded-xl bg-primary p-3 text-white"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </header>

        {children}
        <footer className="bg-primary py-12">
          <div className="container flex flex-col items-center">
            <div className="mb-4 h-12 w-60 md:mb-9 md:w-80">
              <a href="">
                <Logo />
              </a>
            </div>
            <nav className="flex flex-col gap-4 text-t16 md:flex-row md:gap-10">
              <h2 className="sr-only">Auxillary navigation</h2>
              {/* <a>Home</a> */}
              <a href="#products">Our Products</a>
              <a href="#about-us">About Us</a>
              <a href="#contacts">Contacts</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
