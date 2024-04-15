"use client"
import { useState } from 'react';
import Personalinfo from '@/components/Order/Personalinfo';
import YourOrder from '@/components/Order/YourOrder';
import Delivery from '@/components/Order/Delivery';
const Order = ({ data }: any) => {
    console.log(data.order)
    const [personalDataCompleted, setPersonalDataCompleted] = useState(false);
    const [deliveryCompleted, setDeliveryCompleted] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [recipientFirstName, setRecipientFirstName] = useState('');
    const [recipientLastName, setRecipientLastName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState('');

    const [sstreet, setSstreet] = useState('');
    const [zip, setZip] = useState('');
    const [house, setHouse] = useState('');
    const [appartment, setAppartment] = useState('');



    const [isRecipient, setIsRecipient] = useState(false);
    const [isDiscountsAndNews, setIsDiscountsAndNews] = useState(false);

    const [deliveryActive, setDeliveryActive] = useState(false);
    const [paymentActive, setPaymentActive] = useState(false);
    const [personActive, setPersonActive] = useState(true);

    const [selectedOption, setSelectedOption] = useState('');


    const handleOptionChange = (e: any) => {
        setSelectedOption(e.target.value);
    };
    const isPersonalDataComplete = () => {
        if (isRecipient === false) {
            return (
                firstName !== '' &&
                lastName !== '' &&
                email !== '' &&
                phoneNumber !== '' &&
                recipientFirstName !== '' &&
                recipientLastName !== '' &&
                recipientEmail !== '' &&
                recipientPhoneNumber !== ''
            );
        } else {
            return firstName !== '' && lastName !== '' && email !== '' && phoneNumber !== '';
        }
    }


    const saveAndProceed = () => {
        if (isPersonalDataComplete()) {
            // Збереження даних
            setPersonActive(false)
            setDeliveryActive(true);
        } else {
            setDeliveryActive(false);
            alert('Будь ласка, заповніть всі поля');
        }
    };

    // Функції для перемикання між вкладками
    const switchToDeliveryTab = () => {
        // Перевірка, чи всі поля на вкладці Особисті дані заповнені
        if (selectedOption !== '') {
            // Перемикання на вкладку "Оплата"
            setPaymentActive(true);
            setPersonActive(false);
            setDeliveryActive(false);
        } else {
            // Повідомлення про необхідність вибору варіанта доставки
            alert('Будь ласка, виберіть варіант доставки');
        }
    };

    const switchToPaymentTab = () => {
        // Перевірка, чи всі поля на вкладці Доставка заповнені
        if (deliveryCompleted) {
            // Перехід на вкладку Оплата
            // Це може бути реалізовано, наприклад, зміною стану або використанням роутера
        } else {
            // Повідомлення користувача про те, що потрібно заповнити всі поля на поточній вкладці
            alert('Будь ласка, заповніть всі поля на вкладці Доставка');
        }
    };

    return (
        <section className='container py-40 flex justify-between paw'>
            <div>
                <h1 className='text-t32 tracking-wider mb-10'>
                    {data.order.heading}
                </h1>
                <div className='flex items-center mb-10'>
                    <p className={`mr-9 ${personActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`}>
                        {data.order.personalData}
                    </p>
                    <p className={`mr-9 ${deliveryActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`}>
                        {data.order.delivery}
                    </p>
                    <p className={`mr-9 ${paymentActive ? 'text-black border-b-2 border-black text-t24' : 'text-[#333333] opacity-60 text-t18'}`} >
                        {data.order.payment}
                    </p>
                </div>

                <div className='w-[550px]'>
                    {personActive && (
                        <Personalinfo
                            data={data}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}

                            recipientEmail={recipientEmail}
                            setRecipientEmail={setRecipientEmail}
                            recipientPhoneNumber={recipientPhoneNumber}
                            setRecipientPhoneNumber={setRecipientPhoneNumber}
                            recipientFirstName={recipientFirstName}
                            setRecipientFirstName={setRecipientFirstName}
                            recipientLastName={recipientLastName}
                            setRecipientLastName={setRecipientLastName}

                            email={email}
                            setEmail={setEmail}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            isRecipient={isRecipient}
                            setIsRecipient={setIsRecipient}
                        />
                        // <Delivery selectedOption={selectedOption} handleOptionChange={handleOptionChange} street={street} setStreet={setStreet} houseNumber={houseNumber}
                        //     setHouseNumber={setHouseNumber} sstreet={sstreet}
                        //     setSstreet={setSstreet}
                        //     zip={zip}
                        //     setZip={setZip}
                        //     house={house}
                        //     setHouse={setHouse}
                        //     appartment={appartment}
                        //     setAppartment={setAppartment} />
                    )}


                    {deliveryActive && (
                        <Delivery
                            data={data}
                            selectedOption={selectedOption} handleOptionChange={handleOptionChange} street={street} setStreet={setStreet} houseNumber={houseNumber}
                            setHouseNumber={setHouseNumber} sstreet={sstreet}
                            setSstreet={setSstreet}
                            zip={zip}
                            setZip={setZip}
                            house={house}
                            setHouse={setHouse}
                            appartment={appartment}
                            setAppartment={setAppartment} />

                    )}

                    {/* Вкладка "Оплата" */}
                    {paymentActive && (
                        <div>
                            <button onClick={switchToPaymentTab}>Зберегти і перейти до наступного кроку</button>
                        </div>
                    )}

                </div>
            </div>
            <YourOrder
                data={data}
                setIsDiscountsAndNews={setIsDiscountsAndNews}
                isDiscountsAndNews={isDiscountsAndNews}
                saveAndProceed={saveAndProceed}
                personActive={personActive}
                deliveryActive={deliveryActive}
                paymentActive={paymentActive}
                switchToDeliveryTab={switchToDeliveryTab}
            />
        </section>
    )
}

export default Order