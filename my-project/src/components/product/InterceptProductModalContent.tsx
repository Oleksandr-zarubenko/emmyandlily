"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import cn from "classnames";
import { useRouter as useIntlRouter } from "@/i18n/navigation";
import { Markdown } from "@/components/Markdown";
import { BurgerCross } from "@/components/icons/BurgerCross";
import { PathModalXl } from "@/components/icons/PathModalXl";
import { Bag } from "@/components/icons/Bag";
import CartModal from "@/components/CartModal";
import { Modal } from "@/components/product/Modal";
import {
  DatoProduct,
  DatoProductCapacity,
  DatoSecondModal,
} from "@/types/dato";
import { Locale, locales } from "@/i18n/routing";
import { useCheckoutStore } from "@/store/checkoutStore";
import { SalesDriveData } from "@/types/salesdrive";
import getData from "@/utils/api/api";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { PRODUCT_IMAGE_BLUR_DATA_URL } from "@/utils/productImageBlur";

type InterceptProductModalContentProps = {
  product: DatoProduct;
  lang: Locale;
  secondmodal: DatoSecondModal;
  variant?: "modal" | "page";
  onRequestClose?: () => void;
};

type ProductModalBodyProps = {
  product: DatoProduct;
  lang: Locale;
  en: Locale;
  variant: "modal" | "page";
  state: SalesDriveData;
  currentImageUrl: string;
  onImageChange: (url: string) => void;
  activeTab: "components" | "composition" | "usage";
  onTabChange: (tab: "components" | "composition" | "usage") => void;
  addedToCart: Record<string, boolean>;
  onAddToCart: (item: DatoProductCapacity) => void;
  onClose: () => void;
};

function ProductModalBody({
  product,
  lang,
  en,
  variant,
  state,
  currentImageUrl,
  onImageChange,
  activeTab,
  onTabChange,
  addedToCart,
  onAddToCart,
  onClose,
}: ProductModalBodyProps) {
  const modalPanelStyle =
    variant === "modal"
      ? { maxHeight: "min(698px, calc(100dvh - 2rem))" }
      : undefined;

  return (
    <div
      className="relative my-auto w-full max-w-[1280px]"
      onClick={(e) => e.stopPropagation()}
    >
      {variant === "modal" && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 rounded-full p-3 duration-300 md:top-4 md:right-4 xl:top-1 xl:right-10 xl:mt-[10px]"
        >
          <BurgerCross className="h-6 w-6 text-black" />
        </button>
      )}

      <div
        className="mdOnly:px-[48px] relative w-full overflow-y-auto bg-white px-5 py-6 xl:flex xl:min-h-0 xl:flex-row xl:px-[80px] xl:py-8"
        style={modalPanelStyle}
      >
        <div className="xl:mr-[80px] xl:flex xl:min-h-0 xl:flex-col xl:pb-2">
          <Markdown
            text={product.heading}
            className="text-t24 mb-8 xl:hidden"
          />

          <div className="notXl:flex">
            <div className="mdOnly:h-52 mdOnly:w-[312px] relative mr-4 mb-4 h-52 w-[200px] md:h-96 xl:mr-0 xl:h-[380px] xl:w-[450px] xl:flex-shrink-0">
              <Image
                quality={100}
                fill
                src={currentImageUrl || product.productSlider[0].url}
                alt={product.productpicture.alt || "Emmy and Lily"}
                className="object-cover"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                placeholder="blur"
                blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
              />
            </div>

            <div className="mdOnly:h-[48px] mdOnly:w-[88px] block h-[48px] w-[88px] cursor-pointer flex-row xl:flex xl:h-[88px] xl:w-[450px] xl:flex-row">
              {product.productSlider.map((slide, index) => (
                <div
                  className="smOnly:h-[48px] mdOnly:h-[48px] relative mb-8 h-[88px] w-full last:mr-0 xl:mr-2 xl:w-1/3"
                  key={`${slide.id}-${index}-${slide.url}`}
                  onClick={() => onImageChange(slide.url)}
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

          <div className="smOnly:flex-col mt-6 mb-8 gap-2 md:flex-wrap md:gap-3 xl:mb-0 xl:flex xl:w-[450px] xl:pb-2">
            {product.advantage1 ? (
              <p className="text-t14 md:text-t16 mdOnly:w-[436px] xl:text-t16 mb-2 w-full rounded bg-[#DCDCDC] px-3 py-2 text-black xl:mb-0">
                {product.advantage1}
              </p>
            ) : null}
            {product.advantage2 ? (
              <p className="text-t14 md:text-t16 mdOnly:w-[436px] xl:text-t16 mb-2 w-full rounded bg-[#DCDCDC] px-3 py-2 text-black xl:mb-0">
                {product.advantage2}
              </p>
            ) : null}
            {product.advantage3 ? (
              <p className="text-t14 md:text-t16 mdOnly:w-[436px] xl:text-t16 w-full rounded bg-[#DCDCDC] px-3 py-2 text-black">
                {product.advantage3}
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-full pr-0 xl:min-h-0 xl:pr-[15px] xl:pb-2">
          <Markdown
            text={product.heading}
            className="text-t32 smOnly:hidden mdOnly:hidden mb-8"
          />

          <table className="smOnly:w-[100%] mdOnly:w-[436px] mb-12 w-full">
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
                      onClick={() => onAddToCart(item)}
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
              onClick={() => onTabChange("components")}
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
              onClick={() => onTabChange("composition")}
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
              onClick={() => onTabChange("usage")}
            >
              {product.method ?? ""}
            </button>
          </div>

          <div className="smOnly:overflow-hidden list-disc pt-2 text-black md:overflow-y-auto xl:h-[320px] xl:pr-2">
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
    </div>
  );
}

export default function InterceptProductModalContent({
  product,
  lang,
  secondmodal,
  variant = "modal",
  onRequestClose,
}: InterceptProductModalContentProps) {
  const intlRouter = useIntlRouter();
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
        const salesDriveData = await getData(lang);
        setState(salesDriveData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [lang]);

  useEffect(() => {
    const contentIds = product.capacity.map((item) => item.idCrm);
    const productState = state.products.find((p) => p.id === contentIds[0]);
    const productPrice = productState ? productState.price : "N/A";

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "ViewContent", {
        content_name: product.heading,
        content_category: product.category,
        content_ids: contentIds,
        content_type: "product",
        value: productPrice,
        currency: lang === en ? "EUR" : "UAH",
      });
    }
  }, [lang, en, product, state.products]);

  const closeModal = () => {
    if (variant !== "modal") return;
    setAdditionalModalOpen(false);
    onRequestClose?.();
  };

  const handleContinueShopping = () => {
    if (variant === "modal") {
      closeModal();
      return;
    }

    setAdditionalModalOpen(false);
  };

  const handleGoToCart = () => {
    setAdditionalModalOpen(false);
    if (variant === "modal") {
      onRequestClose?.();
    }
    intlRouter.push("/basket");
  };

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

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_ids: [item.idCrm],
        content_type: "product",
        value: productPrice,
        currency: lang === en ? "EUR" : "UAH",
      });
    }
  };

  const content = (
    <ProductModalBody
      product={product}
      lang={lang}
      en={en}
      variant={variant}
      state={state}
      currentImageUrl={currentImageUrl}
      onImageChange={setActiveImageUrl}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      addedToCart={addedToCart}
      onAddToCart={addToCart}
      onClose={closeModal}
    />
  );

  return (
    <>
      <PathModalXl />

      {variant === "modal" ? (
        <Modal onDismiss={closeModal}>
          <>
            {content}
            {additionalModalOpen ? (
              <CartModal
                onClose={handleContinueShopping}
                onGoToCart={handleGoToCart}
                lang={lang}
                data={{ secondmodal }}
              />
            ) : null}
          </>
        </Modal>
      ) : (
        <>
          {additionalModalOpen ? (
            <CartModal
              onClose={handleContinueShopping}
              onGoToCart={handleGoToCart}
              lang={lang}
              data={{ secondmodal }}
            />
          ) : null}
          <section className="container py-8 xl:py-20">{content}</section>
        </>
      )}
    </>
  );
}
