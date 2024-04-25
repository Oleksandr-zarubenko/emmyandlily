"use client";
import { i18n } from "@/i18n.config";
import { useState, useEffect } from "react";

type YourOrderProps = {
  lang: any;
  data: any;
  setIsDiscountsAndNews: any;
  isDiscountsAndNews: boolean;
  saveAndProceed: () => void;
  personActive: boolean;
  deliveryActive: boolean;
  paymentActive: boolean;
  switchToDeliveryTab: () => void;
  deliveryPrice: number;
  switchToPaymentTab: () => void;
};

const YourOrder: React.FC<YourOrderProps> = ({
  lang,
  data,
  setIsDiscountsAndNews,
  isDiscountsAndNews,
  saveAndProceed,
  personActive,
  deliveryActive,
  paymentActive,
  switchToDeliveryTab,
  deliveryPrice,
  switchToPaymentTab,
}) => {
  const [state, setState] = useState<{
    products: { id: string; price: string }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });

  const getData = async () => {
    try {
      const res = await fetch(`/api/get-price`, {
        method: "GET",
      });
      const pos = await res.json();
      setState(pos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const locales = i18n.locales;
  const en = locales[1];

  const convertPrice = (price: any, rate: number): string => {
    const convertedPrice = parseFloat(price) / rate;
    return convertedPrice.toFixed(2);
  };

  const total = localStorage.getItem("totalPrice");
  const totalPrice = total ? parseInt(total) : 0;
  const allTotal = deliveryPrice + totalPrice;
  localStorage.setItem("allTotal", JSON.stringify(allTotal));
  return (
    <div className="h-[405px] w-[357px] rounded border-[1px] border-[#DCDCDC] bg-white px-4 py-10 drop-shadow-[4px_15px_40px_0px_#100E0C33]">
      <h3 className="mb-8 text-t24">{data.order.yourOrder}</h3>
      <ul className="mb-6 border-b-[1px] border-[#292D2D]">
        <li className="mb-2 flex justify-between">
          <p className="text-t16">{data.order.total}</p>{" "}
          <p className="text-t18">
            {lang === en
              ? convertPrice(
                  totalPrice,
                  state.currencies.find(
                    (currency: any) => currency.id === "EUR"
                  )?.rate || 1
                ) + " €"
              : totalPrice + " ₴"}
          </p>
        </li>
        <li className="mb-2 flex justify-between">
          <p className="text-t16"> {data.order.delivery}</p>{" "}
          <p className="text-t18">
            {" "}
            {lang === en
              ? convertPrice(
                  deliveryPrice,
                  state.currencies.find(
                    (currency: any) => currency.id === "EUR"
                  )?.rate || 1
                ) + " €"
              : deliveryPrice + " ₴"}
          </p>
        </li>
        <li className="mb-2 flex justify-between">
          <p className="text-t16">{data.order.discount}</p>{" "}
          <p className="text-t18">- 0 {lang === en ? "€" : "₴"}</p>
        </li>
      </ul>
      <div className="mb-8 flex justify-between">
        {" "}
        <p className="text-t18">{data.order.totalAmountToBePaid}</p>{" "}
        <p className="text-t18">
          {lang === en
            ? convertPrice(
                allTotal,
                state.currencies.find((currency: any) => currency.id === "EUR")
                  ?.rate || 1
              ) + "€"
            : allTotal + "₴"}
        </p>
      </div>
      {personActive && (
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="discountsAndNewsCheckbox"
            checked={isDiscountsAndNews}
            onChange={(e) => setIsDiscountsAndNews(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />

          <label
            htmlFor="discountsAndNewsCheckbox"
            className="text-[ #292D2D] ml-2
text-t16 italic"
          >
            {data.order.wantToReceive}
          </label>
        </div>
      )}
      {personActive && (
        <button
          onClick={saveAndProceed}
          className="relative top-5  rounded bg-black px-6 py-[12px] text-t18 text-white "
        >
          {data.order.next}
        </button>
      )}
      {deliveryActive && (
        <button
          className="relative top-20 rounded bg-black px-6 py-[12px] text-t18 text-white "
          onClick={switchToDeliveryTab}
        >
          {data.order.confirmTheOrder}
        </button>
      )}
      {paymentActive && (
        <button
          className=" relative top-20 rounded bg-black px-6 py-[12px] text-t18 text-white "
          onClick={switchToPaymentTab}
        >
          {data.order.order}
        </button>
      )}
    </div>
  );
};

export default YourOrder;
