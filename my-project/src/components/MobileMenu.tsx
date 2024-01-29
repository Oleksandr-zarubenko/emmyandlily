"use client";

import { useEffect, useState } from "react";
import { Burger } from "./icons/Burger";
import { BurgerCross } from "./icons/BurgerCross";
import Link from "next/link";
import { Logo } from "./icons/Logo";

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
      <button className="ml-auto py-2 pr-4" onClick={() => setMenuOpened()}>
        <Burger className="h-10 w-10" />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 h-dvh overflow-scroll bg-bg_primary">
          <div className="flex">
            <button
              onClick={() => setMenuClosed()}
              className="ml-auto py-2 pr-4"
            >
              <BurgerCross className="h-10 w-10 text-dark" />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-10 md:flex-row">
            <h2 className="sr-only">Main navigation</h2>
            <a onClick={() => setMenuClosed()} href="#products">
              Our Products
            </a>
            <a onClick={() => setMenuClosed()} href="#about-us">
              About Us
            </a>
            <a onClick={() => setMenuClosed()} href="#contacts">
              Contacts
            </a>
            <a
              onClick={() => setMenuClosed()}
              href="#contacts"
              className="block rounded-xl bg-primary p-3 text-white"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </>
  );
};
