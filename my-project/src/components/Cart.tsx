"use client";
import { Bag } from "./icons/Bag";
import cn from "classnames";
import { Link } from "@/i18n/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";
import { sendGAEvent } from "@next/third-parties/google";
import { trackPixel } from "@/lib/pixel";

export const Cart = ({
  color,
  source = "unknown",
}: {
  color: "black" | "white";
  source?: string;
}) => {
  const color1 = color === "black" ? "black" : "white";
  const color2 = color === "black" ? "white" : "black";
  const storedDataLength = useCheckoutStore((state) => state.cartItems.length);

  const handleCheckoutInitiate = () => {
    trackPixel("InitiateCheckout");
    sendGAEvent("event", "cart_open_click", {
      source,
      items_in_cart: storedDataLength,
    });
  };
  return (
    <Link
      onClick={handleCheckoutInitiate}
      className={cn(`relative duration-300`)}
      href={`/basket`}
    >
      <div className="relative">
        <Bag
          className={cn(
            `hover:bg-${color1} h-8 w-8 rounded p-0.5 duration-300`,
            color === "black"
              ? "fill-black hover:fill-white"
              : "fill-white hover:fill-black"
          )}
        />
        {storedDataLength ? (
          <span
            className={cn(
              `absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full border border-${color1} bg-${color2} text-xs text-${color1}`
            )}
          >
            {storedDataLength}
          </span>
        ) : null}
      </div>
    </Link>
  );
};
