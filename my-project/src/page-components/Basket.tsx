"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { Markdown } from "@/components/Markdown";
import { useRouter } from "next/navigation";

import { BurgerCross } from "@/components/icons/BurgerCross";

import { Locale, locales } from "@/i18n/routing";
import { useAddedToCart } from "@/components/context/addedToCart";
import CheaperTogether from "@/components/basket/cheaperTogether";
import DropDown from "@/components/basket/DropdownButton";
import getData from "@/utils/api/api";

const Basket = ({ data, lang }: { data: any; lang: Locale }) => {
  const en = locales[1];
  const { addedToCart, setAddedToCart } = useAddedToCart();
  const [isHovered, setIsHovered] = useState(false);

  const [state, setState] = useState<{
    products: { id: string; price: string; available: string; oldprice: any }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });
  console.log({ basketData: data });

  const fetchData = async () => {
    try {
      const data = await getData(lang);
      setState(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();

  const handleOrderClick = () => {
    if (!isButtonDisabled) {
      router.push(`/${lang}/order`);
    }
  };
  const storedDatas =
    typeof window !== "undefined" ? localStorage.getItem("storedData") : null;

  const storedData = storedDatas ? JSON.parse(storedDatas) : [];
  const [tovar, setTovar] = useState(storedData);

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(
    () => {
      if (typeof window !== "undefined") {
        const storedQuantities = localStorage.getItem("quantities");
        return storedQuantities ? JSON.parse(storedQuantities) : {};
      }
      return {};
    }
  );

  const [totalPrice, setTotalPrice] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const storedTotalPrice = localStorage.getItem("totalPrice");
      return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
    }
    return 0;
  });
  const [promoCode, setPromoCode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedpromoCode = localStorage.getItem("promoCode");
      return storedpromoCode || "";
    }
    return "";
  });

  const [promoCodePartner, setPromoCodePartner] = useState(() => {
    if (typeof window !== "undefined") {
      const storedpromoCodePartner = localStorage.getItem("promoCodePartner");
      return storedpromoCodePartner || "";
    }
    return "";
  });

  const [isValid, setIsValid] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIsValid = localStorage.getItem("isValid");
      return storedIsValid ? storedIsValid === "true" : false;
    }
    return false;
  });

  const [isInputOpen, setIsInputOpen] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIsInputOpen = localStorage.getItem("isInputOpen");
      return storedIsInputOpen ? storedIsInputOpen === "true" : false;
    }
    return false;
  });

  const [isButtonClicked, setIsButtonClicked] = useState(() => {
    if (typeof window !== "undefined") {
      const storedIsButtonClicked = localStorage.getItem("isButtonClicked");
      return storedIsButtonClicked ? storedIsButtonClicked === "true" : false;
    }
    return false;
  });

  const [discountAmount, setDiscountAmount] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("discountAmount");
      return storedValue ? parseInt(storedValue, 10) : 0;
    }
    return 0;
  });

  const [isPromoCodeValid, setIsPromoCodeValid] = useState(() => {
    if (typeof window !== "undefined") {
      const storeisPromoCodeValid = localStorage.getItem("isPromoCodeValid");
      return storeisPromoCodeValid ? storeisPromoCodeValid === "true" : false;
    }
    return false;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem("storedData") || "[]");
      setTovar(storedData);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    localStorage.setItem("isPromoCodeValid", isPromoCodeValid.toString());
    localStorage.setItem("discountAmount", discountAmount.toString());
    localStorage.setItem("promoCodePartner", promoCodePartner);
    localStorage.setItem("storedData", JSON.stringify(tovar));
    localStorage.setItem("promoCode", promoCode);
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("isInputOpen", isInputOpen.toString());
    localStorage.setItem("isButtonClicked", isButtonClicked.toString());
  }, [
    discountAmount,
    quantities,
    isValid,
    isInputOpen,
    isButtonClicked,
    promoCode,
    tovar,
    totalPrice,
    promoCodePartner,
    isPromoCodeValid,
  ]);

  const handlePromoCodeChange = (event: any) => {
    const inputPromoCode = event.target.value;
    setPromoCode(inputPromoCode);

    let newTotalPrice = 0;
    tovar.forEach((item: any) => {
      const quantity = quantities[item.id] || 1;
      newTotalPrice += item.price * quantity;
    });

    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice", newTotalPrice.toString());
    const isValidPromo = data.allPromocods.some((promo: any) => {
      return promo.promoCodName.some((code: any) => {
        return code.promocod === inputPromoCode.trim();
      });
    });

    if (isValidPromo) {
      setIsValid(true);
      setIsButtonClicked(true);
    } else {
      setIsValid(false);
      setIsButtonClicked(false);
    }
  };

  const handleVerifyPromoCode = () => {
    const inputField = document.getElementById("promoCodeInput");
    const isValidPromo = data.allPromocods.some((promo: any) => {
      return promo.promoCodName.some((code: any) => {
        if (code.promocod === promoCode.trim()) {
          setPromoCodePartner(code.namePartner);

          return true;
        }
        return false;
      });
    });
    if (isValidPromo) {
      setIsPromoCodeValid(true);
      if (inputField) {
        inputField.classList.add("bg-white");
      }
      const discountObject = data.allPromocods.find((promo: any) => {
        return promo.promoCodName.some(
          (code: any) => code.promocod === promoCode.trim()
        );
      });

      const discountValue = discountObject
        ? discountObject.promoCodName.find(
            (code: any) => code.promocod === promoCode.trim()
          ).discount
        : 0;

      const discountedPrice = totalPrice * (1 - discountValue / 100);
      setDiscountAmount(totalPrice * (discountValue / 100));
      setTotalPrice(discountedPrice);
    } else {
      if (inputField) {
        inputField.classList.add("bg-[#C61004]/[.06]");
      }
      setIsPromoCodeValid(false);
      setDiscountAmount(0);
    }
  };

  const handleToggleInput = () => {
    setIsInputOpen(!isInputOpen);
  };

  useEffect(() => {
    let newTotalPrice = 0;

    // Розрахунок нової ціни
    tovar.forEach((item: any) => {
      const quantity = quantities[item.id] || 1;
      newTotalPrice += item.price * quantity;
    });

    // Пошук об'єкта знижки
    const discountObject = data.allPromocods.find((promo: any) =>
      promo.promoCodName.some((code: any) => code.promocod === promoCode.trim())
    );

    // Витягування значення знижки
    const discountValue = discountObject
      ? discountObject.promoCodName.find(
          (code: any) => code.promocod === promoCode.trim()
        )?.discount || 0
      : 0;

    // Розрахунок ціни зі знижкою
    const discountedPrice = newTotalPrice * (1 - discountValue / 100);

    // Оновлення станів
    setDiscountAmount(newTotalPrice * (discountValue / 100));
    setTotalPrice(discountedPrice);

    // Збереження в localStorage
    localStorage.setItem("totalPrice", newTotalPrice.toString());
  }, [quantities, tovar, data.allPromocods, promoCode]); // Додано всі залежності

  const handleQuantityChange = (capacity: string, value: number) => {
    const updatedQuantities = {
      ...quantities,
      [capacity]: Math.max((quantities[capacity] || 1) + value, 0),
    };
    setQuantities(updatedQuantities);

    localStorage.setItem("quantities", JSON.stringify(updatedQuantities));
  };

  const handleRemove = (id: any) => {
    const updatedData = tovar.filter((item: any) => item.id !== id);
    setTovar(updatedData);
    localStorage.setItem("storedData", JSON.stringify(updatedData));

    const updatedQuantities = { ...quantities };
    delete updatedQuantities[id];
    setQuantities(updatedQuantities);
    localStorage.setItem("quantities", JSON.stringify(updatedQuantities));

    setAddedToCart((prevAddedToCart: any) => {
      const updatedAddedToCart = { ...prevAddedToCart };
      delete updatedAddedToCart[id];
      localStorage.setItem("addedToCart", JSON.stringify(updatedAddedToCart));
      return updatedAddedToCart;
    });
  };

  const isButtonDisabled = totalPrice === 0;
  const availableIds = ["id_28", "id_27", "id_26"];

  const TogetherProducts = data.allProducts.filter((product: any) => {
    return product.capacity.some((capacity: any) => {
      const correspondingProduct = state.products.find(
        (p: any) => p.id === capacity.idCrm && p.available === "true"
      );
      return correspondingProduct && availableIds.includes(capacity.idCrm);
    });
  });

  return (
    <section className="container flex-grow justify-between py-40 xl:flex">
      <div className="w-full xl:w-[750px]">
        <h1 className="mb-10 text-t32 font-bold tracking-wider">
          {data.basket.heading}
        </h1>

        <div className="mb-4 border-b-[1px] border-black pb-14">
          {tovar.length === 0 ? ( // Check if tovar array is empty
            <p className="text-t16">
              {lang === "en" ? "No items in basket" : "Не має товарів у кошику"}
            </p>
          ) : (
            <table className="w-full ">
              <thead>
                <tr className="smOnly:hidden mdOnly:hidden">
                  <th className="w-[30%] py-2 pb-6 text-left text-t14 italic text-[#333333] opacity-60 mdOnly:w-[20%]">
                    {data.basket.name}
                  </th>
                  <th className="w-[10%] py-2 pb-6 text-left  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[20%]">
                    {data.basket.price}
                  </th>
                  <th className="w-[25%] py-2 pb-6 text-center  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[30%]">
                    {data.basket.number}
                  </th>
                  <th className="w-[20%]  py-2 pb-6 text-t14 italic text-[#333333] opacity-60">
                    {data.basket.sum}
                  </th>
                  <th className="w-[15%] py-2 pb-6 text-right  text-t14 italic text-[#333333] opacity-60 mdOnly:w-[10%]">
                    {data.basket.delete}
                  </th>
                </tr>
              </thead>
              {tovar.map((item: any) => (
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
                        (items: any) => items.id === item.id
                      ) ? (
                        <>
                          {lang === "en" ? (
                            <span
                              className={`${state.products.find((items: any) => items.id === item.id)!.oldprice ? "text-red-500" : ""}`}
                            >
                              {convertPrice(
                                state.products.find(
                                  (items: any) => items.id === item.id
                                )!.price,
                                state.currencies.find(
                                  (currency: any) => currency.id === "EUR"
                                )?.rate || 1
                              )}{" "}
                              {lang === "en" ? " UAH" : " ₴"}
                            </span>
                          ) : (
                            <span
                              className={`${state.products.find((items: any) => items.id === item.id)!.oldprice ? "text-red-500" : ""}`}
                            >
                              {
                                state.products.find(
                                  (items: any) => items.id === item.id
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
                        (prod: any) =>
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
                                      (currency: any) => currency.id === "EUR"
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
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                            disabled={quantities[item.id] <= 1}
                          >
                            -
                          </button>
                          <input
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
                            (items: any) => items.id === item.id
                          )
                          ? (() => {
                              const price =
                                (parseFloat(
                                  state.products.find(
                                    (items: any) => items.id === item.id
                                  )!.price
                                ) || 0) * (quantities[item.id] || 1);
                              const convertedPrice = convertPrice(
                                price,
                                state.currencies.find(
                                  (currency: any) => currency.id === "EUR"
                                )?.rate || 1
                              );
                              return price === 0 ? "Preorder" : convertedPrice;
                            })()
                          : "N/A"
                        : state &&
                            state.products.find(
                              (items: any) => items.id === item.id
                            )
                          ? (() => {
                              const price =
                                parseFloat(
                                  state.products.find(
                                    (items: any) => items.id === item.id
                                  )!.price
                                ) * (quantities[item.id] || 1);
                              return price === 0 ? "Preorder" : price;
                            })()
                          : "N/A"}{" "}
                      {lang === "en" ? " UAH" : " ₴"}
                    </td>
                    <td className="ml-auto py-2 text-right">
                      <button
                        onClick={() => handleRemove(item.id)}
                        className=" px-4 py-2 text-black "
                      >
                        <BurgerCross className="h-6 w-6 text-black" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}

              {tovar.map((item: any) => (
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
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="bg-white p-[4px] px-2 text-[#33333399] hover:text-black"
                              disabled={quantities[item.id] <= 1}
                            >
                              -
                            </button>
                            <input
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
                            (items: any) => items.id === item.id
                          ) ? (
                            <>
                              {lang === "en" ? (
                                <span
                                  className={`${state.products.find((items: any) => items.id === item.id)!.oldprice !== undefined ? "text-red-500" : ""}`}
                                >
                                  {convertPrice(
                                    state.products.find(
                                      (items: any) => items.id === item.id
                                    )!.price,
                                    state.currencies.find(
                                      (currency: any) => currency.id === "EUR"
                                    )?.rate || 1
                                  )}{" "}
                                  {lang === "en" ? " UAH" : " ₴"}
                                </span>
                              ) : (
                                <span
                                  className={`${state.products.find((items: any) => items.id === item.id)!.oldprice !== undefined ? "text-red-500" : ""}`}
                                >
                                  {
                                    state.products.find(
                                      (items: any) => items.id === item.id
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
                          (prod: any) =>
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
                                        (currency: any) => currency.id === "EUR"
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
                                (items: any) => items.id === item.id
                              )
                              ? convertPrice(
                                  (parseFloat(
                                    state.products.find(
                                      (items: any) => items.id === item.id
                                    )!.price
                                  ) || 0) * (quantities[item.id] || 1),
                                  state.currencies.find(
                                    (currency: any) => currency.id === "EUR"
                                  )?.rate || 1
                                )
                              : "N/A"
                            : state &&
                                state.products.find(
                                  (items: any) => items.id === item.id
                                )
                              ? parseFloat(
                                  state.products.find(
                                    (items: any) => items.id === item.id
                                  )!.price
                                ) * (quantities[item.id] || 1)
                              : "N/A"}{" "}
                          {lang === "en" ? " UAH" : " ₴"}
                        </li>
                      </ul>
                    </td>
                    <td className="ml-auto py-2 text-right">
                      <button
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
            className="mb-6 ml-auto flex w-[225px] justify-between text-t14 text-black xl:text-t16"
            onClick={handleToggleInput}
          >
            {lang === "en" ? "Add promo code" : "Додати промокод "}{" "}
            <BurgerCross className="h-4 w-4 origin-center rotate-45" />
          </button>

          {isInputOpen && (
            <div className="relative">
              {isPromoCodeValid ? (
                <>
                  <input
                    id="promoCodeInput"
                    type="text"
                    value={promoCode}
                    disabled={true}
                    placeholder={
                      lang === "en"
                        ? "Enter the promo code "
                        : "Введіть промокод "
                    }
                    className="w-[225px] border-gray-300 p-2 text-t14 xl:text-t16"
                  />
                  <button
                    onClick={() => {
                      setTotalPrice(totalPrice + discountAmount);
                      localStorage.removeItem("promoCode");
                      setPromoCode("");
                      setPromoCodePartner("");
                      setIsPromoCodeValid(false);
                      setDiscountAmount(0);
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
                    value={promoCode}
                    onChange={handlePromoCodeChange}
                    placeholder={
                      lang === "en"
                        ? "Enter the promo code "
                        : "Введіть промокод "
                    }
                    className="w-[225px] border-gray-300 p-2 text-t14 xl:text-t16"
                  />
                  <button
                    onClick={handleVerifyPromoCode}
                    disabled={isPromoCodeValid}
                    className="absolute right-0 top-0 mt-[3px] w-10 border-none bg-black px-2 py-2 text-white"
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
                  convertPrice(
                    discountAmount,
                    state.currencies.find(
                      (currency: any) => currency.id === "EUR"
                    )?.rate || 1
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
                  convertPrice(
                    totalPrice,
                    state.currencies.find(
                      (currency: any) => currency.id === "EUR"
                    )?.rate || 1
                  )
                ).toFixed(0)
              : Math.round(totalPrice).toFixed(0)}
            {lang === "en" ? " UAH" : " ₴"}
          </p>
        </div>

        <div className="mb-[66px]  flex justify-end xl:mb-28">
          <button
            onClick={handleOrderClick}
            className={`ml-auto rounded bg-black px-6 py-4 text-t16 text-white xl:text-t18 smOnly:w-full ${isButtonDisabled ? "cursor-not-allowed opacity-50" : ""} `}
          >
            {data.basket.toOrder}
          </button>
        </div>
        <div className="mb-[66px] xl:hidden">
          <CheaperTogether
            data={TogetherProducts}
            state={state}
            setState={setState}
            lang={lang}
            en={en}
          />
        </div>
        <DropDown data={data} />
      </div>
      <div className="smOnly:hidden mdOnly:hidden">
        <CheaperTogether
          data={TogetherProducts}
          modal={data}
          state={state}
          setState={setState}
          lang={lang}
          en={en}
        />
      </div>
    </section>
  );
};

export default Basket;
