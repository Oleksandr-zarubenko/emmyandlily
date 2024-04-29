"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Markdown } from "@/components/Markdown";
import { useRouter } from "next/navigation";

import { BurgerCross } from "@/components/icons/BurgerCross";
import { ChevronDown } from "@/components/icons/Chevron-down";
import { ChevronUp } from "@/components/icons/ChevronUp";
import { Delivery } from "@/components/icons/Delivery";
import { Wallet } from "@/components/icons/Wallet";
import { Security } from "@/components/icons/Security";
import { Lock } from "@/components/icons/Lock";
import { i18n } from "@/i18n.config";
import { useAddedToCart } from "@/components/context/addedToCart";

const DropdownButton = ({
    buttonText,
    dropdownText,
    icon,
}: {
    buttonText: string;
    dropdownText: any;
    icon: any;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const chevron = isOpen ? (
        <ChevronDown className="" />
    ) : (
        <ChevronUp className="" />
    );
    return (
        <>
            <button
                className="mb-6 h-10 w-full border-b-[1px] border-[#DCDCDC] text-left text-t18"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between">
                    {" "}
                    <div className="flex items-center">
                        {" "}
                        {icon} <p className="ml-2"> {buttonText}</p>
                    </div>{" "}
                    {chevron}
                </div>
            </button>
            {isOpen && (
                <div
                    className="mb-6 flex justify-end pb-4"
                    dangerouslySetInnerHTML={{ __html: dropdownText }}
                />
            )}
        </>
    );
};

const Basket = ({ data, lang }: { data: any; lang: any }) => {
    const locales = i18n.locales;
    const en = locales[1]
    const { addedToCart, setAddedToCart } = useAddedToCart();

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


    const router = useRouter();

    const handleOrderClick = () => {
        if (!isButtonDisabled) {
            router.push(`/${lang}/order`);
        }
    };

    const convertPrice = (price: any, rate: any): string => {
        const convertedPrice = parseFloat(price) / rate;
        return convertedPrice.toFixed(2);
    };


    const storedDatas = localStorage.getItem('storedData');
    const storedData = storedDatas ? JSON.parse(storedDatas) : [];
    const [tovar, setTovar] = useState(storedData)

    const [quantities, setQuantities] = useState<{ [productId: string]: number }>(() => {
        const storedQuantities = localStorage.getItem('quantities');
        return storedQuantities ? JSON.parse(storedQuantities) : {};
    });

    const [totalPrice, setTotalPrice] = useState<number>(() => {
        const storedTotalPrice = localStorage.getItem('totalPrice');
        return storedTotalPrice ? parseFloat(storedTotalPrice) : 0;
    });

    const [promoCode, setPromoCode] = useState(() => {
        const storedpromoCode = localStorage.getItem('promoCode');
        return storedpromoCode || '';
    });
    const [isValid, setIsValid] = useState(() => {
        const storedIsValid = localStorage.getItem('isValid');
        return storedIsValid ? storedIsValid === 'true' : false;
    });

    const [isInputOpen, setIsInputOpen] = useState(() => {
        const storedIsInputOpen = localStorage.getItem('isInputOpen');
        return storedIsInputOpen ? storedIsInputOpen === 'true' : false;
    });

    const [isButtonClicked, setIsButtonClicked] = useState(() => {
        const storedIsButtonClicked = localStorage.getItem('isButtonClicked');
        return storedIsButtonClicked ? storedIsButtonClicked === 'true' : false;
    });

    const [discountAmount, setDiscountAmount] = useState(() => {

        const storedValue = localStorage.getItem('discountAmount');

        return storedValue ? parseInt(storedValue, 10) : 0;
    });

    const [isPromoCodeValid, setIsPromoCodeValid] = useState(false);

    useEffect(() => {
        // localStorage.setItem('discountAmount', discountAmount.toString());
        localStorage.setItem("storedData", JSON.stringify(tovar));
        localStorage.setItem('promoCode', promoCode);
        localStorage.setItem('quantities', JSON.stringify(quantities));
        localStorage.setItem('totalPrice', totalPrice.toString());
        localStorage.setItem('isInputOpen', isInputOpen.toString());
        localStorage.setItem('isButtonClicked', isButtonClicked.toString());
        localStorage.setItem("totalPrice", totalPrice.toString());
    }, [quantities, isValid, isInputOpen, isButtonClicked, promoCode, tovar, totalPrice]);

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


        const isValidPromo = inputPromoCode.trim() === data.promocod.promo;

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
        if (promoCode.trim() === data.promocod.promo) {
            setIsPromoCodeValid(true);
            if (inputField) {
                inputField.classList.add("bg-white");
            }
            const discountedPrice = totalPrice * 0.85;
            setDiscountAmount(totalPrice * 0.15);
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
        setTotalPrice(newTotalPrice);
        localStorage.setItem('totalPrice', newTotalPrice.toString());
    }, [quantities, tovar]);


    const dropdownText = `



        <ul style= "width: 662px; list-style-type: disc; font-size: 18px;" >
                <li style="margin:0 0 20px 0">Нова пошта (Курьєр) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>
                <li>Нова пошта (Поштомат) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>

            </ul >
    `;

    const dropdownText2 = `

    < ul ul style = "width: 662px; list-style-type: disc; font-size: 18px;" >
        <li>Оплата карткою Visa/MasterCard, Apple Pay, LiqPay</li>
            </ >
    `;

    const dropdownText3 = `

    < ul ul style = "width: 662px; list-style-type: disc; font-size: 18px;" >
                <li style="margin:0 0 20px 0">Якщо товар не відкритий, а цілісність упаковки не порушена, протягом 14 днів з моменту придбання ви можете повернути продукт. </li>
                <li>З усіх питань Ви можете зв'язатися з нами за номером +38 067 245 14 52</li>

            </ >
    `;

    const dropdownText4 = `

    < ul ul style = "width: 662px; list-style-type: disc; font-size: 18px;" >
                <li style="margin:0 0 20px 0">Інформація, надана Користувачем (Покупцем) є конфіденційною. Адміністрація сайту використовує інформацію про Користувача (Покупця) з метою виконання Замовлень Відвідувача (Покупця), якщо інших цілей не вказано в цій Угоді.</li>
                <li >Відвідувач (Покупець) дає згоду на використання Адміністрацією технології cookie. Файли cookie не містять особистої інформації та не можуть жодним чином зчитувати інформацію жорсткого диска Відвідувача (Покупця). Файли cookie використовують для того, щоб підвищувати якість послуг, що надаються, зокрема для швидкої ідентифікації Відвідувача (Покупця), збереження налаштувань Відвідувача (Покупця), його персональних уподобань, відстеження стану сесії доступу Відвідувача (Покупця) і характерних для нього тенденцій. Адміністрація також використовує файли cookie в рекламних цілях, зокрема щоб керувати оголошеннями на сайтах у мережі Інтернет. Після вимкнення технології cookie Відвідувачем (Покупцем), Адміністрація не гарантує повної працездатності веб-сайту www.emmyandlily.com/</li>

            </ >
    `;

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

    return (
        <section className='container py-40'>
            <h1 className='text-t32 tracking-wider mb-10'>
                {data.basket.heading}
            </h1>

            <div className="pb-14 mb-4 border-b-[1px] border-black">
                <table className="w-full ">
                    <thead >
                        <tr >
                            <th className="w-[30%] text-left pb-6 py-2 text-t14 text-[#333333] opacity-60 italic">  {data.basket.name}</th>
                            <th className="w-[10%] text-left pb-6  py-2 text-t14 text-[#333333] opacity-60 italic" > {data.basket.price}</th>
                            <th className="w-[25%]  text-center pb-6  py-2 text-t14 text-[#333333] opacity-60 italic"  > {data.basket.number}</th>
                            <th className="w-[20%] pb-6 py-2 text-t14 text-[#333333] opacity-60 italic"> {data.basket.sum}</th>
                            <th className="w-[15%] text-right pb-6  py-2 text-t14 text-[#333333] opacity-60 italic"> {data.basket.delete}</th>
                        </tr>
                    </thead>
                    {tovar.map((item: any) => (
                        <tbody key={item.id}>

                            <tr className="border-b">
                                <td className="flex ">   <div className="relative h-full md:h-96 xl:h-[80px] xl:w-[71px] xl:flex-shrink-0 mr-4">
                                    <Image
                                        quality={80}
                                        fill
                                        src={item.photo}
                                        alt={item.productName || "Emmy and Lili"}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                                    />
                                </div> <div><p className="py-2 text-t18">{item.productName.replace(/#/g, '')}</p>
                                        <p className="text-t14 text-dark/60"> {item.capacity}</p></div> </td>
                                <td className="py-2 leading-5 text-[#333333] text-t18 text-c=left ">
                                    {(lang === en
                                        ? state && state.products.find((items: any) => items.id === item.id)
                                            ? convertPrice(
                                                state.products.find((items: any) => items.id === item.id)!.price,
                                                state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1
                                            )
                                            : 'N/A'
                                        : state && state.products.find((items: any) => items.id === item.id)
                                            ? state.products.find((items: any) => items.id === item.id)!.price
                                            : 'N/A'
                                    )} {lang === en ? '€' : '₴'}</td>
                                <td className="text-center py-2 ">
                                    <div className="flex justify-evenly">
                                        <div className="border-solid border-2 border-text-[#33333399]">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
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
                                                className="p-[4px] text-center w-10 text-[#33333399] border-gray-300"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item.id, 1)}
                                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
                                            >
                                                +
                                            </button>

                                        </div>
                                    </div>
                                </td>

                                <td className="py-2 text-center leading-5 text-[#333333] text-t18">  {lang === 'en'
                                    ? (state && state.products.find((items: any) => items.id === item.id)
                                        ? convertPrice(
                                            (parseFloat(state.products.find((items: any) => items.id === item.id)!.price) || 0) * (quantities[item.id] || 1),
                                            state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1
                                        )
                                        : 'N/A')
                                    : (state && state.products.find((items: any) => items.id === item.id)
                                        ? parseFloat(state.products.find((items: any) => items.id === item.id)!.price) * (quantities[item.id] || 1)
                                        : 'N/A')
                                } {lang === 'en' ? '€' : '₴'}

                                </td>
                                <td className="py-2 ml-auto text-right">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className=" text-black px-4 py-2 "
                                    >
                                        <BurgerCross className="h-6 w-6 text-black" />
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    ))}
                </table>
            </div>
            <div className="text-end mb-8">

                <button className="ml-auto mb-6 text-black w-[225px] text-t16 flex justify-between" onClick={handleToggleInput}>Додати промокод    <BurgerCross className="w-4 h-4 origin-center rotate-45" /></button>

                {isInputOpen && (
                    <div className="relative">
                        <input
                            id="promoCodeInput"
                            type="text"
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                            placeholder="Введіть промокод"
                            className={`text-t16  p-2 border-gray-300 w-[225px] }`}
                        />
                        <button

                            onClick={handleVerifyPromoCode}
                            disabled={isPromoCodeValid}
                            className="absolute top-0 right-0 w-10  px-2 mt-[3px] py-2 border-none bg-black text-white"
                        >
                            {isPromoCodeValid ? '✔' : '➜'}
                        </button>
                    </div>
                )}
            </div>
            <div className="ml-auto mb-8 flex w-52 justify-between text-t16" >
                <p>
                    Знижка</p> <p>- {lang === en ? convertPrice(discountAmount, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) : discountAmount} {lang === en ? '€' : '₴'}
                </p>
            </div>
            <div className="ml-auto flex w-52 justify-between text-t16 mb-10">
                <p>
                    {data.basket.total}</p> <p>{lang === en ? convertPrice(totalPrice, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) : totalPrice} {lang === en ? '€' : '₴'}
                </p>

            </div>

            <div className="justify-end flex mb-28">
                <button
                    onClick={handleOrderClick}
                    className={`bg-black px-6 py-4 text-white rounded text-t18 ml-auto ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''} `}
                >
                    {data.basket.toOrder}
                </button>
            </div>
            <div>
                <h2 className="text-t32 -tracking-5 mb-10"> {data.basket.additionalInformation}</h2>
                <DropdownButton icon={<Delivery />} buttonText={data.basket.delivery} dropdownText={dropdownText} />
                <DropdownButton icon={<Wallet />} buttonText={data.basket.payment} dropdownText={dropdownText2} />
                <DropdownButton icon={<Security />} buttonText={data.basket.guarantee} dropdownText={dropdownText3} />
                <DropdownButton icon={<Lock />} buttonText={data.basket.privacy} dropdownText={dropdownText4} />
            </div>

        </section >
    );

    //                 <td className="py-2 text-center text-t18 leading-5 text-[#333333]">
    //                   {" "}
    //                   {lang === "en"
    //                     ? state &&
    //                       state.products.find((items: any) => items.id === item.id)
    //                       ? convertPrice(
    //                           (parseFloat(
    //                             state.products.find(
    //                               (items: any) => items.id === item.id
    //                             )!.price
    //                           ) || 0) * (quantities[item.id] || 1),
    //                           state.currencies.find(
    //                             (currency: any) => currency.id === "EUR"
    //                           )?.rate || 1
    //                         )
    //                       : "N/A"
    //                     : state &&
    //                         state.products.find(
    //                           (items: any) => items.id === item.id
    //                         )
    //                       ? parseFloat(
    //                           state.products.find(
    //                             (items: any) => items.id === item.id
    //                           )!.price
    //                         ) * (quantities[item.id] || 1)
    //                       : "N/A"}{" "}
    //                   {lang === "en" ? "€" : "₴"}
    //                 </td>
    //                 <td className="ml-auto py-2 text-right">
    //                   <button
    //                     onClick={() => handleRemove(item.id)}
    //                     className=" px-4 py-2 text-black "
    //                   >
    //                     <BurgerCross className="h-6 w-6 text-black" />
    //                   </button>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           ))}
    //         </table>
    //       </div>
    //       <div className="mb-10 flex justify-end">
    //         <p className="text-t18 text-black">
    //           {lang === en
    //             ? convertPrice(
    //                 totalPrice,
    //                 state.currencies.find((currency: any) => currency.id === "EUR")
    //                   ?.rate || 1
    //               )
    //             : totalPrice}{" "}
    //           {lang === en ? "€" : "₴"}
    //         </p>
    //       </div>
    //       <div className="mb-28 flex justify-end">
    //         <Link
    //           href={`/ ${ lang } /order`}
    // className = {`ml-auto rounded bg-black px-6 py-4 text-t18 text-white `}
    //         >
    //     { " "}
    // { data.basket.toOrder }
    //         </Link >
    //       </div >
    //     <div>
    //         <h2 className="mb-10 text-t32 -tracking-5">
    //             {" "}
    //             {data.basket.additionalInformation}
    //         </h2>
    //         <DropdownButton
    //             icon={<Delivery />}
    //             buttonText={data.basket.delivery}
    //             dropdownText={dropdownText}
    //         />
    //         <DropdownButton
    //             icon={<Wallet />}
    //             buttonText={data.basket.payment}
    //             dropdownText={dropdownText2}
    //         />
    //         <DropdownButton
    //             icon={<Security />}
    //             buttonText={data.basket.guarantee}
    //             dropdownText={dropdownText3}
    //         />
    //         <DropdownButton
    //             icon={<Lock />}
    //             buttonText={data.basket.privacy}
    //             dropdownText={dropdownText4}
    //         />
    //     </div>


};

export default Basket;