"use client";
import { FC } from "react";
import cn from "classnames";
import getData from "@/utils/api/api";
import { Locale } from "@/i18n/routing";
import { DatoHomeData } from "@/types/dato";
import { useCheckoutStore } from "@/store/checkoutStore";
interface AddToCartHeroBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  data: Pick<DatoHomeData, "allProducts" | "mainSection">;
  secondtext: string;
  lang: Locale;
}

export const AddToCartHeroBtn: FC<AddToCartHeroBtnProps> = ({
  text,
  className,
  data,
  secondtext,
  lang,
}) => {
  const addedToCart = useCheckoutStore((state) => state.addedToCart);
  const setAddedToCart = useCheckoutStore((state) => state.setAddedToCart);
  const addCartItem = useCheckoutStore((state) => state.addCartItem);
  const trevelSet = data.allProducts;
  const productToAdd = trevelSet.find((product) =>
    product.capacity.some((cap) => cap.idCrm === data?.mainSection?.productId)
  );

  const addToCart = async () => {
    try {
      const productToAdd = trevelSet.find((product) =>
        product.capacity.some(
          (cap) => cap.idCrm === data?.mainSection?.productId
        )
      );

      if (productToAdd) {
        const capacityToAdd = productToAdd.capacity.find(
          (cap) => cap.idCrm === data?.mainSection?.productId
        );
        if (capacityToAdd) {
          const response = await getData(lang);
          const updatedProducts = response.products;

          const { ml, idCrm } = capacityToAdd;
          const productState = updatedProducts.find((p) => p.id === idCrm);
          const productPrice = productState
            ? productState.price
            : String(capacityToAdd.price ?? 0);

          const dataToStore = {
            id: idCrm,
            productName: productToAdd.heading,
            price: productPrice,
            capacity: ml,
            photo: productToAdd.productSlider[0].url,
          };

          const updatedAddedToCart = {
            ...addedToCart,
            [idCrm]: true,
          };

          addCartItem(dataToStore);
          setAddedToCart(updatedAddedToCart);
        } else {
          console.error("Product capacity is not available.");
        }
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const selectedCapacityId = productToAdd?.capacity.find(
    (cap) => cap.idCrm === data?.mainSection?.productId
  )?.idCrm;
  const isProductAdded = selectedCapacityId
    ? Boolean(addedToCart[selectedCapacityId])
    : false;

  return (
    <button
      onClick={addToCart}
      className={cn(
        "text-t18 relative z-20 rounded bg-black px-6 py-3 text-center font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black",
        className
      )}
      disabled={isProductAdded}
    >
      {isProductAdded ? <span>{secondtext}</span> : <span>{text}</span>}
    </button>
  );
};
