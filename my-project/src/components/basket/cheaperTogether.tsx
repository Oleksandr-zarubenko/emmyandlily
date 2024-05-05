import { Markdown } from "@/components/Markdown";
import { convertPrice } from "@/utils/convertPrice/convertPrice"
import { ProductModal } from "../ProductModal"
import Image from "next/image"
const CheaperTogether = ({ data, state, setState, lang, en, modal }: any) => {




    return (
        <div className="mt-[83px] ">
            <h3 className='text-t18 font-bold mb-6 xl:text-center text-black'>{lang === en ? 'Together cheaper' : 'Разом дешевше'}</h3>
            <div className='smOnly:px-2 smOnly:w-full smOnly:overflow-x-auto h-auto xl:w-44 mdOnly:w-full bg-white smOnly:flex mdOnly:flex'>

                {data.length > 0 &&
                    data
                        .sort((a: any, b: any) => a.order - b.order)
                        .map((product: any) => (
                            <article
                                key={product.id}
                                className="group smOnly:mr-1 xl:mb-6 bg-white mx-auto h-auto mdOnly:w-[30%] cursor-pointer rounded shadow-basket xl:w-[166px] smOnly:mb-6"
                            >
                                <ProductModal
                                    product={product}
                                    lang={lang}
                                    state={state}
                                    data={modal}
                                    convertPrice={convertPrice}
                                >
                                    <div className="relative mb-1 h-[147px] w-[166px] overflow-hidden rounded xl:mb-1 xl:h-[147px] xl:w-[166px] mdOnly:h-[147px] mdOnly:w-full">
                                        <Image
                                            fill
                                            src={product.productpicture.url}
                                            alt={product.productpicture.alt || "Emmy and Lili"}
                                            className="product object-cover duration-1000 group-hover:scale-105"
                                            sizes="(max-width: 768px) 90vw, 305px"
                                        />
                                    </div>
                                    <div className="px-3 xl:px-2 py-1">
                                        <Markdown
                                            text={product.heading}
                                            className="mb-3 mdOnly:text-t16 text-black xl:mb-4 xl:!text-t18 font-normal"
                                        />

                                        <ul className="mb-2 flex xl:mb-4">
                                            {product.capacity &&
                                                product.capacity &&
                                                product.capacity.map((item: any) => (
                                                    <li
                                                        key={item.idCrm}
                                                        className="mr-8 text-t14 italic text-black xl:text-t16"
                                                    >
                                                        {item.ml}
                                                    </li>
                                                ))}
                                        </ul>
                                        {product.capacity && product.capacity[0] && (
                                            <p className="text-t16 leading-6 text-black xl:text-t18">
                                                {product.capacity &&
                                                    product.capacity.length > 1 &&
                                                    (lang === en ? "from" : "від")}{" "}
                                                {lang === en
                                                    ? state &&
                                                        state.products.find(
                                                            (item: any) => item.id === product.capacity[0].idCrm
                                                        )
                                                        ? convertPrice(
                                                            state.products.find(
                                                                (item: any) =>
                                                                    item.id === product.capacity[0].idCrm
                                                            )!.price,
                                                            state.currencies.find(
                                                                (currency: any) => currency.id === "EUR"
                                                            )?.rate || 1
                                                        )
                                                        : "N/A"
                                                    : state &&
                                                        state.products.find(
                                                            (item: any) =>
                                                                item.id === product.capacity[0].idCrm
                                                        )
                                                        ? state.products.find(
                                                            (item: any) =>
                                                                item.id === product.capacity[0].idCrm
                                                        )!.price
                                                        : "N/A"}{" "}
                                                {lang === en ? "€" : "₴"}
                                            </p>
                                        )}
                                    </div>
                                </ProductModal>
                            </article>
                        ))}
            </div>
        </div>
    )
}

export default CheaperTogether