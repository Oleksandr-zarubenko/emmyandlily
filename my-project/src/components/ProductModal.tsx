"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Markdown } from "./Markdown";
import { Arrow } from "./icons/Arrow";
import { BurgerCross } from "./icons/BurgerCross";
import cn from "classnames"
import { PathModalXl } from "./icons/PathModalXl";
import { Bag } from "./icons/Bag";


export const ProductModal = ({
  product,

  children,
}: {
  product: any;

  children: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"components" | "composition" | "usage">("components");
  const [currentImageUrl, setActiveImageUrl] = useState(product.productSlider[0].url);
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

  const handleQuantityChange = (capacity: string, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [capacity]: Math.max((prevQuantities[capacity] || 0) + value, 0),
    }));
  };


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

  const showUsage = () => {
    setActiveTab("usage");
  };

  const setActiveSlideImage = (url: string) => {
    setActiveImageUrl(url);
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
      <PathModalXl />
      <button
        className="relative mb-5 text-left"
        onClick={() => setModalOpened()}
      >
        {/* <span className="h-5 w-5">
          <Arrow />
        </span> */}
        {children}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex h-dvh items-center justify-center overflow-y-auto bg-white/50"
          onClick={() => setMenuClosed()}
        >
          <div className="relative h-full xl:h-auto w-auto">
            <button
              onClick={() => setMenuClosed()}
              className="fixed right-10 top-1 z-10 rounded-full mt-[10px]  p-4 duration-300  xl:absolute"
            >
              <BurgerCross className="h-6 w-6 text-black" />
            </button>
            <div
              className="relative h-full overflow-y-auto bg-white xl:flex xl:h-[688px] xl:w-[1280px] xl:flex-row px-[80px] py-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="xl:flex xl:h-full xl:flex-col mr-[90px]">
                <div className="relative h-full md:h-96 xl:h-[380px] xl:w-[450px] xl:flex-shrink-0 mb-4">
                  <Image
                    quality={80}
                    fill
                    src={currentImageUrl || product.productSlider[0].url}
                    alt={product.productpicture.alt || "Emmy and Lili"}
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                  />
                </div>

                <div className="hidden xl:flex xl:h-full xl:w-[450px] xl:flex-row">
                  {product.productSlider.map(
                    (slide: { alt: string; url: string; id: string }) => (
                      <div
                        className="relative w-1/3 mr-2 last:mr-0"
                        key={slide.id}
                        onClick={() => setActiveSlideImage(slide.url)}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 z-10",
                            slide.url !== currentImageUrl
                              ? "bg-black/50"
                              : "border-b-4 border-primary"
                          )}
                        ></div>
                        <Image
                          quality={80}
                          fill
                          src={slide.url}
                          alt={slide.alt || "Emmy and Lili"}
                          className={cn(
                            "object-cover",
                            slide.url !== currentImageUrl ? "" : ""
                          )}
                          sizes="(max-width: 768px) 20vw, (max-width: 1200px) 20vw, 183px"
                        />
                      </div>
                    )
                  )}
                </div>
                <div className="mt-6 flex gap-2 md:flex-wrap md:gap-3 smOnly:flex-col">
                  {product?.advantage1 && (
                    <p className="max-w-max  rounded bg-[#DCDCDC] px-3 py-2 text-t10 text-black md:text-t16">
                      {product.advantage1}
                    </p>
                  )}
                  {product?.advantage2 && (
                    <p className="max-w-max  rounded bg-[#DCDCDC] px-3 py-2 text-t10 text-black md:text-t16">
                      {product.advantage2}
                    </p>
                  )}
                  {product?.advantage3 && (
                    <p className="max-w-max rounded bg-[#DCDCDC] px-3 py-2 text-t10 text-black md:text-t16">
                      {product.advantage3}
                    </p>
                  )}
                </div>
              </div>

              <div className="pr-[15px]">
                <Markdown text={product.heading} className="mb-8 text-t32" />
                <table className="w-full  mb-12">
                  <thead>
                    <tr >
                      <th className="py-2 text-t14 text-[#333333] opacity-60">Об'єм</th>
                      <th className="py-2 text-t14  text-[#333333] opacity-60 text-center">Кіл-ть</th>
                      <th className="py-2 text-t14 w-[100px] text-[#333333] opacity-60 text-center">Ціна</th>
                      <th className="py-2 text-t14 w-[150px] text-[#333333] opacity-60 text-right">Додати у кошик</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.price.products.map((ml: any) => (
                      <tr key={ml.capacity}> {/* Додайте ключ для кожного рядка */}
                        <td className="py-2 leading-5 text-[#333333] text-t18 ">{ml.capacity}</td>
                        <td className="text-center py-2 leading-5 text-[#0B0605] text-t16">
                          <div className="flex justify-evenly">
                            <div className="border-solid border-2 border-text-[#33333399]">
                              <button
                                onClick={() => handleQuantityChange(ml.capacity, -1)}
                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
                              >
                                -
                              </button>
                              <input
                                value={quantities[ml.capacity] || 0}
                                onChange={(e) => handleQuantityChange(ml.capacity, parseInt(e.target.value, 10) || 0)}
                                className="p-[4px] text-center w-10 text-[#33333399] border-gray-300"
                              />
                              <button
                                onClick={() => handleQuantityChange(ml.capacity, 1)}
                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="py-2 text-center leading-5 text-[#333333] text-t18">{ml.price * (quantities[ml.capacity] || 0)} грн</td>
                        <td className="py-2 ml-auto leading-5 text-[#333333] text-t18">
                          <div className="bg-black w-[76px] h-10 pt-[5px] px-[22.5px] py-auto ml-auto rounded">
                            <Bag color="white" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>


                </table>

                <div className=" flex flex-row text-center  font-bold leading-5 text-t18">
                  <button
                    className={cn(
                      "w-full border-solid pb-1 pt-2 text-[#33333399] mb-4",
                      activeTab === "components"
                        ? "border-b-2 border-black text-black"
                        : "border-b border-border opacity-60"
                    )}
                    onClick={() => showComponents()}
                  >
                    {product.activecomp}
                  </button>
                  <button
                    className={cn(
                      "w-full border-solid pb-1 pt-2 text-[#33333399] mb-4",
                      activeTab === "composition"
                        ? "border-b-2 border-black text-black"
                        : "border-b border-border opacity-60"
                    )}
                    onClick={() => showComposition()}
                  >
                    {product.composit}
                  </button>

                  <button
                    className={cn(
                      "w-full border-solid pb-1 pt-2 text-[#33333399] mb-4",
                      activeTab === "usage"
                        ? "border-b-2 border-black text-black"
                        : "border-b border-border opacity-60"
                    )}
                    onClick={() => showUsage()}
                  >
                    {product.method}
                  </button>
                </div>
                <div className="overflow-y-auto pt-2  text-black xl:h-[320px] list-disc">
                  {activeTab === "components" && (
                    <Markdown className="ml-2 pr-2 mb-1 text-t14 list-disc" text={product.activeComponents} />
                  )}
                  {activeTab === "composition" && (
                    <Markdown className="pr-2 text-t14 list-disc" text={product.composition} />
                  )}
                  {activeTab === "usage" && (
                    <Markdown className="pr-2  list-disc" text={product.methodOfUse} />
                  )}

                </div>
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
};
