"use client";
import InterceptProductModalContent from "@/components/product/InterceptProductModalContent";
import { Markdown } from "@/components/Markdown";
import { ProductCard } from "@/components/ProductCard";
import { Paw } from "@/components/icons/Paw";
import { Locale } from "@/i18n/routing";
import getData from "@/utils/api/api";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { useEffect, useState } from "react";
import { DatoCategory, DatoHomeData, DatoProduct } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
export const ProductsSection = ({
  data,
  lang,
}: {
  data: DatoHomeData;
  lang: Locale;
}) => {
  const [state, setState] = useState<SalesDriveData>({
    products: [],
    currencies: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DatoProduct | null>(
    null
  );
  const sectionHeading = data.productsSection.heading
    .replace(/[#*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await getData(lang);
        if (!cancelled) {
          setState(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const availableProducts = data.allProducts.filter((product: DatoProduct) => {
    const inSelectedCategory = selectedCategory
      ? product.category?.some(
          (cat: DatoCategory) => cat.id === selectedCategory
        )
      : true;

    const correspondingProduct = product.capacity.some((cap) =>
      state.products.some((p) => p.id === cap.idCrm && p.available === "true")
    );

    return inSelectedCategory && correspondingProduct;
  });
  // console.log("availableProducts", availableProducts);
  console.log({ data });

  return (
    <section className="bg-black py-14 text-center md:py-16" id="products">
      <div className="container">
        <div className="xl:justify-left smOnly:justify-center mb-8 flex flex-row items-center gap-1 md:gap-4 xl:mb-10">
          <Paw className="h-8 w-8 p-1 text-white md:h-11 md:w-11" />
          <h2 className="text-t24 xl:text-t32 text-white">{sectionHeading}</h2>
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
            {lang === "uk" ? "Всі" : "All"}
          </button>

          {data.allCategories.map((category) => (
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
        <div className="mdOnly:grid-cols-2 grid grid-cols-1 gap-1 bg-black text-left md:gap-6 xl:grid-cols-3 xl:gap-4">
          {availableProducts.length > 0 &&
            availableProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                state={state}
                convertPrice={convertPrice}
                onOpenProduct={setSelectedProduct}
              />
            ))}
        </div>
      </div>
      {selectedProduct ? (
        <InterceptProductModalContent
          product={selectedProduct}
          lang={lang}
          secondmodal={data.secondmodal}
          onRequestClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </section>
  );
};
