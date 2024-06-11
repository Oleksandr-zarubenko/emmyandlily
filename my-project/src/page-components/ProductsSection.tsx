"use client";
import { Markdown } from "@/components/Markdown";
import { ProductCard } from "@/components/ProductCard";
import { Paw } from "@/components/icons/Paw";
import { Locale, i18n } from "@/i18n.config";
import getData from "@/utils/api/api";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { useEffect, useState } from "react";
export const ProductsSection = ({
  data,
  lang,
}: {
  data: any;
  lang: Locale;
}) => {
  const [state, setState] = useState<{
    products: { id: string; price: string; available: string; oldprice: any }[];
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
    const correspondingProduct = product.capacity.some((cap: any) =>
      state.products.some((p: any) => p.id === cap.idCrm && p.available === "true")
    );
    return correspondingProduct;
  });

  // const previewProducts = data.allProducts.filter(
  //   (product: any) => product.preview
  // );

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

        <div className="grid grid-cols-1 gap-1 bg-black text-left md:gap-6  xl:grid-cols-3 xl:gap-4 mdOnly:grid-cols-2">
          {availableProducts.length > 0 &&
            availableProducts
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  state={state}
                  data={data}
                  convertPrice={convertPrice}
                />
              ))}
          {/* {previewProducts.length > 0 &&
            previewProducts
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  state={state}
                  data={data}
                  convertPrice={convertPrice}
                />
              ))} */}
        </div>
      </div>
    </section>
  );
};