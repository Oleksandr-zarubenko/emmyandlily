"use client";
import { i18n } from "@/i18n.config";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Markdown } from "./Markdown";
import { Arrow } from "./icons/Arrow";
import { BurgerCross } from "./icons/BurgerCross";
import cn from "classnames";
import { PathModalXl } from "./icons/PathModalXl";
import { Bag } from "./icons/Bag";
import { useAddedToCart } from "@/components/context/addedToCart";

export const ProductModal = ({
  product,
  state,
  lang,
  children,
  convertPrice
}: {
  product: any;
  lang: any;
  children: any;
  state: any
  convertPrice: any

}) => {
  const locales = i18n.locales;
  const en = locales[1]
  const { addedToCart, setAddedToCart } = useAddedToCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "components" | "composition" | "usage"
  >("components");

  const [currentImageUrl, setActiveImageUrl] = useState(
    product.productSlider[0].url
  );



  // const handleQuantityChange = (capacity: string, value: number) => {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [capacity]: Math.max((prevQuantities[capacity] || 0) + value, 0),
  //   }));
  // };

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

  const addToCart = (item: any) => {

    const storedDataString = localStorage.getItem('storedData');
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const storedAddedToCart = localStorage.getItem('addedToCart');
    const parsedAddedToCart = storedAddedToCart ? JSON.parse(storedAddedToCart) : {};



    const dataToStore = {
      id: item.idCrm,
      productName: product.heading,
      price: item.price,
      capacity: item.ml,
      photo: product.productSlider[0].url,

    };
    const updatedAddedToCart = {
      ...parsedAddedToCart,
      [item.idCrm]: true,
    };
    const updatedData = [...storedData, dataToStore];

    localStorage.setItem('storedData', JSON.stringify(updatedData));
    localStorage.setItem('addedToCart', JSON.stringify(updatedAddedToCart));

    setAddedToCart((prevAddedToCart: any) => ({
      ...prevAddedToCart,
      [item.idCrm]: true,
    }));
    setAddedToCart(updatedAddedToCart);
  };

  useEffect(() => {
    const storedAddedToCart = localStorage.getItem('addedToCart');
    if (storedAddedToCart) {
      setAddedToCart(JSON.parse(storedAddedToCart));
    }
  }, []);

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
          className="fixed inset-0 z-30 flex h-dvh items-center justify-center overflow-y-auto bg-white/50 cursor-default"
          onClick={() => setMenuClosed()}
        >
          <div className="relative h-full w-auto xl:h-auto">
            <button
              onClick={() => setMenuClosed()}
              className="fixed right-10 top-1 z-10 mt-[10px] rounded-full  p-4 duration-300  xl:absolute"
            >
              <BurgerCross className="h-6 w-6 text-black" />
            </button>
            <div
              className="relative h-full overflow-y-auto bg-white px-[80px] py-6 xl:flex xl:h-[688px] xl:w-[1280px] xl:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mr-[90px] xl:flex xl:h-full xl:flex-col">
                <div className="relative mb-4 h-full md:h-96 xl:h-[380px] xl:w-[450px] xl:flex-shrink-0 ">
                  <Image
                    quality={80}
                    fill
                    src={currentImageUrl || product.productSlider[0].url}
                    alt={product.productpicture.alt || "Emmy and Lili"}
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                  />
                </div>

                <div className="hidden xl:flex xl:h-full xl:w-[450px] xl:flex-row cursor-pointer">
                  {product.productSlider.map(
                    (slide: { alt: string; url: string; id: string }) => (
                      <div
                        className="relative mr-2 w-1/3 last:mr-0 "
                        key={slide.id}
                        onClick={() => setActiveSlideImage(slide.url)}
                      >
                        <div
                          className={cn(
                            "absolute inset-0 z-10",
                            slide.url !== currentImageUrl
                              ? "bg-black/50"
                              : "border-b-4 border-black"
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
                <table className="mb-12  w-full">
                  <thead>
                    <tr>
                      <th className="py-2 w-2/5 text-t14 text-[#333333] opacity-60">
                        Об`єм
                      </th>
                      {/* <th className="py-2 text-center  text-t14 text-[#333333] opacity-60">
                        Кіл-ть
                      </th> */}
                      <th className=" w-1/5 py-2 text-center text-t14 text-[#333333] opacity-60">
                        Ціна
                      </th>
                      <th className="w-2/5 py-2 text-right text-t14 text-[#333333] opacity-60">
                        Додати у кошик
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.capacity.map((item: any) => (

                      <tr key={item.idCrm}>
                        <td className="py-2 text-t18 leading-5 text-[#333333] ">
                          {item.ml}
                        </td>

                        <td className="py-2 text-center text-t18 leading-5 text-[#333333]">
                          {product.capacity && product.capacity[0] && (
                            lang === en
                              ? state && state.products.find((item: any) => item.id === product.capacity[0].idCrm)
                                ? convertPrice(
                                  state.products.find((item: any) => item.id === product.capacity[0].idCrm)!.price,
                                  state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1
                                )
                                : 'N/A'
                              : state && state.products.find((item: any) => item.id === product.capacity[0].idCrm)
                                ? state.products.find((item: any) => item.id === product.capacity[0].idCrm)!.price
                                : 'N/A'
                          )} {lang === en ? '€' : '₴'}
                        </td>


                        <td className="text-end py-2 text-t18 leading-5 text-[#333333]">
                          <button
                            onClick={() => addToCart(item)}
                            className={`py-auto ml-auto h-10 rounded bg-black ${addedToCart[item.idCrm] ? 'text-white text-t18 pointer-events-none w-[172px] py-1 px-3 cursor-default' : 'py-[5px] w-[76px] px-[22.5px] '}`}
                            disabled={addedToCart[item.idCrm]}
                          >
                            {addedToCart[item.idCrm] ? lang === en ? 'item in cart' : 'Товар у кошику' : <Bag color="white" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className=" flex flex-row text-center  text-t18 font-bold leading-5">
                  <button
                    className={cn(
                      "mb-4 w-full border-solid pb-1 pt-2 text-[#33333399]",
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
                      "mb-4 w-full border-solid pb-1 pt-2 text-[#33333399]",
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
                      "mb-4 w-full border-solid pb-1 pt-2 text-[#33333399]",
                      activeTab === "usage"
                        ? "border-b-2 border-black text-black"
                        : "border-b border-border opacity-60"
                    )}
                    onClick={() => showUsage()}
                  >
                    {product.method}
                  </button>
                </div>
                <div className="list-disc overflow-y-auto  pt-2 text-black xl:h-[320px]">
                  {activeTab === "components" && (
                    <Markdown
                      className="mb-1 ml-2 list-disc pr-2 text-t14"
                      text={product.activeComponents}
                    />
                  )}
                  {activeTab === "composition" && (
                    <Markdown
                      className="list-disc pr-2 text-t14"
                      text={product.composition}
                    />
                  )}
                  {activeTab === "usage" && (
                    <Markdown
                      className="list-disc  pr-2"
                      text={product.methodOfUse}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
