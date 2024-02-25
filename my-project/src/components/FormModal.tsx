"use client";

import { useEffect, useState } from "react";
import { BurgerCross } from "./icons/BurgerCross";
import { RegisterOptions, useForm } from "react-hook-form";
import { getEmailRegex, getFullNameRegex } from "@/utils/regex";
import { byDialCode } from "@/utils/phone/codes";
import { sendUserToTelegramBot } from "@/utils/api";
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
      required: "Full Name is required",
      pattern: {
        value: getFullNameRegex(),
        message: "Incorrect name",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value: getEmailRegex(),
        message: "Invalid email",
      },
    },
    phone: {
      validate: (val: string) => {
        // if input is empty or contains only a country code
        if (!val || Boolean(byDialCode[val])) {
          return "Phone is required";
        }

        return true;
      },
      pattern: {
        value: /^\+\d+$/,
        message: "Incorrect phone",
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
      console.log("save data", newData);

      await Promise.all([sendUserToTelegramBot(newData)]);

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
        className="mx-auto rounded-xl bg-primary px-12 py-4 text-t20 text-white duration-300 hover:bg-black"
        onClick={() => setModalOpened()}
      >
        {orderForm.buttonText}
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 flex h-dvh items-center justify-center overflow-y-auto bg-black/50"
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
                className="flex min-w-[300px] flex-col gap-4 p-20"
              >
                <span className="text-left text-t20">{orderForm.title}</span>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.fullName}
                  <input
                    {...register("fullName", registerOptions.fullName)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="John Smith"
                  />
                  {errors.fullName && (
                    <p className="text-error">{errors.fullName.message}</p>
                  )}
                </label>
                <label className="flex flex-col items-start gap-2">
                  {orderForm.email}
                  <input
                    {...register("email", registerOptions.email)}
                    className="w-full rounded-xl border border-primary px-4 py-2"
                    placeholder="example@mail.com"
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
                  className="mx-auto rounded-xl bg-primary px-12 py-4 text-t20 text-white duration-300 hover:bg-black"
                >
                  {orderForm.sendButtonText}
                </button>
                {isSent && (
                  <p className="text-t30 text-primary">
                    We recieved you message!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
