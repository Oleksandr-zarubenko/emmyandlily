"use client";

import { useEffect, useState } from "react";
import { Burger } from "./icons/Burger";
import { BurgerCross } from "./icons/BurgerCross";
import { Logo } from "./icons/Logo";
import Link from "next/link";
import LocaleSwitcher from "./locale-switcher";

export const MobileMenu = ({ navigation }: { navigation: any }) => {
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
      <>
        <div className="ml-7 mt-8 h-7 w-36 md:w-44">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <LocaleSwitcher className="mb-3 ml-auto" lang={""} />
        <button className="ml-auto py-2 pr-4" onClick={() => setMenuOpened()}>
          <Burger className="h-4 w-7" />
        </button>
      </>
      {isOpen && (
        <div className="fixed inset-0 z-30 h-dvh overflow-scroll bg-primary">
          <div className="flex">
            <button
              onClick={() => setMenuClosed()}
              className="ml-auto py-8 pr-4"
            >
              <BurgerCross className="h-5 w-5 text-white" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-1 pt-2 text-center text-t20 md:max-w-[300px] md:text-left">
            <h2 className="sr-only">Mobile navigation</h2>
            <Link
              onClick={() => setMenuClosed()}
              href="#who-we-are"
              className="black-line w-5/6 py-7"
            >
              {navigation.WhoWeAre}
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#products"
              className="black-line w-5/6 py-7"
            >
              {navigation.OurProducts}
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#about-us"
              className="black-line w-5/6 py-7"
            >
              {navigation.AboutUs}
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#contacts"
              className="black-line w-5/6 py-7"
            >
              {navigation.Contacts}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
