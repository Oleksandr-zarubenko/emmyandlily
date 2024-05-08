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
import CartModal from "./CartModal";
import { useAddedToCart } from "@/components/context/addedToCart";

export const ProductModal = ({
  product,
  state,
  lang,
  children,
  convertPrice,
}: {
  product: any;
  lang: any;
  children: any;
  state: any;
  convertPrice: any;
}) => {
  const locales = i18n.locales;
  const en = locales[1];
  const { addedToCart, setAddedToCart } = useAddedToCart();
  const [isOpen, setIsOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
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
    setCartModalOpen(true);
    setAdditionalModalOpen(true);
    const storedDataString = localStorage.getItem("storedData");
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const storedAddedToCart = localStorage.getItem("addedToCart");
    const parsedAddedToCart = storedAddedToCart
      ? JSON.parse(storedAddedToCart)
      : {};

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

    localStorage.setItem("storedData", JSON.stringify(updatedData));
    localStorage.setItem("addedToCart", JSON.stringify(updatedAddedToCart));

    setAddedToCart((prevAddedToCart: any) => ({
      ...prevAddedToCart,
      [item.idCrm]: true,
    }));
    setAddedToCart(updatedAddedToCart);
  };

  useEffect(() => {
    const storedAddedToCart = localStorage.getItem("addedToCart");
    if (storedAddedToCart) {
      setAddedToCart(JSON.parse(storedAddedToCart));
    }
  }, [setAddedToCart]);

  return (
    <>
      <PathModalXl />
      <button
        className="relative mb-5 text-left"
        onClick={() => setModalOpened()}
      >
        {children}
      </button>

      {additionalModalOpen && (
        <CartModal
          onClose={() => setAdditionalModalOpen(false)}
          lang={lang}
          en={en}
        />
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex h-dvh cursor-default items-center justify-center overflow-y-auto bg-bg_transparent"
          onClick={() => setMenuClosed()}
        >
          <div className="relative h-full w-full xl:h-auto xl:w-auto">
            <button
              onClick={() => setMenuClosed()}
              className="fixed right-10 top-1 z-10 mt-[10px] rounded-full  p-4 duration-300  xl:absolute"
            >
              <BurgerCross className="h-6 w-6 text-black" />
            </button>

            <div
              className="relative h-full w-full overflow-y-auto bg-white px-5 py-6 xl:mr-8 xl:flex xl:h-[698px] xl:w-[1280px] xl:flex-row xl:px-[80px] mdOnly:px-[48px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="xl:mr-[80px]  xl:flex xl:h-full xl:flex-col">
                <Markdown
                  text={product.heading}
                  className="mb-8 text-t24 xl:hidden"
                />

                <div className="notXl:flex">
                  <div className="relative mb-4  mr-4 h-52 w-[200px]  md:h-96 xl:mr-0 xl:h-[380px] xl:w-[450px] xl:flex-shrink-0 mdOnly:h-52   mdOnly:w-[312px] ">
                    <Image
                      quality={80}
                      fill
                      src={currentImageUrl || product.productSlider[0].url}
                      alt={product.productpicture.alt || "Emmy and Lili"}
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                    />
                  </div>

                  <div className="block h-[48px] w-[88px]  cursor-pointer flex-row xl:flex xl:h-[88px] xl:w-[450px] xl:flex-row mdOnly:h-[48px] mdOnly:w-[88px]">
                    {product.productSlider.map(
                      (slide: { alt: string; url: string; id: string }) => (
                        <div
                          className="relative  mb-8 h-[88px] w-full last:mr-0 xl:mr-2 xl:w-1/3 smOnly:h-[48px] mdOnly:h-[48px] "
                          key={slide.id}
                          onClick={() => setActiveSlideImage(slide.url)}
                        >
                          <div
                            className={cn(
                              "absolute inset-0 z-10 ",
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
                </div>
                <div className="mb-8 mt-6 gap-2 md:flex-wrap md:gap-3 xl:mb-0 xl:flex xl:w-[450px] smOnly:flex-col">
                  {product?.advantage1 && (
                    <p className="mb-2 w-full  rounded bg-[#DCDCDC] px-3 py-2 text-t14 text-black md:text-t16 xl:mb-0 xl:text-t16 mdOnly:w-[436px]">
                      {product.advantage1}
                    </p>
                  )}
                  {product?.advantage2 && (
                    <p className="mb-2 w-full  rounded bg-[#DCDCDC] px-3 py-2 text-t14 text-black md:text-t16 xl:mb-0 xl:text-t16 mdOnly:w-[436px]">
                      {product.advantage2}
                    </p>
                  )}
                  {product?.advantage3 && (
                    <p className=" w-full rounded   bg-[#DCDCDC] px-3 py-2 text-t14 text-black md:text-t16 xl:text-t16 mdOnly:w-[436px]">
                      {product.advantage3}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full pr-0 xl:pr-[15px]">
                <Markdown
                  text={product.heading}
                  className=" mb-8 text-t32 smOnly:hidden mdOnly:hidden"
                />
                <table className="mb-12 xl:w-full smOnly:w-[100%] mdOnly:w-[436px]">
                  <thead>
                    <tr>
                      <th className="w-2/5  py-2 text-t14 text-[#333333] opacity-60 smOnly:w-1/5">
                        {lang === en ? "Capacity" : "Об`єм"}
                      </th>

                      <th className=" w-1/5 py-2  text-left text-t14 text-[#333333] opacity-60 xl:text-center smOnly:w-2/5 smOnly:text-center">
                        {lang === en ? "Price" : "Ціна "}
                      </th>
                      <th className="w-2/5 py-2 text-right text-t14 text-[#333333] opacity-60">
                        {lang === en ? "Add to Cart " : " Додати у кошик "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.capacity.map((item: any) => (
                      <tr key={item.idCrm}>
                        <td className="py-2 text-t18 leading-5 text-[#333333] ">
                          {item.ml}
                        </td>

                        <td className="py-2 text-left text-t18 leading-5 text-[#333333] xl:text-center smOnly:text-center">
                          {product.capacity &&
                            product.capacity[0] &&
                            (lang === en
                              ? state &&
                                state.products.find(
                                  (item: any) =>
                                    item.id === product.capacity[0].idCrm
                                )
                                ? convertPrice(
                                    state.products.find(
                                      (item: any) =>
                                        item.id === product.capacity[0].idCrm
                                    )!.price,
                                    state.currencies.find(
                                      (currency: any) => currency.id === "EUR"
                                    )?.rate || 1
                                  )
                                : "N/A"
                              : state &&
                                  state.products.find(
                                    (item: any) =>
                                      item.id === product.capacity[0].idCrm
                                  )
                                ? state.products.find(
                                    (item: any) =>
                                      item.id === product.capacity[0].idCrm
                                  )!.price
                                : "N/A")}{" "}
                          {lang === en ? "€" : "₴"}
                        </td>

                        <td className="py-2 text-end text-t18 leading-5 text-[#333333]">
                          <button
                            onClick={() => addToCart(item)}
                            className={`py-auto ml-auto h-10 rounded bg-black ${addedToCart[item.idCrm] ? "pointer-events-none    w-[172px] cursor-default px-3 py-1 text-t18 text-white smOnly:w-[120px]" : " w-[76px] px-[22.5px] py-[5px] "}`}
                            disabled={addedToCart[item.idCrm]}
                          >
                            {addedToCart[item.idCrm] ? (
                              lang === en ? (
                                "item in cart"
                              ) : (
                                "Додано ✓️"
                              )
                            ) : (
                              <Bag color="white" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className=" flex flex-row text-center text-t18 font-bold leading-5 smOnly:text-t14">
                  <button
                    className={cn(
                      "mb-4  w-full border-solid pb-1 pt-2 text-[#33333399]",
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
                <div className="list-disc pt-2 text-black md:overflow-y-auto xl:h-[320px] smOnly:overflow-hidden">
                  {activeTab === "components" && (
                    <Markdown
                      className="mb-1 ml-3 max-w-max list-disc pr-2 text-t14"
                      text={product.activeComponents}
                    />
                  )}
                  {activeTab === "composition" && (
                    <Markdown
                      className="max-w-max list-disc pr-2 text-t14"
                      text={product.composition}
                    />
                  )}
                  {activeTab === "usage" && (
                    <Markdown
                      className="ml-3 max-w-max list-disc pr-2"
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
