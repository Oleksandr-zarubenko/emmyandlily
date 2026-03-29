import { Link } from "@/i18n/navigation";
import { ModalPath } from "./icons/ModalPaw";
import { usePathname } from "next/navigation";
import { Locale } from "@/i18n/routing";
import { DatoSecondModal } from "@/types/dato";
import { sendGAEvent } from "@next/third-parties/google";
import { trackPixel } from "@/lib/pixel";

const CartModal = ({
  onClose,
  onGoToCart,
  lang,
  data,
}: {
  onClose: () => void;
  onGoToCart?: () => void;
  lang: Locale;
  data: { secondmodal: DatoSecondModal };
}) => {
  const pathname = usePathname();

  const isBasketPage = pathname.includes(`${lang}/basket`);

  const handleCheckoutInitiate = () => {
    trackPixel("InitiateCheckout");
    sendGAEvent("event", "go_to_cart_click", {
      source: "cart_modal",
      page: isBasketPage ? "basket" : "product",
    });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white px-5 py-16 text-center  xl:px-48  xl:py-24 mdOnly:px-[217px] mdOnly:py-[89px]">
        <h2 className="mb-6 text-t20 font-bold xl:text-t24">
          {data.secondmodal.itemAddedToCart}
        </h2>
        <ModalPath className="mx-auto" />
        <div className=" mt-6 grid xl:flex xl:justify-end">
          <button
            className={`mb-4 rounded border-2 border-solid  border-black px-6 py-3 text-t18 text-black xl:mb-0 ${!isBasketPage ? " xl:mr-8" : "xl:mr-0"} font-bold`}
            onClick={() => onClose()}
          >
            {data.secondmodal.returnToShopping}
          </button>
          {!isBasketPage ? (
            onGoToCart ? (
              <button
                className="rounded border-2 border-solid border-black bg-black px-6 py-3 text-t18 font-bold text-white"
                onClick={() => {
                  handleCheckoutInitiate();
                  onGoToCart();
                }}
              >
                {data.secondmodal.goToCart}
              </button>
            ) : (
              <Link
                className="rounded border-2 border-solid border-black bg-black px-6 py-3 text-t18 font-bold text-white"
                href="/basket"
                onClick={handleCheckoutInitiate}
              >
                {data.secondmodal.goToCart}
              </Link>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
