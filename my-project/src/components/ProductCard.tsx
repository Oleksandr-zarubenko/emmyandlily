import Image from "next/image";
import { ProductModal } from "./ProductModal";
import { Discount } from "./icons/Discount";
import { Markdown } from "./Markdown";
import { Key } from "react";

export const ProductCard = ({
  state,
  product,
  lang,
  data,
  convertPrice,
}: any) => {
  if (product.preview) console.log("product", product);
  return (
    <article
      key={product.id}
      className="group mx-auto h-auto w-[260px] cursor-pointer rounded duration-300 hover:shadow-custom md:w-[304px] smOnly:mb-6"
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

          {state.products.map(
            (prod: { id: Key | null | undefined; oldprice: any }) =>
              prod.id === product.capacity[0].idCrm && (
                <span
                  key={prod.id}
                  className="absolute right-2 h-8  w-8 text-black xl:right-4"
                >
                  {prod.oldprice ? (
                    <Discount className="mt-3 rounded bg-red-600 px-[3px] py-[3px] xl:mt-6 " />
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
                {product.preview ? (
                  lang === "en" ? (
                    "Coming soon!"
                  ) : (
                    "Скоро в доступі!"
                  )
                ) : (
                  <>
                    {product.capacity &&
                      product.capacity.length > 1 &&
                      (lang === "en" ? "from" : "від")}{" "}
                    {lang === "en"
                      ? state &&
                        state.products.find(
                          (item: { id: any }) =>
                            item.id === product.capacity[0].idCrm
                        )
                        ? convertPrice(
                            state.products.find(
                              (item: { id: any }) =>
                                item.id === product.capacity[0].idCrm
                            )!.price,
                            state.currencies.find(
                              (currency: { id: string }) =>
                                currency.id === "EUR"
                            )?.rate || 1
                          )
                        : "N/A"
                      : state &&
                          state.products.find(
                            (item: { id: any }) =>
                              item.id === product.capacity[0].idCrm
                          )
                        ? state.products.find(
                            (item: { id: any }) =>
                              item.id === product.capacity[0].idCrm
                          )!.price
                        : "N/A"}{" "}
                    {lang === "en" ? "€" : "₴"}
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </ProductModal>
    </article>
  );
};
