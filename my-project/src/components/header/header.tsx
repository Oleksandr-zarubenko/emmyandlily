import LocaleSwitcher from "@/components/locale-switcher";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { Cart } from "../Cart";
import { MobileMenu } from "../MobileMenu";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";

const Header = ({ lang, data }: { data: any; lang: Locale }) => {
  return (
    <header className="absolute inset-x-0 z-30 border-b-2 border-black py-2 xl:px-20 xl:pb-4 xl:pt-6">
      <div className="container flex flex-row items-center justify-between xl:hidden">
        <Link href="/" className="relative z-50">
          <Image
            src={Logo}
            alt="logo"
            width={160}
            height={40}
            className="h-10 w-40 object-contain"
          />
        </Link>
        <h2 className="sr-only">Mobile Menu</h2>
        <div className="flex flex-row items-center gap-3">
          <Cart color="black" />
          <MobileMenu navigation={data.navigation} lang={lang} />
        </div>
      </div>
      <div className="container invisible h-0 content-center items-center justify-between md:flex md:flex-row xl:visible xl:h-auto smOnly:absolute">
        <div className="h-8 w-[60px] origin-left">
          <Link href="/">
            <Image src={Logo} alt="logo" className="h-10 w-40 object-contain" />
          </Link>
        </div>
        <nav className="flex flex-col items-center text-t16 md:flex-row md:gap-4 xl:gap-6">
          <h2 className="sr-only">Main navigation</h2>
          <Link
            className="text-[#0B0605] duration-300 hover:opacity-50"
            href="/#products"
          >
            {data.navigation.ourproducts}
          </Link>
          <Link className="duration-300 hover:opacity-50" href="/#about-us">
            {data.navigation.aboutus}
          </Link>
          <Link className="duration-300 hover:opacity-50" href="/#contacts">
            {data.navigation.contacts}
          </Link>
          <LocaleSwitcher lang={lang} />
          <Cart color="black" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
