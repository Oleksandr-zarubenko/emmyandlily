"use client";

import { useState } from "react";
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
  return (
    <button className="ml-auto pr-4 pt-4" onClick={() => setMenuOpened()}>
      <Burger className="h-10 w-10" />
      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-scroll bg-white">
          <button onClick={() => setMenuClosed()} className="ml-auto pr-4 pt-4">
            <BurgerCross className="h-10 w-10 text-dark" />
          </button>
        </div>
      )}
    </button>
  );
};
