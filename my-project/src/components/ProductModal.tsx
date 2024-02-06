"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BurgerCross } from "./icons/BurgerCross";
import { Arrow } from "./icons/Arrow";
import Image from "next/image";
import { Path } from "./icons/Path";
import { Markdown } from "./Markdown";

export const ProductModal = ({ product }: { product: any }) => {
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
      <button
        className="absolute bottom-0 right-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary duration-300 hover:bg-dark mdOnly:h-12 mdOnly:w-12"
        onClick={() => setMenuOpened()}
      >
        <span className="h-5 w-5">
          <Arrow />
        </span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 h-dvh overflow-y-scroll bg-white">
          <button
            onClick={() => setMenuClosed()}
            className="absolute right-1 top-1 z-10 rounded-full bg-primary p-4 duration-300 hover:bg-dark"
          >
            <BurgerCross className="h-5 w-5 text-white" />
          </button>
          <div className="relative h-60">
            <Image
              quality={100}
              fill
              src={product.productpicture.url}
              alt={product.productpicture.alt}
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <Markdown text={product.heading} className="m-3" />
          <Markdown text={product.description} className="m-3" />
        </div>
      )}
    </>
  );
};
