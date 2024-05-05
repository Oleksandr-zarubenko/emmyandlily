"use client";
import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { i18n } from "@/i18n.config";
import { Paw } from "@/components/icons/Paw";
import Image from "next/image";
import { ProductModal } from "@/components/ProductModal";
import { Locale } from "@/i18n.config";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import getData from "@/utils/api/api";
import { Discount } from "@/components/icons/Discount";
export const ProductsSection = ({
  data,
  lang,
}: {
  data: any;
  lang: Locale;
}) => {
  const [state, setState] = useState<{
    products: { id: string; price: string; available: string, oldprice: any }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });

  const fetchData = async () => {
    try {
      const data = await getData();
      setState(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const locales = i18n.locales;
  const en = locales[1];


  const availableProducts = data.allProducts.filter((product: any) => {
    const correspondingProduct = state.products.find(
      (p) => p.id === product.idAvailable
    );
    return correspondingProduct && correspondingProduct.available === "true";
  });

  return (
    <section className="bg-black py-14 text-center md:py-16" id="products">
      <div className="container">
        <div className="xl:justify-left mb-8 flex flex-row items-center gap-1 md:gap-4 xl:mb-10 smOnly:justify-center">
          <Paw className="h-8 w-8 p-[4px] text-white md:h-11 md:w-11" />
          <Markdown
            text={data.productsSection.heading}
            className="text-t24 text-white xl:text-t32"
          />
        </div>
        {data.productsSection.text && (
          <Markdown text={data.productsSection.text} />
        )}

        <div className="grid grid-cols-1  gap-1 bg-black text-left md:gap-6  xl:grid-cols-3 xl:gap-4 mdOnly:grid-cols-2 ">
          {availableProducts.length > 0 &&
            availableProducts
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <article
                  key={product.id}
                  className="group mx-auto h-auto w-[260px] cursor-pointer rounded hover:shadow-custom md:w-[304px] smOnly:mb-6"
                >
                  <ProductModal
                    product={product}
                    lang={lang}
                    state={state}
                    data={data}
                    convertPrice={convertPrice}
                  >
                    <div className="relative mb-3 h-[300px] w-[260px] overflow-hidden rounded xl:mb-4 xl:h-[344px] xl:w-[304px] mdOnly:h-[280x] mdOnly:w-[280px]">
                      <Image
                        fill
                        src={product.productpicture.url}
                        alt={product.productpicture.alt || "Emmy and Lili"}
                        className="product object-cover duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 90vw, 305px"
                      />

                      {state.products.map((prod) => (
                        prod.id === product.capacity[0].idCrm && (
                          <span key={prod.id} className="text-black right-2 xl:right-4  absolute w-8 h-8">{prod.oldprice ? <Discount className="bg-red-600 px-[3px] py-[3px] rounded mt-3 xl:mt-6 " /> : ''}</span>
                        )
                      ))}
                    </div>
                    <div className="px-3 xl:px-4">
                      <Markdown
                        text={product.heading}
                        className="mb-3 text-t18 text-white xl:mb-4 xl:text-t24"
                      />
                      <Markdown
                        text={product.description}
                        className="mb-2 !text-t12 text-[#FBFBFB] opacity-80 xl:mb-4 xl:!text-t14"
                      />
                      <ul className="mb-2 flex xl:mb-4">
                        {product.capacity &&
                          product.capacity &&
                          product.capacity.map((item: any) => (
                            <li
                              key={item.idCrm}
                              className="mr-8 text-t14 italic text-white xl:text-t16"
                            >
                              {item.ml}
                            </li>
                          ))}
                      </ul>
                      {product.capacity && product.capacity[0] && (
                        <>
                          <p className="text-t16 leading-6 text-white xl:text-t18">
                            {product.capacity &&
                              product.capacity.length > 1 &&
                              (lang === en ? "from" : "від")}{" "}
                            {lang === en
                              ? state &&
                                state.products.find(
                                  (item) => item.id === product.capacity[0].idCrm
                                )
                                ? convertPrice(
                                  state.products.find(
                                    (item) =>
                                      item.id === product.capacity[0].idCrm
                                  )!.price,
                                  state.currencies.find(
                                    (currency) => currency.id === "EUR"
                                  )?.rate || 1
                                )
                                : "N/A"
                              : state &&
                                state.products.find(
                                  (item) =>
                                    item.id === product.capacity[0].idCrm
                                )
                                ? state.products.find(
                                  (item) =>
                                    item.id === product.capacity[0].idCrm
                                )!.price
                                : "N/A"}{" "}
                            {lang === en ? "€" : "₴"}
                          </p>

                        </>

                      )}



                    </div>
                  </ProductModal>
                </article>
              ))}
        </div>
      </div>
    </section >
  );
};

