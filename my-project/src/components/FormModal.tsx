"use client";

import { useEffect, useState } from "react";
import { BurgerCross } from "./icons/BurgerCross";
import { RegisterOptions, useForm } from "react-hook-form";
import { getEmailRegex, getFullNameRegex } from "@/utils/regex";
import { byDialCode } from "@/utils/phone/codes";
import { sendGoogleTable, sendUserToTelegramBot } from "@/utils/api";
import useFormPersist from "react-hook-form-persist";
import cn from "classnames";

interface FormContactFields {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

const isBrowser = typeof window !== "undefined";
const SESSION_KEY = "form";

export const FormModal = ({ orderForm }: { orderForm: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormContactFields>({
    shouldFocusError: false,
    defaultValues: {},
  });

  useFormPersist(SESSION_KEY, {
    watch,
    setValue,
    storage: isBrowser ? sessionStorage : undefined,
    exclude: ["language", "consent"],
  });

  const registerOptions: Record<string, RegisterOptions> = {
    fullName: {
      required: orderForm.errors.name,
      pattern: {
        value: getFullNameRegex(),
        message: orderForm.errors.name2,
      },
    },
    email: {
      required: orderForm.errors.email,
    },
    phone: {
      validate: (val: string) => {
        const processedPhone = "+" + val.replace(/\D/g, "");
        // if input is empty or contains only a country code
        if (Boolean(byDialCode[processedPhone])) {
          return orderForm.errors.code;
        }

        return true;
      },
      pattern: {
        value: /^[\d\s\-()+]+$/,
        message: orderForm.errors.phone,
      },
    },
    message: {},
  };

  const setModalOpened = () => {
    setIsOpen(true);
  };

  const setMenuClosed = () => {
    setIsOpen(false);
    setIsSent(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleSave = async (data: FormContactFields) => {
    setIsLoading(true);

    try {
      const newData = {
        ...data,
        createdAt: new Date().toLocaleString(),
      };

      await Promise.all([
        sendGoogleTable(newData),
        sendUserToTelegramBot(newData),
      ]);

      setIsSent(true);
      reset();
      sessionStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setError(false);
      }, 4000);
    }
  };

  const handleError = (errors: object) => {
    console.warn(errors);
  };

  return (
    <>
      <button
        className="mx-auto rounded-xl  px-12 py-4 text-t20 text-white duration-300 hover:bg-black"
        onClick={() => setModalOpened()}
      >
        {orderForm.buttonText}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex h-dvh items-center justify-center bg-black/50 md:overflow-y-auto"
          onClick={() => setMenuClosed()}
        >
          <div className="relative h-full xl:h-auto">
            <button
              onClick={() => setMenuClosed()}
              className="fixed right-2 top-1 z-10 rounded-full bg-primary p-4 duration-300 hover:bg-dark xl:absolute"
            >
              <BurgerCross className="h-2 w-2 text-white" />
            </button>
            <div
              className={cn(
                isSent ? "modalSuccess" : "modal",
                "modal relative h-full overflow-y-auto bg-white xl:flex xl:h-[580px] xl:w-[1000px] xl:flex-row"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <form
                method="post"
                onSubmit={handleSubmit(handleSave, handleError)}
                className="flex min-w-[300px] flex-col gap-4 p-10 md:p-20"
              >
                <span className="text-left text-t20">{orderForm.title}</span>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.fullName}
                  <input
                    {...register("fullName", registerOptions.fullName)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="John Smith"
                    type="text"
                  />
                  {errors.fullName && (
                    <p className="text-error">{errors.fullName.message}</p>
                  )}
                </label>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.email}
                  <input
                    type="text"
                    {...register("email", registerOptions.email)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="https://t.me/...."
                  />
                  {errors.email && (
                    <p className="text-error">{errors.email.message}</p>
                  )}
                </label>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.phone}
                  <input
                    {...register("phone", registerOptions.phone)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="+380971234567"
                  />
                  {errors.phone && (
                    <p className="text-error">{errors.phone.message}</p>
                  )}
                </label>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.message}
                  <textarea
                    {...register("message", registerOptions.message)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="Hello, I would like to ..."
                  />
                  {errors.message && (
                    <p className="text-error">{errors.message.message}</p>
                  )}
                </label>
                <button
                  type="submit"
                  className="mx-auto h-[52px] rounded-xl bg-primary px-12 py-4 text-t20 text-white duration-300 hover:bg-black"
                >
                  {isLoading ? (
                    <div role="status" className="-mt-1">
                      <svg
                        aria-hidden="true"
                        className="inline h-8 w-8 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    orderForm.sendButtonText
                  )}
                </button>
                {isSent && (
                  <p className="text-t30 text-primary">{orderForm.recieved}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
