"use client";
import Link from "next/link";
import { ModalPath } from "./icons/ModalPaw";
import { usePathname } from "next/navigation";
const CartModal = ({
  onClose,
  lang,
  en,
}: {
  onClose: () => void;
  lang: any;
  en: any;
}) => {
  const pathname = usePathname();

  const isBasketPage = pathname.includes(`${lang}/basket`);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white px-5 py-16 text-center  xl:px-48  xl:py-24 mdOnly:px-[217px] mdOnly:py-[89px]">
        <h2 className="mb-6 text-t20 font-bold xl:text-t24">
          {lang === en ? "Item added to cart" : "Товар додано у кошик"}
        </h2>
        <ModalPath className="mx-auto" />
        <div className=" mt-6 grid xl:flex xl:justify-end">
          <button
            className={`mb-4 rounded border-2 border-solid  border-black px-6 py-3 text-t18 text-black xl:mb-0 ${!isBasketPage ? " xl:mr-8" : "xl:mr-0"} font-bold`}
            onClick={() => onClose()}
          >
            {!isBasketPage
              ? lang === en
                ? "Return to shopping"
                : "Повернутись до покупок"
              : lang === en
                ? "Return to shopping"
                : "Повернутись до покупок"}
          </button>
          {!isBasketPage ? (
            <Link
              className="rounded border-2 border-solid border-black bg-black px-6 py-3 text-t18 font-bold text-white"
              href={`/${lang}/basket`}
            >
              {lang === en ? "Go to cart" : "Перейти у кошик"}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
