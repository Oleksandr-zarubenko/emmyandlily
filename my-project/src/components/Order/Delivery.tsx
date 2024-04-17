
interface DeliveryProps {
    data: any,
    selectedOption: string;
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    street: string;
    setStreet: React.Dispatch<React.SetStateAction<string>>;
    houseNumber: string;
    setHouseNumber: React.Dispatch<React.SetStateAction<string>>;
    sstreet: string; // Я припускаю, що це означає "secondary street". Якщо ні, будь ласка, виправте мене.
    setSstreet: React.Dispatch<React.SetStateAction<string>>;
    zip: string;
    setZip: React.Dispatch<React.SetStateAction<string>>;
    house: string;
    setHouse: React.Dispatch<React.SetStateAction<string>>;
    appartment: string;
    setAppartment: React.Dispatch<React.SetStateAction<string>>;
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    numnp: string;
    setNumnp: React.Dispatch<React.SetStateAction<string>>;
    numposhtmat: string;
    setNumposhtmat: React.Dispatch<React.SetStateAction<string>>;
    index: string;
    setIndex: React.Dispatch<React.SetStateAction<string>>;
}

const Delivery: React.FC<DeliveryProps> = ({
    data,
    selectedOption,
    handleOptionChange,
    street,
    setStreet,
    houseNumber,
    setHouseNumber,
    sstreet,
    setSstreet,
    zip,
    setZip,
    house,
    setHouse,
    appartment,
    setAppartment,
    country,
    setCountry,
    city,
    setCity,
    numnp,
    setNumnp,
    numposhtmat,
    setNumposhtmat,
    index,
    setIndex
}) => {
    return (
        <div>
            <h2 className="text-t14 text-[#292D2D] italic mb-2">{data.order.selectCountryAndCity}</h2>
            <div className="mb-8">

            </div>
            <div className="mb-6">
                <h3 className="text-t18 mb-6">
                    {data.order.delivery_method}
                </h3>
                <div className="flex mb-6 ">
                    <div className="w-[230px] mr-1">

                        <input
                            type="text"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none"
                            placeholder="Країна"
                        />
                    </div>
                    <div className="w-[230px]">

                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                            placeholder="Міcто"
                        />
                    </div>
                </div>
                <p className="mb-2 text-t14 text-[#C61004]">   {data.order.freeDel}</p>
                {selectedOption === 'dhl' || selectedOption === 'ups' ? (
                    <span className="text-t14 italic">{data.order.deliveryTime2}</span>
                ) : (
                    <span className="text-t14 italic">{data.order.deliveryTime}</span>
                )}
            </div>
            <div className="text-t14 mb-6">
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="np-courier"
                            checked={selectedOption === 'np-courier'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        Нова пошта (Курьєр) - При замовленні до 1000 грн вартість доставки 40 ₴
                    </label>
                </div>
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="novaposhta"
                            checked={selectedOption === 'novaposhta'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        Нова пошта (Самовивіз) - При замовленні до 1000 грн вартість доставки 40 ₴
                    </label>
                </div>
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="np-poshtmat"
                            checked={selectedOption === 'np-poshtmat'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        Нова пошта ( Поштомат) - При замовленні до 1000 грн вартість доставки 40 ₴
                    </label>
                </div>
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="ukr"
                            checked={selectedOption === 'ukr'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        Укрпошта ( Самовивіз) - При замовленні до 1000 грн вартість доставки 30 ₴
                    </label>
                </div>
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="dhl"
                            checked={selectedOption === 'dhl'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        DHL (сума доставки залежить від вашої країни та міста)

                    </label>
                </div>
                <div className="py-3">
                    <label>
                        <input
                            type="radio"
                            value="ups"
                            checked={selectedOption === 'ups'}
                            onChange={handleOptionChange}
                            className="mr-4"
                        />
                        UPS (сума доставки залежить від вашої країни та міста)
                    </label>
                </div>
            </div>
            {/* <div className="mb-6">
                <span className="text-t18 text-red-500 ">{data.order.noDelivery}</span>
            </div> */}


            {selectedOption === 'dhl' || selectedOption === 'ups' ? (
                <div>
                    <p className="text-t14 text-[#292D2D] italic mb-2">{data.order.fillInTheDetails}</p>
                    <div className="grid  grid-cols-2 gap-4">
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="street"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                                placeholder="Zip-CODE"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="houseNumber"
                                value={sstreet}
                                onChange={(e) => setSstreet(e.target.value)}
                                className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                                placeholder="Street"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="houseNumber"
                                value={house}
                                onChange={(e) => setHouse(e.target.value)}
                                className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                                placeholder="House"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="houseNumber"
                                value={appartment}
                                onChange={(e) => setAppartment(e.target.value)}
                                className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                                placeholder="Appartment"
                            />
                        </div>
                    </div>
                </div>
            ) : selectedOption === 'np-courier' ? (
                <div>
                    <div>
                        <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                        <div className="flex justify-between">
                            <div className="w-[230px]">

                                <input
                                    type="text"
                                    id="street"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    className="text-t14 py-[10px] w-full border-b-2 focus:border-black outline-none"
                                    placeholder="Введіть вулицю"
                                />
                            </div>
                            <div className="w-[230px]">

                                <input
                                    type="text"
                                    id="houseNumber"
                                    value={houseNumber}
                                    onChange={(e) => setHouseNumber(e.target.value)}
                                    className="text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none"
                                    placeholder="Введіть номер будинку"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : selectedOption === 'novaposhta' ? (
                <div>
                    <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                    <div className="w-[230px] mr-1">

                        <input
                            type="text"
                            id="numnp"
                            value={numnp}
                            onChange={(e) => setNumnp(e.target.value)}
                            className="text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none"
                            placeholder="Номер відділення"
                        />
                    </div>

                </div>
            ) : selectedOption === 'np-poshtmat' ? (
                <div>
                    <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                    <div className="w-[230px] mr-1">

                        <input
                            type="text"
                            id="numposhtmat"
                            value={numposhtmat}
                            onChange={(e) => setNumposhtmat(e.target.value)}
                            className="text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none"
                            placeholder="Номер Поштомату"
                        />
                    </div>

                </div>
            ) : selectedOption === 'ukr' ? (
                <div>
                    <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                    <div className="w-[230px] mr-1">

                        <input
                            type="text"
                            id="index"
                            value={index}
                            onChange={(e) => setIndex(e.target.value)}
                            className="text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none"
                            placeholder="Індекс укрпошти"
                        />
                    </div>

                </div>
            )
                : (

                    <div className="text-t14 text-[#292D2D] italic mb-4">Вкажіть спосіб доставки</div>

                )}

        </div>
    )
}

export default Delivery