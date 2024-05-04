"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bag } from "./icons/Bag";
import cn from "classnames";

export const Cart = ({ lang, color }: any) => {
  const color1 = color === "black" ? "black" : "white";
  const color2 = color === "black" ? "white" : "black";
  const [storedDataLength, setStoredDataLength] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem("storedData") || "[]");
      setStoredDataLength(storedData.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Link className={cn(`relative z-50 duration-300`)} href={`/${lang}/basket`}>
      <div className="relative">
        <Bag
          className={cn(
            `hover:bg-${color1} h-8 w-8 rounded p-[2px] duration-300`,
            color === "black"
              ? "fill-black hover:fill-white"
              : "fill-white hover:fill-black"
          )}
        />
        {storedDataLength ? (
          <span
            className={cn(
              `absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border border-${color1} bg-${color2} text-xs text-${color1}`
            )}
          >
            {storedDataLength}
          </span>
        ) : null}
      </div>
    </Link>
  );
};
