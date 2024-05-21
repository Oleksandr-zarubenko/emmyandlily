"use client";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import LocaleSwitcher from "./locale-switcher";

export const MobileMenu = ({
  navigation,
  lang,
}: {
  navigation: any;
  lang: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const setMenuClosed = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => toggleMenu()} className="relative z-50 h-14 w-14">
        <Hamburger toggled={isOpen} toggle={setIsOpen} rounded />
      </button>
      <div>
        {isOpen && (
          <div className="fixed inset-0 h-dvh bg-bg_transparent">
            <div className="absolute inset-x-0 top-[72px] z-50 h-[2px] bg-black"></div>
            <div className="animate-scaleIn bg-white">
              <nav className="flex flex-col items-center gap-3 px-5 pb-20 pt-32 text-center">
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
                  className="border-1 w-full border-b border-border pb-4 pt-2 text-t16"
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
