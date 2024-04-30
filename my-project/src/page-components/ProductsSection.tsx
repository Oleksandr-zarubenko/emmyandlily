"use client";
import { useEffect, useState } from "react";

import { Markdown } from "@/components/Markdown";
import { i18n } from "@/i18n.config";
import { Paw } from "@/components/icons/Paw";
import Image from "next/image";
import { ProductModal } from "@/components/ProductModal";
import { Locale } from "@/i18n.config";
import { stat } from 'fs';

export const ProductsSection = ({
  data,
  lang,
}: {
  data: any;
  lang: Locale;
}) => {

  const [state, setState] = useState<{ products: { id: string; price: string; available: string }[], currencies: { id: string; rate: number }[] }>({ products: [], currencies: [] });


  const getData = async () => {
    try {
      const res = await fetch(`/api/get-price`, {
        method: "GET",
      });
      const pos = await res.json();
      setState(pos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const locales = i18n.locales;
  const en = locales[1];

  const convertPrice = (price: string, rate: number): string => {
    const convertedPrice = parseFloat(price) / rate;
    return convertedPrice.toFixed(2);
  };
  const availableProducts = data.allProducts.filter((product: any) => {
    const correspondingProduct = state.products.find((p) => p.id === product.idAvailable);
    return correspondingProduct && correspondingProduct.available === 'true';
  });


  return (
    <section className="bg-black text-center py-14 md:py-16" id="products">
      <div className="container">
        <div className="xl:justify-left smOnly:justify-center mb-8 flex flex-row items-center gap-1 md:gap-4 xl:mb-10">
          <Paw className="h-8 w-8 p-[4px] text-white md:h-11 md:w-11" />
          <Markdown
            text={data.productsSection.heading}
            className="text-t24 xl:text-t32 text-white"
          />
        </div>
        {data.productsSection.text && (
          <Markdown text={data.productsSection.text} />
        )}
        {/* <div className="grid xl:gap-4  gap-1 bg-black text-left grid-cols-1  xl:grid-cols-3 md:gap-6 mdOnly:grid-cols-2 ">
          {availableProducts.length > 0 &&
            availableProducts
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <article
                  key={product.id}
                  className="mx-auto xl:w-[304px] cursor-pointer rounded  hover:shadow-custom mdOnly:w-[270px] mdOnly:h-[250px]"
                >

                  <ProductModal product={product} lang={lang} state={state} convertPrice={convertPrice}>
                    <div className="relative mb-4 h-[253px] overflow-hidden rounded xl:h-[344px] xl:w-[304px] mdOnly:h-[160px] mdOnly:w-full">
           

                      <Image
                        fill
                        src={product.productpicture.url}
                        alt={product.productpicture.alt || "Emmy and Lili"}
                        className="product h-[253px] w-[304px] object-cover xl:h-[344px] mdOnly:h-[160px] mdOnly:w-full"
                        sizes="(max-width: 768px) 90vw, 305px"
                      />
                    </div>
                    <div className="px-4">
                      <Markdown
                        text={product.heading}
                        className="mb-2 text-t24 text-white"
                      />
                      <Markdown
                        text={product.description}
                        className="mb-4 !text-t14 text-[#FBFBFB] opacity-80 md:!text-t12"
                      />
                      <ul className="mb-4 flex">
                        {product.capacity &&
                          product.capacity &&
                          product.capacity.map((item: any) => (
                            <li
                              key={item.idCrm}
                              className="mr-8 text-t16 italic text-white"
                            >
                              {item.ml}
                            </li>
                          ))}
                      </ul>
                      {product.capacity && product.capacity[0] && (
                        <p className="text-t18 leading-6 text-white">

                          від {
                            lang === en
                              ? state && state.products.find((item) => item.id === product.capacity[0].idCrm)
                                ? convertPrice(state.products.find((item) => item.id === product.capacity[0].idCrm)!.price, state.currencies.find((currency) => currency.id === "EUR")?.rate || 1)
                                : 'N/A'
                              : state && state.products.find((item) => item.id === product.capacity[0].idCrm)
                                ? state.products.find((item) => item.id === product.capacity[0].idCrm)!.price
                                : 'N/A'
                          } {lang === en ? '€' : '₴'}

                        </p >
                      )}
                    </div >
                  </ProductModal >
                </article >
              ))}
        </div > */}
        <div className="grid xl:gap-4  gap-1 bg-black text-left grid-cols-1  xl:grid-cols-3 md:gap-6 mdOnly:grid-cols-2 ">
          {availableProducts.length > 0 &&
            availableProducts
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <article
                  key={product.id}
                  className="mx-auto md:w-[304px]  smOnly:mb-6 w-[260px] cursor-pointer rounded h-auto hover:shadow-custom "
                >
                  <ProductModal product={product} lang={lang} state={state} convertPrice={convertPrice}>
                    <div className="relative mb-3 xl:mb-4 h-[300px] w-[260px] overflow-hidden rounded xl:h-[344px] xl:w-[304px] mdOnly:h-[280x] mdOnly:w-[280px]">


                      <Image
                        fill
                        src={product.productpicture.url}
                        alt={product.productpicture.alt || "Emmy and Lili"}
                        className="product  object-cover "
                        sizes="(max-width: 768px) 90vw, 305px"
                      />
                    </div>
                    <div className="px-3 xl:px-4">
                      <Markdown
                        text={product.heading}
                        className="mb-3 xl:mb-4 text-t18 xl:text-t24 text-white"
                      />
                      <Markdown
                        text={product.description}
                        className="mb-2 xl:mb-4 xl:!text-t14 text-[#FBFBFB] opacity-80 !text-t12"
                      />
                      <ul className="mb-2 xl:mb-4 flex">
                        {product.capacity &&
                          product.capacity &&
                          product.capacity.map((item: any) => (
                            <li
                              key={item.idCrm}
                              className="mr-8 text-t14 xl:text-t16 italic text-white"
                            >
                              {item.ml}
                            </li>
                          ))}
                      </ul>
                      {product.capacity && product.capacity[0] && (
                        <p className="text-t16 xl:text-t18 leading-6 text-white">

                          {product.capacity && product.capacity.length > 1 && (
                            lang === en ? 'from' : 'від'
                          )} {
                            lang === en
                              ? state && state.products.find((item) => item.id === product.capacity[0].idCrm)
                                ? convertPrice(state.products.find((item) => item.id === product.capacity[0].idCrm)!.price, state.currencies.find((currency) => currency.id === "EUR")?.rate || 1)
                                : 'N/A'
                              : state && state.products.find((item) => item.id === product.capacity[0].idCrm)
                                ? state.products.find((item) => item.id === product.capacity[0].idCrm)!.price
                                : 'N/A'
                          } {lang === en ? '€' : '₴'}

                        </p >
                      )}
                    </div >
                  </ProductModal >
                </article >
              ))}
        </div>
      </div >
    </section >
  );
};


{/* <ProductModal
  product={product}
  lang={lang}
  state={state}
  convertPrice={convertPrice}
>
  <div className="relative mb-4 h-[253px] overflow-hidden rounded xl:h-[344px] xl:w-[304px] mdOnly:h-[160px] mdOnly:w-[193px]"> */}
// від{" "}
// {lang === en
//   ? state &&
//     state.products.find(
//       (item) => item.id === product.capacity[0].idCrm
//     )
//     ? convertPrice(
//         state.products.find(
//           (item) =>
//             item.id === product.capacity[0].idCrm
//         )!.price,
//         state.currencies.find(
//           (currency) => currency.id === "EUR"
//         )?.rate || 1
//       )
//     : "N/A"
//   : state &&
//       state.products.find(
//         (item) =>
//           item.id === product.capacity[0].idCrm
//       )
//     ? state.products.find(
//         (item) =>
//           item.id === product.capacity[0].idCrm
//       )!.price
//     : "N/A"}{" "}
// {lang === en ? "€" : "₴"}