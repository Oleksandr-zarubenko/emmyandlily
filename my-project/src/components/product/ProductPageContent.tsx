"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import cn from "classnames";
import { useRouter } from "@/i18n/navigation";
import { Markdown } from "@/components/Markdown";
import { Bag } from "@/components/icons/Bag";
import CartModal from "@/components/CartModal";
import {
  DatoProduct,
  DatoSecondModal,
  DatoProductCapacity,
} from "@/types/dato";
import { Locale, locales } from "@/i18n/routing";
import { useCheckoutStore } from "@/store/checkoutStore";
import { SalesDriveData } from "@/types/salesdrive";
import getData from "@/utils/api/api";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { PRODUCT_IMAGE_BLUR_DATA_URL } from "@/utils/productImageBlur";
import { trackPixel } from "@/lib/pixel";

type ProductPageContentProps = {
  product: DatoProduct;
  lang: Locale;
  secondmodal: DatoSecondModal;
};

export default function ProductPageContent({
  product,
  lang,
  secondmodal,
}: ProductPageContentProps) {
  const productHeading = product.heading
    .replace(/[#*_`[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const router = useRouter();
  const en = locales[1];
  const addedToCart = useCheckoutStore((state) => state.addedToCart);
  const setAddedToCart = useCheckoutStore((state) => state.setAddedToCart);
  const addCartItem = useCheckoutStore((state) => state.addCartItem);
  const [additionalModalOpen, setAdditionalModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "components" | "composition" | "usage"
  >("components");
  const [currentImageUrl, setActiveImageUrl] = useState(
    product.productSlider[0].url
  );
  const [state, setState] = useState<SalesDriveData>({
    products: [],
    currencies: [],
  });

  useEffect(() => {
    void (async () => {
      try {
        const data = await getData(lang);
        setState(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [lang]);

  const addToCart = (item: DatoProductCapacity) => {
    setAdditionalModalOpen(true);
    const productState = state.products.find((p) => p.id === item.idCrm);
    const productPrice = productState ? productState.price : item.price;

    addCartItem({
      id: item.idCrm,
      productName: product.heading,
      price: String(productPrice ?? 0),
      capacity: item.ml,
      photo: product.productSlider[0].url,
    });
    setAddedToCart((prevAddedToCart) => ({
      ...prevAddedToCart,
      [item.idCrm]: true,
    }));

    trackPixel("AddToCart", {
      content_ids: [item.idCrm],
      content_type: "product",
      value: productPrice,
      currency: lang === en ? "EUR" : "UAH",
    });
  };

  return (
    <section>
      {additionalModalOpen ? (
        <CartModal
          onClose={() => setAdditionalModalOpen(false)}
          onGoToCart={() => {
            setAdditionalModalOpen(false);
            router.push("/basket");
          }}
          lang={lang}
          data={{ secondmodal }}
        />
      ) : null}

      <div className="mdOnly:px-[48px] relative mt-20 w-full bg-white px-5 py-6 xl:flex xl:min-h-[698px] xl:flex-row xl:px-[80px]">
        <div className="xl:mr-[80px] xl:flex xl:h-full xl:flex-col">
          <h1 className="text-t24 mb-8 xl:hidden">{productHeading}</h1>

          <div className="notXl:flex">
            <div className="mdOnly:h-72 mdOnly:w-[436px] relative mr-4 mb-4 h-56 w-[220px] md:h-96 xl:mr-0 xl:h-[380px] xl:w-[450px] xl:flex-shrink-0">
              <Image
                quality={100}
                fill
                src={currentImageUrl || product.productSlider[0].url}
                alt={product.productpicture.alt || "Emmy and Lily"}
                className="object-cover"
                sizes="(max-width: 768px) 88vw, (max-width: 1200px) 60vw, 550px"
                placeholder="blur"
                blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
              />
            </div>

            <div className="mdOnly:w-[88px] block h-[56px] w-[96px] cursor-pointer flex-row xl:flex xl:h-[88px] xl:w-[450px] xl:flex-row">
              {product.productSlider.map((slide, index) => (
                <div
                  className="relative mb-8 h-[56px] w-full last:mr-0 xl:mr-2 xl:h-[88px] xl:w-1/3"
                  key={`${slide.id}-${index}-${slide.url}`}
                  onClick={() => setActiveImageUrl(slide.url)}
                >
                  <div
                    className={cn(
                      "absolute inset-0 z-10 rounded",
                      slide.url !== currentImageUrl
                        ? "bg-black/50"
                        : "rounded border-b-4 border-black"
                    )}
                  ></div>
                  <Image
                    quality={75}
                    fill
                    src={slide.url}
                    alt={slide.alt ?? "Emmy and Lily"}
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, (max-width: 1200px) 20vw, 183px"
                    placeholder="blur"
                    blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="smOnly:flex-col mt-6 mb-8 gap-2 md:flex-wrap md:gap-3 xl:mb-0 xl:flex xl:w-[450px]">
            {product.advantage1 ? (
              <p className="text-t14 md:text-t16 xl:text-t16 mdOnly:w-[436px] mb-2 w-full rounded bg-[#DCDCDC] px-3 py-2 text-black xl:mb-0">
                {product.advantage1}
              </p>
            ) : null}
            {product.advantage2 ? (
              <p className="text-t14 md:text-t16 xl:text-t16 mdOnly:w-[436px] mb-2 w-full rounded bg-[#DCDCDC] px-3 py-2 text-black xl:mb-0">
                {product.advantage2}
              </p>
            ) : null}
            {product.advantage3 ? (
              <p className="text-t14 md:text-t16 xl:text-t16 mdOnly:w-[436px] w-full rounded bg-[#DCDCDC] px-3 py-2 text-black">
                {product.advantage3}
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-full pr-0 xl:pr-[15px]">
          <p className="text-t32 smOnly:hidden mdOnly:hidden mb-8">
            {productHeading}
          </p>
          <table className="smOnly:w-[100%] mdOnly:w-[436px] mb-12 xl:w-full">
            <thead>
              <tr>
                <th className="text-t14 smOnly:w-1/5 w-2/5 py-2 text-left text-[#333333] italic opacity-60">
                  {lang === en ? "Capacity" : "Об’єм"}
                </th>
                <th className="text-t14 smOnly:w-2/5 smOnly:text-center w-1/5 py-2 text-left text-[#333333] italic opacity-60 xl:text-center">
                  {lang === en ? "Price" : "Ціна"}
                </th>
                <th className="text-t14 w-2/5 py-2 text-right text-[#333333] italic opacity-60">
                  {lang === en ? "Add to Cart" : "Додати у кошик"}
                </th>
              </tr>
            </thead>
            <tbody>
              {product.capacity.map((item) => (
                <tr key={item.idCrm}>
                  <td className="text-t18 py-2 leading-5 text-[#333333]">
                    {item.ml} {item.ml ? (lang === "uk" ? "мл" : "ml") : ""}
                  </td>
                  <td className="text-t18 smOnly:text-center py-2 text-left leading-5 text-[#333333] xl:text-center">
                    {state.products
                      .filter((p) => p.id === item.idCrm)
                      .map((p) => (
                        <span key={p.id}>
                          {lang === "en"
                            ? convertPrice(
                                p.price,
                                state.currencies.find(
                                  (currency) => currency.id === "EUR"
                                )?.rate || 1
                              )
                            : p.price}{" "}
                          {lang === "en" ? "UAH" : "₴"}
                        </span>
                      ))}
                  </td>
                  <td className="text-t18 py-2 text-end leading-5 text-[#333333]">
                    <button
                      onClick={() => addToCart(item)}
                      className={`py-auto ml-auto h-10 rounded bg-black ${
                        addedToCart[item.idCrm]
                          ? "text-t18 smOnly:w-[120px] pointer-events-none w-[172px] cursor-default px-3 py-1 text-white"
                          : "w-[76px] px-[22.5px] py-[5px]"
                      }`}
                      disabled={addedToCart[item.idCrm]}
                    >
                      {addedToCart[item.idCrm] ? (
                        lang === en ? (
                          "item in cart"
                        ) : (
                          "Додано ✓"
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

          <div className="text-t18 smOnly:text-t14 flex flex-row text-center leading-5 font-bold">
            <button
              className={cn(
                "mb-4 w-full border-solid pt-2 pb-1 text-[#33333399]",
                activeTab === "components"
                  ? "border-b-2 border-black text-black"
                  : "border-border border-b opacity-60"
              )}
              onClick={() => setActiveTab("components")}
            >
              {product.activecomp ?? ""}
            </button>
            <button
              className={cn(
                "mb-4 w-full border-solid pt-2 pb-1 text-[#33333399]",
                activeTab === "composition"
                  ? "border-b-2 border-black text-black"
                  : "border-border border-b opacity-60"
              )}
              onClick={() => setActiveTab("composition")}
            >
              {product.composit ?? ""}
            </button>
            <button
              className={cn(
                "mb-4 w-full border-solid pt-2 pb-1 text-[#33333399]",
                activeTab === "usage"
                  ? "border-b-2 border-black text-black"
                  : "border-border border-b opacity-60"
              )}
              onClick={() => setActiveTab("usage")}
            >
              {product.method ?? ""}
            </button>
          </div>
          <div className="list-disc pt-2 text-black xl:h-[320px] xl:overflow-y-auto">
            {activeTab === "components" ? (
              <Markdown
                className="text-t14 mb-1 ml-3 max-w-max list-disc pr-2"
                text={product.activeComponents ?? ""}
              />
            ) : null}
            {activeTab === "composition" ? (
              <Markdown
                className="text-t14 max-w-max list-disc pr-2"
                text={product.composition ?? ""}
              />
            ) : null}
            {activeTab === "usage" ? (
              <Markdown
                className="ml-3 max-w-max list-disc pr-2"
                text={product.methodOfUse ?? ""}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
