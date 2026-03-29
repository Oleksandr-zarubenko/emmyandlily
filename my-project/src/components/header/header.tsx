import LocaleSwitcher from "@/components/locale-switcher";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { Cart } from "../Cart";
import { MobileMenu } from "../MobileMenu";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { DatoLayoutData } from "@/types/dato";
import { TrackedLink } from "../TrackedLink";

const Header = ({ lang, data }: { data: DatoLayoutData; lang: Locale }) => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b-2 border-black bg-white py-2 xl:px-20 xl:pb-4 xl:pt-6">
      <div className="container flex flex-row items-center justify-between xl:hidden">
        <TrackedLink
          href="/"
          className="relative z-50"
          eventName="header_logo_click"
          eventParams={{ placement: "mobile", page: "global" }}
        >
          <Image
            src={Logo}
            alt="logo"
            width={160}
            height={40}
            className="h-10 w-40 object-contain"
          />
        </TrackedLink>
        <h2 className="sr-only">Mobile Menu</h2>
        <div className="flex flex-row items-center gap-3">
          <Cart color="black" source="header_mobile" />
          <MobileMenu navigation={data.navigation} lang={lang} />
        </div>
      </div>
      <div className="container invisible h-0 content-center items-center justify-between md:flex md:flex-row xl:visible xl:h-auto smOnly:absolute">
        <div className="h-8 w-[60px] origin-left">
          <TrackedLink
            href="/"
            eventName="header_logo_click"
            eventParams={{ placement: "desktop", page: "global" }}
          >
            <Image src={Logo} alt="logo" className="h-10 w-40 object-contain" />
          </TrackedLink>
        </div>
        <nav className="flex flex-col items-center text-t16 md:flex-row md:gap-4 xl:gap-6">
          <h2 className="sr-only">Main navigation</h2>
          <TrackedLink
            className="text-[#0B0605] duration-300 hover:opacity-50"
            href="/#products"
            eventName="header_nav_click"
            eventParams={{ target: "products", placement: "desktop" }}
          >
            {data.navigation.ourproducts}
          </TrackedLink>
          <TrackedLink
            className="duration-300 hover:opacity-50"
            href="/#about-us"
            eventName="header_nav_click"
            eventParams={{ target: "about_us", placement: "desktop" }}
          >
            {data.navigation.aboutus}
          </TrackedLink>
          <TrackedLink
            className="duration-300 hover:opacity-50"
            href="/#contacts"
            eventName="header_nav_click"
            eventParams={{ target: "contacts", placement: "desktop" }}
          >
            {data.navigation.contacts}
          </TrackedLink>
          <LocaleSwitcher lang={lang} />
          <Cart color="black" source="header_desktop" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
