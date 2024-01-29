"use client";

import { useEffect, useState } from "react";
import { Burger } from "./icons/Burger";
import { BurgerCross } from "./icons/BurgerCross";
import { Logo } from "./icons/Logo";
import Link from "next/link";

export const MobileMenu = () => {
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
        <div className="w-1/2 p-2">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <button className="ml-auto py-2 pr-4" onClick={() => setMenuOpened()}>
          <Burger className="h-10 w-10" />
        </button>
      </>
      {isOpen && (
        <div className="fixed inset-0 z-30 h-dvh overflow-scroll bg-bg_primary">
          <div className="flex">
            <div className="w-1/2 px-2 pb-2 pt-6">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <button
              onClick={() => setMenuClosed()}
              className="ml-auto py-2 pr-4"
            >
              <BurgerCross className="h-10 w-10 text-dark" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-10 pt-2 md:flex-row">
            <h2 className="sr-only">Mobile navigation</h2>
            <Link onClick={() => setMenuClosed()} href="#who-we-are">
              Who We Are
            </Link>
            <Link onClick={() => setMenuClosed()} href="#products">
              Our Products
            </Link>
            <Link onClick={() => setMenuClosed()} href="#about-us">
              About Us
            </Link>
            <Link onClick={() => setMenuClosed()} href="#contacts">
              Contacts
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#contacts"
              className="block rounded-xl bg-primary p-3 text-white"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
