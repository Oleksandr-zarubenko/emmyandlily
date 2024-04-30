import Link from "next/link";
import { ModalPath } from "./icons/ModalPaw";
const CartModal = ({ onClose, lang, en }: { onClose: () => void, lang: any, en: any }) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white px-5 py-16 mdOnly:px-[217px] xl:py-24  mdOnly:py-[89px]  xl:px-48 rounded-lg text-center">
                <h2 className="text-t20 xl:text-t24 font-bold mb-6"> {lang === en ? 'Item added to cart' : 'Товар додано у кошик'}</h2>
                <ModalPath className="mx-auto" />
                <div className=" grid xl:flex xl:justify-end mt-6">
                    <button
                        className="text-black xl:mb-0 mb-4 text-t18  py-3 px-6 border-solid border-2 border-black rounded xl:mr-8 font-bold"
                        onClick={() => onClose()}
                    >
                        {lang === en ? 'Return to shopping' : 'Повернутись до покупок'}
                    </button>
                    <Link className="text-white text-t18 bg-black py-3 px-6 border-solid border-2 border-black rounded font-bold" href={`/${lang}/basket`}
                    >
                        {lang === en ? 'Go to cart' : 'Перейти у кошик'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartModal