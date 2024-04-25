import Link from "next/link";

import { Logo } from "../../components/icons/Logo";
import LocaleSwitcher from "@/components/locale-switcher";
import { Bag } from "@/components/icons/Bag";
const Header = ({ lang, data }: any) => {
  return (
    <header className="absolute inset-x-0 z-20 border-b-2 border-black px-[80px] pb-4 pt-6">
      <div className="container invisible content-center items-center justify-between md:flex md:flex-row xl:visible smOnly:absolute">
        <div className="h-6 w-40">
          <Link href={`/${lang}`}>
            <Logo color="#333333" />
          </Link>
        </div>
        <nav className="flex flex-col items-center text-t16 md:flex-row md:gap-4 xl:gap-10">
          <h2 className="sr-only">Main navigation</h2>

          <Link
            className="text-[#0B0605] duration-300 hover:text-primary"
            href={`/${lang}/#products`}
          >
            {data.navigation.ourproducts}
          </Link>
          <Link
            className="duration-300 hover:text-primary"
            href={`/${lang}/#about-us`}
          >
            {data.navigation.aboutus}
          </Link>
          <Link
            className="duration-300 hover:text-primary"
            href={`/${lang}/#contacts`}
          >
            {data.navigation.contacts}
          </Link>
          <LocaleSwitcher lang={lang} />
          <Link
            className="text-white duration-300 hover:text-white"
            href={`/${lang}/basket`}
          >
            <Bag color="black" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
