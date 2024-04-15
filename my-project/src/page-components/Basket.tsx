"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Markdown } from "@/components/Markdown";

import { BurgerCross } from "@/components/icons/BurgerCross";
import { ChevronDown } from "@/components/icons/Chevron-down";
import { ChevronUp } from "@/components/icons/ChevronUp";
import { Delivery } from "@/components/icons/Delivery";
import { Wallet } from "@/components/icons/Wallet";
import { Security } from "@/components/icons/Security";
import { Lock } from "@/components/icons/Lock";
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

const Basket = ({ data }: any) => {

    const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});
    const [items, setItems] = useState(data.allProducts);
    const dropdownText = `
    
   <ul style="width: 662px; list-style-type: disc; font-size: 18px;">
                <li >Нова пошта (Курьєр) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>
                <li>Нова пошта (Поштомат) - При сумі замовлення до 600 грн вартість доставки 40 грн, при сумі замовлення вище 600 грн доставка безкоштовна.</li>

            </ul>
  `;
    const handleQuantityChange = (capacity: string, value: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [capacity]: Math.max((prevQuantities[capacity] || 0) + value, 0),
        }));
    };

    const handleRemove = (id: string) => {
        // Створити новий масив товарів, в якому відсутній товар з вказаним id
        const updatedItems = items.filter((item: { id: string }) => item.id !== id);
        // Оновити стан, щоб відобразити зміни
        setItems(updatedItems);
    };
    const subtotal = items.reduce((acc: any, item: any) => {
        const quantity = quantities[item.id] || 0; // Кількість одиниць для поточного продукту
        const productPrice = item.price.products[0].price; // Ціна продукту
        const productTotal = productPrice * quantity; // Сума для поточного продукту
        return acc + productTotal; // Додати суму поточного продукту до загальної суми
    }, 0);

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
                    <tbody>
                        {items.map((item: any) => (
                            <tr key={item.id} className="border-b">
                                <td className="flex ">   <div className="relative h-full md:h-96 xl:h-[80px] xl:w-[71px] xl:flex-shrink-0 mr-4">
                                    <Image
                                        quality={80}
                                        fill
                                        src={item.productSlider[0].url}
                                        alt={item.productpicture.alt || "Emmy and Lili"}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 550px"
                                    />
                                </div> <div><Markdown text={item.heading} className="py-2" /> <p> {item.price.products[0].price} ml</p></div> </td>
                                <td className="py-2 leading-5 text-[#333333] text-t18 text-c=left ">{item.price.products[0].price} ₴</td>
                                <td className="text-center py-2 ">
                                    <div className="flex justify-evenly">
                                        <div className="border-solid border-2 border-text-[#33333399]">
                                            <button
                                                onClick={() => handleQuantityChange(item.id, -1)}
                                                className="p-[4px] px-2 bg-white text-[#33333399] hover:text-black"
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
                                <td className="py-2 text-center leading-5 text-[#333333] text-t18">{item.price.products[0].price * (quantities[item.id] || 0)} ₴</td>
                                <td className="py-2 ml-auto text-right">
                                    <button
                                        onClick={() => handleRemove(item.id)}
                                        className=" text-black px-4 py-2 "
                                    >
                                        <BurgerCross className="h-6 w-6 text-black" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="justify-end flex mb-10">
                <p className="text-t16 text-[#333333] opacity-60 italic mr-4">  {data.basket.total} :</p>  <p className="text-t18 text-black">{subtotal}</p>
            </div>
            <div className="justify-end flex mb-28">
                <Link href="/order" className="bg-black px-6 py-4 text-white rounded text-t18 ml-auto"> {data.basket.toOrder}</Link>
            </div>
            <div>
                <h2 className="text-t32 -tracking-5 mb-10"> {data.basket.additionalInformation}</h2>
                <DropdownButton icon={<Delivery />} buttonText={data.basket.delivery} dropdownText={dropdownText} />
                <DropdownButton icon={<Wallet />} buttonText={data.basket.payment} dropdownText="Dropdown text 2" />
                <DropdownButton icon={<Security />} buttonText={data.basket.guarantee} dropdownText="Dropdown text 3" />
                <DropdownButton icon={<Lock />} buttonText={data.basket.privacy} dropdownText="Dropdown text 4" />
            </div>

        </section >
    );
};

export default Basket;
