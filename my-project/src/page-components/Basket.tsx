"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { Markdown } from "@/components/Markdown";
import { useRouter } from "next/navigation";

import { BurgerCross } from "@/components/icons/BurgerCross";

import { i18n } from "@/i18n.config";
import { useAddedToCart } from "@/components/context/addedToCart";
import CheaperTogether from "@/components/basket/cheaperTogether";
import DropDown from "@/components/basket/DropdownButton";
import getData from "@/utils/api/api";

const Basket = ({ data, lang }: { data: any; lang: any }) => {
  const locales = i18n.locales;
  const en = locales[1];
  const { addedToCart, setAddedToCart } = useAddedToCart();

  const [state, setState] = useState<{
    products: { id: string; price: string; available: string }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });

  const fetchData = async () => {
    try {
      const data = await getData();
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
  const storedDatas = localStorage.getItem("storedData");
  const storedData = storedDatas ? JSON.parse(storedDatas) : [];
  const [tovar, setTovar] = useState(storedData);

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(
    () => {
      const storedQuantities = localStorage.getItem("quantities");
      return storedQuantities ? JSON.parse(storedQuantities) : {};
    }
  );

  const [totalPrice, setTotalPrice] = useState<number>(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
  });

  const [promoCode, setPromoCode] = useState(() => {
    const storedpromoCode = localStorage.getItem("promoCode");
    return storedpromoCode || "";
  });
  const [promoCodePartner, setPromoCodePartner] = useState(() => {
    const storedpromoCodePartner = localStorage.getItem("promoCodePartner");
    return storedpromoCodePartner || "";
  });

  const [isValid, setIsValid] = useState(() => {
    const storedIsValid = localStorage.getItem("isValid");
    return storedIsValid ? storedIsValid === "true" : false;
  });

  const [isInputOpen, setIsInputOpen] = useState(() => {
    const storedIsInputOpen = localStorage.getItem("isInputOpen");
    return storedIsInputOpen ? storedIsInputOpen === "true" : false;
  });

  const [isButtonClicked, setIsButtonClicked] = useState(() => {
    const storedIsButtonClicked = localStorage.getItem("isButtonClicked");
    return storedIsButtonClicked ? storedIsButtonClicked === "true" : false;
  });

  const [discountAmount, setDiscountAmount] = useState(() => {
    const storedValue = localStorage.getItem("discountAmount");

    return storedValue ? parseInt(storedValue, 10) : 0;
  });
  const [isPromoCodeValid, setIsPromoCodeValid] = useState(() => {
    const storeisPromoCodeValid = localStorage.getItem("isPromoCodeValid");
    return storeisPromoCodeValid ? storeisPromoCodeValid === "true" : false;
  });


  useEffect(() => {
    localStorage.setItem("isPromoCodeValid", isPromoCodeValid.toString());
    localStorage.setItem('discountAmount', discountAmount.toString());
    localStorage.setItem("promoCodePartner", promoCodePartner);
    localStorage.setItem("storedData", JSON.stringify(tovar));
    localStorage.setItem("promoCode", promoCode);
    localStorage.setItem("quantities", JSON.stringify(quantities));
    localStorage.setItem("totalPrice", totalPrice.toString());
    localStorage.setItem("isInputOpen", isInputOpen.toString());
    localStorage.setItem("isButtonClicked", isButtonClicked.toString());
    localStorage.setItem("totalPrice", totalPrice.toString());
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
    isPromoCodeValid
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
          setPromoCodePartner(code.namePartner)

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
        return promo.promoCodName.some((code: any) => code.promocod === promoCode.trim());
      });

      const discountValue = discountObject ? discountObject.promoCodName.find((code: any) => code.promocod === promoCode.trim()).discount : 0;

      console.log("Discount Value:", discountValue);
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
    tovar.forEach((item: any) => {
      const quantity = quantities[item.id] || 1;
      newTotalPrice += item.price * quantity;
    });

    const discountObject = data.allPromocods.find((promo: any) => {
      return promo.promoCodName.some((code: any) => code.promocod === promoCode.trim());
    });
    const discountValue = discountObject ? discountObject.promoCodName.find((code: any) => code.promocod === promoCode.trim()).discount : 0;
    const discountedPrice = newTotalPrice * (1 - discountValue / 100);
    setDiscountAmount(newTotalPrice * (discountValue / 100));
    setTotalPrice(discountedPrice);

    localStorage.setItem("totalPrice", newTotalPrice.toString());
  }, [quantities, tovar]);

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
  const TogetherProducts = data.allProducts.filter((product: any) => {
    const correspondingProduct = state.products.find(
      (p) => p.id === product.idAvailable
    );
    return (
      correspondingProduct &&
      correspondingProduct.available === "true" &&
      (product.idAvailable === "id_5" || product.idAvailable === "id_4" || product.idAvailable === "id_6")
    );
  });

  return (
    <section className="container justify-between py-40 xl:flex">
      <div className="w-full xl:w-[750px]">
        <h1 className="mb-10 text-t32 font-bold tracking-wider">
          {data.basket.heading}
        </h1>

        <div className="mb-4 border-b-[1px] border-black pb-14">
          <table className="w-full ">
            <thead>
              <tr className="smOnly:hidden mdOnly:hidden">
                <th className="w-[30%] mdOnly:w-[20%] py-2 pb-6 text-left text-t14 italic text-[#333333] opacity-60">
                  {" "}
                  {data.basket.name}
                </th>
                <th className="w-[10%] mdOnly:w-[20%] py-2 pb-6  text-left text-t14 italic text-[#333333] opacity-60">
                  {" "}
                  {data.basket.price}
                </th>
                <th className="w-[25%] mdOnly:w-[30%] py-2 pb-6  text-center text-t14 italic text-[#333333] opacity-60">
                  {" "}
                  {data.basket.number}
                </th>
                <th className="w-[20%]  py-2 pb-6 text-t14 italic text-[#333333] opacity-60">
                  {" "}
                  {data.basket.sum}
                </th>
                <th className="w-[15%] mdOnly:w-[10%] py-2 pb-6  text-right text-t14 italic text-[#333333] opacity-60">
                  {" "}
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
                        quality={80}
                        fill
                        src={item.photo}
                        alt={item.productName || "Emmy and Lili"}
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                      />
                    </div>
                    <div>
                      <p className="py-2  xl:text-t18 mdOnly:text-t16 ">
                        {item.productName.replace(/#/g, "")}
                      </p>
                      <p className="text-t14 text-dark/60"> {item.capacity}</p>
                    </div>{" "}
                  </td>
                  <td className=" mdOnly:w-14 text-left py-2 leading-5 text-[#333333] xl:text-t18 mdOnly:text-t16 ">
                    {lang === en
                      ? state &&
                        state.products.find(
                          (items: any) => items.id === item.id
                        )
                        ? convertPrice(
                          state.products.find(
                            (items: any) => items.id === item.id
                          )!.price,
                          state.currencies.find(
                            (currency: any) => currency.id === "EUR"
                          )?.rate || 1
                        )
                        : "N/A"
                      : state &&
                        state.products.find(
                          (items: any) => items.id === item.id
                        )
                        ? state.products.find(
                          (items: any) => items.id === item.id
                        )!.price
                        : "N/A"}{" "}
                    {lang === en ? "€" : "₴"}
                  </td>
                  <td className="py-2 text-center ">
                    <div className="flex justify-evenly mdOnly:px-3">
                      <div className=" mdOnly:w-24 border-text-[#33333399] border-2 border-solid">
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

                  <td className="py-2 text-center mdOnly:w-16 mdOnly:text-t16 xl:text-t18 leading-5 text-[#333333]">
                    {" "}
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
                    {lang === "en" ? "€" : "₴"}
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
                        quality={80}
                        fill
                        src={item.photo}
                        alt={item.productName || "Emmy and Lili"}
                        className="object-cover"
                        sizes="(max-width: 768px) 80vw"
                      />
                    </div>
                    <div>
                      <p className="py-2 text-t16 ">
                        {item.productName.replace(/#/g, "")}
                      </p>
                      <p className="mb-1 text-t14 text-dark/60">
                        {" "}
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

                  <td className="py-2 leading-5 text-[#333333]">
                    <ul className="text-left">
                      <li className="mb-4 whitespace-nowrap text-t16">
                        {lang === en
                          ? state &&
                            state.products.find(
                              (items: any) => items.id === item.id
                            )
                            ? convertPrice(
                              state.products.find(
                                (items: any) => items.id === item.id
                              )!.price,
                              state.currencies.find(
                                (currency: any) => currency.id === "EUR"
                              )?.rate || 1
                            )
                            : "N/A"
                          : state &&
                            state.products.find(
                              (items: any) => items.id === item.id
                            )
                            ? state.products.find(
                              (items: any) => items.id === item.id
                            )!.price
                            : "N/A"}{" "}
                        {lang === en ? "€" : "₴"}
                      </li>

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
                        {lang === "en" ? "€" : "₴"}
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
        </div>
        <div className="mb-8 text-end">
          <button
            className="mb-6 ml-auto flex w-[225px] justify-between text-t14 text-black xl:text-t16"
            onClick={handleToggleInput}
          >
            {lang === en ? "Add promo code" : "Додати промокод "}{" "}
            <BurgerCross className="h-4 w-4 origin-center rotate-45" />
          </button>

          {isInputOpen && (
            <div className="relative">
              <input
                id="promoCodeInput"
                type="text"
                value={promoCode}
                onChange={handlePromoCodeChange}
                placeholder={
                  lang === en ? "Enter the promo code " : "Введіть промокод "
                }
                className={`} w-[225px]   border-gray-300 p-2 text-t14 xl:text-t16`}
              />
              <button
                onClick={handleVerifyPromoCode}
                disabled={isPromoCodeValid}
                className="absolute right-0 top-0 mt-[3px]  w-10 border-none bg-black px-2 py-2 text-white"
              >
                {isPromoCodeValid ? "✔" : "➜"}
              </button>
            </div>
          )}
        </div>
        <div className="mb-8 ml-auto flex w-52 justify-between text-t14 xl:text-t16 ">
          <p>{lang === en ? "Discount" : "Знижка"} </p>
          <p>
            -
            {lang === en
              ? convertPrice(
                discountAmount,
                state.currencies.find(
                  (currency: any) => currency.id === "EUR"
                )?.rate || 1
              )
              : discountAmount}{" "}
            {lang === en ? "€" : "₴"}
          </p>
        </div>
        <div className="6 mb-10 ml-auto flex w-52 justify-between text-t14 xl:text-t16">
          <p className="text-black opacity-60">{data.basket.total}</p>{" "}
          <p className="text-t16 font-bold">
            {lang === en
              ? convertPrice(
                totalPrice,
                state.currencies.find(
                  (currency: any) => currency.id === "EUR"
                )?.rate || 1
              )
              : totalPrice}{" "}
            {lang === en ? "€" : "₴"}
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
        <div className="xl:hidden mb-[66px]">
          <CheaperTogether data={TogetherProducts} state={state} setState={setState} lang={lang} en={en} />
        </div>
        <DropDown data={data} />
      </div>
      <div className="smOnly:hidden mdOnly:hidden">
        <CheaperTogether data={TogetherProducts} state={state} setState={setState} lang={lang} en={en} />
      </div>
    </section>
  );
};

export default Basket;
