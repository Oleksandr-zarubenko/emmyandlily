"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";

import { BurgerCross } from "@/components/icons/BurgerCross";
import { ChevronDown } from "@/components/icons/Chevron-down";
import { ChevronUp } from "@/components/icons/ChevronUp";
import { Delivery } from "@/components/icons/Delivery";
import { Wallet } from "@/components/icons/Wallet";
import { Security } from "@/components/icons/Security";
import { Lock } from "@/components/icons/Lock";
import { i18n } from "@/i18n.config";
import { useAddedToCart } from "@/components/context/addedToCart";

const DropdownButton = ({ buttonText, dropdownText, icon }: { buttonText: string, dropdownText: any, icon: any }) => {
    const [isOpen, setIsOpen] = useState(false);

    const chevron = isOpen ? <ChevronDown className="" /> : <ChevronUp className="" />;
    return (
        <>
            <button className="mb-6 text-left w-full h-10 text-t18 border-b-[1px] border-[#DCDCDC]" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex justify-between items-center"> <div className="flex items-center">  {icon}  <p className="ml-2"> {buttonText}</p></div> {chevron}</div>
            </button>
            {isOpen && <div className="pb-4 flex justify-end mb-6" dangerouslySetInnerHTML={{ __html: dropdownText }} />}
        </>
    );
};

const Basket = ({ data, lang }: { data: any, lang: any }) => {
    const { addedToCart, setAddedToCart } = useAddedToCart();
    const storedDatas = localStorage.getItem('storedData');
    const storedData = storedDatas ? JSON.parse(storedDatas) : [];
    const [tovar, setTovar] = useState(storedData)
    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [totalPriceIsZero, setTotalPriceIsZero] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);


    const updateLocalStorage = () => {
        localStorage.setItem('storedData', JSON.stringify(tovar));
        localStorage.setItem('quantities', JSON.stringify(quantities));
        localStorage.setItem('totalPrice', totalPrice.toString());
    };

    useEffect(() => {
        updateLocalStorage();
    }, [tovar, quantities, totalPrice]);

    useEffect(() => {
        let newTotalPrice = 0;
        tovar.forEach((item: any) => {
            const quantity = quantities[item.id] || 0;
            newTotalPrice += item.price * quantity;
        });
        setTotalPrice(newTotalPrice);
        localStorage.setItem('totalPrice', newTotalPrice.toString());

        setTotalPriceIsZero(newTotalPrice === 0);

    }, [quantities, tovar]);

    const dropdownText = `
    
   <ul style="width: 662px; list-style-type: disc; font-size: 18px;">
                <li style="margin:0 0 20px 0">Нова пошта (Курьєр) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>
                <li>Нова пошта (Поштомат) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>

            </ul>
  `;

    const dropdownText2 = `
    
   <ul style="width: 662px; list-style-type: disc; font-size: 18px;">
                <li>Оплата карткою Visa/MasterCard, Apple Pay, LiqPay</li>
            </ul>
  `;

    const dropdownText3 = `
    
   <ul style="width: 662px; list-style-type: disc; font-size: 18px;">
                <li style="margin:0 0 20px 0">Якщо товар не відкритий, а цілісність упаковки не порушена, протягом 14 днів з моменту придбання ви можете повернути продукт. </li>
                <li>З усіх питань Ви можете зв'язатися з нами за номером +38 067 245 14 52</li>

            </ul>
  `;

    const dropdownText4 = `
    
   <ul style="width: 662px; list-style-type: disc; font-size: 18px;">
                <li style="margin:0 0 20px 0">Інформація, надана Користувачем (Покупцем) є конфіденційною. Адміністрація сайту використовує інформацію про Користувача (Покупця) з метою виконання Замовлень Відвідувача (Покупця), якщо інших цілей не вказано в цій Угоді.</li>
                <li >Відвідувач (Покупець) дає згоду на використання Адміністрацією технології cookie. Файли cookie не містять особистої інформації та не можуть жодним чином зчитувати інформацію жорсткого диска Відвідувача (Покупця). Файли cookie використовують для того, щоб підвищувати якість послуг, що надаються, зокрема для швидкої ідентифікації Відвідувача (Покупця), збереження налаштувань Відвідувача (Покупця), його персональних уподобань, відстеження стану сесії доступу Відвідувача (Покупця) і характерних для нього тенденцій. Адміністрація також використовує файли cookie в рекламних цілях, зокрема щоб керувати оголошеннями на сайтах у мережі Інтернет. Після вимкнення технології cookie Відвідувачем (Покупцем), Адміністрація не гарантує повної працездатності веб-сайту www.emmyandlily.com/</li>

            </ul>
  `;

    const handleQuantityChange = (capacity: string, value: number) => {
        const updatedQuantities = {
            ...quantities,
            [capacity]: Math.max((quantities[capacity] || 0) + value, 0),
        };
        setQuantities(updatedQuantities);

        localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
    };


    const handleRemove = (id: any) => {

        const updatedData = tovar.filter((item: any) => item.id !== id);
        setTovar(updatedData);
        localStorage.setItem('storedData', JSON.stringify(updatedData));


        const updatedQuantities = { ...quantities };
        delete updatedQuantities[id];
        setQuantities(updatedQuantities);
        localStorage.setItem('quantities', JSON.stringify(updatedQuantities));

        setAddedToCart((prevAddedToCart: any) => {
            const updatedAddedToCart = { ...prevAddedToCart };
            delete updatedAddedToCart[id];
            localStorage.setItem('addedToCart', JSON.stringify(updatedAddedToCart));
            return updatedAddedToCart;
        });
    };


    useEffect(() => {

        const storedQuantities = localStorage.getItem('quantities');
        if (storedQuantities) {

            setQuantities(JSON.parse(storedQuantities));
        }
    }, []);

    // const convertToEuro = (priceInUah) => {
    //     return priceInUah / currencyRate;
    // };

    // const convertToUah = (priceInEuro) => {
    //     return priceInEuro * currencyRate;
    // };

    // const getPrice = (locale, item) => {

    //     if (locale === en) {
    //         // Конвертуємо ціну з гривень в євро
    //         const priceInEuro = convertToEuro(item);
    //         return priceInEuro.toFixed(2);
    //     } else if (locale === ua) {
    //         // Конвертуємо ціну з євро в гривні
    //         const priceInUah = convertToUah(item);
    //         return priceInUah.toFixed(2);
    //     }

    // };


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
                    {tovar.map((item: any, index: number) => (
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
                                </div> <div><Markdown text={item.productName} className="py-2" /> <p>   {item.capacity}</p></div> </td>
                                <td className="py-2 leading-5 text-[#333333] text-t18 text-c=left ">  {item.price}  ₴</td>
                                <td className="text-center py-2 ">
                                    <div className="flex justify-evenly">
                                        <div className="border-solid border-2 border-text-[#33333399]">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
                                                disabled={quantities[item.id] <= 0}
                                            >
                                                -
                                            </button>
                                            <input
                                                value={quantities[item.id] || 0}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value, 10) || 0;
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

                                <td className="py-2 text-center leading-5 text-[#333333] text-t18">{item.price * (quantities[item.id] || 0)} ₴</td>
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
            <div className="justify-end flex mb-10">
                <p className="text-t16 text-[#333333] opacity-60 italic mr-4">  {data.basket.total} :</p>  <p className="text-t18 text-black">{totalPrice}  ₴</p>
            </div>
            <div className="justify-end flex mb-28">
                <Link href="/order" className={`bg-black px-6 py-4 text-white rounded text-t18 ml-auto ${totalPriceIsZero ? 'pointer-events-none opacity-50' : ''}`}> {data.basket.toOrder}</Link>
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
};

export default Basket;
