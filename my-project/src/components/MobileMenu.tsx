"use client";
import Logo from "../../public/logo.png";
import { useEffect, useState, useRef } from "react";
import { Burger } from "./icons/Burger";
import { BurgerCross } from "./icons/BurgerCross";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";
import Image from "next/image";
import { Bag } from "./icons/Bag";
import autoAnimate from "@formkit/auto-animate";

export const MobileMenu = ({
  navigation,
  lang,
}: {
  navigation: any;
  lang: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const parent = useRef(null);

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

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div>
      <button onClick={() => setMenuOpened()}>
        <Burger className="h-14 w-14" />
      </button>
      <div ref={parent}>
        {isOpen && (
          <div className="fixed inset-0 h-dvh overflow-scroll bg-bg_transparent">
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
                  className="border-1 w-full border-b border-border pb-4 pt-2 text-t16 text-[#0B0605]"
                  href={`/${lang}/#products`}
                  onClick={() => setMenuClosed()}
                >
                  {navigation.ourproducts}
                </Link>
                <Link
                  className="border-1 w-full border-b border-border pb-4 pt-2 text-t16"
                  href={`/${lang}/#about-us`}
                  onClick={() => setMenuClosed()}
                >
                  {navigation.aboutus}
                </Link>
                <Link
                  className="border-1 mb-10 w-full border-b border-border pb-4 pt-2 text-t16"
                  href={`/${lang}/#contacts`}
                  onClick={() => setMenuClosed()}
                >
                  {navigation.contacts}
                </Link>
                <LocaleSwitcher lang={lang} />
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
