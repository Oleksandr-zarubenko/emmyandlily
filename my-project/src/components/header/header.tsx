import Link from "next/link";
import Logo from "../../../public/logo.png";
import LocaleSwitcher from "@/components/locale-switcher";
import { Bag } from "@/components/icons/Bag";
import Image from "next/image";
import { MobileMenu } from "../MobileMenu";
import cn from "classnames";
import { Cart } from "../Cart";

const Header = ({ lang, data }: any) => {
  return (
    <header className="absolute inset-x-0 z-30 border-b-2 border-black py-2 xl:px-20 xl:pb-4 xl:pt-6">
      <div className="container flex flex-row items-center justify-between xl:hidden">
        <Link href={`/${lang}`} className="relative z-50">
          <Image src={Logo} alt="logo" width={158} height={32} className="" />
        </Link>
        <h2 className="sr-only">Mobile Menu</h2>
        <div className="flex flex-row items-center gap-3">
          <Cart color="black" lang={lang} />
          <MobileMenu navigation={data.navigation} lang={lang} />
        </div>
      </div>
      <div className="container invisible h-0 content-center items-center justify-between md:flex md:flex-row xl:visible xl:h-auto smOnly:absolute">
        <div className="h-8 w-40">
          <Link href={`/${lang}`}>
            <Image src={Logo} alt="logo" className="" />
          </Link>
        </div>
        <nav className="flex flex-col items-center text-t16 md:flex-row md:gap-4 xl:gap-10">
          <h2 className="sr-only">Main navigation</h2>
          <Link
            className="text-[#0B0605] duration-300 hover:opacity-50"
            href={`/${lang}/#products`}
          >
            {data.navigation.ourproducts}
          </Link>
          <Link
            className="duration-300 hover:opacity-50"
            href={`/${lang}/#about-us`}
          >
            {data.navigation.aboutus}
          </Link>
          <Link
            className="duration-300 hover:opacity-50"
            href={`/${lang}/#contacts`}
          >
            {data.navigation.contacts}
          </Link>
          <LocaleSwitcher lang={lang} />
          <Cart lang={lang} color="black" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
