"use client";
import { useState, useEffect } from "react";
import Personalinfo from "@/components/Order/Personalinfo";
import YourOrder from "@/components/Order/YourOrder";
import Delivery from "@/components/Order/Delivery";
import Image from "next/image";
import Mono from "../../public/mono.png";
import { i18n } from "@/i18n.config";
import getData from "@/utils/api/api";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import { useRouter } from 'next/navigation'
const Order = ({ data, lang }: any) => {
  const locales = i18n.locales;
  const en = locales[1];
  const [state, setState] = useState<{
    products: { id: string; price: string }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });
  const router = useRouter()
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

  const [storedData, setStoredData] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("storedData") || "[]");
    }
    return [];
  });

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("quantities") || "{}");
    }
    return {};
  });

  const [apiPromocod, setApiPromoCod] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("promoCode") || "";
    }
    return "";
  });

  const [apiPromocodPartner, setApiPromoCodPartner] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("promoCodePartner") || "";
    }
    return "";
  });

  const [productName, setProductName] = useState(storedData);
  const [deliveryCompleted, setDeliveryCompleted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedDeliveryCompleted = localStorage.getItem("deliveryCompleted");
      return storedDeliveryCompleted === "true";
    }
    return false;
  });

  const [error, setError] = useState<{ [key: string]: string }>(() => {
    if (typeof window !== 'undefined') {
      const storedError = localStorage.getItem("error");
      return storedError ? JSON.parse(storedError) : {};
    }
    return {};
  });

  const [street, setStreet] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("street") || "";
    }
    return "";
  });

  const [houseNumber, setHouseNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("houseNumber") || "";
    }
    return "";
  });
  const [city, setCity] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("city") || "";
    }
    return "";
  });

  const [country, setCountry] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("country") || "";
    }
    return "";
  });

  const [numposhtmat, setNumposhtmat] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("numposhtmat") || "";
    }
    return "";
  });

  const [numnp, setNumnp] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("numnp") || "";
    }
    return "";
  });

  const [index, setIndex] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("index") || "";
    }
    return "";
  });

  const [sstreet, setSstreet] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("sstreet") || "";
    }
    return "";
  });

  const [zip, setZip] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("zip") || "";
    }
    return "";
  });

  const [house, setHouse] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("house") || "";
    }
    return "";
  });

  const [appartment, setAppartment] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("appartment") || "";
    }
    return "";
  });

  const [isRecipient, setIsRecipient] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsRecipient = localStorage.getItem("isRecipient");
      return storedIsRecipient === "true";
    }
    return false;
  });

  const [isDiscountsAndNews, setIsDiscountsAndNews] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsDiscountsAndNews = localStorage.getItem("isDiscountsAndNews");
      return storedIsDiscountsAndNews ? storedIsDiscountsAndNews === "true" : false;
    }
    return false;
  });

  const [privacypolicy, setPrivacypolicy] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedIsprivacypolicy = localStorage.getItem("privacypolicy");
      return storedIsprivacypolicy ? JSON.parse(storedIsprivacypolicy) : false;
    }
    return false;
  });

  const [deliveryActive, setDeliveryActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedDeliveryActive = localStorage.getItem("deliveryActive");
      return storedDeliveryActive ? JSON.parse(storedDeliveryActive) : false;
    }
    return false;
  });

  const [paymentActive, setPaymentActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedPaymentActive = localStorage.getItem("paymentActive");
      return storedPaymentActive ? JSON.parse(storedPaymentActive) : false;
    }
    return false;
  });

  const [personActive, setPersonActive] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedPersonActive = localStorage.getItem("personActive");
      return storedPersonActive ? JSON.parse(storedPersonActive) : true;
    }
    return true;
  });

  const [selectedOption, setSelectedOption] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("selectedOption") || "";
    }
    return "";
  });

  const [deliveryPrice, setDeliveryPrice] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const storedDeliveryPrice = localStorage.getItem("deliveryPrice");
      return storedDeliveryPrice ? parseFloat(storedDeliveryPrice) : 0;
    }
    return 0;
  });

  // форми клієнта
  const [firstName, setFirstName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("firstName") || "";
    }
    return "";
  });

  const [lastName, setLastName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("lastName") || "";
    }
    return "";
  });

  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("email") || "";
    }
    return "";
  });

  const [phoneNumber, setPhoneNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("phoneNumber") || "";
    }
    return "";
  });

  const [recipientFirstName, setRecipientFirstName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("recipientFirstName") || "";
    }
    return "";
  });

  const [recipientLastName, setRecipientLastName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("recipientLastName") || "";
    }
    return "";
  });

  const [recipientEmail, setRecipientEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("recipientEmail") || "";
    }
    return "";
  });


  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("recipientPhoneNumber") || "";
    }
    return "";
  });

  const [paymentMonobank, setPaymentMonobank] = useState<boolean>(false);
  const [afterpay, setAfterpay] = useState<boolean>(false);
  const total = typeof window !== 'undefined' ? localStorage.getItem("allTotal") : null;

  const totalPrice = total ? parseInt(total) : 0;

  const totalEn = typeof window !== 'undefined' ? localStorage.getItem("totalPriceEn") : null;
  const totalPriceEn = totalEn ? parseInt(totalEn) : 0;

  const recipientData = `Дані отримувача ${recipientFirstName} ${recipientLastName} ${recipientEmail} ${recipientPhoneNumber}`;

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
    // localStorage.setItem("Afterpay", JSON.stringify(afterpay));
    // localStorage.setItem("paymentMonobank", JSON.stringify(paymentMonobank));
    localStorage.setItem("privacypolicy", JSON.stringify(privacypolicy));
    localStorage.setItem("deliveryPrice", deliveryPrice.toString());
    localStorage.setItem("deliveryActive", JSON.stringify(deliveryActive));
    localStorage.setItem("paymentActive", JSON.stringify(paymentActive));
    localStorage.setItem("personActive", JSON.stringify(personActive));
    localStorage.setItem(
      "deliveryCompleted",
      JSON.stringify(deliveryCompleted)
    );
    localStorage.setItem("error", JSON.stringify(error));
    localStorage.setItem("street", street);
    localStorage.setItem("houseNumber", houseNumber);
    localStorage.setItem("city", city);
    localStorage.setItem("country", country);
    localStorage.setItem("numposhtmat", numposhtmat);
    localStorage.setItem("numnp", numnp);
    localStorage.setItem("index", index);
    localStorage.setItem("sstreet", sstreet);
    localStorage.setItem("zip", zip);
    localStorage.setItem("house", house);
    localStorage.setItem("appartment", appartment);
    localStorage.setItem("isRecipient", JSON.stringify(isRecipient));
    localStorage.setItem(
      "isDiscountsAndNews",
      JSON.stringify(isDiscountsAndNews)
    );


    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("phoneNumber", phoneNumber);
    localStorage.setItem("recipientFirstName", recipientFirstName);
    localStorage.setItem("recipientLastName", recipientLastName);
    localStorage.setItem("recipientEmail", recipientEmail);
    localStorage.setItem("recipientPhoneNumber", recipientPhoneNumber);
  }, [
    privacypolicy,
    deliveryCompleted,
    error,
    street,
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
    deliveryActive,
    paymentActive,
    personActive,

  ]);

  const handleMonobankChange = () => {
    setPaymentMonobank(true);
    setAfterpay(false);
  };

  const handleAfterpayChange = () => {
    setAfterpay(true);
    setPaymentMonobank(false);
  };
  const products = productName.map((product: any) => ({
    name: product.productName.trim().replace(/###\s*/, ""),
    capacity: product.capacity,
    price: product.price,
    id: product.id,
  }));

  const updatedProducts = products.map((product: any) => ({
    ...product,
    quantity: quantities[product.id],
  }));

  function translateShippingOption(option: string) {
    switch (option) {
      case "np-courier":
        return "Курєр Нової Пошти";
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

  const productNamesString = products
    .map((product: any) => product.name)
    .join(", ");


  const selectePaymentMethod = paymentMonobank === true ? "id_38" : "id_12"
  const adress = street + houseNumber
  console.log(adress)
  const makeApiCall = async () => {
    const translatedOption = translateShippingOption(selectedOption);
    const parsedProducts = updatedProducts.map((product: any) => ({
      id: product.id,
      name: product.name,
      costPerItem: product.price,
      amount: product.quantity,
      description: product.capacity,
    }));
    await fetch("/api/form-post", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
        updatedProducts,
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
        selectePaymentMethod
      }),
    });
  };


  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);

    const deliveryMethod = data.delivery.deliveryMethod.find((method: any) => method.idD === e.target.value);

    if (deliveryMethod) {
      setDeliveryPrice(parseInt(deliveryMethod.price));
    } else {

      setDeliveryPrice(0);
    }
  };


  const isPersonalDataComplete = () => {

    if (isRecipient === false) {
      return (
        firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        phoneNumber !== "" &&
        recipientFirstName !== "" &&
        recipientLastName !== "" &&
        recipientEmail !== "" &&
        recipientPhoneNumber !== "" &&
        !error.firstName &&
        !error.lastName &&
        !error.email &&
        !error.phoneNumber &&
        !error.recipientFirstName &&
        !error.recipientLastName &&
        !error.recipientEmail &&
        !error.recipientPhoneNumber

      );
    } else {
      return (
        firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        phoneNumber !== "" &&
        !error.firstName &&
        !error.lastName &&
        !error.email &&
        !error.phoneNumber
      );
    }
  };


  const saveAndProceed = () => {
    if (isPersonalDataComplete()) {
      setPersonActive(false);
      setDeliveryActive(true);
      setPaymentActive(false);
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
    } else {
      setDeliveryActive(false);

      if (!isRecipient) { // Якщо не є отримувачем
        if (firstName.trim() === '' || error.firstName) {
          //@ts-ignore
          document.getElementById('firstName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('firstName')?.classList.remove('input-error');
        }
        if (lastName.trim() === '' || error.lastName) {
          //@ts-ignore
          document.getElementById('lastName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('lastName')?.classList.remove('input-error');
        }
        if (email.trim() === '' || error.email) {
          //@ts-ignore
          document.getElementById('email')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('email')?.classList.remove('input-error');
        }
        if (phoneNumber.trim() === '' || error.phoneNumber) {
          //@ts-ignore
          document.getElementById('phoneNumber')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('phoneNumber')?.classList.remove('input-error');
        }
        if (recipientFirstName.trim() === '' || error.recipientFirstName) {
          //@ts-ignore
          document.getElementById('recipientFirstName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientFirstName')?.classList.remove('input-error');
        }
        if (recipientLastName.trim() === '' || error.recipientLastName) {
          //@ts-ignore
          document.getElementById('recipientLastName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientLastName')?.classList.remove('input-error');
        }
        if (recipientEmail.trim() === '' || error.recipientEmail) {
          //@ts-ignore
          document.getElementById('recipientEmail')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientEmail')?.classList.remove('input-error');
        }
        if (recipientPhoneNumber.trim() === '' || error.recipientPhoneNumber) {
          //@ts-ignore
          document.getElementById('recipientPhoneNumber')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientPhoneNumber')?.classList.remove('input-error');
        }
      } else { // Якщо є отримувачем
        if (firstName.trim() === '' || error.firstName) {
          //@ts-ignore
          document.getElementById('firstName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('firstName')?.classList.remove('input-error');
        }
        if (lastName.trim() === '' || error.lastName) {
          //@ts-ignore
          document.getElementById('lastName')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('lastName')?.classList.remove('input-error');
        }
        if (email.trim() === '' || error.email) {
          //@ts-ignore
          document.getElementById('email')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('email')?.classList.remove('input-error');
        }
        if (phoneNumber.trim() === '' || error.phoneNumber) {
          //@ts-ignore
          document.getElementById('phoneNumber')?.classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('phoneNumber')?.classList.remove('input-error');
        }
      }
    }
  }



  const numberValute = lang === en ? 978 : 980
  const amount = lang === en ? Math.round(totalPriceEn * 100) : totalPrice * 100


  const switchToPaymentTab = async () => {
    if (deliveryCompleted && afterpay === true && privacypolicy === true) {
      makeApiCall();

      localStorage.clear();
      router.push(`http://emmyandlily.com/${lang}/thank-you`);

    }
    else if (deliveryCompleted && privacypolicy === true && paymentMonobank === true) {
      makeApiCall();

      localStorage.clear();
      try {
        const response = await fetch(
          "https://api.monobank.ua/api/merchant/invoice/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Token": "mDLjwZ7Idkxv5odecWj5ByA",
            },
            body: JSON.stringify({
              amount: amount,
              ccy: numberValute,
              merchantPaymInfo: {
                reference: "84d0070ee4e44667b31371d8f8813947",
                destination: productNamesString,
                comment: productNamesString,
                customerEmails: [],
              },
              redirectUrl: `http://emmyandlily.com/${lang}/thank-you`,
              webHookUrl:
                "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
              validity: 3600,
              paymentType: "debit",
              saveCardData: {
                saveCard: true,
                walletId: "69f780d841a0434aa535b08821f4822c",
              },
            }),
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setTimeout(() => {
            router.push(`/${lang}/`);
          }, 1000);
          window.open(jsonData.pageUrl);
        } else {
          console.error("Помилка при відправці даних:", response.statusText);
        }
      } catch (error) {
        console.error("Помилка:", error);
      }
    } else if (privacypolicy === false) {
      alert("Підтвредіть замовлення");

    }

    else {
      alert("Виберіть спосіб оплати");

    }
  };

  const switchToPersonalTab = () => {
    setPersonActive(true);
    setDeliveryActive(false);
    setPaymentActive(false);

  };

  const switchToDeliveryTab = () => {
    // Перевірка та встановлення/видалення класів для країни
    if (country.trim() === "" || error.country) {
      document.getElementById('country')?.classList.add('input-error');
      return;
    } else {
      document.getElementById('country')?.classList.remove('input-error');
    }

    // Перевірка та встановлення/видалення класів для міста
    if (city.trim() === "" || error.city) {
      document.getElementById('city')?.classList.add('input-error');
      return;
    } else {
      document.getElementById('city')?.classList.remove('input-error');
    }

    // Перевірка даних для конкретного методу доставки

    if (selectedOption === "np-courier") {
      if (street.trim() === "") {
        document.getElementById('street')?.classList.add('input-error');
      } else {
        document.getElementById('street')?.classList.remove('input-error');
      }

      if (houseNumber.trim() === "") {
        document.getElementById('houseNumber')?.classList.add('input-error');
      } else {
        document.getElementById('houseNumber')?.classList.remove('input-error');
      }

      if (street.trim() === "" || houseNumber.trim() === "") {
        return;
      }
    } else if (selectedOption === "dhl" || selectedOption === "ups") {
      if (sstreet.trim() === "" || error.sstreet) {
        document.getElementById('sstreet')?.classList.add('input-error');
        return;
      } else {
        document.getElementById('sstreet')?.classList.remove('input-error');
      }

      if (zip.trim() === "" || error.zip) {
        document.getElementById('zip')?.classList.add('input-error');
        return;
      } else {
        document.getElementById('zip')?.classList.remove('input-error');
      }

      if (house.trim() === "" || error.house) {
        document.getElementById('house')?.classList.add('input-error');
        return;
      } else {
        document.getElementById('house')?.classList.remove('input-error');
      }

      if (appartment.trim() === "" || error.appartment) {
        document.getElementById('appartment')?.classList.add('input-error');
        return;
      } else {
        document.getElementById('appartment')?.classList.remove('input-error');
      }

      if (sstreet.trim() === "" || zip.trim() === "" || house.trim() === "" || appartment.trim() === "") {
        return;
      }


    }

    if (selectedOption) {
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: "smooth",
      });
      setPaymentActive(true);
      setPersonActive(false);
      setDeliveryActive(false);
      setDeliveryCompleted(true);
    } else {
      alert("Будь ласка, виберіть варіант доставки");
    }
  };

  return (
    <section className="paw container grow justify-between py-40 md:flex">
      <div className="smOnly:w-full mdOnly:w-[55%]">
        <h1 className=" mb-6 text-t18 font-bold xl:mb-10 xl:text-t32 mdOnly:mb-8 mdOnly:text-t24">
          {data.order.heading}
        </h1>

        <div className=" mb-6 flex items-center xl:mb-10 smOnly:justify-between mdOnly:mb-6">
          <button
            className={`xl:mr-9 mdOnly:mr-5 ${personActive ? "border-b-2 border-black  font-bold text-black xl:text-t18" : "text-[#333333] opacity-60 xl:text-t18 mdOnly:text-t16"}`}
            onClick={switchToPersonalTab}
          >
            {data.order.personalData}
          </button>
          <button
            className={`xl:mr-9 mdOnly:mr-5 ${deliveryActive ? "border-b-2 border-black  font-bold text-black  xl:text-t18" : "text-[#333333] opacity-60 xl:text-t18 mdOnly:text-t16"}`}
            onClick={saveAndProceed}
          >
            {data.order.delivery}
          </button>
          <button
            className={`xl:mr-9 mdOnly:mr-5 ${paymentActive ? "border-b-2 border-black  font-bold text-black  xl:text-t18" : "text-[#333333] opacity-60 xl:text-t18 mdOnly:text-t16"}`}
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
              <h3 className="mb-8 text-t18 font-bold">Оберіть спосіб оплати</h3>
              <label className="flex mb-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMonobank}
                  onChange={handleMonobankChange}
                  className="accent-black mr-2"
                />
                <Image src={Mono} alt="Monobank" width={267} height={24} />
              </label>
              <label className="flex">
                <input

                  type="radio"
                  name="paymentMethod"
                  checked={afterpay}
                  onChange={handleAfterpayChange}
                  className="accent-black mr-2"
                />
                <div>
                  <p className="text-t16">Оплата під час отримання товару</p>
                  <p className="text-t12">(Ця послуга оплачується окремо, за тарифним планом перевізника)</p>
                </div>
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
        setState={setState}
      />
    </section>
  );
};

export default Order;
