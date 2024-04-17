
interface PersonalInfoProps {
    data: any
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
    errors: any,
    setErrors: any,
}

const Personalinfo: React.FC<PersonalInfoProps> =
    ({
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
        errors,
        setErrors
    }) => {




        const validateField = (fieldName: string, value: string) => {
            const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
            const phoneRegex = /^(\+?3?8)?(0\d{9})$/;
            const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

            switch (fieldName) {
                case 'firstName':
                    if (!value) {
                        return 'Введіть ім\'я';
                    } else if (!nameRegex.test(value)) {
                        return 'Ім\'я не повинно містити цифр';
                    }
                    break;
                case 'lastName':
                    if (!value) {
                        return 'Введіть прізвище';
                    } else if (!nameRegex.test(value)) {
                        return 'Прізвище не повинно містити цифр';
                    }
                    break;
                case 'email':
                    if (!value) {
                        return 'Введіть електронну пошту';
                    } else if (!emailRegex.test(value)) {
                        return 'Введіть коректну електронну пошту';
                    }
                    break;
                case 'phoneNumber':
                    if (!value) {
                        return 'Введіть номер телефону';
                    } else if (!phoneRegex.test(value)) {
                        return 'Введіть коректний номер телефону';
                    }
                    break;
                case 'recipientEmail':
                    if (!value) {
                        return 'Введіть електронну пошту отримувача';
                    } else if (!emailRegex.test(value)) {
                        return 'Введіть коректну електронну пошту отримувача';
                    }
                    break;
                case 'recipientPhoneNumber':
                    if (!value) {
                        return 'Введіть номер телефону отримувача';
                    } else if (!phoneRegex.test(value)) {
                        return 'Введіть коректний номер телефону отримувача';
                    }
                    break;
                case 'recipientFirstName':
                    if (!value) {
                        return 'Введіть ім\'я отримувача';
                    } else if (!nameRegex.test(value)) {
                        return 'Ім\'я отримувача не повинно містити цифр';
                    }
                    break;
                case 'recipientLastName':
                    if (!value) {
                        return 'Введіть прізвище отримувача';
                    } else if (!nameRegex.test(value)) {
                        return 'Прізвище отримувача не повинно містити цифр';
                    }
                    break;
                default:
                    break;
            }

            return '';
        };

        const handleInputChange = (fieldName: string, value: string) => {
            const error = validateField(fieldName, value);
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                [fieldName]: error,
            }));
            switch (fieldName) {
                case 'firstName':
                    setFirstName(value);
                    break;
                case 'lastName':
                    setLastName(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'phoneNumber':
                    setPhoneNumber(value);
                    break;
                case 'recipientEmail':
                    setRecipientEmail(value);
                    break;
                case 'recipientPhoneNumber':
                    setRecipientPhoneNumber(value);
                    break;
                case 'recipientFirstName':
                    setRecipientFirstName(value);
                    break;
                case 'recipientLastName':
                    setRecipientLastName(value);
                    break;
                default:
                    break;
            }
        };

        return (
            <>
                <div className='mb-14'>
                    <h2 className='text-t18 text-[#292D2D] mb-6'>{data.order.enter_your_details}</h2>
                    <div className='grid grid-cols-2'>
                        <div className="flex flex-col mb-4 mr-8">
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className={`text-t14 py-[10px] px-[10px] border-b-2 focus:border-black outline-none ${errors.firstName ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder={data.order.yourName}
                            />

                        </div>
                        <div className="flex flex-col mb-4">
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className={` text-t14  py-[10px] px-[10px] border-b-2 focus:border-black outline-none ${errors.lastName ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder={data.order.lastName}
                            />

                        </div>

                        <div className="flex flex-col  mr-8 ">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={`text-t14 py-[10px] px-[10px] border-b-2 focus:border-black outline-none input-email ${errors.email ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder={data.order.eMail}

                            />


                        </div>
                        <div className="flex flex-col">
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                className={`text-t14 py-[10px] px-[10px] border-b-2 focus:border-black outline-none input-phone ${errors.phoneNumber ? ' bg-[#C61004]/[.06]' : ''}`}
                                placeholder={data.order.phoneNumber}
                            />

                        </div>

                    </div>
                </div>
                <div>
                    <h2 className='text-t18 text-[#292D2D] mb-6'>{data.order.recipient_data}</h2>
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            id="recipientCheckbox"
                            checked={isRecipient}
                            onChange={(e) => setIsRecipient(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-500"
                        />
                        <label htmlFor="recipientCheckbox" className="ml-2 text-t16 text-[#292D2D] italic">{data.order.receiver}</label>
                    </div>
                    {isRecipient ? null : (
                        <div className='grid grid-cols-2'>
                            <div className="flex flex-col mb-4 mr-8">
                                <input
                                    type="text"
                                    id="firstName"
                                    value={recipientFirstName}
                                    onChange={(e) => {
                                        setRecipientFirstName(e.target.value);
                                        handleInputChange('recipientFirstName', e.target.value);
                                    }}
                                    className={`text-t14 py-[10px] px-[10px] border-b-2 focus:border-black outline-none ${errors.recipientFirstName ? ' bg-[#C61004]/[.06]' : ''}`}
                                    placeholder={data.order.yourName}
                                />

                            </div>
                            <div className="flex flex-col mb-4">
                                <input
                                    type="text"
                                    id="lastName"
                                    value={recipientLastName}
                                    onChange={(e) => {
                                        setRecipientLastName(e.target.value);
                                        handleInputChange('recipientLastName', e.target.value);
                                    }}
                                    className={` text-t14  py-[10px] px-[10px] border-b-2 focus:border-black outline-none ${errors.recipientLastName ? ' bg-[#C61004]/[.06]' : ''}`}
                                    placeholder={data.order.lastName}
                                />

                            </div>
                            <div className="flex flex-col  mr-8">
                                <input
                                    type="email"
                                    id="email"
                                    value={recipientEmail}
                                    onChange={(e) => {
                                        setRecipientEmail(e.target.value);
                                        handleInputChange('recipientEmail', e.target.value);
                                    }}
                                    className={`text-t14 py-[10px] px-[10px] border-b-2 focus:border-black outline-none input-email ${errors.recipientEmail ? ' bg-[#C61004]/[.06]' : ''}`}
                                    placeholder={data.order.eMail}
                                />

                            </div>
                            <div className="flex flex-col">
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={recipientPhoneNumber}
                                    onChange={(e) => {
                                        setRecipientPhoneNumber(e.target.value);
                                        handleInputChange('recipientPhoneNumber', e.target.value);
                                    }}
                                    className=
                                    {`text-t14 py-[10px] px-[10px] border-b-2 text-black focus:border-black  outline-none input-phone ${errors.recipientPhoneNumber ? ' bg-[#C61004]/[.06]' : ''}`}
                                    placeholder={data.order.phoneNumber}
                                />

                            </div>
                        </div>
                    )}

                </div>

            </>
        )
    }

export default Personalinfo