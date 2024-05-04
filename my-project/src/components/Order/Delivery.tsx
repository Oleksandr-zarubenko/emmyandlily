import Image from "next/image";
interface DeliveryProps {
  data: any;
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
  lang: any;
  en: any;
}

const Delivery: React.FC<DeliveryProps> =
  ({
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
    lang,
    setError,
    en
  }) => {
    const validateField = (fieldName: string, value: string) => {
      const nameRegex = /^[\p{L}\s]+$/u;
      const phoneRegex = /^[0-9]*$/;

      const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

      switch (fieldName) {
        case "country":
        case "city":
        case "street":
        case "sstreet":
          if (!value) {
            return `Введіть ${fieldName === "sstreet" ? "назву додаткової " : ""}${fieldName}`;
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
        case "zip":
          if (!value) {
            return "Введіть ZIP-код";
          } else if (!zipRegex.test(value)) {
            return "Введіть коректний ZIP-код";
          }
          break;
        // case 'house':
        case "appartment":
        case "numnp":
        case "numposhtmat":
        case "index":
          if (!value) {
            return "Це поле є обов'язковим";
          } else if (!phoneRegex.test(value)) {
            return "Це поле не повинно містити букв";
          }
          break;
      }

      return "";
    };

    const handleInputChange = (fieldName: string, value: string) => {
      const error = validateField(fieldName, value);

      setError((prevErrors: any) => ({
        ...prevErrors,
        [fieldName]: error,
      }));
      switch (fieldName) {
        case "country":
          setCountry(value);
          break;
        case "city":
          setCity(value);
          break;
        case "street":
          setStreet(value);
          break;
        case "houseNumber":
          setHouseNumber(value);
          break;
        case "sstreet":
          setSstreet(value);
          break;
        case "zip":
          setZip(value);
          break;
        case "house":
          setHouse(value);
          break;
        case "appartment":
          setAppartment(value);
          break;
        case "numnp":
          setNumnp(value);
          break;
        case "numposhtmat":
          setNumposhtmat(value);
          break;
        case "index":
          setIndex(value);
          break;
        default:
          break;
      }
    };

    return (
      <div>
        <h2 className="mb-2 text-t14 italic text-[#292D2D]">
          {data.order.selectCountryAndCity}
        </h2>
        <div className="mb-8"></div>
        <div className="mb-6">
          <h3 className="text-t18">{data.order.delivery_method}</h3>
          <div className="mb-6 xl:flex ">
            <div className="mb-2 xl:mb-0 xl:mr-1 w-full xl:w-[230px]">
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className={`w-full border-b-2 px-[15px]  py-[10px] text-t14 outline-none focus:border-black  ${error.country ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                placeholder={lang === en ? "Country" : "Країна"}
              />
            </div>

            <div className=" w-full xl:w-[230px]">
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.city ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                placeholder={lang === en ? "City" : "Місто"}
              />
            </div>
          </div>
          {lang !== 'en' && (
            <p className="mb-2 text-t14 text-[#C61004]">{data.order.freeDel}</p>
          )}


          {selectedOption === "dhl" || selectedOption === "ups" || selectedOption === "novaposhta-smovuviz-euro" ? (
            <span className="text-t14 italic">{data.order.deliveryTime2}</span>
          ) : (
            <span className="text-t14 italic">{data.order.deliveryTime}</span>
          )}
        </div>
        <div className="mb-6 text-t14">
          {data.delivery.deliveryMethod.map((method: any) => (
            <div key={method.idD} className="py-3 ">


              <div className="flex items-center ">
                <input
                  type="radio"
                  value={method.idD}
                  checked={selectedOption === method.idD}
                  onChange={handleOptionChange}
                  className="mr-4 accent-black"
                />

                {/* <div className={`relative mr-2 h-[33px] w-full max-w-[140px] overflow-hidden`}>
                  <Image
                    fill
                    src={method.img.url}
                    alt={method.img.alt || "Emmy and Lili"}
                    className="product object-cover"
                    sizes="(max-width: 768px) 90vw, 305px"
                  />
                </div> */}
                <p> {method.name} - {method.description}</p>

              </div>

            </div>
          ))}
        </div>
        {/* <div className="mb-6">
                <span className="text-t18 text-red-500 ">{data.order.noDelivery}</span>
            </div> */}

        {selectedOption === "dhl" || selectedOption === "ups" ? (
          <div>
            <p className="mb-2 text-t14 italic text-[#292D2D]">
              {data.order.fillInTheDetails}
            </p>
            <div className="grid grid-cols-1  xl:grid-cols-2 gap-4">
              <div className="xl:w-[250px]">
                <input
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) => handleInputChange("zip", e.target.value)}
                  className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.zip ? " bg-[#C61004]/[.06]" : ""}`}
                  placeholder="Zip-CODE"
                />
              </div>
              <div className="xl:w-[250px]">
                <input
                  type="text"
                  id="sstreet"
                  value={sstreet}
                  onChange={(e) => handleInputChange("sstreet", e.target.value)}
                  className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.sstreet ? " bg-[#C61004]/[.06]" : ""}`}
                  placeholder="Street"
                />
              </div>
              <div className="xl:w-[250px]">
                <input
                  type="text"
                  id="house"
                  value={house}
                  onChange={(e) => handleInputChange("house", e.target.value)}
                  className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.house ? " bg-[#C61004]/[.06]" : ""}`}
                  placeholder="House"
                />
              </div>
              <div className="xl:w-[250px]">
                <input
                  type="text"
                  id="appartment"
                  value={appartment}
                  onChange={(e) =>
                    handleInputChange("appartment", e.target.value)
                  }
                  className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.appartment ? " bg-[#C61004]/[.06]" : ""}`}
                  placeholder="Appartment"
                />
              </div>
            </div>
          </div>
        ) : selectedOption === "np-courier" ? (
          <div>
            <div>
              <p className="mb-4 text-t14 italic text-[#292D2D]">
                {data.order.fillInTheDetails}
              </p>
              <div className="xl:flex justify-between">
                <div className="xl:w-[230px] mb-2 xl:mb-0">
                  <input
                    type="text"
                    id="street"
                    value={street}
                    onChange={(e) => handleInputChange("street", e.target.value)}
                    className={`w-full border-b-2 px-[15px]  py-[10px] text-t14 outline-none focus:border-black  ${error.street ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                    placeholder="Введіть вулицю"
                  />
                </div>

                <div className=" xl:w-[230px]">
                  <input
                    type="text"
                    id="houseNumber"
                    value={houseNumber}
                    onChange={(e) =>
                      handleInputChange("houseNumber", e.target.value)
                    }
                    className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.houseNumber ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                    placeholder="Введіть номер будинку"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : selectedOption === "novaposhta-smovuviz" ? (
          <div>
            <p className="mb-4 text-t14 italic text-[#292D2D]">
              {data.order.fillInTheDetails}
            </p>
            <div className="mr-1 xl:w-[230px]">
              <input
                type="text"
                id="numnp"
                value={numnp}
                onChange={(e) => handleInputChange("numnp", e.target.value)}
                className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.numnp ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                placeholder="Номер відділення"
              />
            </div>
          </div>
        ) : selectedOption === "np-poshtmat" ? (
          <div>
            <p className="mb-4 text-t14 italic text-[#292D2D]">
              {data.order.fillInTheDetails}
            </p>
            <div className="mr-1 xl:w-[230px]">
              <input
                type="text"
                id="numposhtmat"
                value={numposhtmat}
                onChange={(e) => handleInputChange("numposhtmat", e.target.value)}
                className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.numposhtmat ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                placeholder="Номер Поштомату"
              />
            </div>
          </div>
        ) : selectedOption === "ukrposhta" ? (
          <div>
            <p className="mb-4 text-t14 italic text-[#292D2D]">
              {data.order.fillInTheDetails}
            </p>
            <div className="mr-1 xl:w-[230px]">
              <input
                type="text"
                id="index"
                value={index}
                onChange={(e) => handleInputChange("index", e.target.value)}
                className={`w-full border-b-2  px-[15px] py-[10px] text-t14 outline-none focus:border-black ${error.index ? " bg-[#C61004]/[.06]" : "bg-white"}`}
                placeholder="Індекс укрпошти"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4 text-t14 italic text-[#292D2D]">
            {lang === en ? "Specify the delivery method" : "  Вкажіть спосіб доставки"}
          </div>
        )}
      </div>
    );
  };

export default Delivery;
