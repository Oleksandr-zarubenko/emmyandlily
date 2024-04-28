import Link from "next/link";
import { ModalPath } from "./icons/ModalPaw";
const CartModal = ({ onClose, lang }: { onClose: () => void, lang: any }) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white py-24 px-48 rounded-lg text-center">
                <h2 className="text-t24 font-bold mb-6">Товар додано у кошик</h2>
                <ModalPath className="mx-auto" />
                <div className="flex justify-end mt-6">
                    <button
                        className="text-black text-t18 py-3 px-6 border-solid border-2 border-black rounded mr-8 font-bold"
                        onClick={() => onClose()}
                    >
                        Повернутись до покупок
                    </button>
                    <Link className="text-white text-t18 bg-black py-3 px-6 border-solid border-2 border-black rounded font-bold" href={`/${lang}/basket`}
                    >
                        Перейти у кошик
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CartModal