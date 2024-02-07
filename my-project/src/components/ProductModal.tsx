"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Markdown } from "./Markdown";
import { Arrow } from "./icons/Arrow";
import { BurgerCross } from "./icons/BurgerCross";
import cn from "classnames";

export const ProductModal = ({ product }: { product: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"components" | "composition">(
    "components"
  );

  const setModalOpened = () => {
    setIsOpen(true);
  };

  const setMenuClosed = () => {
    setIsOpen(false);
  };

  const showComponents = () => {
    setActiveTab("components");
  };

  const showComposition = () => {
    setActiveTab("composition");
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
        onClick={() => setModalOpened()}
      >
        <span className="h-5 w-5">
          <Arrow />
        </span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-30 h-dvh overflow-y-scroll bg-white xl:flex xl:flex-row">
          <button
            onClick={() => setMenuClosed()}
            className="absolute right-1 top-1 z-10 rounded-full bg-primary p-4 duration-300 hover:bg-dark"
          >
            <BurgerCross className="h-2 w-2 text-white" />
          </button>
          <div className="relative h-60 md:h-96 xl:w-[550px] xl:flex-shrink-0">
            <Image
              quality={80}
              fill
              src={product.productpicture.url}
              alt={product.productpicture.alt}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="px-4 py-3 md:px-3 md:py-10">
            <Markdown text={product.heading} className="my-3" />
            <div className="mb-4 flex gap-2 md:flex-wrap md:gap-3 smOnly:flex-col">
              {product?.advantage1 && (
                <p className="bg-primary_T text-t10 max-w-max rounded-r-full px-3 py-2 text-primary md:text-t12">
                  {product.advantage1}
                </p>
              )}
              {product?.advantage2 && (
                <p className="bg-primary_T text-t10 max-w-max rounded-r-full px-3 py-2 text-primary md:text-t12">
                  {product.advantage2}
                </p>
              )}
              {product?.advantage3 && (
                <p className="bg-primary_T text-t10 max-w-max rounded-r-full px-3 py-2 text-primary md:text-t12">
                  {product.advantage3}
                </p>
              )}
            </div>
            <div className="text-t14 flex flex-row text-center font-bold md:text-t18">
              <button
                className={cn(
                  "w-full border-solid pb-1 pt-2",
                  activeTab === "components"
                    ? "border-b-2 border-primary"
                    : "border-border border-b"
                )}
                onClick={() => showComponents()}
              >
                Active components
              </button>
              <button
                className={cn(
                  "w-full border-solid pb-1 pt-2",
                  activeTab === "composition"
                    ? "border-b-2 border-primary"
                    : "border-border border-b"
                )}
                onClick={() => showComposition()}
              >
                Сomposition
              </button>
            </div>
            <Markdown
              className="pt-4"
              text={
                activeTab === "composition"
                  ? product.composition
                  : product.activeComponents
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
