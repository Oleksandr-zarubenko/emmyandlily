"use client";
import { useState, useEffect } from "react";
import Personalinfo from "@/components/Order/Personalinfo";
import YourOrder from "@/components/Order/YourOrder";
import Delivery from "@/components/Order/Delivery";
import Image from "next/image";
import Mono from "../../public/mono.png"

const Order = ({ data, lang }: any) => {

    const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem('storedData') || '[]'));
    const [quantities, setQuantities] = useState(JSON.parse(localStorage.getItem('quantities') || '{}'));

    const [productName, setProductName] = useState(storedData);

    const [deliveryCompleted, setDeliveryCompleted] = useState(() => {
        const storedDeliveryCompleted = localStorage.getItem('deliveryCompleted');
        return storedDeliveryCompleted === 'true';
    });

    const [error, setError] = useState<{ [key: string]: string }>(() => {
        const storedError = localStorage.getItem('error');
        return storedError ? JSON.parse(storedError) : {};
    });

    const [street, setStreet] = useState(() => {
        const storedStreet = localStorage.getItem('street');
        return storedStreet || '';
    });

    const [houseNumber, setHouseNumber] = useState(() => {
        const storedHouseNumber = localStorage.getItem('houseNumber');
        return storedHouseNumber || '';
    });

    const [city, setCity] = useState(() => {
        const storedCity = localStorage.getItem('city');
        return storedCity || '';
    });

    const [country, setCountry] = useState(() => {
        const storedCountry = localStorage.getItem('country');
        return storedCountry || '';
    });

    const [numposhtmat, setNumposhtmat] = useState(() => {
        const storedNumposhtmat = localStorage.getItem('numposhtmat');
        return storedNumposhtmat || '';
    });

    const [numnp, setNumnp] = useState(() => {
        const storedNumnp = localStorage.getItem('numnp');
        return storedNumnp || '';
    });

    const [index, setIndex] = useState(() => {
        const storedIndex = localStorage.getItem('index');
        return storedIndex || '';
    });

    const [sstreet, setSstreet] = useState(() => {
        const storedSstreet = localStorage.getItem('sstreet');
        return storedSstreet || '';
    });

    const [zip, setZip] = useState(() => {
        const storedZip = localStorage.getItem('zip');
        return storedZip || '';
    });

    const [house, setHouse] = useState(() => {
        const storedHouse = localStorage.getItem('house');
        return storedHouse || '';
    });

    const [appartment, setAppartment] = useState(() => {
        const storedAppartment = localStorage.getItem('appartment');
        return storedAppartment || '';
    });

    const [isRecipient, setIsRecipient] = useState(() => {
        const storedIsRecipient = localStorage.getItem('isRecipient');
        return storedIsRecipient === 'true';
    });

    const [isDiscountsAndNews, setIsDiscountsAndNews] = useState(() => {
        const storedIsDiscountsAndNews = localStorage.getItem('isDiscountsAndNews');
        return storedIsDiscountsAndNews === 'true';
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
        const storedSelectedOption = localStorage.getItem('selectedOption');
        return storedSelectedOption || '';
    });

    const [deliveryPrice, setDeliveryPrice] = useState(() => {
        const storedDeliveryPrice = localStorage.getItem('deliveryPrice');
        return storedDeliveryPrice ? parseFloat(storedDeliveryPrice) : 0;
    });

    // форми клієнта
    const [firstName, setFirstName] = useState(() => {
        const storedFirstName = localStorage.getItem('firstName');
        return storedFirstName || '';
    });

    const [lastName, setLastName] = useState(() => {
        const storedLastName = localStorage.getItem('lastName');
        return storedLastName || '';
    });
    const [email, setEmail] = useState(() => {
        const storedEmail = localStorage.getItem('email');
        return storedEmail || '';
    });

    const [phoneNumber, setPhoneNumber] = useState(() => {
        const storedPhoneNumber = localStorage.getItem('phoneNumber');
        return storedPhoneNumber || '';
    });

    const [recipientFirstName, setRecipientFirstName] = useState(() => {
        const storedRecipientFirstName = localStorage.getItem('recipientFirstName');
        return storedRecipientFirstName || '';
    });

    const [recipientLastName, setRecipientLastName] = useState(() => {
        const storedRecipientLastName = localStorage.getItem('recipientLastName');
        return storedRecipientLastName || '';
    });

    const [recipientEmail, setRecipientEmail] = useState(() => {
        const storedRecipientEmail = localStorage.getItem('recipientEmail');
        return storedRecipientEmail || '';
    });

    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(() => {
        const storedRecipientPhoneNumber = localStorage.getItem('recipientPhoneNumber');
        return storedRecipientPhoneNumber || '';
    });

    const [paymentMonobank, setPaymentMonobank] = useState(() => {
        const storedPaymentMonobank = localStorage.getItem('paymentMonobank');
        return storedPaymentMonobank ? JSON.parse(storedPaymentMonobank) : false;
    });

    const total = localStorage.getItem('allTotal');
    const totalPrice = total ? parseInt(total) : 0;



    const recipientData = `Дані отримувача ${recipientFirstName} ${recipientLastName} ${recipientEmail} ${recipientPhoneNumber}`;

    useEffect(() => {
        localStorage.setItem('selectedOption', selectedOption);
        localStorage.setItem('paymentMonobank', JSON.stringify(paymentMonobank));
        localStorage.setItem('deliveryPrice', deliveryPrice.toString());
        localStorage.setItem("deliveryActive", JSON.stringify(deliveryActive));
        localStorage.setItem("paymentActive", JSON.stringify(paymentActive));
        localStorage.setItem("personActive", JSON.stringify(personActive));
        localStorage.setItem("deliveryCompleted", JSON.stringify(deliveryCompleted));
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
        localStorage.setItem("isDiscountsAndNews", JSON.stringify(isDiscountsAndNews));
        localStorage.setItem("selectedOption", selectedOption);
        localStorage.setItem("deliveryPrice", JSON.stringify(deliveryPrice));
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("recipientFirstName", recipientFirstName);
        localStorage.setItem("recipientLastName", recipientLastName);
        localStorage.setItem("recipientEmail", recipientEmail);
        localStorage.setItem("recipientPhoneNumber", recipientPhoneNumber);
    }, [deliveryCompleted, error, street, houseNumber, city, country, numposhtmat, numnp, index, sstreet, zip, house, appartment, isRecipient, isDiscountsAndNews, selectedOption, deliveryPrice, firstName, lastName, email, phoneNumber, recipientFirstName, recipientLastName, recipientEmail, recipientPhoneNumber, deliveryActive, paymentActive, personActive, selectedOption, deliveryPrice]);


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
        makeApiCall()
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
                lang={lang}
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
