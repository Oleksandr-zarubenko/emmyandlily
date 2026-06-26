"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { convertPrice } from "@/utils/convertPrice/convertPrice";

import { BurgerCross } from "@/components/icons/BurgerCross";
import { Link } from "@/i18n/navigation";

import { Locale, locales } from "@/i18n/routing";
import CheaperTogether from "@/components/basket/cheaperTogether";
import DropDown from "@/components/basket/DropdownButton";
import { DatoBasketData } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
import { useCheckoutStore } from "@/store/checkoutStore";
import { DEFAULT_SITE_DISCOUNT_PERCENT } from "@/constants/discounts";
import { useShallow } from "zustand/react/shallow";

const Basket = ({
  data,
  lang,
  salesDriveData,
}: {
  data: DatoBasketData;
  lang: Locale;
  salesDriveData: SalesDriveData;
}) => {
  const en = locales[1];
  const {
    tovar,
    quantities,
    totalPrice,
    promoCode,
    isInputOpen,
    discountAmount,
    isValid,
    isPromoCodeValid,
    setQuantities,
    setPromoCode,
    setPromoCodePartner,
    setIsValid,
    setIsInputOpen,
    setIsButtonClicked,
    setIsPromoCodeValid,
    setPromoData,
    removeCartItem,
  } = useCheckoutStore(
    useShallow((state) => ({
      tovar: state.cartItems,
      quantities: state.quantities,
      totalPrice: state.totalPrice,
      promoCode: state.promoCode,
      isInputOpen: state.isInputOpen,
      discountAmount: state.discountAmount,
      isValid: state.isValid,
      isPromoCodeValid: state.isPromoCodeValid,
      setQuantities: state.setQuantities,
      setPromoCode: state.setPromoCode,
      setPromoCodePartner: state.setPromoCodePartner,
      setIsValid: state.setIsValid,
      setIsInputOpen: state.setIsInputOpen,
      setIsButtonClicked: state.setIsButtonClicked,
      setIsPromoCodeValid: state.setIsPromoCodeValid,
      setPromoData: state.setPromoData,
      removeCartItem: state.removeCartItem,
    }))
  );
  const [isHovered, setIsHovered] = useState(false);

  const state = salesDriveData;

  const calculateBaseTotal = () => {
    let newTotalPrice = 0;

    tovar.forEach((item) => {
      const quantity = quantities[item.id] || 1;
      newTotalPrice += Number(item.price) * quantity;
    });

    return newTotalPrice;
  };

  const findPromoMatch = (codeValue: string) => {
    const trimmedCode = codeValue.trim();

    if (!trimmedCode) {
      return null;
    }

    for (const promo of data.allPromocods) {
      const matchedCode = promo.promoCodName.find(
        (code) => code.promocod === trimmedCode
      );

      if (matchedCode) {
        return matchedCode;
      }
    }

    return null;
  };

  const calculateDiscountState = (discountPercent: number, baseTotal: number) => {
    const normalizedDiscountPercent = Math.max(discountPercent, 0);
    const nextDiscountAmount = baseTotal * (normalizedDiscountPercent / 100);

    return {
      discountAmount: nextDiscountAmount,
      totalPrice: baseTotal - nextDiscountAmount,
    };
  };

  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPromoCode = event.target.value;
    const baseTotal = calculateBaseTotal();
    const defaultDiscountState = calculateDiscountState(
      DEFAULT_SITE_DISCOUNT_PERCENT,
      baseTotal
    );

    setPromoCode(inputPromoCode);
    setIsPromoCodeValid(false);
    setPromoCodePartner("");
    setPromoData(defaultDiscountState);

    const isValidPromo = Boolean(findPromoMatch(inputPromoCode));

    if (isValidPromo) {
      setIsValid(true);
      setIsButtonClicked(true);
    } else {
      setIsValid(false);
      setIsButtonClicked(false);
    }
  };

  const handleVerifyPromoCode = () => {
    const matchedPromo = findPromoMatch(promoCode);
    const baseTotal = calculateBaseTotal();

    if (matchedPromo) {
      const promoDiscountState = calculateDiscountState(
        matchedPromo.discount ?? 0,
        baseTotal
      );

      setPromoCodePartner(matchedPromo.namePartner);
      setIsPromoCodeValid(true);
      setPromoData(promoDiscountState);
    } else {
      const defaultDiscountState = calculateDiscountState(
        DEFAULT_SITE_DISCOUNT_PERCENT,
        baseTotal
      );

      setIsPromoCodeValid(false);
      setPromoCodePartner("");
      setPromoData(defaultDiscountState);
    }
  };

  const handleToggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  useEffect(() => {
    const baseTotal = calculateBaseTotal();
    const defaultDiscountState = calculateDiscountState(
      DEFAULT_SITE_DISCOUNT_PERCENT,
      baseTotal
    );

    if (!isPromoCodeValid) {
      setPromoData(defaultDiscountState);
      return;
    }

    const matchedPromo = findPromoMatch(promoCode);

    if (!matchedPromo) {
      setIsPromoCodeValid(false);
      setPromoCodePartner("");
      setIsValid(false);
      setPromoData(defaultDiscountState);
      return;
    }

    const promoDiscountState = calculateDiscountState(
      matchedPromo.discount ?? 0,
      baseTotal
    );

    setPromoData(promoDiscountState);
    // calculateBaseTotal/findPromoMatch read only values already listed below
    // (tovar, quantities, data.allPromocods); React Compiler keeps them stable,
    // so they are intentionally omitted to avoid a re-render loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    quantities,
    tovar,
    promoCode,
    isPromoCodeValid,
    setIsPromoCodeValid,
    setIsValid,
    setPromoCodePartner,
    setPromoData,
  ]);

  const handleQuantityChange = (capacity: string, value: number) => {
    const updatedQuantities = {
      ...quantities,
      [capacity]: Math.max((quantities[capacity] || 1) + value, 0),
    };
    setQuantities(updatedQuantities);
  };

  const handleRemove = (id: string) => {
    removeCartItem(id);
  };

  const isButtonDisabled = totalPrice === 0;
  const availableIds = new Set(["id_28", "id_27", "id_26"]);

  const togetherProducts = data.allProducts.filter((product) =>
    product.capacity.some((capacity) => {
      const correspondingProduct = state.products.find(
        (p) => p.id === capacity.idCrm && p.available === "true"
      );
      return correspondingProduct && availableIds.has(capacity.idCrm);
    })
  );

  return (
    <section className="container flex-grow justify-between py-40 xl:flex">
      <div className="w-full xl:w-[750px]">
        <h1 className="mb-10 text-t32 font-bold tracking-wider">
          {data.basket.heading}
        </h1>

        <div className="mb-4 border-b-[1px] border-black pb-14">
          {tovar.length === 0 ? ( // Check if tovar array is empty
            <p className="text-t16">
              {lang === "en" ? "No items in basket" : "Немає товарів у кошику"}
            </p>
          ) : (
            <table className="w-full ">
              <thead>
                <tr className="smOnly:hidden mdOnly:hidden">
                  <th scope="col" className="w-[30%] py-2 pb-6 text-left text-t14 italic text-[#333333] opacity-60 mdOnly:w-[20%]">
                    {data.basket.name}
                  </th>
                  <th scope="col" className="w-[10%] py-2 pb-6 text-left  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[20%]">
                    {data.basket.price}
                  </th>
                  <th scope="col" className="w-[25%] py-2 pb-6 text-center  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[30%]">
                    {data.basket.number}
                  </th>
                  <th scope="col" className="w-[20%]  py-2 pb-6 text-t14 italic text-[#333333] opacity-60">
                    {data.basket.sum}
                  </th>
                  <th scope="col" className="w-[15%] py-2 pb-6 text-right  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[10%]">
                    {data.basket.delete}
                  </th>
                </tr>
              </thead>
              {tovar.map((item) => (
                <tbody key={item.id} className="smOnly:hidden">
                  <tr className="border-b">
                    <td className="flex">
                      <div className="relative mr-4 h-[80px] w-[71px] xl:flex-shrink-0">
                        <Image
                          quality={75}
                          fill
                          src={item.photo}
                          alt={item.productName || "Emmy and Lily"}
                          className="object-cover"
                          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                        />
                      </div>
                      <div>
                        <p className="py-2  xl:text-t18 mdOnly:text-t16 ">
                          {item.productName.replace(/#/g, "")}
                        </p>
                        <p className="text-t14 text-dark/60">
                          {" "}
                          {item.capacity}
                          {item.capacity ? (lang === "uk" ? "мл" : "ml") : ""}
                        </p>
                      </div>
                    </td>
                    <td className="relative py-2 text-left leading-5 text-[#333333] xl:text-t18 mdOnly:w-14 mdOnly:text-t16">
                      {state &&
                      state.products.find(
                        (items) => items.id === item.id
                      ) ? (
                        <>
                          {lang === "en" ? (
                            <span
                              className={`${state.products.find((items) => items.id === item.id)!.oldprice ? "text-red-500" : ""}`}
                            >
                              {convertPrice(
                                state.products.find(
                                  (items) => items.id === item.id
                                )!.price,
                                state.currencies.find(
                                  (currency) => currency.id === "EUR"
                                )?.rate || 1
                              )}{" "}
                              {lang === "en" ? " UAH" : " ₴"}
                            </span>
                          ) : (
                            <span
                              className={`${state.products.find((items) => items.id === item.id)!.oldprice ? "text-red-500" : ""}`}
                            >
                              {
                                state.products.find(
                                  (items) => items.id === item.id
                                )!.price
                              }{" "}
                              {lang === "uk" ? " ₴" : " UAH"}
                            </span>
                          )}
                        </>
                      ) : (
                        "N/A"
                      )}

                      {state.products.map(
                        (prod) =>
                          prod.id === item.id &&
                          prod.oldprice && (
                            <p
                              key={prod.id}
                              className={`absolute right-4 top-0 mt-14 h-8 w-10 text-sm line-through xl:mr-4 mdOnly:mr-0 `}
                            >
                              {prod.oldprice
                                ? convertPrice(
                                    prod.oldprice[0],
                                    state.currencies.find(
                                      (currency) => currency.id === "EUR"
                                    )?.rate || 1
                                  ) + (lang === "en" ? " UAH" : " ₴")
                                : ""}
                            </p>
                          )
                      )}
                    </td>

                    <td className="py-2 text-center ">
                      <div className="flex justify-evenly mdOnly:px-3">
                        <div className=" border-text-[#33333399] border-2 border-solid mdOnly:w-24">
                          <button
                            type="button"
                            aria-label={`${lang === "en" ? "Decrease quantity for" : "Зменшити кількість"} ${item.productName.replace(/#/g, "")}`}
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                            disabled={quantities[item.id] <= 1}
                          >
                            -
                          </button>
                          <input
                            aria-label={`${lang === "en" ? "Quantity for" : "Кількість"} ${item.productName.replace(/#/g, "")}`}
                            value={quantities[item.id] || 1}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10) || 1;
                              setQuantities((prevQuantities) => ({
                                ...prevQuantities,
                                [item.id]: value,
                              }));
                            }}
                            className="w-10 border-gray-300 p-[4px] text-center text-[#33333399]"
                          />
                          <button
                            type="button"
                            aria-label={`${lang === "en" ? "Increase quantity for" : "Збільшити кількість"} ${item.productName.replace(/#/g, "")}`}
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-2 text-center leading-5 text-[#333333] xl:text-t18 mdOnly:w-16 mdOnly:text-t16">
                      {lang === "en"
                        ? state &&
                          state.products.find(
                            (items) => items.id === item.id
                          )
                          ? (() => {
                              const price =
                                (parseFloat(
                                  state.products.find(
                                    (items) => items.id === item.id
                                  )!.price
                                ) || 0) * (quantities[item.id] || 1);
                              const convertedPrice = convertPrice(
                                price,
                                state.currencies.find(
                                  (currency) => currency.id === "EUR"
                                )?.rate || 1
                              );
                              return price === 0 ? "Preorder" : convertedPrice;
                            })()
                          : "N/A"
                        : state &&
                            state.products.find(
                              (items) => items.id === item.id
                            )
                          ? (() => {
                              const price =
                                parseFloat(
                                  state.products.find(
                                    (items) => items.id === item.id
                                  )!.price
                                ) * (quantities[item.id] || 1);
                              return price === 0 ? "Preorder" : price;
                            })()
                          : "N/A"}{" "}
                      {lang === "en" ? " UAH" : " ₴"}
                    </td>
                    <td className="ml-auto py-2 text-right">
                      <button
                        type="button"
                        aria-label={`${lang === "en" ? "Remove" : "Видалити"} ${item.productName.replace(/#/g, "")}`}
                        onClick={() => handleRemove(item.id)}
                        className=" px-4 py-2 text-black "
                      >
                        <BurgerCross className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}

              {tovar.map((item) => (
                <tbody key={item.id} className="md:hidden">
                  <tr className="border-b">
                    <td className="flex">
                      <div className="relative mr-4 w-[71px] flex-shrink-0">
                        <Image
                          quality={75}
                          fill
                          src={item.photo}
                          alt={item.productName || "Emmy and Lily"}
                          className="object-cover"
                          sizes="(max-width: 768px) 80vw"
                        />
                      </div>
                      <div>
                        <p className="py-2 text-t16 ">
                          {item.productName.replace(/#/g, "")}
                        </p>
                        <p className="mb-1 text-t14 text-dark/60">
                          {item.capacity}
                        </p>
                        <div className="flex ">
                          <div className="border-text-[#33333399] border-2 border-solid">
                            <button
                              type="button"
                              aria-label={`${lang === "en" ? "Decrease quantity for" : "Зменшити кількість"} ${item.productName.replace(/#/g, "")}`}
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                              disabled={quantities[item.id] <= 1}
                            >
                              -
                            </button>
                            <input
                              aria-label={`${lang === "en" ? "Quantity for" : "Кількість"} ${item.productName.replace(/#/g, "")}`}
                              value={quantities[item.id] || 1}
                              onChange={(e) => {
                                const value = parseInt(e.target.value, 10) || 1;
                                setQuantities((prevQuantities) => ({
                                  ...prevQuantities,
                                  [item.id]: value,
                                }));
                              }}
                              className="w-10 border-gray-300 p-[4px] text-center text-[#33333399]"
                            />
                            <button
                              type="button"
                              aria-label={`${lang === "en" ? "Increase quantity for" : "Збільшити кількість"} ${item.productName.replace(/#/g, "")}`}
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>{" "}
                    </td>

                    <td className="px-1 py-2 leading-5 text-[#333333]">
                      <ul className="flex flex-col justify-between text-left smOnly:min-h-[80px]">
                        <li className="whitespace-nowrap text-t16 md:mb-4">
                          {state &&
                          state.products.find(
                            (items) => items.id === item.id
                          ) ? (
                            <>
                              {lang === "en" ? (
                                <span
                                  className={`${state.products.find((items) => items.id === item.id)!.oldprice !== undefined ? "text-red-500" : ""}`}
                                >
                                  {convertPrice(
                                    state.products.find(
                                      (items) => items.id === item.id
                                    )!.price,
                                    state.currencies.find(
                                      (currency) => currency.id === "EUR"
                                    )?.rate || 1
                                  )}{" "}
                                  {lang === "en" ? " UAH" : " ₴"}
                                </span>
                              ) : (
                                <span
                                  className={`${state.products.find((items) => items.id === item.id)!.oldprice !== undefined ? "text-red-500" : ""}`}
                                >
                                  {
                                    state.products.find(
                                      (items) => items.id === item.id
                                    )!.price
                                  }{" "}
                                  {lang === "uk" ? " ₴" : " UAH"}
                                </span>
                              )}
                            </>
                          ) : (
                            "N/A"
                          )}
                        </li>

                        {state.products.map(
                          (prod) =>
                            prod.id === item.id &&
                            prod.oldprice && (
                              <li
                                key={prod.id}
                                className={` right-4 top-0 mb-4 mt-[-12px] h-2 text-sm line-through mdOnly:mr-0`}
                              >
                                {prod.oldprice
                                  ? convertPrice(
                                      prod.oldprice[0],
                                      state.currencies.find(
                                        (currency) => currency.id === "EUR"
                                      )?.rate || 1
                                    ) + (lang === "en" ? " UAH" : " ₴")
                                  : ""}
                              </li>
                            )
                        )}

                        <li className="whitespace-nowrap text-t18">
                          {lang === "en"
                            ? state &&
                              state.products.find(
                                (items) => items.id === item.id
                              )
                              ? convertPrice(
                                  (parseFloat(
                                    state.products.find(
                                      (items) => items.id === item.id
                                    )!.price
                                  ) || 0) * (quantities[item.id] || 1),
                                  state.currencies.find(
                                    (currency) => currency.id === "EUR"
                                  )?.rate || 1
                                )
                              : "N/A"
                            : state &&
                                state.products.find(
                                  (items) => items.id === item.id
                                )
                              ? parseFloat(
                                  state.products.find(
                                    (items) => items.id === item.id
                                  )!.price
                                ) * (quantities[item.id] || 1)
                              : "N/A"}{" "}
                          {lang === "en" ? " UAH" : " ₴"}
                        </li>
                      </ul>
                    </td>
                    <td className="ml-auto py-2 text-right">
                      <button
                        type="button"
                        aria-label={`${lang === "en" ? "Remove" : "Видалити"} ${item.productName.replace(/#/g, "")}`}
                        onClick={() => handleRemove(item.id)}
                        className=" px-4 py-2 text-black "
                      >
                        <BurgerCross className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>

        <div className="mb-8 text-end">
          <button
            type="button"
            aria-expanded={isInputOpen}
            aria-controls="promoCodeInput"
            className="mb-6 ml-auto flex w-[225px] justify-between text-t14 text-black xl:text-t16"
            onClick={handleToggleInput}
          >
            {lang === "en" ? "Add promo code" : "Додати промокод"}{" "}
            <BurgerCross className="h-4 w-4 origin-center rotate-45" />
          </button>

          {isInputOpen && (
            <div className="relative">
              {isPromoCodeValid ? (
                <>
                  <input
                    id="promoCodeInput"
                    type="text"
                    aria-label={lang === "en" ? "Promo code" : "Промокод"}
                    value={promoCode}
                    disabled={true}
                    placeholder={
                      lang === "en"
                        ? "Enter the promo code "
                        : "Введіть промокод"
                    }
                    className="w-[225px] border-gray-300 p-2 text-t14 xl:text-t16"
                  />
                  <button
                    type="button"
                    aria-label={lang === "en" ? "Remove promo code" : "Видалити промокод"}
                    onClick={() => {
                      setPromoCode("");
                      setPromoCodePartner("");
                      setIsValid(false);
                      setIsButtonClicked(false);
                      setIsPromoCodeValid(false);
                      const baseTotal = calculateBaseTotal();
                      const defaultDiscountState = calculateDiscountState(
                        DEFAULT_SITE_DISCOUNT_PERCENT,
                        baseTotal
                      );
                      setPromoData(defaultDiscountState);
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="absolute right-0 top-0 mt-[3px] w-10 border-none bg-black px-2 py-2 text-white "
                  >
                    {isHovered ? "✖" : "✔"}
                  </button>
                </>
              ) : (
                <>
                  <input
                    id="promoCodeInput"
                    type="text"
                    aria-label={lang === "en" ? "Promo code" : "Промокод"}
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder={
                      lang === "en"
                        ? "Enter the promo code "
                        : "Введіть промокод"
                    }
                    className={`w-[225px] border-gray-300 p-2 text-t14 xl:text-t16 ${
                      promoCode.trim() && !isValid ? "bg-[#C61004]/[.06]" : "bg-white"
                    }`}
                  />
                  <button
                    type="button"
                    aria-label={lang === "en" ? "Apply promo code" : "Застосувати промокод"}
                    onClick={handleVerifyPromoCode}
                    disabled={!isValid || isPromoCodeValid}
                    className="absolute right-0 top-0 mt-[3px] w-10 border-none bg-black px-2 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    ➜
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <div className="mb-8 ml-auto flex w-52 justify-between text-t14 xl:text-t16">
          <p>{lang === "en" ? "Discount" : "Знижка"} </p>
          <p>
            -{" "}
            {lang === "en"
              ? Math.round(
                  Number(
                    convertPrice(
                      discountAmount,
                      state.currencies.find(
                        (currency) => currency.id === "EUR"
                      )?.rate || 1
                    )
                  )
                ).toFixed(0) + " UAH"
              : Math.round(discountAmount).toFixed(0) + " ₴"}
          </p>
        </div>

        <div className="mb-10 ml-auto flex w-52 justify-between text-t14 xl:text-t16">
          <p className="text-black opacity-60">{data.basket.total}</p>
          <p className="text-t16 font-bold">
            {lang === "en"
              ? Math.round(
                  Number(
                    convertPrice(
                      totalPrice,
                      state.currencies.find(
                        (currency) => currency.id === "EUR"
                      )?.rate || 1
                    )
                  )
                ).toFixed(0)
              : Math.round(totalPrice).toFixed(0)}
            {lang === "en" ? " UAH" : " ₴"}
          </p>
        </div>

        <div className="mb-[66px] flex justify-end xl:mb-28">
          {isButtonDisabled ? (
            <button
              type="button"
              disabled
              className="ml-auto cursor-not-allowed rounded bg-black px-6 py-4 text-t16 text-white opacity-50 xl:text-t18 smOnly:w-full"
            >
              {data.basket.toOrder}
            </button>
          ) : (
            <Link
              href="/order"
              className="ml-auto rounded bg-black px-6 py-4 text-center text-t16 text-white xl:text-t18 smOnly:w-full"
            >
              {data.basket.toOrder}
            </Link>
          )}
        </div>
        <div className="mb-[66px] xl:hidden">
          <CheaperTogether
            data={togetherProducts}
            modal={data}
            state={state}
            lang={lang}
            en={en}
          />
        </div>
        <DropDown data={data} />
      </div>
      <div className="smOnly:hidden mdOnly:hidden">
        <CheaperTogether
          data={togetherProducts}
          modal={data}
          state={state}
          lang={lang}
          en={en}
        />
      </div>
    </section>
  );
};

export default Basket;





