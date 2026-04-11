"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Personalinfo from "@/components/Order/Personalinfo";
import YourOrder from "@/components/Order/YourOrder";
import Delivery from "@/components/Order/Delivery";
import Image from "next/image";
import Mono from "../../public/mono.png";
import { Locale, locales } from "@/i18n/routing";
import getData from "@/utils/api/api";
// import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { useRouter } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { DatoOrderData } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
import { DatoDeliveryMethod } from "@/types/dato";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useShallow } from "zustand/react/shallow";
import { FormPostBody, OrderErrorState } from "@/types/order";
import { DEFAULT_SITE_DISCOUNT_PERCENT } from "@/constants/discounts";
import {
  createMonobankInvoice,
  submitOrderToSalesDrive,
} from "@/server/actions/checkout";
import { sendTelegramOrderNotification } from "@/server/actions/order-telegram";
import { trackPixel } from "@/lib/pixel";
const Order = ({ data, lang }: { data: DatoOrderData; lang: Locale }) => {
  const en = locales[1];
  const [state, setState] = useState<SalesDriveData>({
    products: [],
    currencies: [],
  });
  const router = useRouter();
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const data = await getData(lang);
        if (!cancelled) {
          setState(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const checkout = useCheckoutStore(
    useShallow((store) => ({
      cartItems: store.cartItems,
      quantities: store.quantities,
      promoCode: store.promoCode,
      promoCodePartner: store.promoCodePartner,
      deliveryCompleted: store.deliveryCompleted,
      error: store.error,
      street: store.street,
      externalId: store.externalId,
      houseNumber: store.houseNumber,
      city: store.city,
      country: store.country,
      numposhtmat: store.numposhtmat,
      numnp: store.numnp,
      index: store.index,
      sstreet: store.sstreet,
      zip: store.zip,
      house: store.house,
      appartment: store.appartment,
      isRecipient: store.isRecipient,
      isDiscountsAndNews: store.isDiscountsAndNews,
      privacypolicy: store.privacypolicy,
      deliveryActive: store.deliveryActive,
      paymentActive: store.paymentActive,
      personActive: store.personActive,
      selectedOption: store.selectedOption,
      deliveryPrice: store.deliveryPrice,
      firstName: store.firstName,
      lastName: store.lastName,
      email: store.email,
      phoneNumber: store.phoneNumber,
      recipientFirstName: store.recipientFirstName,
      recipientLastName: store.recipientLastName,
      recipientEmail: store.recipientEmail,
      recipientPhoneNumber: store.recipientPhoneNumber,
      allTotal: store.allTotal,
      discountAmount: store.discountAmount,
      totalPrice: store.totalPrice,
      totalPriceEn: store.totalPriceEn,
    }))
  );

  const checkoutActions = useCheckoutStore(
    useShallow((store) => ({
      setDeliveryCompleted: store.setDeliveryCompleted,
      setOrderData: store.setOrderData,
      setError: store.setError,
      setStreet: store.setStreet,
      setExternalId: store.setExternalId,
      setHouseNumber: store.setHouseNumber,
      setCity: store.setCity,
      setCountry: store.setCountry,
      setNumposhtmat: store.setNumposhtmat,
      setNumnp: store.setNumnp,
      setIndex: store.setIndex,
      setSstreet: store.setSstreet,
      setZip: store.setZip,
      setHouse: store.setHouse,
      setAppartment: store.setAppartment,
      setIsRecipient: store.setIsRecipient,
      setIsDiscountsAndNews: store.setIsDiscountsAndNews,
      setPrivacypolicy: store.setPrivacypolicy,
      setDeliveryActive: store.setDeliveryActive,
      setPaymentActive: store.setPaymentActive,
      setPersonActive: store.setPersonActive,
      setSelectedOption: store.setSelectedOption,
      setDeliveryPrice: store.setDeliveryPrice,
      setFirstName: store.setFirstName,
      setLastName: store.setLastName,
      setEmail: store.setEmail,
      setPhoneNumber: store.setPhoneNumber,
      setRecipientFirstName: store.setRecipientFirstName,
      setRecipientLastName: store.setRecipientLastName,
      setRecipientEmail: store.setRecipientEmail,
      setRecipientPhoneNumber: store.setRecipientPhoneNumber,
    }))
  );

  const {
    cartItems,
    quantities,
    promoCode: apiPromocod,
    promoCodePartner: apiPromocodPartner,
    deliveryCompleted,
    error,
    street,
    externalId,
    houseNumber,
    city,
    country,
    numposhtmat,
    numnp,
    index,
    sstreet,
    zip,
    house,
    appartment,
    isRecipient,
    isDiscountsAndNews,
    privacypolicy,
    deliveryActive,
    paymentActive,
    personActive,
    selectedOption,
    deliveryPrice,
    firstName,
    lastName,
    email,
    phoneNumber,
    recipientFirstName,
    recipientLastName,
    recipientEmail,
    recipientPhoneNumber,
    allTotal,
    discountAmount,
    totalPrice,
    totalPriceEn,
  } = checkout;

  const {
    setDeliveryCompleted,
    setOrderData,
    setError,
    setStreet,
    setExternalId,
    setHouseNumber,
    setCity,
    setCountry,
    setNumposhtmat,
    setNumnp,
    setIndex,
    setSstreet,
    setZip,
    setHouse,
    setAppartment,
    setIsRecipient,
    setIsDiscountsAndNews,
    setPrivacypolicy,
    setDeliveryActive,
    setPaymentActive,
    setPersonActive,
    setSelectedOption,
    setDeliveryPrice,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setRecipientFirstName,
    setRecipientLastName,
    setRecipientEmail,
    setRecipientPhoneNumber,
  } = checkoutActions;

  const productName = cartItems;

  const [paymentMonobank, setPaymentMonobank] = useState<boolean>(true);
  const [afterpay, setAfterpay] = useState<boolean>(false);

  const recipientData = `Дані отримувача ${recipientFirstName} ${recipientLastName} ${recipientEmail} ${recipientPhoneNumber}`;

  // const handleMonobankChange = () => {
  //   setPaymentMonobank(true);
  //   setAfterpay(false);
  // };

  // const handleAfterpayChange = () => {
  //   setAfterpay(true);
  //   setPaymentMonobank(false);
  // };
  const products = productName.map((product) => ({
    name: product.productName.trim().replace(/###\s*/, ""),
    capacity: product.capacity,
    price: product.price,
    id: product.id,
  }));

  const subtotalBeforeDiscount = totalPrice + discountAmount;
  const appliedDiscountPercent =
    subtotalBeforeDiscount > 0 && discountAmount > 0
      ? Number(((discountAmount / subtotalBeforeDiscount) * 100).toFixed(2))
      : DEFAULT_SITE_DISCOUNT_PERCENT;
  const productDiscountValue =
    appliedDiscountPercent > 0 ? `${appliedDiscountPercent}%` : "0";

  const updatedProducts = products.map((product) => ({
    ...product,
    quantity: quantities[product.id],
    discount: productDiscountValue,
  }));

  function translateShippingOption(option: string) {
    switch (option) {
      case "np-courier":
        return "Кур'єр Нової Пошти";
      case "novaposhta-smovuviz":
        return "Самовивіз з Нової Пошти";
      case "np-poshtmat":
        return "Поштомат Нової Пошти";
      case "ukrposhta":
        return "Укрпошта";
      default:
        return option;
    }
  }

  const productNamesString = products.map((product) => product.name).join(", ");

  const selectePaymentMethod = paymentMonobank === true ? "id_38" : "id_12";
  const adress = street + houseNumber;

  const makeApiCall = async () => {
    const translatedOption = translateShippingOption(selectedOption);
    const parsedProducts = updatedProducts.map((product) => ({
      id: product.id,
      name: product.name,
      costPerItem: product.price,
      amount: product.quantity,
      description: product.capacity,
      discount: product.discount,
    }));
    const payload: FormPostBody = {
      firstName,
      lastName,
      email,
      phoneNumber,
      selectedOption: translatedOption,
      recipientData,
      city,
      apiPromocod,
      numnp,
      numposhtmat,
      street: adress,
      houseNumber,
      index,
      products: parsedProducts,
      isDiscountsAndNews,
      apiPromocodPartner,
      selectePaymentMethod,
      externalId,
    };

    await submitOrderToSalesDrive(payload);
    void sendTelegramOrderNotification(payload)
      .then((telegramResult) => {
        if (!telegramResult.success) {
          console.error(
            "Telegram order notification error:",
            telegramResult.error
          );
        }
      })
      .catch((error: unknown) => {
        console.error("Telegram order notification failed:", error);
      });
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const deliveryMethod = data.delivery.deliveryMethod.find(
      (method: DatoDeliveryMethod) => method.idD === e.target.value
    );

    setOrderData({
      selectedOption: e.target.value,
      deliveryPrice: deliveryMethod ? parseInt(deliveryMethod.price) : 0,
    });
  };

  const addRequiredError = (
    errors: OrderErrorState,
    key: keyof OrderErrorState,
    value: string
  ) => {
    if (value.trim() === "") {
      errors[key] = "Обов'язкове поле";
    }
  };

  const saveAndProceed = () => {
    const requiredFields: Array<{ key: keyof OrderErrorState; value: string }> =
      isRecipient
        ? [
            { key: "firstName", value: firstName },
            { key: "lastName", value: lastName },
            { key: "email", value: email },
            { key: "phoneNumber", value: phoneNumber },
          ]
        : [
            { key: "firstName", value: firstName },
            { key: "lastName", value: lastName },
            { key: "email", value: email },
            { key: "phoneNumber", value: phoneNumber },
            { key: "recipientFirstName", value: recipientFirstName },
            { key: "recipientLastName", value: recipientLastName },
            { key: "recipientEmail", value: recipientEmail },
            { key: "recipientPhoneNumber", value: recipientPhoneNumber },
          ];

    const nextErrors: OrderErrorState = {};
    requiredFields.forEach(({ key, value }) =>
      addRequiredError(nextErrors, key, value)
    );
    const hasFormatErrors = requiredFields.some(({ key }) =>
      Boolean(error[key])
    );
    const hasRequiredErrors = Object.keys(nextErrors).length > 0;

    if (hasFormatErrors || hasRequiredErrors) {
      if (hasRequiredErrors) {
        setError((prev) => ({ ...prev, ...nextErrors }));
      }
      setOrderData({ deliveryActive: false });
      return;
    }

    setOrderData({
      personActive: false,
      deliveryActive: true,
      paymentActive: false,
    });
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  };
  const numberValute = lang === "en" ? 978 : 980;
  const normalizedCheckoutTotal =
    lang === "en"
      ? Number(totalPriceEn.toFixed(2))
      : Number(allTotal.toFixed(2));
  const amount = Math.round(normalizedCheckoutTotal * 100);

  const switchToPaymentTab = async () => {
    if (deliveryCompleted && afterpay === true && privacypolicy === true) {
      makeApiCall();
      router.push("/thank-you");
      const productDetails = updatedProducts
        .map(
          (product: { name: string; quantity: number }) =>
            `${product.name} : ${product.quantity}`
        )
        .join(", ");
      trackPixel("Purchase", {
        content_ids: updatedProducts.map(
          (product: { id: string }) => product.id
        ),
        content_type: productDetails,
        value: amount / 100,
        currency: lang === "en" ? "EUR" : "UAH",
      });
    } else if (
      deliveryCompleted &&
      privacypolicy === true &&
      paymentMonobank === true
    ) {
      makeApiCall();
      try {
        const productDetails = updatedProducts
          .map(
            (product: { name: string; quantity: number }) =>
              `${product.name} : ${product.quantity}`
          )
          .join(", ");
        trackPixel("Purchase", {
          content_ids: updatedProducts.map(
            (product: { id: string }) => product.id
          ),
          content_type: productDetails,
          value: amount / 100,
          currency: lang === "en" ? "EUR" : "UAH",
        });
        const jsonData = await createMonobankInvoice({
          amount,
          numberValute,
          externalId,
          productNamesString,
          lang,
        });

        const paymentWindow = window.open(jsonData.pageUrl);

        if (!paymentWindow) {
          window.location.href = jsonData.pageUrl;
        }
      } catch (error) {
        console.error("Помилка:", error);
      }
    } else if (privacypolicy === false) {
      alert("Підтвердіть замовлення");
    } else {
      alert("Виберіть спосіб оплати");
    }
  };

  const switchToPersonalTab = () => {
    setOrderData({
      personActive: true,
      deliveryActive: false,
      paymentActive: false,
    });
  };

  const switchToDeliveryTab = () => {
    const generateUniqueString = () => {
      const timestamp = new Date().getTime();
      const randomNum = Math.floor(Math.random() * 1000000);
      const currentTime = new Date().toLocaleString();
      return `${timestamp}-${randomNum}-${currentTime}`;
    };

    const uniqueString = generateUniqueString();
    setOrderData({ externalId: uniqueString });

    const nextErrors: OrderErrorState = {};
    addRequiredError(nextErrors, "country", country);
    addRequiredError(nextErrors, "city", city);

    if (selectedOption === "np-courier") {
      addRequiredError(nextErrors, "street", street);
      addRequiredError(nextErrors, "houseNumber", houseNumber);
    } else if (selectedOption === "novaposhta-smovuviz") {
      addRequiredError(nextErrors, "numnp", numnp);
    } else if (selectedOption === "np-poshtmat") {
      addRequiredError(nextErrors, "numposhtmat", numposhtmat);
    } else if (selectedOption === "ukrposhta") {
      addRequiredError(nextErrors, "index", index);
    } else if (selectedOption === "dhl" || selectedOption === "ups") {
      addRequiredError(nextErrors, "sstreet", sstreet);
      addRequiredError(nextErrors, "zip", zip);
      addRequiredError(nextErrors, "house", house);
      addRequiredError(nextErrors, "appartment", appartment);
    }

    const deliveryKeys: Array<keyof OrderErrorState> = [
      "country",
      "city",
      "street",
      "houseNumber",
      "numnp",
      "numposhtmat",
      "index",
      "sstreet",
      "zip",
      "house",
      "appartment",
    ];
    const hasFormatErrors = deliveryKeys.some((key) => Boolean(error[key]));

    if (Object.keys(nextErrors).length > 0 || hasFormatErrors) {
      if (Object.keys(nextErrors).length > 0) {
        setError((prev) => ({ ...prev, ...nextErrors }));
      }
      return;
    }

    if (selectedOption) {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
      setOrderData({
        paymentActive: true,
        personActive: false,
        deliveryActive: false,
        deliveryCompleted: true,
      });
    } else {
      alert("Будь ласка, виберіть варіант доставки");
    }
  };
  return (
    <section className="paw container grow justify-between py-40 md:flex">
      <div className="smOnly:w-full mdOnly:w-[55%]">
        <h1 className="text-t18 xl:text-t32 smOnly:font-bold mdOnly:mb-8 mdOnly:text-t24 mdOnly:font-bold mb-6 xl:mb-10 xl:font-bold">
          {data.order.heading}
        </h1>

        <div className="smOnly:justify-between mdOnly:mb-6 mb-6 flex items-center xl:mb-10">
          <button
            className={`mdOnly:mr-5 xl:mr-9 ${personActive ? "xl:text-t18 border-b-2 border-black font-bold text-black" : "xl:text-t18 mdOnly:text-t16 text-[#333333] opacity-60"}`}
            onClick={switchToPersonalTab}
          >
            {data.order.personalData}
          </button>
          <button
            className={`mdOnly:mr-5 xl:mr-9 ${deliveryActive ? "xl:text-t18 border-b-2 border-black font-bold text-black" : "xl:text-t18 mdOnly:text-t16 text-[#333333] opacity-60"}`}
            onClick={saveAndProceed}
          >
            {data.order.delivery}
          </button>
          <button
            className={`mdOnly:mr-5 xl:mr-9 ${paymentActive ? "xl:text-t18 border-b-2 border-black font-bold text-black" : "xl:text-t18 mdOnly:text-t16 text-[#333333] opacity-60"}`}
            onClick={switchToDeliveryTab}
          >
            {data.order.payment}
          </button>
        </div>

        <div className="mdOnly:w-[100%]">
          {personActive && (
            <Personalinfo
              error={error}
              setError={setError}
              data={data}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              recipientEmail={recipientEmail}
              setRecipientEmail={setRecipientEmail}
              recipientPhoneNumber={recipientPhoneNumber}
              setRecipientPhoneNumber={setRecipientPhoneNumber}
              recipientFirstName={recipientFirstName}
              setRecipientFirstName={setRecipientFirstName}
              recipientLastName={recipientLastName}
              setRecipientLastName={setRecipientLastName}
              email={email}
              setEmail={setEmail}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              isRecipient={isRecipient}
              setIsRecipient={setIsRecipient}
            />
          )}

          {deliveryActive && (
            <Delivery
              data={data}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
              street={street}
              setStreet={setStreet}
              houseNumber={houseNumber}
              setHouseNumber={setHouseNumber}
              sstreet={sstreet}
              setSstreet={setSstreet}
              zip={zip}
              setZip={setZip}
              house={house}
              setHouse={setHouse}
              appartment={appartment}
              setAppartment={setAppartment}
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              numnp={numnp}
              setNumnp={setNumnp}
              setNumposhtmat={setNumposhtmat}
              numposhtmat={numposhtmat}
              index={index}
              setIndex={setIndex}
              error={error}
              setError={setError}
              lang={lang}
              en={en}
            />
          )}

          {paymentActive && (
            <div>
              <h3 className="text-t18 mb-8 font-bold">Оберіть спосіб оплати</h3>
              <label className="mb-3 flex">
                <input
                  type="radio"
                  name="paymentMethod"
                  defaultChecked
                  // checked={paymentMonobank}
                  // onChange={handleMonobankChange}
                  className="mr-2 accent-black"
                />
                <Image src={Mono} alt="Monobank" width={267} height={24} />
              </label>
            </div>
          )}
        </div>
      </div>
      <YourOrder
        lang={lang}
        data={data}
        privacypolicy={privacypolicy}
        setPrivacypolicy={setPrivacypolicy}
        setIsDiscountsAndNews={setIsDiscountsAndNews}
        isDiscountsAndNews={isDiscountsAndNews}
        saveAndProceed={saveAndProceed}
        personActive={personActive}
        deliveryActive={deliveryActive}
        paymentActive={paymentActive}
        switchToDeliveryTab={switchToDeliveryTab}
        deliveryPrice={deliveryPrice}
        switchToPaymentTab={switchToPaymentTab}
        state={state}
      />
    </section>
  );
};

// export default Order;
export default dynamic(() => Promise.resolve(Order), { ssr: false });
