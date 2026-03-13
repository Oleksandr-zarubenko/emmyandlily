import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { DatoOrderData } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
import { useCheckoutStore } from "@/store/checkoutStore";

type YourOrderProps = {
  lang: Locale;
  data: DatoOrderData;
  setIsDiscountsAndNews: (value: boolean) => void;
  isDiscountsAndNews: boolean;
  saveAndProceed: () => void;
  personActive: boolean;
  deliveryActive: boolean;
  paymentActive: boolean;
  switchToDeliveryTab: () => void;
  deliveryPrice: number;
  privacypolicy: boolean;
  switchToPaymentTab: () => void;
  setPrivacypolicy: (value: boolean) => void;
  state: SalesDriveData;
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
  privacypolicy,
  setPrivacypolicy,
  state,
}) => {
  const totalPrice = useCheckoutStore((store) => store.totalPrice);
  const totalDiscountAmount = useCheckoutStore((store) => store.discountAmount);
  const setAllTotal = useCheckoutStore((store) => store.setAllTotal);
  const setTotalPriceEn = useCheckoutStore((store) => store.setTotalPriceEn);

  const formatAmount = (value: number) => value.toFixed(2);
  const subtotalBeforeDiscount = totalPrice + totalDiscountAmount;

  const freeDelivery = (deliveryPriceValue: number) => {
    if (totalPrice >= -1) {
      return lang === "en" ? deliveryPriceValue : 0;
    }
    return deliveryPriceValue;
  };

  const allTotal = freeDelivery(deliveryPrice) + totalPrice;
  const subtotalBeforeDiscountEn = convertPrice(
    subtotalBeforeDiscount,
    state.currencies.find((currency) => currency.id === "EUR")?.rate || 1
  );
  const allTotalEn =
    parseFloat(
      convertPrice(
        totalPrice,
        state.currencies.find((currency) => currency.id === "EUR")?.rate || 1
      )
    ) + deliveryPrice;
  const totalDiscountAmountEn = convertPrice(
    totalDiscountAmount,
    state.currencies.find((currency) => currency.id === "EUR")?.rate || 1
  );

  useEffect(() => {
    setAllTotal(allTotal);
    setTotalPriceEn(allTotalEn);
  }, [allTotal, allTotalEn, setAllTotal, setTotalPriceEn]);

  return (
    <div className="shadow-order smOnly:mt-[56px] smOnly:h-[360px] mdOnly:h-[353px] mdOnly:w-[255px] mdOnly:px-4 mdOnly:py-6 h-[420px] w-full rounded border-[1px] border-[#DCDCDC] bg-white px-4 py-7 xl:w-[357px] xl:px-4 xl:py-10">
      <h3 className="text-t18 xl:text-t24 smOnly:font-bold mdOnly:font-bold mb-8 xl:font-bold">
        {data.order.yourOrder}
      </h3>
      <ul className="mb-6 border-b-[1px] border-[#292D2D]">
        <li className="mb-2 flex justify-between">
          <p className="text-t14 xl:text-t16">{data.order.total}</p>
          <p className="text-t16 xl:text-t18">
            {lang === "en"
              ? `${subtotalBeforeDiscountEn} UAH`
              : `${formatAmount(subtotalBeforeDiscount)} ₴`}
          </p>
        </li>
        <li className="mb-2 flex justify-between">
          <p className="text-t14 xl:text-t16">{data.order.discount}</p>
          <p className="text-t16 xl:text-t18">
            {lang === "en"
              ? `- ${totalDiscountAmountEn} UAH`
              : `- ${formatAmount(totalDiscountAmount)} ₴`}
          </p>
        </li>
      </ul>
      <div className="mb-8 flex justify-between">
        <p className="text-t12 xl:text-t18">{data.order.totalAmountToBePaid}</p>
        <p className="text-t16 xl:text-t18 smOnly:font-bold mdOnly:font-bold xl:font-bold">
          {lang === "en" ? `${allTotalEn.toFixed(2)} UAH` : `${formatAmount(allTotal)} ₴`}
        </p>
      </div>
      {personActive && (
        <div className="items-top mb-6 flex">
          <input
            type="checkbox"
            id="isDiscountsAndNews"
            checked={isDiscountsAndNews}
            onChange={(e) => setIsDiscountsAndNews(e.target.checked)}
            className="h-5 w-5 flex-shrink-0 accent-black"
          />

          <label
            htmlFor="isDiscountsAndNews"
            className="text-t12 xl:text-t16 ml-2 text-[#292D2D] italic"
          >
            {data.order.wantToReceive}
          </label>
        </div>
      )}
      {paymentActive && (
        <div className="items-top mb-6 flex">
          <input
            type="checkbox"
            id="privacypolicy"
            checked={privacypolicy}
            onChange={(e) => setPrivacypolicy(e.target.checked)}
            className="h-5 w-5 flex-shrink-0 accent-black"
          />

          <label
            htmlFor="privacypolicy"
            className="text-t12 xl:text-t16 ml-2 text-[#292D2D] italic"
          >
            Підтверджуючи замовлення, я даю згоду на обробку своїх персональних
            даних відповідно до{" "}
            <Link className="italic underline" href="/privacy-policy">
              умов користувача
            </Link>{" "}
            на законних підставах*
          </label>
        </div>
      )}
      {personActive && (
        <button
          type="button"
          onClick={saveAndProceed}
          className="text-t18 smOnly:w-full mdOnly:w-full relative rounded bg-black px-6 py-[12px] text-white xl:top-5"
        >
          {data.order.next}
        </button>
      )}
      {deliveryActive && (
        <button
          type="button"
          className="text-t12 xl:text-t18 smOnly:w-full mdOnly:w-full relative top-12 rounded bg-black px-6 py-[12px] text-white xl:top-20"
          onClick={switchToDeliveryTab}
        >
          {data.order.confirmTheOrder}
        </button>
      )}
      {paymentActive && (
        <button
          type="button"
          className="text-t12 xl:text-t18 smOnly:w-full mdOnly:top-[-17px] mdOnly:w-full relative top-[-15px] rounded bg-black px-6 py-[12px] text-white xl:top-0"
          onClick={switchToPaymentTab}
        >
          {data.order.order}
        </button>
      )}
    </div>
  );
};

export default YourOrder;
