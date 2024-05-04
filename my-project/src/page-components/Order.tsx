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

const Order = ({ data, lang }: any) => {
  const locales = i18n.locales;
  const en = locales[1];
  const [state, setState] = useState<{

    currencies: { id: string; rate: number }[];
  }>({ currencies: [] });

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

  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("storedData") || "[]")
  );
  const [quantities, setQuantities] = useState(
    JSON.parse(localStorage.getItem("quantities") || "{}")
  );
  const [apiPromocod, setapipromoCod] = useState(() => {

    const storedData = localStorage.getItem("promoCode");

    return storedData || "";
  });
  const [apiPromocodPartner, setapipromoCodPartner] = useState(() => {

    const storedData = localStorage.getItem("promoCodePartner");

    return storedData || "";
  });


  const [productName, setProductName] = useState(storedData);

  const [deliveryCompleted, setDeliveryCompleted] = useState(() => {
    const storedDeliveryCompleted = localStorage.getItem("deliveryCompleted");
    return storedDeliveryCompleted === "true";
  });

  const [error, setError] = useState<{ [key: string]: string }>(() => {
    const storedError = localStorage.getItem("error");
    return storedError ? JSON.parse(storedError) : {};
  });

  const [street, setStreet] = useState(() => {
    const storedStreet = localStorage.getItem("street");
    return storedStreet || "";
  });

  const [houseNumber, setHouseNumber] = useState(() => {
    const storedHouseNumber = localStorage.getItem("houseNumber");
    return storedHouseNumber || "";
  });

  const [city, setCity] = useState(() => {
    const storedCity = localStorage.getItem("city");
    return storedCity || "";
  });

  const [country, setCountry] = useState(() => {
    const storedCountry = localStorage.getItem("country");
    return storedCountry || "";
  });

  const [numposhtmat, setNumposhtmat] = useState(() => {
    const storedNumposhtmat = localStorage.getItem("numposhtmat");
    return storedNumposhtmat || "";
  });

  const [numnp, setNumnp] = useState(() => {
    const storedNumnp = localStorage.getItem("numnp");
    return storedNumnp || "";
  });

  const [index, setIndex] = useState(() => {
    const storedIndex = localStorage.getItem("index");
    return storedIndex || "";
  });

  const [sstreet, setSstreet] = useState(() => {
    const storedSstreet = localStorage.getItem("sstreet");
    return storedSstreet || "";
  });

  const [zip, setZip] = useState(() => {
    const storedZip = localStorage.getItem("zip");
    return storedZip || "";
  });

  const [house, setHouse] = useState(() => {
    const storedHouse = localStorage.getItem("house");
    return storedHouse || "";
  });

  const [appartment, setAppartment] = useState(() => {
    const storedAppartment = localStorage.getItem("appartment");
    return storedAppartment || "";
  });

  const [isRecipient, setIsRecipient] = useState(() => {
    const storedIsRecipient = localStorage.getItem("isRecipient");
    return storedIsRecipient === "true";
  });


  const [isDiscountsAndNews, setIsDiscountsAndNews] = useState(() => {
    const storedIsDiscountsAndNews = localStorage.getItem("isDiscountsAndNews");
    return storedIsDiscountsAndNews ? storedIsDiscountsAndNews === "true" : false;
  });

  const [privacypolicy, setPrivacypolicy] = useState(() => {
    const storedIsprivacypolicy = localStorage.getItem("privacypolicy");
    return storedIsprivacypolicy ? JSON.parse(storedIsprivacypolicy) : false;

  });

  const [deliveryActive, setDeliveryActive] = useState(() => {
    const storedDeliveryActive = localStorage.getItem("deliveryActive");
    return storedDeliveryActive ? JSON.parse(storedDeliveryActive) : false;
  });

  const [paymentActive, setPaymentActive] = useState(() => {
    const storedPaymentActive = localStorage.getItem("paymentActive");
    return storedPaymentActive ? JSON.parse(storedPaymentActive) : false;
  });

  const [personActive, setPersonActive] = useState(() => {
    const storedPersonActive = localStorage.getItem("personActive");
    return storedPersonActive ? JSON.parse(storedPersonActive) : true;
  });

  const [selectedOption, setSelectedOption] = useState(() => {
    const storedSelectedOption = localStorage.getItem("selectedOption");
    return storedSelectedOption || "";
  });

  const [deliveryPrice, setDeliveryPrice] = useState(() => {
    const storedDeliveryPrice = localStorage.getItem("deliveryPrice");
    return storedDeliveryPrice ? parseFloat(storedDeliveryPrice) : 0;
  });


  // форми клієнта
  const [firstName, setFirstName] = useState(() => {
    const storedFirstName = localStorage.getItem("firstName");
    return storedFirstName || "";
  });

  const [lastName, setLastName] = useState(() => {
    const storedLastName = localStorage.getItem("lastName");
    return storedLastName || "";
  });
  const [email, setEmail] = useState(() => {
    const storedEmail = localStorage.getItem("email");
    return storedEmail || "";
  });

  const [phoneNumber, setPhoneNumber] = useState(() => {
    const storedPhoneNumber = localStorage.getItem("phoneNumber");
    return storedPhoneNumber || "";
  });

  const [recipientFirstName, setRecipientFirstName] = useState(() => {
    const storedRecipientFirstName = localStorage.getItem("recipientFirstName");
    return storedRecipientFirstName || "";
  });

  const [recipientLastName, setRecipientLastName] = useState(() => {
    const storedRecipientLastName = localStorage.getItem("recipientLastName");
    return storedRecipientLastName || "";
  });

  const [recipientEmail, setRecipientEmail] = useState(() => {
    const storedRecipientEmail = localStorage.getItem("recipientEmail");
    return storedRecipientEmail || "";
  });

  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(() => {
    const storedRecipientPhoneNumber = localStorage.getItem(
      "recipientPhoneNumber"
    );
    return storedRecipientPhoneNumber || "";
  });

  const [paymentMonobank, setPaymentMonobank] = useState(() => {
    const storedPaymentMonobank = localStorage.getItem("paymentMonobank");
    return storedPaymentMonobank ? JSON.parse(storedPaymentMonobank) : false;
  });

  const total = localStorage.getItem("allTotal");
  const totalPrice = total ? parseInt(total) : 0;

  const totalEn = localStorage.getItem("totalPriceEn");
  const totalPriceEn = totalEn ? parseInt(totalEn) : 0;

  const recipientData = `Дані отримувача ${recipientFirstName} ${recipientLastName} ${recipientEmail} ${recipientPhoneNumber}`;

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption);
    localStorage.setItem("paymentMonobank", JSON.stringify(paymentMonobank));
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
    paymentMonobank,
  ]);

  const handleMonobankChange = () => {
    setPaymentMonobank(!paymentMonobank);
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

  const makeApiCall = async () => {
    const translatedOption = translateShippingOption(selectedOption);
    const parsedProducts = updatedProducts.map((product: any) => ({
      id: product.id,
      name: product.name,
      costPerItem: product.price,
      amount: product.quantity,
      description: product.capacity,
    }));

    // Відображення значень у консолі
    console.log("Data before sending:", {
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
      street,
      houseNumber,
      index,
      products: parsedProducts,
      isDiscountsAndNews,
      apiPromocodPartner
    });

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
        street,
        houseNumber,
        index,
        products: parsedProducts,
        isDiscountsAndNews,
        apiPromocodPartner
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

  const isDeliveryDataComplete = (selectedOption: any) => {
    if (selectedOption === "np-courier") {
      return (
        street.trim() !== "" &&
        houseNumber.trim() !== "" &&
        !error.street &&
        !error.houseNumber
      );
    } else if (selectedOption === "novaposhta-smovuviz") {
      return numnp.trim() !== "" && !error.numnp;
    } else if (selectedOption === "np-poshtmat") {
      return numposhtmat.trim() !== "" && !error.numposhtmat;
    } else if (selectedOption === "ukrposhta") {
      return index.trim() !== "" && !error.index;
    }
    else if (selectedOption === "dhl") {
      return sstreet.trim() !== "" &&
        house.trim() !== "" &&
        zip.trim() !== "" &&
        appartment.trim() !== "" &&
        !error.sstreet &&
        !error.house &&
        !error.zip &&
        !error.appartment
    }
    else if (selectedOption === "ups") {
      return sstreet.trim() !== "" &&
        house.trim() !== "" &&
        zip.trim() !== "" &&
        appartment.trim() !== "" &&
        !error.sstreet &&
        !error.house &&
        !error.zip &&
        !error.appartment
    }
    else {
      return false;
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
        if (firstName.trim() === '') {
          //@ts-ignore
          document.getElementById('firstName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('firstName').classList.remove('input-error');
        }
        if (lastName.trim() === '') {
          //@ts-ignore
          document.getElementById('lastName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('lastName').classList.remove('input-error');
        }
        if (email.trim() === '') {
          //@ts-ignore
          document.getElementById('email').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('email').classList.remove('input-error');
        }
        if (phoneNumber.trim() === '') {
          //@ts-ignore
          document.getElementById('phoneNumber').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('phoneNumber').classList.remove('input-error');
        }
        if (recipientFirstName.trim() === '') {
          //@ts-ignore
          document.getElementById('recipientFirstName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientFirstName').classList.remove('input-error');
        }
        if (recipientLastName.trim() === '') {
          //@ts-ignore
          document.getElementById('recipientLastName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientLastName').classList.remove('input-error');
        }
        if (recipientEmail.trim() === '') {
          //@ts-ignore
          document.getElementById('recipientEmail').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientEmail').classList.remove('input-error');
        }
        if (recipientPhoneNumber.trim() === '') {
          //@ts-ignore
          document.getElementById('recipientPhoneNumber').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('recipientPhoneNumber').classList.remove('input-error');
        }
      } else { // Якщо є отримувачем
        if (firstName.trim() === '') {
          //@ts-ignore
          document.getElementById('firstName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('firstName').classList.remove('input-error');
        }
        if (lastName.trim() === '') {
          //@ts-ignore
          document.getElementById('lastName').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('lastName').classList.remove('input-error');
        }
        if (email.trim() === '') {
          //@ts-ignore
          document.getElementById('email').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('email').classList.remove('input-error');
        }
        if (phoneNumber.trim() === '') {
          //@ts-ignore
          document.getElementById('phoneNumber').classList.add('input-error');
        } else {
          //@ts-ignore
          document.getElementById('phoneNumber').classList.remove('input-error');
        }
      }
    }
  };



  const numberValute = lang === en ? 978 : 980
  const amount = lang === en ? Math.round(totalPriceEn * 100) : totalPrice * 100


  const switchToPaymentTab = async () => {

    if (deliveryCompleted && privacypolicy === true && paymentMonobank === true) {
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

          window.open(jsonData.pageUrl);
        } else {
          console.error("Помилка при відправці даних:", response.statusText);
        }
      } catch (error) {
        console.error("Помилка:", error);
      }
    } else if (privacypolicy === false) {
      alert("Підтвреді");

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

    if (city.trim() === "" || country.trim() === "") {
      //@ts-ignore
      document.getElementById('city').classList.add('input-error')
      //@ts-ignore
      document.getElementById('country').classList.add('input-error')
      return;

    }
    else {
      //@ts-ignore
      document.getElementById('city').classList.remove('input-error');
      //@ts-ignore
      document.getElementById('country').classList.remove('input-error');
    }
    if (!isDeliveryDataComplete(selectedOption)) {
      if (selectedOption === "np-courier") {

        if (street.trim() === "" || houseNumber.trim() === "") {
          //@ts-ignore
          document.getElementById('street').classList.add('input-error');
          //@ts-ignore
          document.getElementById('houseNumber').classList.add('input-error');
          return;
        }
      } else if (selectedOption === "novaposhta-smovuviz") {
        if (numnp.trim() === "") {
          //@ts-ignore
          document.getElementById('numnp').classList.add('input-error');
          return;
        }
      } else if (selectedOption === "np-poshtmat") {
        if (numposhtmat.trim() === "") {
          //@ts-ignore
          document.getElementById('numposhtmat').classList.add('input-error');
          return;
        }
      } else if (selectedOption === "ukrposhta") {
        if (index.trim() === "") {
          //@ts-ignore
          document.getElementById('index').classList.add('input-error');
          return;
        }
      }
      else if (selectedOption === "dhl") {
        if (sstreet.trim() === "" || zip.trim() === "" || house.trim() === "" || appartment.trim() === "") {
          //@ts-ignore
          document.getElementById('sstreet').classList.add('input-error');
          //@ts-ignore
          document.getElementById('zip').classList.add('input-error');
          //@ts-ignore
          document.getElementById('house').classList.add('input-error');

          //@ts-ignore
          document.getElementById('appartment').classList.add('input-error');
          return;
        }
      }
      else if (selectedOption === "ups") {
        if (sstreet.trim() === "" || zip.trim() === "" || house.trim() === "" || appartment.trim() === "") {
          //@ts-ignore
          document.getElementById('sstreet').classList.add('input-error');
          //@ts-ignore
          document.getElementById('zip').classList.add('input-error');
          //@ts-ignore
          document.getElementById('house').classList.add('input-error');

          //@ts-ignore
          document.getElementById('appartment').classList.add('input-error');
          return;
        }
      }

      return;
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
        <h1 className="r mb-6 text-t18 font-bold xl:mb-10 xl:text-t32 mdOnly:mb-8 mdOnly:text-t24">
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
              <h3 className="mb-8 text-t18">Оберіть спосіб оплати</h3>
              <label className="flex">
                <input
                  type="radio"
                  checked={paymentMonobank}
                  onChange={handleMonobankChange}
                  className="accent-black mr-2"
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
      />
    </section>
  );
};

export default Order;
