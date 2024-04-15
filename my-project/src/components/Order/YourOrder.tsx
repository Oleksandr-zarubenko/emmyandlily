
type YourOrderProps = {
    data: any,
    setIsDiscountsAndNews: any
    isDiscountsAndNews: boolean;
    saveAndProceed: () => void;
    personActive: boolean;
    deliveryActive: boolean;
    paymentActive: boolean;
    switchToDeliveryTab: () => void;
};

const YourOrder: React.FC<YourOrderProps> = ({
    data,
    setIsDiscountsAndNews,
    isDiscountsAndNews,
    saveAndProceed,
    personActive,
    deliveryActive,
    paymentActive,
    switchToDeliveryTab
}) => {

    return (
        <div className='w-[357px] h-[405px] py-10 px-4 border-[1px] bg-white border-[#DCDCDC] drop-shadow-[4px_15px_40px_0px_#100E0C33] rounded'>
            <h3 className='text-t24 mb-8'>{data.order.yourOrder}</h3>
            <ul className='border-b-[1px] border-[#292D2D] mb-6'>
                <li className='mb-2 flex justify-between'><p className='text-t16'>{data.order.total}</p> <p className='text-t18'>800 ₴</p></li>
                <li className='mb-2 flex justify-between'><p className='text-t16'> {data.order.delivery}</p> <p className='text-t18'>0 ₴</p></li>
                <li className='mb-2 flex justify-between'><p className='text-t16'>{data.order.discount}</p> <p className='text-t18'>- 0 ₴</p></li>
            </ul>
            <div className='flex justify-between mb-8'> <p className='text-t18'>{data.order.totalAmountToBePaid}</p> <p className='text-t18'>800 ₴</p></div>
            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="discountsAndNewsCheckbox"
                    checked={isDiscountsAndNews}
                    onChange={(e) => setIsDiscountsAndNews(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-500"
                />
                <label htmlFor="discountsAndNewsCheckbox" className="ml-2 text-t16 text-[
#292D2D] italic">{data.order.wantToReceive}</label>

            </div>
            {personActive && (
                <button onClick={saveAndProceed} className="text-t18 py-[12px] px-6 bg-black text-white rounded ">{data.order.next}</button>

            )}
            {deliveryActive && (

                <button className="text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToDeliveryTab}>{data.order.confirmTheOrder}</button>
            )}
            {paymentActive && (

                <button className="text-t18 py-[12px] px-6 bg-black text-white rounded " onClick={switchToDeliveryTab}>{data.order.order}</button>
            )}
        </div>
    )
}

export default YourOrder