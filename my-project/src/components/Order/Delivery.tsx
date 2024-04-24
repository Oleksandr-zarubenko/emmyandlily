
interface DeliveryProps {
    data: any,
    selectedOption: string;
    handleOptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    street: string;
    setStreet: React.Dispatch<React.SetStateAction<string>>;
    houseNumber: string;
    setHouseNumber: React.Dispatch<React.SetStateAction<string>>;
    sstreet: string;
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
    error: any;
    setError: any;
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
    setIndex,
    error,
    setError
}) => {


    const validateField = (fieldName: string, value: string) => {
        const nameRegex = /^[\p{L}\s]+$/u;
        const phoneRegex = /^[0-9]*$/;


        const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

        switch (fieldName) {
            case 'country':
            case 'city':
            case 'street':
            case 'sstreet':
                if (!value) {
                    return `Введіть ${fieldName === 'sstreet' ? 'назву додаткової ' : ''}${fieldName}`;
                } else if (!nameRegex.test(value)) {
                    return `${fieldName} не повинно містити цифр`;
                }
                break;
            // case 'houseNumber':
            //     if (!value) {
            //         return 'Введіть номер будинку';
            //     } else if (!phoneRegex.test(value)) {
            //         return 'Номер будинку не повинен містити букв';
            //     }
            //     break;
            case 'zip':
                if (!value) {
                    return 'Введіть ZIP-код';
                } else if (!zipRegex.test(value)) {
                    return 'Введіть коректний ZIP-код';
                }
                break;
            // case 'house':
            case 'appartment':
            case 'numnp':
            case 'numposhtmat':
            case 'index':
                if (!value) {
                    return 'Це поле є обов\'язковим';
                } else if (!phoneRegex.test(value)) {
                    return 'Це поле не повинно містити букв';
                }
                break;
        }

        return '';
    };

    const handleInputChange = (fieldName: string, value: string) => {
        const error = validateField(fieldName, value);

        setError((prevErrors: any) => ({
            ...prevErrors,
            [fieldName]: error,
        }));
        switch (fieldName) {
            case 'country':
                setCountry(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'street':
                setStreet(value);
                break;
            case 'houseNumber':
                setHouseNumber(value);
                break;
            case 'sstreet':
                setSstreet(value);
                break;
            case 'zip':
                setZip(value);
                break;
            case 'house':
                setHouse(value);
                break;
            case 'appartment':
                setAppartment(value);
                break;
            case 'numnp':
                setNumnp(value);
                break;
            case 'numposhtmat':
                setNumposhtmat(value);
                break;
            case 'index':
                setIndex(value);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <h2 className="text-t14 text-[#292D2D] italic mb-2">{data.order.selectCountryAndCity}</h2>
            <div className="mb-8">

            </div>
            <div className="mb-6">
                <h3 className="text-t18">
                    {data.order.delivery_method}
                </h3>
                <div className="flex mb-6 ">
                    <div className="w-[230px] mr-1">

                        <input
                            type="text"
                            id="country"
                            value={country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className={`text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none  ${error.country ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
                            placeholder="Країна"
                        />
                    </div>

                    <div className="w-[230px]">

                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.city ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
                            placeholder="Міcто"
                        />
                    </div>
                </div>
                <p className="mb-2 text-t14 text-[#C61004]">{data.order.freeDel}</p>
                {selectedOption === 'dhl' || selectedOption === 'ups' ? (
                    <span className="text-t14 italic">{data.order.deliveryTime2}</span>
                ) : (
                    <span className="text-t14 italic">{data.order.deliveryTime}</span>
                )}
            </div>
            <div className="text-t14 mb-6">
                {data.delivery.deliveryMethod.map((method: any) => (
                    <div key={method.idD} className="py-3">
                        <label>
                            <input
                                type="radio"
                                value={method.idD}
                                checked={selectedOption === method.idD}
                                onChange={handleOptionChange}
                                className="mr-4"
                            />
                            {method.name} - {method.description}
                        </label>
                    </div>
                ))}

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
                                id="zip"
                                value={zip}
                                onChange={(e) => handleInputChange('zip', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.zip ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder="Zip-CODE"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="sstreet"
                                value={sstreet}
                                onChange={(e) => handleInputChange('sstreet', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.sstreet ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder="Street"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="house"
                                value={house}
                                onChange={(e) => handleInputChange('house', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.house ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder="House"
                            />
                        </div>
                        <div className="w-[250px]">

                            <input
                                type="text"
                                id="appartment"
                                value={appartment}
                                onChange={(e) => handleInputChange('appartment', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.appartment ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder="Appartment"
                            />
                        </div>
                    </div>
                </div>
            ) :
                selectedOption === 'np-courier' ? (
                    <div>
                        <div>
                            <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                            <div className="flex justify-between">
                                <div className="w-[230px]">

                                    <input
                                        type="text"
                                        id="street"
                                        value={street}
                                        onChange={(e) => handleInputChange('street', e.target.value)}

                                        className={`text-t14 py-[10px] px-[15px]  w-full border-b-2 focus:border-black outline-none  ${error.street ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
                                        placeholder="Введіть вулицю"
                                    />
                                </div>

                                <div className="w-[230px]">

                                    <input
                                        type="text"
                                        id="houseNumber"
                                        value={houseNumber}
                                        onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                                        className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.houseNumber ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
                                        placeholder="Введіть номер будинку"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : selectedOption === 'novaposhta-smovuviz' ? (
                    <div>
                        <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                        <div className="w-[230px] mr-1">

                            <input
                                type="text"
                                id="numnp"
                                value={numnp}
                                onChange={(e) => handleInputChange('numnp', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.numnp ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
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
                                onChange={(e) => handleInputChange('numposhtmat', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.numposhtmat ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
                                placeholder="Номер Поштомату"
                            />
                        </div>

                    </div>
                ) : selectedOption === 'ukrposhta' ? (
                    <div>
                        <p className="text-t14 text-[#292D2D] italic mb-4">{data.order.fillInTheDetails}</p>
                        <div className="w-[230px] mr-1">

                            <input
                                type="text"
                                id="index"
                                value={index}
                                onChange={(e) => handleInputChange('index', e.target.value)}
                                className={`text-t14 py-[10px]  px-[15px] w-full border-b-2 focus:border-black outline-none ${error.index ? ' bg-[#C61004]/[.06]' : 'bg-white'}`}
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