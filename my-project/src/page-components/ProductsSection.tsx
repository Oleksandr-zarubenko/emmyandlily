"use client";
import { Markdown } from "@/components/Markdown";
import { ProductCard } from "@/components/ProductCard";
import { Paw } from "@/components/icons/Paw";
import { Locale } from "@/i18n/routing";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import dynamic from "next/dynamic";
import { useState } from "react";
import { DatoCategory, DatoHomeData, DatoProduct } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";

const InterceptProductModalContent = dynamic(
  () => import("@/components/product/InterceptProductModalContent"),
  { ssr: false }
);

export const ProductsSection = ({
  data,
  lang,
  salesDriveData,
}: {
  data: DatoHomeData;
  lang: Locale;
  salesDriveData: SalesDriveData;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DatoProduct | null>(
    null
  );
  const sectionHeading = data.productsSection.heading
    .replace(/[#*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const hasSalesDriveProducts = salesDriveData.products.length > 0;

  const availableProducts = data.allProducts.filter((product: DatoProduct) => {
    const inSelectedCategory = selectedCategory
      ? product.category?.some(
          (cat: DatoCategory) => cat.id === selectedCategory
        )
      : true;

    const correspondingProduct = product.capacity.some((cap) =>
      salesDriveData.products.some(
        (p) => p.id === cap.idCrm && p.available === "true"
      )
    );

    return (
      inSelectedCategory && (!hasSalesDriveProducts || correspondingProduct)
    );
  });
  // console.log("availableProducts", availableProducts);

  return (
    <section className="bg-black py-14 text-center md:py-16" id="products">
      <div className="container">
        <div className="xl:justify-left smOnly:justify-center mb-8 flex flex-row items-center gap-1 md:gap-4 xl:mb-10">
          <Paw className="h-8 w-8 p-[4px] text-white md:h-11 md:w-11" />
          <h2 className="text-t24 text-white xl:text-t32">{sectionHeading}</h2>
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
                state={salesDriveData}
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
          salesDriveData={salesDriveData}
          onRequestClose={() => setSelectedProduct(null)}
        />
      ) : null}
    </section>
  );
};
