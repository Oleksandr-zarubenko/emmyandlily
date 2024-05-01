"use client";

import { FC } from "react";
import cn from "classnames";

interface AddToCartHeroBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  addToCart: any,
  addedToCart: any,
  id: any
}

export const AddToCartHeroBtn: FC<AddToCartHeroBtnProps> = ({
  text,
  className,
  addToCart,
  addedToCart,
  id
}) => {

  return (
    <button
      onClick={addToCart}
      className={cn(
        "relative z-20 rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black",
        className
      )}
      disabled={addedToCart[id]}
    >

      {addedToCart[id] ? (
        <span>У кошику</span>
      ) : (
        <span>{text}</span>
      )}

    </button>
  );
};
