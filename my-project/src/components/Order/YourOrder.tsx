
import { i18n } from "@/i18n.config";

import { convertPrice } from "@/utils/convertPrice/convertPrice";

import Link from "next/link";
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
    privacypolicy: any,
    switchToPaymentTab: () => void;
    setPrivacypolicy: any;
    setState: any;
    state: any;
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
    privacypolicy,
    setPrivacypolicy,
    setState,
    state
}) => {


    const locales = i18n.locales;
    const en = locales[1];

    const total = typeof window !== 'undefined' ? localStorage.getItem('totalPrice') : null;
    const totalEn = typeof window !== 'undefined' ? localStorage.getItem('totalPriceEn') : null;
    const totalPrice = total ? parseInt(total) : 0;


    const discountAmount = typeof window !== 'undefined' ? localStorage.getItem('discountAmount') : null;
    const totaldiscountAmount = discountAmount ? parseInt(discountAmount) : 0;

    const freeDelivery = (deliveryPrice: any) => {
        if (totalPrice >= 600) {
            return lang === 'en' ? deliveryPrice : deliveryPrice = 0;
        }
        return deliveryPrice

    }
    const allTotal = freeDelivery(deliveryPrice) + totalPrice;
    const allTotalEn = parseFloat(convertPrice(totalPrice, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1)) + deliveryPrice
    if (typeof window !== 'undefined') {
        localStorage.setItem('allTotal', JSON.stringify(allTotal));
        localStorage.setItem('totalPriceEn', JSON.stringify(allTotalEn));
    }
    return (
        <div className='smOnly:mt-[56px] w-full px-4 py-7 smOnly:h-[360px] mdOnly:w-[255px] mdOnly:h-[353px]  xl:w-[357px] h-[420px] mdOnly:py-6 xl:py-10 mdOnly:px-4 xl:px-4 border-[1px] bg-white border-[#DCDCDC] drop-shadow-[4px_15px_40px_0px_#100E0C33] rounded'>
            <h3 className='text-t18 xl:text-t24 font-bold mb-8'>{data.order.yourOrder}</h3>
            <ul className='border-b-[1px] border-[#292D2D] mb-6'>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'>{data.order.total}</p> <p className='text-t16 xl:text-t18'>{lang === en
                    ? convertPrice(totalPrice, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) + ' €'
                    : totalPrice + totaldiscountAmount + ' ₴'
                }
                </p></li>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'> {data.order.delivery}</p> <p className='text-t16 xl:text-t18'>  {lang === en
                    ? deliveryPrice + ' €'
                    : freeDelivery(deliveryPrice) + ' ₴'
                }</p></li>
                <li className='mb-2 flex justify-between'><p className='text-t14 xl:text-t16'>{data.order.discount}</p><p className='text-t16 xl:text-t18'>{lang === en
                    ? "- " + convertPrice(totaldiscountAmount, state.currencies.find((currency: any) => currency.id === "EUR")?.rate || 1) + ' €'
                    : "- " + totaldiscountAmount + ' ₴'
                }
                </p></li>
            </ul>
            <div className='flex justify-between mb-8'> <p className='text-t12 xl:text-t18'>{data.order.totalAmountToBePaid}</p>    <p className='text-t16 xl:text-t18'>
                {lang === en
                    ? allTotalEn
                    + ' €'
                    : allTotal + ' ₴'
                }
            </p></div>
            {personActive && (
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="isDiscountsAndNews"
                        checked={isDiscountsAndNews}
                        onChange={(e) => setIsDiscountsAndNews(e.target.checked)}
                        className=" h-5 w-5 accent-black"
                    />

                    <label htmlFor="isDiscountsAndNews" className="ml-2 text-t12 xl:text-t16 text-[
#292D2D] italic">{data.order.wantToReceive}</label>

                </div>
            )}
            {paymentActive && (
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="privacypolicy"
                        checked={privacypolicy}
                        onChange={(e) => setPrivacypolicy(e.target.checked)}
                        className="h-5 w-5  accent-black"
                    />

                    <label htmlFor="privacypolicy" className="ml-2 text-t12 xl:text-t16 text-[
#292D2D] italic">Підтверджуючи замовлення, я даю згоду на обробку своїх персональних даних відповідно до <Link className="underline italic" href={`/${lang}/privacy-policy`}>умов користувача</Link>  на законних підставах*</label>

                </div>
            )}
            {personActive && (
                <button onClick={saveAndProceed} className="relative xl:top-5 smOnly:w-full mdOnly:w-full text-t18 py-[12px] px-6 bg-black text-white rounded">{data.order.next}</button>

            )}
            {deliveryActive && (

                <button className="relative xl:top-20 top-12  text-t12 smOnly:w-full mdOnly:w-full xl:text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToDeliveryTab}>{data.order.confirmTheOrder}</button>
            )}
            {paymentActive && (

                <button className=" relative top-[-15px] xl:top-0 text-t12  mdOnly:top-[-17px]  smOnly:w-full mdOnly:w-full xl:text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToPaymentTab}>{data.order.order}</button>
            )}
        </div>


    );
};

export default YourOrder;
