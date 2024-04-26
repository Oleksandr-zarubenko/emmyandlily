"use client";
import Logo from "../../public/logo.png";
import { useEffect, useState } from "react";
import { Burger } from "./icons/Burger";
import { BurgerCross } from "./icons/BurgerCross";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import Image from "next/image";
import { Bag } from "./icons/Bag";

export const MobileMenu = ({
  navigation,
  lang,
}: {
  navigation: any;
  lang: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const setMenuOpened = () => {
    setIsOpen(true);
  };

  const setMenuClosed = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <>
      <button onClick={() => setMenuOpened()}>
        <Burger className="h-14 w-14" />
      </button>
      {isOpen && (
        <div className="bg-bg_transparent fixed inset-0 h-dvh overflow-scroll">
          <div className="bg-white">
            <div className="border-b-2 border-black ">
              <div className="container flex flex-row items-center justify-between py-2">
                <Link href={`/${lang}`}>
                  <Image src={Logo} alt="logo" width={158} height={32} />
                </Link>
                <h2 className="sr-only">Mobile Menu</h2>
                <div className="flex flex-row items-center gap-3">
                  <Link
                    className="text-white duration-300 hover:text-white"
                    href={`/${lang}/basket`}
                  >
                    <Bag color="black" />
                  </Link>
                  <button onClick={() => setMenuClosed()} className="">
                    <BurgerCross className="h-14 w-14 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <nav className="flex flex-col items-center gap-3 px-5 pb-20 pt-10 text-center">
              <h2 className="sr-only">Mobile navigation</h2>
              <Link
                className="border-1 w-full border-b border-border pb-4 pt-2 text-t16 text-[#0B0605] duration-300 hover:text-primary"
                href={`/${lang}/#products`}
              >
                {navigation.ourproducts}
              </Link>
              <Link
                className="border-1 w-full border-b border-border pb-4 pt-2 text-t16 duration-300 hover:text-primary"
                href={`/${lang}/#about-us`}
              >
                {navigation.aboutus}
              </Link>
              <Link
                className="border-1 mb-10 w-full border-b border-border pb-4 pt-2 text-t16 duration-300 hover:text-primary"
                href={`/${lang}/#contacts`}
              >
                {navigation.contacts}
              </Link>
              <LocaleSwitcher lang={lang} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
