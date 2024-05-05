
import Link from "next/link";
import { ModalPath } from "./icons/ModalPaw";
import { usePathname } from "next/navigation";
const CartModal = ({
  onClose,
  lang,
  en,
  data
}: {
  onClose: () => void;
  lang: any;
  en: any;
  data: any
}) => {
  const pathname = usePathname();

  const isBasketPage = pathname.includes(`${lang}/basket`);
  console.log(data)
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
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
            <Link
              className="rounded border-2 border-solid border-black bg-black px-6 py-3 text-t18 font-bold text-white"
              href={`/${lang}/basket`}
            >
              {data.secondmodal.goToCart}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
