"use client";
import { i18n } from "@/i18n.config";
import { useState, useEffect } from "react";
import { convertPrice } from "@/utils/convertPrice/convertPrice";
import getData from "@/utils/api/api";

type YourOrderProps = {
    lang: any;
    data: any;
    setIsDiscountsAndNews: any;
    isDiscountsAndNews: boolean;
    saveAndProceed: () => void;
    personActive: boolean;
    deliveryActive: boolean;
    paymentActive: boolean;
    switchToDeliveryTab: () => void;
    deliveryPrice: number;
    switchToPaymentTab: () => void;
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
}) => {
    const [state, setState] = useState<{
        products: { id: string; price: string }[];
        currencies: { id: string; rate: number }[];
    }>({ products: [], currencies: [] });

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

    const locales = i18n.locales;
    const en = locales[1];



    const total = localStorage.getItem('totalPrice');
    const totalPrice = total ? parseInt(total) : 0;
    const freeDelivery = (deliveryPrice: any) => {
        if (totalPrice >= 600) {
            return lang === 'en' ? deliveryPrice : deliveryPrice = 0;
        }
        return deliveryPrice

    }
    const allTotal = deliveryPrice + totalPrice;
    localStorage.setItem('allTotal', JSON.stringify(allTotal));
    return (
        <div className='smOnly:mt-[56px] w-full px-4 py-7 smOnly:h-[360px] mdOnly:w-[255px] mdOnly:h-[353px]  xl:w-[357px] h-[405px] mdOnly:py-6 xl:py-10 mdOnly:px-4 xl:px-4 border-[1px] bg-white border-[#DCDCDC] drop-shadow-[4px_15px_40px_0px_#100E0C33] rounded'>
            <h3 className='text-t18 xl:text-t24 font-bold mb-8'>{data.order.yourOrder}</h3>
            <ul className='border-b-[1px] border-[#292D2D] mb-6'>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'>{data.order.total}</p> <p className='text-t16 xl:text-t18'>{lang === en
                    ? convertPrice(totalPrice, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) + ' €'
                    : totalPrice + ' ₴'
                }
                </p></li>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'> {data.order.delivery}</p> <p className='text-t16 xl:text-t18'>  {lang === en
                    ? convertPrice(freeDelivery(deliveryPrice), state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) + ' €'
                    : freeDelivery(deliveryPrice) + ' ₴'
                }</p></li>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'>{data.order.discount}</p> <p className='text-t16 xl:text-t18'>- 0  {lang === en ? '€' : '₴'}</p></li>
            </ul>
            <div className='flex justify-between mb-8'> <p className='text-t12 xl:text-t18'>{data.order.totalAmountToBePaid}</p>    <p className='text-t16 xl:text-t18'>
                {lang === en
                    ? convertPrice(allTotal, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) + ' €'
                    : allTotal + ' ₴'
                }
            </p></div>
            {personActive && (
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="discountsAndNewsCheckbox"
                        checked={isDiscountsAndNews}
                        onChange={(e) => setIsDiscountsAndNews(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-500"
                    />

                    <label htmlFor="discountsAndNewsCheckbox" className="ml-2 text-t12 xl:text-t16 text-[
#292D2D] italic">{data.order.wantToReceive}</label>

                </div>
            )}
            {personActive && (
                <button onClick={saveAndProceed} className="relative xl:top-5 smOnly:w-full mdOnly:w-full text-t18 py-[12px] px-6 bg-black text-white rounded">{data.order.next}</button>

            )}
            {deliveryActive && (

                <button className="relative top-10 text-t14 smOnly:w-full mdOnly:w-full xl:text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToDeliveryTab}>{data.order.confirmTheOrder}</button>
            )}
            {paymentActive && (

                <button className=" relative top-10 text-t14 smOnly:w-full mdOnly:w-full xl:text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToPaymentTab}>{data.order.order}</button>
            )}
        </div>


    );
};

export default YourOrder;
