"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Markdown } from "./Markdown";
import { Arrow } from "./icons/Arrow";
import { BurgerCross } from "./icons/BurgerCross";
import cn from "classnames";
import { PathModalXl } from "./icons/PathModalXl";

export const ProductModal = ({
  product,
  productT,
}: {
  product: any;
  productT: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"components" | "composition">(
    "components"
  );
  const [currentImageUrl, setActiveImageUrl] = useState(
    product.productSlider[0].url
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
        className="absolute bottom-0 right-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary duration-300 hover:bg-dark mdOnly:h-12 mdOnly:w-12"
        onClick={() => setModalOpened()}
      >
        <span className="h-5 w-5">
          <Arrow />
        </span>
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex h-dvh items-center justify-center overflow-y-auto bg-black/50"
          onClick={() => setMenuClosed()}
        >
          <div className="relative h-full xl:h-auto">
            <button
              onClick={() => setMenuClosed()}
              className="fixed right-2 top-1 z-10 rounded-full bg-primary p-4 duration-300 hover:bg-dark xl:absolute"
            >
              <BurgerCross className="h-2 w-2 text-white" />
            </button>
            <div
              className="productModal relative h-full overflow-y-auto bg-white xl:flex xl:h-[580px] xl:w-[1000px] xl:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="xl:flex xl:h-full xl:flex-col">
                <div className="relative h-60 md:h-96 xl:w-[550px] xl:flex-shrink-0">
                  <Image
                    quality={80}
                    fill
                    src={currentImageUrl || product.productSlider[0].url}
                    alt={product.productpicture.alt || "Emmy and Lili"}
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                  />
                </div>
                <div className="hidden xl:flex xl:h-full xl:w-[550px] xl:flex-row">
                  {product.productSlider.map(
                    (slide: { alt: string; url: string; id: string }) => (
                      <div
                        className="relative w-1/3"
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
              </div>
              <div className="px-4 py-3 md:px-3 md:py-10 xl:px-10">
                <Markdown text={product.heading} className="my-3" />
                <div className="mb-4 flex gap-2 md:flex-wrap md:gap-3 smOnly:flex-col">
                  {product?.advantage1 && (
                    <p className="max-w-max rounded-r-full bg-primary_T px-3 py-2 text-t10 text-primary md:text-t12">
                      {product.advantage1}
                    </p>
                  )}
                  {product?.advantage2 && (
                    <p className="max-w-max rounded-r-full bg-primary_T px-3 py-2 text-t10 text-primary md:text-t12">
                      {product.advantage2}
                    </p>
                  )}
                  {product?.advantage3 && (
                    <p className="max-w-max rounded-r-full bg-primary_T px-3 py-2 text-t10 text-primary md:text-t12">
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
                        : "border-b border-border"
                    )}
                    onClick={() => showComponents()}
                  >
                    {productT.ActiveComponents}
                  </button>
                  <button
                    className={cn(
                      "w-full border-solid pb-1 pt-2",
                      activeTab === "composition"
                        ? "border-b-2 border-primary"
                        : "border-b border-border"
                    )}
                    onClick={() => showComposition()}
                  >
                    {productT.Сomposition}
                  </button>
                </div>
                <div className="overflow-y-auto pt-4 xl:h-[320px]">
                  <Markdown
                    className="pr-2"
                    text={
                      activeTab === "composition"
                        ? product.composition
                        : product.activeComponents
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
