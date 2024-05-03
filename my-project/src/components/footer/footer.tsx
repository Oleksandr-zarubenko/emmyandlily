import Link from "next/link";

import { Logo } from "../../components/icons/Logo";
import { Bag } from "@/components/icons/Bag";
import { Cart } from "../Cart";
const Footer = ({ data, lang }: any) => {
  return (
    <footer className="bg-black py-14">
      <div className="block items-center justify-between md:container xl:flex">
        <div className="  mb-4  h-12   w-40 md:mb-0 md:w-[305px] notXl:mb-5 notXl:ml-auto notXl:mr-auto">
          <Link href="">
            <Logo color="white" />
          </Link>
        </div>
        <div>
          <nav className="mx-10 flex flex-wrap justify-between gap-4 text-center text-t12 md:flex-row md:gap-10 md:text-t16 ">
            <h2 className="sr-only text-white">Auxillary navigation</h2>
            <Link
              className="flex items-center text-white duration-300 hover:text-white"
              href={`/${lang}/#products`}
            >
              {data.navigation.ourproducts}
            </Link>
            <Link
              className=" flex items-center text-white duration-300 hover:text-white"
              href={`/${lang}/#about-us`}
            >
              {data.navigation.aboutus}
            </Link>
            <Link
              className=" flex items-center text-white duration-300 hover:text-white"
              href={`/${lang}/#contacts`}
            >
              {data.navigation.contacts}
            </Link>
            <Cart lang={lang} color="white" />
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
