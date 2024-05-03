"use client";

import { FC } from "react";
import cn from "classnames";
import { useAddedToCart } from "@/components/context/addedToCart";
interface AddToCartHeroBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  data: any
  secondtext: string
}

export const AddToCartHeroBtn: FC<AddToCartHeroBtnProps> = ({
  text,
  className,
  data,
  secondtext
}) => {

  const { addedToCart, setAddedToCart } = useAddedToCart();
  const trevelSet = data.allProducts



  const productToAdd = trevelSet.find((product: any) => product.idAvailable === "id_12");

  const addToCart = () => {
    const storedDataString = localStorage.getItem('storedData');
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const storedAddedToCart = localStorage.getItem("addedToCart");
    const parsedAddedToCart = storedAddedToCart ? JSON.parse(storedAddedToCart) : {};
    const productToAdd = trevelSet.find((product: any) => product.idAvailable === "id_12");

    if (productToAdd) {
      if (productToAdd.capacity && productToAdd.capacity.length > 0) {
        const firstCapacity = productToAdd.capacity[0];
        const { price, ml } = firstCapacity;
        const dataToStore = {
          id: productToAdd.idAvailable,
          productName: productToAdd.heading,
          price: price,
          capacity: ml,
          photo: productToAdd.productSlider[0].url,
        };

        const updatedAddedToCart = {
          ...parsedAddedToCart,
          [productToAdd.idAvailable]: true,
        };
        const updatedData = [...storedData, dataToStore];
        localStorage.setItem("storedData", JSON.stringify(updatedData));
        localStorage.setItem("addedToCart", JSON.stringify(updatedAddedToCart));

        setAddedToCart(updatedAddedToCart);
      } else {
        console.error('Product capacity is not available.');
      }
    }
  };
  return (
    <button
      onClick={addToCart}
      className={cn(
        "relative z-20 rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black",
        className
      )}
      disabled={addedToCart[productToAdd.idAvailable]}
    >

      {addedToCart[productToAdd.idAvailable] ? (
        <span>{secondtext}</span>
      ) : (
        <span>{text}</span>
      )}

    </button>
  );
};
