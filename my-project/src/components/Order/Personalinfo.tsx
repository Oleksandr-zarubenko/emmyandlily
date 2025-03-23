import React, { useEffect, useState } from "react";

interface ErrorState {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  recipientFirstName?: string;
  recipientLastName?: string;
  recipientEmail?: string;
  recipientPhoneNumber?: string;
}

interface PersonalInfoProps {
  data: any;
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  isRecipient: boolean;
  setIsRecipient: React.Dispatch<React.SetStateAction<boolean>>;
  recipientEmail: string;
  setRecipientEmail: React.Dispatch<React.SetStateAction<string>>;
  recipientPhoneNumber: string;
  setRecipientPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  recipientFirstName: string;
  setRecipientFirstName: React.Dispatch<React.SetStateAction<string>>;
  recipientLastName: string;
  setRecipientLastName: React.Dispatch<React.SetStateAction<string>>;
  error: ErrorState;
  setError: React.Dispatch<React.SetStateAction<ErrorState>> | any;
}

const FIELD_NAMES = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  PHONE_NUMBER: "phoneNumber",
  RECIPIENT_FIRST_NAME: "recipientFirstName",
  RECIPIENT_LAST_NAME: "recipientLastName",
  RECIPIENT_EMAIL: "recipientEmail",
  RECIPIENT_PHONE_NUMBER: "recipientPhoneNumber",
};

const Personalinfo: React.FC<PersonalInfoProps> = ({
  data,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  isRecipient,
  setIsRecipient,
  recipientEmail,
  setRecipientEmail,
  recipientPhoneNumber,
  setRecipientPhoneNumber,
  recipientFirstName,
  setRecipientFirstName,
  recipientLastName,
  setRecipientLastName,
  error,
  setError,
}) => {
  useEffect(() => {
    if (isRecipient) {
      setRecipientFirstName("");
      setRecipientLastName("");
      setRecipientEmail("");
      setRecipientPhoneNumber("");
      setError((prevErrors: any) => ({
        ...prevErrors,
        recipientFirstName: "",
        recipientLastName: "",
        recipientEmail: "",
        recipientPhoneNumber: "",
      }));
    }
  }, [isRecipient]);

  const validateName = (value: string, fieldName: string) => {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;
    if (!value) {
      return fieldName.includes("recipient")
        ? `Введіть ім'я отримувача`
        : `Введіть ${fieldName === FIELD_NAMES.FIRST_NAME ? "ім'я" : "прізвище"}`;
    } else if (!nameRegex.test(value)) {
      return fieldName.includes("recipient")
        ? `Ім'я отримувача не повинно містити цифр`
        : `${fieldName === FIELD_NAMES.FIRST_NAME ? "Ім'я" : "Прізвище"} не повинно містити цифр`;
    }
    return "";
  };

  // Validate email fields
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return "Введіть електронну пошту";
    } else if (!emailRegex.test(value)) {
      return "Введіть коректну електронну пошту";
    }
    return "";
  };

  const validatePhoneNumber = (value: string) => {
    const phoneValidators: { [key: string]: RegExp } = {
      UA: /^(\+?380\d{9})$/, // Формат для України: +380XXXXXXXXX
      AT: /^(\+?43\d{1,9})$/, // Австрія: +43XXXXXXXXX
      BE: /^(\+?32\d{1,9})$/, // Бельгія: +32XXXXXXXXX
      BG: /^(\+?359\d{1,9})$/, // Болгарія: +359XXXXXXXXX
      CY: /^(\+?357\d{1,9})$/, // Кіпр: +357XXXXXXXXX
      CZ: /^(\+?420\d{1,9})$/, // Чехія: +420XXXXXXXXX
      DE: /^(\+?49\d{1,9})$/, // Німеччина: +49XXXXXXXXX
      DK: /^(\+?45\d{1,9})$/, // Данія: +45XXXXXXXXX
      EE: /^(\+?372\d{1,9})$/, // Естонія: +372XXXXXXXXX
      ES: /^(\+?34\d{1,9})$/, // Іспанія: +34XXXXXXXXX
      FI: /^(\+?358\d{1,9})$/, // Фінляндія: +358XXXXXXXXX
      FR: /^(\+?33\d{1,9})$/, // Франція: +33XXXXXXXXX
      GR: /^(\+?30\d{1,9})$/, // Греція: +30XXXXXXXXX
      HR: /^(\+?385\d{1,9})$/, // Хорватія: +385XXXXXXXXX
      HU: /^(\+?36\d{1,9})$/, // Угорщина: +36XXXXXXXXX
      IE: /^(\+?353\d{1,9})$/, // Ірландія: +353XXXXXXXXX
      IT: /^(\+?39\d{1,9})$/, // Італія: +39XXXXXXXXX
      LT: /^(\+?370\d{1,9})$/, // Литва: +370XXXXXXXXX
      LU: /^(\+?352\d{1,9})$/, // Люксембург: +352XXXXXXXXX
      LV: /^(\+?371\d{1,9})$/, // Латвія: +371XXXXXXXXX
      MT: /^(\+?356\d{1,9})$/, // Мальта: +356XXXXXXXXX
      NL: /^(\+?31\d{1,9})$/, // Нідерланди: +31XXXXXXXXX
      PL: /^(\+?48\d{1,9})$/, // Польща: +48XXXXXXXXX
      PT: /^(\+?351\d{1,9})$/, // Португалія: +351XXXXXXXXX
      RO: /^(\+?40\d{1,9})$/, // Румунія: +40XXXXXXXXX
      SE: /^(\+?46\d{1,9})$/, // Швеція: +46XXXXXXXXX
      SI: /^(\+?386\d{1,9})$/, // Словенія: +386XXXXXXXXX
      SK: /^(\+?421\d{1,9})$/, // Словаччина: +421XXXXXXXXX
      US: /^(\+?1\d{10})$/, // Формат для США: +1XXXXXXXXXX
    };

    if (!value) {
      return "Введіть номер телефону";
    }

    let isValid = false;
    for (const countryCode of Object.keys(phoneValidators)) {
      const validator = phoneValidators[countryCode];
      if (validator.test(value)) {
        isValid = true;
        break;
      }
    }

    return isValid
      ? ""
      : "Введіть коректний номер телефону (наприклад, +380XXXXXXXXX або +1XXXXXXXXXX)";
  };

  const handleInputChange = (fieldName: string, value: string) => {
    let errorMessage = "";

    switch (fieldName) {
      case FIELD_NAMES.FIRST_NAME:
      case FIELD_NAMES.LAST_NAME:
      case FIELD_NAMES.RECIPIENT_FIRST_NAME:
      case FIELD_NAMES.RECIPIENT_LAST_NAME:
        errorMessage = validateName(value, fieldName);
        break;
      case FIELD_NAMES.EMAIL:
      case FIELD_NAMES.RECIPIENT_EMAIL:
        errorMessage = validateEmail(value);
        break;
      case FIELD_NAMES.PHONE_NUMBER:
      case FIELD_NAMES.RECIPIENT_PHONE_NUMBER:
        errorMessage = validatePhoneNumber(value);
        break;
      default:
        break;
    }

    setError((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));

    switch (fieldName) {
      case FIELD_NAMES.FIRST_NAME:
        setFirstName(value);
        break;
      case FIELD_NAMES.LAST_NAME:
        setLastName(value);
        break;
      case FIELD_NAMES.EMAIL:
        setEmail(value);
        break;
      case FIELD_NAMES.PHONE_NUMBER:
        setPhoneNumber(value);
        break;
      case FIELD_NAMES.RECIPIENT_FIRST_NAME:
        setRecipientFirstName(value);
        break;
      case FIELD_NAMES.RECIPIENT_LAST_NAME:
        setRecipientLastName(value);
        break;
      case FIELD_NAMES.RECIPIENT_EMAIL:
        setRecipientEmail(value);
        break;
      case FIELD_NAMES.RECIPIENT_PHONE_NUMBER:
        setRecipientPhoneNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="mb-14">
        <h2 className="mb-6 text-t16 font-bold text-[#292D2D] xl:text-t18">
          {data.order.enterYourDetails}
        </h2>
        <div className="xl:grid xl:grid-cols-2">
          {/* First Name */}
          <div className="mb-2 flex flex-col xl:mb-4 xl:mr-8">
            <input
              type="text"
              id={FIELD_NAMES.FIRST_NAME}
              value={firstName}
              onChange={(e) =>
                handleInputChange(FIELD_NAMES.FIRST_NAME, e.target.value)
              }
              className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.firstName ? " bg-error/[.06]" : ""}`}
              placeholder={data.order.yourName}
              aria-invalid={!!error.firstName}
              aria-describedby={error.firstName ? "firstName-error" : undefined}
            />
            {error.firstName && (
              <span id="firstName-error" className="text-t12 text-error">
                {error.firstName}
              </span>
            )}
          </div>

          <div className="mb-2 flex flex-col xl:mb-4">
            <input
              type="text"
              id={FIELD_NAMES.LAST_NAME}
              value={lastName}
              onChange={(e) =>
                handleInputChange(FIELD_NAMES.LAST_NAME, e.target.value)
              }
              className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.lastName ? " bg-error/[.06]" : ""}`}
              placeholder={data.order.lastName}
              aria-invalid={!!error.lastName}
              aria-describedby={error.lastName ? "lastName-error" : undefined}
            />
            {error.lastName && (
              <span id="lastName-error" className="text-t12 text-error">
                {error.lastName}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-2 flex flex-col xl:mb-0 xl:mr-8">
            <input
              type="email"
              id={FIELD_NAMES.EMAIL}
              value={email}
              onChange={(e) =>
                handleInputChange(FIELD_NAMES.EMAIL, e.target.value)
              }
              className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.email ? " bg-error/[.06]" : ""}`}
              placeholder={data.order.eMail}
              aria-invalid={!!error.email}
              aria-describedby={error.email ? "email-error" : undefined}
            />
            {error.email && (
              <span id="email-error" className="text-t12 text-error">
                {error.email}
              </span>
            )}
          </div>

          <div className="mb-2 flex flex-col xl:mb-0">
            <input
              type="tel"
              id={FIELD_NAMES.PHONE_NUMBER}
              value={phoneNumber}
              onChange={(e) =>
                handleInputChange(FIELD_NAMES.PHONE_NUMBER, e.target.value)
              }
              className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.phoneNumber ? " bg-error/[.06]" : ""}`}
              placeholder={data.order.phoneNumber}
              aria-invalid={!!error.phoneNumber}
              aria-describedby={
                error.phoneNumber ? "phoneNumber-error" : undefined
              }
            />
            {error.phoneNumber && (
              <span id="phoneNumber-error" className="text-t12 text-error">
                {error.phoneNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-6 text-t16 font-bold text-[#292D2D] xl:text-t18">
          {data.order.recipientData}
        </h2>
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="recipientCheckbox"
            checked={isRecipient}
            onChange={(e) => setIsRecipient(e.target.checked)}
            className="form-checkbox h-5 w-5 accent-black"
          />
          <label
            htmlFor="recipientCheckbox"
            className="ml-2 text-t14 italic text-[#292D2D] xl:text-t16"
          >
            {data.order.receiver}
          </label>
        </div>

        {!isRecipient && (
          <div className="xl:grid xl:grid-cols-2">
            <div className="mb-2 flex flex-col xl:mb-4 xl:mr-8">
              <input
                type="text"
                id={FIELD_NAMES.RECIPIENT_FIRST_NAME}
                value={recipientFirstName}
                onChange={(e) =>
                  handleInputChange(
                    FIELD_NAMES.RECIPIENT_FIRST_NAME,
                    e.target.value
                  )
                }
                className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientFirstName ? " bg-error/[.06]" : ""}`}
                placeholder={data.order.yourName}
                aria-invalid={!!error.recipientFirstName}
                aria-describedby={
                  error.recipientFirstName
                    ? "recipientFirstName-error"
                    : undefined
                }
              />
              {error.recipientFirstName && (
                <span
                  id="recipientFirstName-error"
                  className="text-t12 text-error"
                >
                  {error.recipientFirstName}
                </span>
              )}
            </div>

            <div className="mb-2 flex flex-col xl:mb-4">
              <input
                type="text"
                id={FIELD_NAMES.RECIPIENT_LAST_NAME}
                value={recipientLastName}
                onChange={(e) =>
                  handleInputChange(
                    FIELD_NAMES.RECIPIENT_LAST_NAME,
                    e.target.value
                  )
                }
                className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientLastName ? " bg-error/[.06]" : ""}`}
                placeholder={data.order.lastName}
                aria-invalid={!!error.recipientLastName}
                aria-describedby={
                  error.recipientLastName
                    ? "recipientLastName-error"
                    : undefined
                }
              />
              {error.recipientLastName && (
                <span
                  id="recipientLastName-error"
                  className="text-t12 text-error"
                >
                  {error.recipientLastName}
                </span>
              )}
            </div>

            <div className="mb-2 flex flex-col xl:mb-0 xl:mr-8">
              <input
                type="email"
                id={FIELD_NAMES.RECIPIENT_EMAIL}
                value={recipientEmail}
                onChange={(e) =>
                  handleInputChange(FIELD_NAMES.RECIPIENT_EMAIL, e.target.value)
                }
                className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientEmail ? " bg-error/[.06]" : ""}`}
                placeholder={data.order.eMail}
                aria-invalid={!!error.recipientEmail}
                aria-describedby={
                  error.recipientEmail ? "recipientEmail-error" : undefined
                }
              />
              {error.recipientEmail && (
                <span id="recipientEmail-error" className="text-t12 text-error">
                  {error.recipientEmail}
                </span>
              )}
            </div>

            <div className="mb-2 flex flex-col xl:mb-0">
              <input
                type="tel"
                id={FIELD_NAMES.RECIPIENT_PHONE_NUMBER}
                value={recipientPhoneNumber}
                onChange={(e) =>
                  handleInputChange(
                    FIELD_NAMES.RECIPIENT_PHONE_NUMBER,
                    e.target.value
                  )
                }
                className={`border-b-2 bg-transparent px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientPhoneNumber ? " bg-error/[.06]" : ""}`}
                placeholder={data.order.phoneNumber}
                aria-invalid={!!error.recipientPhoneNumber}
                aria-describedby={
                  error.recipientPhoneNumber
                    ? "recipientPhoneNumber-error"
                    : undefined
                }
              />
              {error.recipientPhoneNumber && (
                <span
                  id="recipientPhoneNumber-error"
                  className="text-t12 text-error"
                >
                  {error.recipientPhoneNumber}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personalinfo;
