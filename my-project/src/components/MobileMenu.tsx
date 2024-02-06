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
        <div className="ml-7 mt-8 h-7 w-36 md:w-44">
          <Link href="/">
            <Logo />
          </Link>
        </div>
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
              <BurgerCross className="h-5 w-5 text-dark" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-1 pt-2 text-t20 md:flex-row">
            <h2 className="sr-only">Mobile navigation</h2>
            <Link
              onClick={() => setMenuClosed()}
              href="#who-we-are"
              className="black-line w-5/6 py-7 text-center"
            >
              Who We Are
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#products"
              className="black-line w-5/6 py-7 text-center"
            >
              Our Products
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#about-us"
              className="black-line w-5/6 py-7 text-center"
            >
              About Us
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#contacts"
              className="black-line w-5/6 py-7 text-center"
            >
              Contacts
            </Link>
            <Link
              onClick={() => setMenuClosed()}
              href="#contacts"
              className="w-5/6 py-7 text-center"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
