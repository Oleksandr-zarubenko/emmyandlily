"use client";

import { FC } from "react";
import cn from "classnames";

interface AddToCartHeroBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export const AddToCartHeroBtn: FC<AddToCartHeroBtnProps> = ({
  text,
  className,
}) => {
  return (
    <button
      className={cn(
        "relative z-20 rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black",
        className
      )}
    >
      {text}
    </button>
  );
};
