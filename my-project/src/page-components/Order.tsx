"use client";
import { useState, useEffect } from "react";
import Personalinfo from "@/components/Order/Personalinfo";
import YourOrder from "@/components/Order/YourOrder";
import Delivery from "@/components/Order/Delivery";
import Image from "next/image";
import Mono from "../../public/mono.png"

const Order = ({ data }: any) => {

    const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem('storedData') || '[]'));
    const [quantities, setQuantities] = useState(JSON.parse(localStorage.getItem('quantities') || '{}'));

    const [productName, setProductName] = useState(storedData);

    const [deliveryCompleted, setDeliveryCompleted] = useState(false);

    const [error, setError] = useState<{ [key: string]: string }>({});


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

    const [recipientFirstName, setRecipientFirstName] = useState("");
    const [recipientLastName, setRecipientLastName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState("");

    const [paymentMonobank, setPaymentMonobank] = useState(false);

    const total = localStorage.getItem('allTotal');
    const totalPrice = total ? parseInt(total) : 0;



    const recipientData = `Дані отримувача ${recipientFirstName} ${recipientLastName} ${recipientEmail} ${recipientPhoneNumber}`;

    const handleMonobankChange = () => {
        setPaymentMonobank(!paymentMonobank);
    };

    const products = productName.map((product: any) => ({
        name: product.productName.trim().replace(/###\s*/, ''),
        capacity: product.capacity,
        price: product.price,
        id: product.id
    }));

    const updatedProducts = products.map((product: any) => ({
        ...product,
        quantity: quantities[product.id],

    }));

    function translateShippingOption(option: string) {
        switch (option) {
            case 'np-courier':
                return 'Курєр Нової Пошти';
            case 'novaposhta-smovuviz':
                return 'Самовивіз з Нової Пошти';
            case 'np-poshtmat':
                return 'Поштомат Нової Пошти';
            case 'ukrposhta':
                return 'Укрпошта';
            default:
                return option;
        }
    }

    const productNamesString = products.map((product: any) => product.name).join(', ');


    const makeApiCall = async () => {

        const translatedOption = translateShippingOption(selectedOption);
        const parsedProducts = updatedProducts.map((product: any) => ({
            id: product.id,
            name: product.name,
            costPerItem: product.price,
            amount: product.quantity,
            description: product.capacity,

        }));
        await fetch('/api/form-post', {
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
                numnp,
                numposhtmat,
                street,
                houseNumber,
                index,
                products: parsedProducts,
            })
        })
    }


    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);

        switch (e.target.value) {
            case "np-courier":
                setDeliveryPrice(90);
                break;
            case "novaposhta-smovuviz":
                setDeliveryPrice(55);
                break;
            case "np-poshtmat":
                setDeliveryPrice(55);
                break;
            case "ukrposhta":
                setDeliveryPrice(25);
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
        if (selectedOption === 'np-courier') {
            return (
                street.trim() !== '' &&
                houseNumber.trim() !== '' &&
                !error.street &&
                !error.houseNumber
            );
        } else if (selectedOption === 'novaposhta-smovuviz') {
            return (
                numnp.trim() !== '' &&
                !error.numnp
            );
        } else if (selectedOption === 'np-poshtmat') {
            return (
                numposhtmat.trim() !== '' &&
                !error.numposhtmat
            );
        } else if (selectedOption === 'ukrposhta') {
            return (
                index.trim() !== '' &&
                !error.index
            );
        } else {
            return false;
        }
    };


    const saveAndProceed = () => {
        if (isPersonalDataComplete()) {
            setPersonActive(false);
            setDeliveryActive(true);
            setPaymentActive(false);
        } else {
            setDeliveryActive(false);
            alert("Будь ласка, заповніть всі поля");
        }
    };



    const switchToPaymentTab = async () => {
        if (deliveryCompleted && paymentMonobank === true) {
            try {
                const response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Token": "mDLjwZ7Idkxv5odecWj5ByA",
                    },
                    body: JSON.stringify({
                        amount: totalPrice * 100,
                        ccy: 980,
                        merchantPaymInfo: {
                            reference: "84d0070ee4e44667b31371d8f8813947",
                            destination: productNamesString,
                            comment: productNamesString,
                            customerEmails: [],
                        },
                        redirectUrl: "https://dogs-shampoo-9t4m.vercel.app/ua",
                        webHookUrl: "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
                        validity: 3600,
                        paymentType: "debit",
                        saveCardData: {
                            saveCard: true,
                            walletId: "69f780d841a0434aa535b08821f4822c",
                        },
                    }),
                });

                if (response.ok) {
                    const jsonData = await response.json();
                    console.log('Дані успішно відправлено:', jsonData);
                    window.open(jsonData.pageUrl);
                } else {
                    console.error('Помилка при відправці даних:', response.statusText);
                }
            } catch (error) {
                console.error('Помилка:', error);
            }
        } else {
            alert("Виберіть спосіб оплати")
            alert("Будь ласка, заповніть всі поля на вкладці Доставка");
        }
    };

    const switchToPersonalTab = () => {

        setPersonActive(true);
        setDeliveryActive(false);
        setPaymentActive(false);


    };


    const switchToDeliveryTab = () => {
        if (city.trim() === '' || country.trim() === '') {
            alert('Будь ласка, заповніть обов\'язкове країну і місто ');
            return;
        }
        if (!isDeliveryDataComplete(selectedOption)) {
            alert('Будь ласка, заповніть всі поля правильно');
            return;
        }



        if (selectedOption === 'np-courier') {
            if (street.trim() === '' || houseNumber.trim() === '') {
                alert('Будь ласка, заповніть обов\'язкове поле Адреса');
                return;
            }
        } else if (selectedOption === 'novaposhta-smovuviz') {
            if (numnp.trim() === '') {
                alert('Будь ласка, заповніть обов\'язкове поле "Номер відділення"');
                return;
            }
        } else if (selectedOption === 'np-poshtmat') {
            if (numposhtmat.trim() === '') {
                alert('Будь ласка, заповніть обов\'язкове поле "Номер Поштомату"');
                return;
            }
        } else if (selectedOption === 'ukrposhta') {
            if (index.trim() === '') {
                alert('Будь ласка, заповніть обов\'язкове поле "Індекс укрпошти"');
                return;
            }
        }

        // Додаткові перевірки та логіка

        if (selectedOption) {
            setPaymentActive(true);
            setPersonActive(false);
            setDeliveryActive(false);
            setDeliveryCompleted(true);
        } else {
            alert('Будь ласка, виберіть варіант доставки');
        }
    }



    return (
        <section className='container py-40 flex justify-between paw'>
            <div >
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


                <div className='w-[580px]'>
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
                            error={error}
                            setError={setError}
                        />

                    )}

                    {paymentActive && (

                        <div>
                            <h3 className="text-t18 mb-8">Оберіть спосіб оплати</h3>
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={paymentMonobank}
                                    onChange={handleMonobankChange}
                                />
                                <span className="checkmark"></span>
                                <Image src={Mono} alt="Monobank" width={267} height={24} />
                            </label>
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
                switchToPaymentTab={switchToPaymentTab}
            />

        </section>
    );
};

export default Order;
