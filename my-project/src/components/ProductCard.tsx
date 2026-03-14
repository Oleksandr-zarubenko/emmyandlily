"use client";

import Image from "next/image";
import { Discount } from "./icons/Discount";
import { Markdown } from "./Markdown";
import { DatoProduct } from "@/types/dato";
import { Locale } from "@/i18n/routing";
import { SalesDriveData } from "@/types/salesdrive";
import { PRODUCT_IMAGE_BLUR_DATA_URL } from "@/utils/productImageBlur";

interface ProductCardProps {
  state: SalesDriveData;
  product: DatoProduct;
  lang: Locale;
  convertPrice: (price: string | number, rate: number) => string;
  onOpenProduct: (product: DatoProduct) => void;
}

export const ProductCard = ({
  state,
  product,
  lang,
  convertPrice,
  onOpenProduct,
}: ProductCardProps) => {
  const findProductPrice = (idCrm: string) => {
    const pricedProduct = state.products.find((item) => item.id === idCrm);
    if (!pricedProduct) return "N/A";

    return lang === "en"
      ? convertPrice(
          pricedProduct.price,
          state.currencies.find((currency) => currency.id === "EUR")?.rate || 1
        )
      : pricedProduct.price;
  };

  const getCurrencySymbol = () => (lang === "en" ? "UAH" : "₴");

  return (
    <article
      data-idcrm={product.capacity[0].idCrm}
      key={product.id}
      className="group mx-auto h-auto w-[260px] cursor-pointer rounded duration-300 hover:shadow-custom md:w-[304px] smOnly:mb-6"
    >
      <button
        type="button"
        onClick={() => onOpenProduct(product)}
        className="relative mb-5 block text-left"
      >
        <div className="relative mb-3 h-[300px] w-[260px] overflow-hidden rounded xl:mb-4 xl:h-[344px] xl:w-[304px] mdOnly:h-[280px] mdOnly:w-[280px]">
          <Image
            fill
            src={product.productpicture.url}
            alt={product.productpicture.alt || "Emmy and Lily"}
            className="product object-cover duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 90vw, 305px"
            placeholder="blur"
            blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
          />

          {state.products.map(
            (prod) =>
              prod.id === product.capacity[0].idCrm && (
                <span
                  key={prod.id}
                  className="absolute right-2 h-8 w-8 text-black xl:right-4"
                >
                  {prod.oldprice ? (
                    <Discount className="mt-3 rounded bg-red-600 px-[3px] py-[3px] xl:mt-6" />
                  ) : (
                    ""
                  )}
                </span>
              )
          )}
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
            {product.capacity.map((item) => (
              <li
                key={item.idCrm}
                className="mr-8 text-t14 italic text-white xl:text-t16"
              >
                {item.ml} {item.ml ? (lang === "uk" ? "мл" : "ml") : ""}
              </li>
            ))}
          </ul>
          {product.capacity[0] ? (
            <p className="text-t16 leading-6 text-white xl:text-t18">
              {product.preview ? (
                lang === "en" ? (
                  "Coming soon!"
                ) : (
                  "Скоро в доступі!"
                )
              ) : (
                <>
                  {product.capacity.length > 1 &&
                    (lang === "en" ? "from" : "від")}
                  {findProductPrice(product.capacity[0].idCrm)}{" "}
                  {getCurrencySymbol()}
                </>
              )}
            </p>
          ) : null}
        </div>
      </button>
    </article>
  );
};
