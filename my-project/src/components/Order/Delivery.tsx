import { Locale } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

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
  setError: React.Dispatch<React.SetStateAction<any>>;
  lang: Locale;
  en: string;
}

interface ErrorState {
  country?: string;
  city?: string;
  street?: string;
  houseNumber?: string;
  sstreet?: string;
  zip?: string;
  house?: string;
  appartment?: string;
  numnp?: string;
  numposhtmat?: string;
  index?: string;
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
  setError,
  lang,
  en,
}) => {
  const validateField = (fieldName: string, value: string) => {
    const nameRegex = /^[\p{L}\s'-]+$/u;
    const alphanumericRegex = /^[\p{L}0-9\s\-]*$/u; // Allows letters, numbers, spaces, and hyphens
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

    const fieldNamesInUkrainian: { [key: string]: string } = {
      country: "країну",
      city: "місто",
      street: "вулицю",
      sstreet: "назву додаткової вулиці",
      houseNumber: "номер будинку",
      house: "будинок",
      appartment: "квартиру",
      numnp: "номер відділення",
      numposhtmat: "номер поштомату",
      index: "індекс",
      zip: "ZIP-код",
    };

    switch (fieldName) {
      case "country":
      case "city":
      case "street":
      case "sstreet":
        if (!value) {
          return `Введіть ${fieldNamesInUkrainian[fieldName]}`;
        } else if (!nameRegex.test(value)) {
          return `${fieldNamesInUkrainian[fieldName]} не повинно містити цифр`;
        }
        break;
      case "houseNumber":
      case "house":
      case "appartment":
      case "numnp":
      case "numposhtmat":
      case "index":
        if (!value) {
          return `Введіть ${fieldNamesInUkrainian[fieldName]}`;
        } else if (!alphanumericRegex.test(value)) {
          return `${fieldNamesInUkrainian[fieldName]} повинен містити лише літери та цифри`;
        }
        break;
      case "zip":
        if (!value) {
          return `Введіть ${fieldNamesInUkrainian[fieldName]}`;
        } else if (!zipRegex.test(value)) {
          return "Введіть коректний ZIP-код (наприклад, 12345 або 12345-6789)";
        }
        break;
      default:
        break;
    }

    return "";
  };

  const handleInputChange = (fieldName: string, value: string) => {
    const errorMessage = validateField(fieldName, value);

    setError((prevErrors: ErrorState) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
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

  const renderInputField = (
    fieldName: string,
    value: string,
    placeholder: string,
    className?: string,
    required: boolean = false
  ) => {
    return (
      <div className="mb-2 flex flex-col">
        <input
          type="text"
          id={fieldName}
          value={value}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          className={`w-full border-b-2 bg-transparent px-[15px] py-[10px] text-t14 outline-none focus:border-black ${
            error[fieldName] ? "bg-[#C61004]/[.06]" : ""
          } ${className}`}
          placeholder={placeholder}
          aria-invalid={!!error[fieldName]}
          aria-describedby={error[fieldName] ? `${fieldName}-error` : undefined}
          required={required}
        />
        {error[fieldName] && (
          <span
            id={`${fieldName}-error`}
            className="mt-1 text-t12 text-[#C61004]"
          >
            {error[fieldName]}
          </span>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2 className="mb-2 text-t14 italic text-dark">
        {data.order.selectCountryAndCity}
      </h2>
      <div className="mb-8"></div>
      <div className="mb-6">
        <h3 className="text-t18">{data.order.delivery_method}</h3>
        <div className="mb-6 xl:flex">
          {renderInputField(
            "country",
            country,
            lang === "en" ? "Country" : "Країна",
            "xl:mr-1 xl:w-[230px]",
            true
          )}
          {renderInputField(
            "city",
            city,
            lang === "en" ? "City" : "Місто",
            "xl:w-[230px]",
            true
          )}
        </div>
        {lang !== "en" && (
          <p className="mb-2 text-t14 text-[#C61004]">{data.order.freeDel}</p>
        )}

        {selectedOption === "dhl" ||
        selectedOption === "ups" ||
        selectedOption === "novaposhta-smovuviz-euro" ? (
          <span className="text-t14 italic">{data.order.deliveryTime2}</span>
        ) : (
          <span className="text-t14 italic">{data.order.deliveryTime}</span>
        )}
      </div>

      <div className="mb-6 text-t14">
        {data.delivery.deliveryMethod.map((method: any) => (
          <div key={method.idD} className="py-3">
            <div className="flex items-center notXl:grid notXl:flex-row">
              <div className="xl:mr-4 xl:flex notXl:mb-2 notXl:flex">
                <input
                  type="radio"
                  value={method.idD}
                  checked={selectedOption === method.idD}
                  onChange={handleOptionChange}
                  className="mr-3 accent-black"
                />
                <Image
                  width={305}
                  height={33}
                  src={method.img.url}
                  alt={method.img.alt || "Emmy and Lily"}
                  className="product h-[33px] w-auto object-contain object-center"
                  sizes="(max-width: 768px) 90vw, 305px"
                />
              </div>
              <p>
                {method.name} - {method.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedOption === "dhl" || selectedOption === "ups" ? (
        <div>
          <p className="mb-2 text-t14 italic text-dark">
            {data.order.fillInTheDetails}
          </p>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {renderInputField("zip", zip, "ZIP-код", "xl:w-[250px]", true)}
            {renderInputField(
              "sstreet",
              sstreet,
              "Вулиця",
              "xl:w-[250px]",
              true
            )}
            {renderInputField("house", house, "Будинок", "xl:w-[250px]", true)}
            {renderInputField(
              "appartment",
              appartment,
              "Квартира",
              "xl:w-[250px]",
              true
            )}
          </div>
        </div>
      ) : selectedOption === "np-courier" ? (
        <div>
          <p className="mb-4 text-t14 italic text-dark">
            {data.order.fillInTheDetails}
          </p>
          <div className="justify-between xl:flex">
            {renderInputField(
              "street",
              street,
              "Введіть вулицю",
              "xl:w-[230px]",
              true
            )}
            {renderInputField(
              "houseNumber",
              houseNumber,
              "Введіть номер будинку",
              "xl:w-[230px]",
              true
            )}
          </div>
        </div>
      ) : selectedOption === "novaposhta-smovuviz" ? (
        <div>
          <p className="mb-4 text-t14 italic text-dark">
            {data.order.fillInTheDetails}
          </p>
          {renderInputField(
            "numnp",
            numnp,
            "Номер відділення",
            "xl:w-[230px]",
            true
          )}
        </div>
      ) : selectedOption === "np-poshtmat" ? (
        <div>
          <p className="mb-4 text-t14 italic text-dark">
            {data.order.fillInTheDetails}
          </p>
          {renderInputField(
            "numposhtmat",
            numposhtmat,
            "Номер Поштомату",
            "xl:w-[230px]",
            true
          )}
        </div>
      ) : selectedOption === "ukrposhta" ? (
        <div>
          <p className="mb-4 text-t14 italic text-dark">
            {data.order.fillInTheDetails}
          </p>
          {renderInputField(
            "index",
            index,
            "Індекс укрпошти",
            "xl:w-[230px]",
            true
          )}
        </div>
      ) : (
        <div className="mb-4 text-t14 italic text-dark">
          {lang === "en"
            ? "Specify the delivery method"
            : "Вкажіть спосіб доставки"}
        </div>
      )}
    </div>
  );
};

export default Delivery;
