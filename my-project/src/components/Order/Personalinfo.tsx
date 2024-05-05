
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
  error: any;
  setError: any;
}

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

  const validateField = (fieldName: string, value: string) => {
    const nameRegex = /^[\p{L}\s]+$/u;


    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneValidators: { [key: string]: RegExp } = {
      'UA': /^(\+?380\d{9})$/, // Формат для України: +380XXXXXXXXX
      'AT': /^(\+?43\d{1,9})$/,      // Австрія: +43XXXXXXXXX
      'BE': /^(\+?32\d{1,9})$/,      // Бельгія: +32XXXXXXXXX
      'BG': /^(\+?359\d{1,9})$/,     // Болгарія: +359XXXXXXXXX
      'CY': /^(\+?357\d{1,9})$/,     // Кіпр: +357XXXXXXXXX
      'CZ': /^(\+?420\d{1,9})$/,     // Чехія: +420XXXXXXXXX
      'DE': /^(\+?49\d{1,9})$/,      // Німеччина: +49XXXXXXXXX
      'DK': /^(\+?45\d{1,9})$/,      // Данія: +45XXXXXXXXX
      'EE': /^(\+?372\d{1,9})$/,     // Естонія: +372XXXXXXXXX
      'ES': /^(\+?34\d{1,9})$/,      // Іспанія: +34XXXXXXXXX
      'FI': /^(\+?358\d{1,9})$/,     // Фінляндія: +358XXXXXXXXX
      'FR': /^(\+?33\d{1,9})$/,      // Франція: +33XXXXXXXXX
      'GR': /^(\+?30\d{1,9})$/,      // Греція: +30XXXXXXXXX
      'HR': /^(\+?385\d{1,9})$/,     // Хорватія: +385XXXXXXXXX
      'HU': /^(\+?36\d{1,9})$/,      // Угорщина: +36XXXXXXXXX
      'IE': /^(\+?353\d{1,9})$/,     // Ірландія: +353XXXXXXXXX
      'IT': /^(\+?39\d{1,9})$/,      // Італія: +39XXXXXXXXX
      'LT': /^(\+?370\d{1,9})$/,     // Литва: +370XXXXXXXXX
      'LU': /^(\+?352\d{1,9})$/,     // Люксембург: +352XXXXXXXXX
      'LV': /^(\+?371\d{1,9})$/,     // Латвія: +371XXXXXXXXX
      'MT': /^(\+?356\d{1,9})$/,     // Мальта: +356XXXXXXXXX
      'NL': /^(\+?31\d{1,9})$/,      // Нідерланди: +31XXXXXXXXX
      'PL': /^(\+?48\d{1,9})$/,      // Польща: +48XXXXXXXXX
      'PT': /^(\+?351\d{1,9})$/,     // Португалія: +351XXXXXXXXX
      'RO': /^(\+?40\d{1,9})$/,      // Румунія: +40XXXXXXXXX
      'SE': /^(\+?46\d{1,9})$/,      // Швеція: +46XXXXXXXXX
      'SI': /^(\+?386\d{1,9})$/,     // Словенія: +386XXXXXXXXX
      'SK': /^(\+?421\d{1,9})$/,     // Словаччина: +421XXXXXXXXX
      'US': /^(\+?1\d{10})$/   // Формат для США: +1XXXXXXXXXX
    };

    switch (fieldName) {
      case "firstName":
        if (!value) {
          return "Введіть ім'я";
        } else if (!nameRegex.test(value)) {
          return "Ім'я не повинно містити цифр";
        }
        break;
      case "lastName":
        if (!value) {
          return "Введіть прізвище";
        } else if (!nameRegex.test(value)) {
          return "Прізвище не повинно містити цифр";
        }
        break;
      case "email":
        if (!value) {
          return "Введіть електронну пошту";
        } else if (!emailRegex.test(value)) {
          return "Введіть коректну електронну пошту";
        }
        break;
      case "phoneNumber":
        if (!value) {
          return "Введіть номер телефону";
        } else {
          // Перевіряємо номер телефону за допомогою регулярного виразу для відповідної країни
          const countryCodes = ['UA', 'PL', 'IT', 'ES', 'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'US'];

          let isValid = false;
          for (const countryCode of countryCodes) {
            const phoneValidator = phoneValidators[countryCode];
            if (phoneValidator.test(value)) {
              isValid = true;
              break;
            }
          }
          if (!isValid) {
            return "Введіть коректний номер телефону отримувача";
          }
        }
        break;
      case "recipientEmail":
        if (!value) {
          return "Введіть електронну пошту отримувача";
        } else if (!emailRegex.test(value)) {
          return "Введіть коректну електронну пошту отримувача";
        }
        break;
      case "recipientPhoneNumber":
        if (!value) {
          return "Введіть номер телефону отримувача";
        } else {
          // Перевіряємо номер телефону отримувача за допомогою регулярного виразу для відповідної країни
          const countryCodes = ['UA', 'PL', 'IT', 'ES', 'AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'US'];

          let isValid = false;
          for (const countryCode of countryCodes) {
            const phoneValidator = phoneValidators[countryCode];
            if (phoneValidator.test(value)) {
              isValid = true;
              break;
            }
          }
          if (!isValid) {
            return "Введіть коректний номер телефону";
          }
        }
        break;

      case "recipientFirstName":
        if (!value) {
          return "Введіть ім'я отримувача";
        } else if (!nameRegex.test(value)) {
          return "Ім'я отримувача не повинно містити цифр";
        }
        break;
      case "recipientLastName":
        if (!value) {
          return "Введіть прізвище отримувача";
        } else if (!nameRegex.test(value)) {
          return "Прізвище отримувача не повинно містити цифр";
        }
        break;
      default:
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
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "recipientEmail":
        setRecipientEmail(value);
        break;
      case "recipientPhoneNumber":
        setRecipientPhoneNumber(value);
        break;
      case "recipientFirstName":
        setRecipientFirstName(value);
        break;
      case "recipientLastName":
        setRecipientLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="mb-14 ">
        <h2 className="mb-6 text-t16 xl:text-t18 font-bold text-[#292D2D]">
          {data.order.enterYourDetails}
        </h2>
        <div className="xl:grid xl:grid-cols-2">
          <div className="mb-2 xl:mb-4 xl:mr-8 flex flex-col">
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className={`border-b-2 px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.firstName ? " bg-[#C61004]/[.06]" : ""}`}
              placeholder={data.order.yourName}
            />
          </div>
          <div className="mb-2 xl:mb-4 flex flex-col">
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className={` border-b-2  px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.lastName ? " bg-[#C61004]/[.06]" : ""}`}
              placeholder={data.order.lastName}
            />
          </div>

          <div className="mb-2 xl:mb-0 xl:mr-8 flex  flex-col ">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`input-email border-b-2 px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.email ? " bg-[#C61004]/[.06]" : ""}`}
              placeholder={data.order.eMail}
            />
          </div>
          <div className="mb-2 xl:mb-0 flex flex-col">
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={`input-phone border-b-2 px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.phoneNumber ? " bg-[#C61004]/[.06]" : ""}`}
              placeholder={data.order.phoneNumber}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-6 text-t16 xl:text-t18 font-bold text-[#292D2D]">
          {data.order.
            recipientData
          }
        </h2>
        <div className="mb-6 flex items-center">

          <input
            type="checkbox"
            id="recipientCheckbox"
            checked={isRecipient}
            onChange={(e) => setIsRecipient(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <label
            htmlFor="recipientCheckbox"
            className="ml-2 text-t14 xl:text-t16 italic text-[#292D2D]"
          >
            {data.order.receiver}
          </label>
        </div>
        {isRecipient ? null : (
          <div className="xl:grid xl:grid-cols-2">
            <div className="mb-2  xl:mb-4 xl:mr-8 flex flex-col">
              <input
                type="text"
                id="recipientFirstName"
                value={recipientFirstName}
                onChange={(e) => {
                  setRecipientFirstName(e.target.value);
                  handleInputChange("recipientFirstName", e.target.value);
                }}
                className={`border-b-2 px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientFirstName ? " bg-[#C61004]/[.06]" : ""}`}
                placeholder={data.order.yourName}
              />
            </div>
            <div className="mb-2  xl:mb-4 flex flex-col">
              <input
                type="text"
                id="recipientLastName"
                value={recipientLastName}
                onChange={(e) => {
                  setRecipientLastName(e.target.value);
                  handleInputChange("recipientLastName", e.target.value);
                }}
                className={` border-b-2  px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientLastName ? " bg-[#C61004]/[.06]" : ""}`}
                placeholder={data.order.lastName}
              />
            </div>
            <div className="mb-2 xl:mb-0 xl:mr-8 flex  flex-col">
              <input
                type="email"
                id="recipientEmail"
                value={recipientEmail}
                onChange={(e) => {
                  setRecipientEmail(e.target.value);
                  handleInputChange("recipientEmail", e.target.value);
                }}
                className={`input-email border-b-2 px-[10px] py-[10px] text-t14 outline-none focus:border-black ${error.recipientEmail ? " bg-[#C61004]/[.06]" : ""}`}
                placeholder={data.order.eMail}
              />
            </div>
            <div className="mb-2 xl:mb-0 flex flex-col">
              <input
                type="tel"
                id="recipientPhoneNumber"
                value={recipientPhoneNumber}
                onChange={(e) => {
                  setRecipientPhoneNumber(e.target.value);
                  handleInputChange("recipientPhoneNumber", e.target.value);
                }}
                className={`input-phone border-b-2 px-[10px] py-[10px] text-t14 text-black  outline-none focus:border-black ${error.recipientPhoneNumber ? " bg-[#C61004]/[.06]" : ""}`}
                placeholder={data.order.phoneNumber}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personalinfo;
