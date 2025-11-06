"use client";
import { Markdown } from "@/components/Markdown";
import { ProductCard } from "@/components/ProductCard";
import { Paw } from "@/components/icons/Paw";
import { Locale, locales } from "@/i18n/routing";
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await getData(lang);
      setState(data);
      // console.log("data crm :", { data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const en = locales[1];

  const availableProducts = data.allProducts.filter((product: any) => {
    const inSelectedCategory = selectedCategory
      ? product.category.some((cat: any) => cat.id === selectedCategory)
      : true;

    const correspondingProduct = product.capacity.some((cap: any) =>
      state.products.some(
        (p: any) => p.id === cap.idCrm && p.available === "true"
      )
    );

    return inSelectedCategory && correspondingProduct;
  });
  // console.log("availableProducts", availableProducts);

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
        <div className="mb-6 flex flex-wrap gap-4">
          <button
            className={`rounded-md border px-3 py-1 text-sm font-medium ${
              selectedCategory === null
                ? "border-white text-white"
                : "border-gray-300 text-gray-500 hover:border-white hover:text-white"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            Всі
          </button>

          {data.allCategories.map((category: any) => (
            <button
              key={category.id}
              className={`rounded-md border px-3 py-1 text-sm font-medium ${
                selectedCategory === category.id
                  ? "border-white text-white"
                  : "border-gray-300 text-gray-500 hover:border-white hover:text-white"
              }`}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-1 bg-black text-left md:gap-6  xl:grid-cols-3 xl:gap-4 mdOnly:grid-cols-2">
          {availableProducts.length > 0 &&
            availableProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                state={state}
                data={data}
                convertPrice={convertPrice}
              />
            ))}
        </div>
      </div>
    </section>
  );
};
