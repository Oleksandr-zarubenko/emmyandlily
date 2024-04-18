"use client";
import { useState } from "react";
import Personalinfo from "@/components/Order/Personalinfo";
import YourOrder from "@/components/Order/YourOrder";
import Delivery from "@/components/Order/Delivery";

const Order = ({ data }: any) => {
    const storedDatas = localStorage.getItem('storedData');
    const storedData = storedDatas ? JSON.parse(storedDatas) : [];

    const quantitiesData = localStorage.getItem('quantities');
    const quantities = quantitiesData ? JSON.parse(quantitiesData) : {};

    const [productName, setProductName] = useState(storedData)


    const [deliveryCompleted, setDeliveryCompleted] = useState(false);


    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const [numposhtmat, setNumposhtmat] = useState("");
    const [numnp, setNumnp] = useState("");
    const [index, setIndex] = useState("");

    const [sstreet, setSstreet] = useState("");
    const [zip, setZip] = useState("");
    const [house, setHouse] = useState("");
    const [appartment, setAppartment] = useState("");

    const [isRecipient, setIsRecipient] = useState(false);
    const [isDiscountsAndNews, setIsDiscountsAndNews] = useState(false);


    const [deliveryActive, setDeliveryActive] = useState(false);
    const [paymentActive, setPaymentActive] = useState(false);
    const [personActive, setPersonActive] = useState(true);

    const [selectedOption, setSelectedOption] = useState("");
    const [deliveryPrice, setDeliveryPrice] = useState(0);

    // форми клієнта
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    // const [isRecipient, setIsRecipient] = useState(false);
    // const [isDiscountsAndNews, setIsDiscountsAndNews] = useState(false);


    // const [deliveryActive, setDeliveryActive] = useState(false);
    // const [paymentActive, setPaymentActive] = useState(false);
    // const [personActive, setPersonActive] = useState(true);


    // const [selectedOption, setSelectedOption] = useState('');
    // const [deliveryPrice, setDeliveryPrice] = useState(0);


    const [recipientFirstName, setRecipientFirstName] = useState("");
    const [recipientLastName, setRecipientLastName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");

    const products = productName.map((product: any) => ({
        name: product.productName.trim(),
        capacity: product.capacity,
        id: product.id
    }));

    const updatedProducts = products.map((product: any) => ({
        ...product,
        quantity: quantities[product.id]
    }));

    console.log(updatedProducts)


    const sendPostRequest = async () => {
        try {
            const response = await fetch('https://emmyandlily.salesdrive.me/handler/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    form: "XAbgwAmkIZY5cyOjuJxgGoaJ8jMkYK4yTu0ExeoGSqoUitRJQcFx",
                    getResultData: "",
                    fName: firstName,
                    lName: lastName,
                    email: email,
                    phone: phoneNumber,
                    company: country,
                    products: updatedProducts,
                    payment_method: "",
                    shipping_method: selectedOption,
                    shipping_address: "",
                    comment: JSON.stringify({
                        recipientFirstName,
                        recipientLastName,
                        recipientEmail,
                        recipientPhoneNumber
                    }),
                    sajt: "",
                    externalId: "",
                    organizationId: "",
                    stockId: "",
                    novaposhta: {
                        ServiceType: "",
                        payer: "",
                        area: "",
                        region: "",
                        city: city,
                        cityNameFormat: "",
                        WarehouseNumber: "",
                        Street: street,
                        BuildingNumber: houseNumber,
                        Flat: appartment
                    },
                    ukrposhta: {
                        ServiceType: index,
                        payer: "",
                        type: "",
                        city: city,
                        WarehouseNumber: "",
                        Street: "",
                        BuildingNumber: "",
                        Flat: ""
                    },
                    prodex24source_full: "",
                    prodex24source: "",
                    prodex24medium: "",
                    prodex24campaign: "",
                    prodex24content: "",
                    prodex24term: "",
                    prodex24page: ""
                })
            });

            if (response.ok) {

                console.log('Дані успішно відправлено!');
            } else {

                console.error('Помилка при відправці даних:', response.statusText);
            }
        } catch (error) {

            console.error('Помилка:', error);

        }
    }

    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);

        switch (e.target.value) {
            case "np-courier":
            case "novaposhta":
            case "np-poshtmat":
                setDeliveryPrice(40);
                break;
            case "ukr":
                setDeliveryPrice(30);
                break;
            case "dhl":
                setDeliveryPrice(0);
                break;
            case "ups":
                setDeliveryPrice(0);
                break;
            default:
                break;
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
                !errors.firstName &&
                !errors.lastName &&
                !errors.email &&
                !errors.phoneNumber &&
                !errors.recipientFirstName &&
                !errors.recipientLastName &&
                !errors.recipientEmail &&
                !errors.recipientPhoneNumber
            );
        } else {
            return (
                firstName !== "" &&
                lastName !== "" &&
                email !== "" &&
                phoneNumber !== "" &&
                !errors.firstName &&
                !errors.lastName &&
                !errors.email &&
                !errors.phoneNumber
            );
        }
    };

    const saveAndProceed = () => {
        if (isPersonalDataComplete()) {
            setPersonActive(false);
            setDeliveryActive(true);
        } else {
            setDeliveryActive(false);
            alert("Будь ласка, заповніть всі поля");
        }
    };

    // const switchToDeliveryTab = () => {
    //     if (selectedOption !== "") {
    //         setPaymentActive(true);
    //         setPersonActive(false);
    //         setDeliveryActive(false);
    //     } else {
    //         alert("Будь ласка, виберіть варіант доставки");
    //     }
    // };

    // const switchToPaymentTab = () => {
    //     if (deliveryCompleted) {
    //         fetch("https://api.monobank.ua/api/merchant/invoice/create", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "X-Token": "uYUY2qndKqhDTMj5QEsUCgT6UjsEytb4BXsHduIl0EfQ",
    //             },
    //             body: JSON.stringify({
    //                 amount: 4200,
    //                 ccy: 980,
    //                 merchantPaymInfo: {
    //                     reference: "84d0070ee4e44667b31371d8f8813947",
    //                     destination: "Покупка щастя",
    //                     comment: "Покупка щастя",
    //                     customerEmails: [],
    //                     basketOrder: [
    //                         {
    //                             name: "Табуретка",
    //                             qty: 2,
    //                             sum: 2100,
    //                             icon: "string",
    //                             unit: "шт.",
    //                             code: "d21da1c47f3c45fca10a10c32518bdeb",
    //                             barcode: "string",
    //                             header: "string",
    //                             footer: "string",
    //                             tax: [],
    //                             uktzed: "string",
    //                             discounts: [
    //                                 {
    //                                     type: "DISCOUNT",
    //                                     mode: "PERCENT",
    //                                     value: "PERCENT",
    //                                 },
    //                             ],
    //                         },
    //                     ],
    //                 },
    //                 redirectUrl: "https://example.com/your/website/result/page",
    //                 webHookUrl:
    //                     "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
    //                 validity: 3600,
    //                 paymentType: "debit",
    //                 code: "0a8637b3bccb42aa93fdeb791b8b58e9",
    //                 saveCardData: {
    //                     saveCard: true,
    //                     walletId: "69f780d841a0434aa535b08821f4822c",
    //                 },
    //             }),
    //         })
    //             .then((response) => { })
    //             .catch((error) => {
    //                 console.error("Error:", error);
    //             });
    //     } else {
    //         alert("Будь ласка, заповніть всі поля на вкладці Доставка");
    //     }
    // };


    const switchToPersonalTab = () => {
        setPersonActive(true);
        setDeliveryActive(false);
        setPaymentActive(false);

    };

    // const saveAndProceed = () => {
    //     if (isPersonalDataComplete()) {
    //         setPersonActive(false);
    //         setDeliveryActive(true);
    //         setPaymentActive(false);

    //     } else {

    //         alert('Будь ласка, заповніть всі поля');
    //     }
    // };

    const switchToDeliveryTab = () => {
        if (selectedOption !== '' && !paymentActive) {
            setPaymentActive(true);
            setPersonActive(false);
            setDeliveryActive(false);
        } else if (paymentActive) {
            alert('Будь ласка, спершу завершіть оплату');
        } else {
            alert('Будь ласка, виберіть варіант доставки');
        }
    };

    const switchToPaymentTab = () => {

        if (deliveryCompleted) {

        } else {

            alert('Будь ласка, заповніть всі поля на вкладці Доставка');
        }
    };

    return (
        <section className='container py-40 flex justify-between paw'>
            <div>
                <h1 className='text-t32 tracking-wider mb-10'>
                    {data.order.heading}
                </h1>
                <div className='flex items-center mb-10'>
                    <button className={`mr-9 ${personActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`} onClick={switchToPersonalTab}>
                        {data.order.personalData}
                    </button>
                    <button className={`mr-9 ${deliveryActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`} onClick={saveAndProceed}>
                        {data.order.delivery}
                    </button>
                    <button className={`mr-9 ${paymentActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`} onClick={switchToDeliveryTab}>
                        {data.order.payment}
                    </button>

                </div>

                <div className='w-[550px]'>
                    {personActive && (
                        <Personalinfo
                            errors={errors}
                            setErrors={setErrors}
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
                            selectedOption={selectedOption} handleOptionChange={handleOptionChange} street={street} setStreet={setStreet} houseNumber={houseNumber}
                            setHouseNumber={setHouseNumber} sstreet={sstreet}
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
                        />

                    )}
                    {/* Вкладка "Оплата" */}
                    {paymentActive && (
                        <div>
                            <button onClick={sendPostRequest}>Відправити дані</button>

                        </div>
                    )}

                </div>

            </div>
            <YourOrder
                data={data}
                setIsDiscountsAndNews={setIsDiscountsAndNews}
                isDiscountsAndNews={isDiscountsAndNews}
                saveAndProceed={saveAndProceed}
                personActive={personActive}
                deliveryActive={deliveryActive}
                paymentActive={paymentActive}
                switchToDeliveryTab={switchToDeliveryTab}
                deliveryPrice={deliveryPrice}

            />

        </section>
    );
};

export default Order;
