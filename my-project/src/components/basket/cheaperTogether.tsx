import { Markdown } from "@/components/Markdown";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { ProductModal } from "../ProductModal";
import Image from "next/image";
import { Locale } from "@/i18n/routing";
import { DatoBasketData, DatoHomeData, DatoProduct } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
import { PRODUCT_IMAGE_BLUR_DATA_URL } from "@/utils/productImageBlur";

interface CheaperTogetherProps {
  data: DatoProduct[];
  state: SalesDriveData;
  setState: React.Dispatch<React.SetStateAction<SalesDriveData>>;
  lang: Locale;
  en: Locale;
  modal: DatoBasketData | DatoHomeData;
}

const CheaperTogether = ({
  data,
  state,
  setState,
  lang,
  en,
  modal,
}: CheaperTogetherProps) => {
  return (
    <div className="mt-[83px] ">
      <h3 className="mb-6 text-t18 font-bold text-black xl:text-center">
        {lang === en ? "Together cheaper" : "Разом дешевше"}
      </h3>
      <div className="h-auto bg-white xl:w-44 smOnly:flex smOnly:w-full smOnly:overflow-x-auto smOnly:px-2 mdOnly:flex mdOnly:w-full">
        {data.length > 0 &&
          data.map((product) => (
            <article
              key={product.id}
              className="shadow-basket group mx-auto h-auto cursor-pointer rounded bg-white xl:mb-6 xl:w-[166px] smOnly:mb-6 smOnly:mr-1 mdOnly:w-[30%]"
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
                    alt={product.productpicture.alt || "Emmy and Lily"}
                    className="product object-cover duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 305px"
                    placeholder="blur"
                    blurDataURL={PRODUCT_IMAGE_BLUR_DATA_URL}
                  />
                </div>
                <div className="px-3 py-1 xl:px-2">
                  <Markdown
                    text={product.heading}
                    className="mb-3 font-normal text-black xl:mb-4 xl:!text-t18 mdOnly:text-t16"
                  />

                  <ul className="mb-2 flex xl:mb-4">
                    {product.capacity &&
                      product.capacity &&
                      product.capacity.map((item) => (
                        <li
                          key={item.idCrm}
                          className="mr-8 text-t14 italic text-black xl:text-t16"
                        >
                          {item.ml}{" "}
                          {item.ml ? (lang === "uk" ? "мл" : "ml") : ""}
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
                            (item) => item.id === product.capacity[0].idCrm
                          )
                          ? convertPrice(
                              state.products.find(
                                (item) =>
                                  item.id === product.capacity[0].idCrm
                              )!.price,
                              state.currencies.find(
                                (currency) => currency.id === "EUR"
                              )?.rate || 1
                            )
                          : "N/A"
                        : state &&
                            state.products.find(
                              (item) =>
                                item.id === product.capacity[0].idCrm
                            )
                          ? state.products.find(
                              (item) =>
                                item.id === product.capacity[0].idCrm
                            )!.price
                          : "N/A"}{" "}
                      {lang === en ? " UAH" : "₴"}
                    </p>
                  )}
                </div>
              </ProductModal>
            </article>
          ))}
      </div>
    </div>
  );
};

export default CheaperTogether;

