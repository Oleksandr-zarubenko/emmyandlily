import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AddedToCartMap, CartStorageItem } from "@/types/cart";
import { OrderErrorState } from "@/types/order";

type SetterValue<T> = T | ((prev: T) => T);
type PatchSetterValue<T> = Partial<T> | ((prev: T) => Partial<T>);

const resolveSetter = <T>(value: SetterValue<T>, prev: T): T =>
  typeof value === "function" ? (value as (p: T) => T)(prev) : value;
const resolvePatch = <T>(value: PatchSetterValue<T>, prev: T): Partial<T> =>
  typeof value === "function" ? (value as (p: T) => Partial<T>)(prev) : value;

type CartData = {
  cartItems: CartStorageItem[];
  addedToCart: AddedToCartMap;
  quantities: Record<string, number>;
};

type PromoData = {
  totalPrice: number;
  promoCode: string;
  promoCodePartner: string;
  isValid: boolean;
  isInputOpen: boolean;
  isButtonClicked: boolean;
  discountAmount: number;
  isPromoCodeValid: boolean;
};

type OrderData = {
  deliveryCompleted: boolean;
  error: OrderErrorState;
  street: string;
  externalId: string;
  houseNumber: string;
  city: string;
  country: string;
  numposhtmat: string;
  numnp: string;
  index: string;
  sstreet: string;
  zip: string;
  house: string;
  appartment: string;
  isRecipient: boolean;
  isDiscountsAndNews: boolean;
  privacypolicy: boolean;
  deliveryActive: boolean;
  paymentActive: boolean;
  personActive: boolean;
  selectedOption: string;
  deliveryPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  recipientPhoneNumber: string;
  allTotal: number;
  totalPriceEn: number;
};

interface CheckoutState {
  cartItems: CartStorageItem[];
  addedToCart: AddedToCartMap;
  quantities: Record<string, number>;
  totalPrice: number;
  promoCode: string;
  promoCodePartner: string;
  isValid: boolean;
  isInputOpen: boolean;
  isButtonClicked: boolean;
  discountAmount: number;
  isPromoCodeValid: boolean;
  deliveryCompleted: boolean;
  error: OrderErrorState;
  street: string;
  externalId: string;
  houseNumber: string;
  city: string;
  country: string;
  numposhtmat: string;
  numnp: string;
  index: string;
  sstreet: string;
  zip: string;
  house: string;
  appartment: string;
  isRecipient: boolean;
  isDiscountsAndNews: boolean;
  privacypolicy: boolean;
  deliveryActive: boolean;
  paymentActive: boolean;
  personActive: boolean;
  selectedOption: string;
  deliveryPrice: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  recipientFirstName: string;
  recipientLastName: string;
  recipientEmail: string;
  recipientPhoneNumber: string;
  allTotal: number;
  totalPriceEn: number;
  setCartData: (value: PatchSetterValue<CartData>) => void;
  setPromoData: (value: PatchSetterValue<PromoData>) => void;
  setOrderData: (value: PatchSetterValue<OrderData>) => void;
  setCartItems: (value: SetterValue<CartStorageItem[]>) => void;
  addCartItem: (item: CartStorageItem) => void;
  removeCartItem: (id: string) => void;
  setAddedToCart: (value: SetterValue<AddedToCartMap>) => void;
  setQuantities: (value: SetterValue<Record<string, number>>) => void;
  setTotalPrice: (value: SetterValue<number>) => void;
  setPromoCode: (value: SetterValue<string>) => void;
  setPromoCodePartner: (value: SetterValue<string>) => void;
  setIsValid: (value: SetterValue<boolean>) => void;
  setIsInputOpen: (value: SetterValue<boolean>) => void;
  setIsButtonClicked: (value: SetterValue<boolean>) => void;
  setDiscountAmount: (value: SetterValue<number>) => void;
  setIsPromoCodeValid: (value: SetterValue<boolean>) => void;
  setDeliveryCompleted: (value: SetterValue<boolean>) => void;
  setError: (value: SetterValue<OrderErrorState>) => void;
  setStreet: (value: SetterValue<string>) => void;
  setExternalId: (value: SetterValue<string>) => void;
  setHouseNumber: (value: SetterValue<string>) => void;
  setCity: (value: SetterValue<string>) => void;
  setCountry: (value: SetterValue<string>) => void;
  setNumposhtmat: (value: SetterValue<string>) => void;
  setNumnp: (value: SetterValue<string>) => void;
  setIndex: (value: SetterValue<string>) => void;
  setSstreet: (value: SetterValue<string>) => void;
  setZip: (value: SetterValue<string>) => void;
  setHouse: (value: SetterValue<string>) => void;
  setAppartment: (value: SetterValue<string>) => void;
  setIsRecipient: (value: SetterValue<boolean>) => void;
  setIsDiscountsAndNews: (value: SetterValue<boolean>) => void;
  setPrivacypolicy: (value: SetterValue<boolean>) => void;
  setDeliveryActive: (value: SetterValue<boolean>) => void;
  setPaymentActive: (value: SetterValue<boolean>) => void;
  setPersonActive: (value: SetterValue<boolean>) => void;
  setSelectedOption: (value: SetterValue<string>) => void;
  setDeliveryPrice: (value: SetterValue<number>) => void;
  setFirstName: (value: SetterValue<string>) => void;
  setLastName: (value: SetterValue<string>) => void;
  setEmail: (value: SetterValue<string>) => void;
  setPhoneNumber: (value: SetterValue<string>) => void;
  setRecipientFirstName: (value: SetterValue<string>) => void;
  setRecipientLastName: (value: SetterValue<string>) => void;
  setRecipientEmail: (value: SetterValue<string>) => void;
  setRecipientPhoneNumber: (value: SetterValue<string>) => void;
  setAllTotal: (value: SetterValue<number>) => void;
  setTotalPriceEn: (value: SetterValue<number>) => void;
  resetCheckout: () => void;
}

const initialState: Omit<
  CheckoutState,
  | "setCartData"
  | "setPromoData"
  | "setOrderData"
  | "setCartItems"
  | "addCartItem"
  | "removeCartItem"
  | "setAddedToCart"
  | "setQuantities"
  | "setTotalPrice"
  | "setPromoCode"
  | "setPromoCodePartner"
  | "setIsValid"
  | "setIsInputOpen"
  | "setIsButtonClicked"
  | "setDiscountAmount"
  | "setIsPromoCodeValid"
  | "setDeliveryCompleted"
  | "setError"
  | "setStreet"
  | "setExternalId"
  | "setHouseNumber"
  | "setCity"
  | "setCountry"
  | "setNumposhtmat"
  | "setNumnp"
  | "setIndex"
  | "setSstreet"
  | "setZip"
  | "setHouse"
  | "setAppartment"
  | "setIsRecipient"
  | "setIsDiscountsAndNews"
  | "setPrivacypolicy"
  | "setDeliveryActive"
  | "setPaymentActive"
  | "setPersonActive"
  | "setSelectedOption"
  | "setDeliveryPrice"
  | "setFirstName"
  | "setLastName"
  | "setEmail"
  | "setPhoneNumber"
  | "setRecipientFirstName"
  | "setRecipientLastName"
  | "setRecipientEmail"
  | "setRecipientPhoneNumber"
  | "setAllTotal"
  | "setTotalPriceEn"
  | "resetCheckout"
> = {
  cartItems: [],
  addedToCart: {},
  quantities: {},
  totalPrice: 0,
  promoCode: "",
  promoCodePartner: "",
  isValid: false,
  isInputOpen: false,
  isButtonClicked: false,
  discountAmount: 0,
  isPromoCodeValid: false,
  deliveryCompleted: false,
  error: {},
  street: "",
  externalId: "",
  houseNumber: "",
  city: "",
  country: "",
  numposhtmat: "",
  numnp: "",
  index: "",
  sstreet: "",
  zip: "",
  house: "",
  appartment: "",
  isRecipient: false,
  isDiscountsAndNews: false,
  privacypolicy: false,
  deliveryActive: false,
  paymentActive: false,
  personActive: true,
  selectedOption: "",
  deliveryPrice: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  recipientFirstName: "",
  recipientLastName: "",
  recipientEmail: "",
  recipientPhoneNumber: "",
  allTotal: 0,
  totalPriceEn: 0,
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      ...initialState,
      setCartData: (value) =>
        set((state) => {
          const prev = {
            cartItems: state.cartItems,
            addedToCart: state.addedToCart,
            quantities: state.quantities,
          };
          const patch = resolvePatch(value, prev);
          return {
            ...prev,
            ...patch,
          };
        }),
      setPromoData: (value) =>
        set((state) => {
          const prev = {
            totalPrice: state.totalPrice,
            promoCode: state.promoCode,
            promoCodePartner: state.promoCodePartner,
            isValid: state.isValid,
            isInputOpen: state.isInputOpen,
            isButtonClicked: state.isButtonClicked,
            discountAmount: state.discountAmount,
            isPromoCodeValid: state.isPromoCodeValid,
          };
          const patch = resolvePatch(value, prev);
          return {
            ...prev,
            ...patch,
          };
        }),
      setOrderData: (value) =>
        set((state) => ({
          ...resolvePatch(value, {
            deliveryCompleted: state.deliveryCompleted,
            error: state.error,
            street: state.street,
            externalId: state.externalId,
            houseNumber: state.houseNumber,
            city: state.city,
            country: state.country,
            numposhtmat: state.numposhtmat,
            numnp: state.numnp,
            index: state.index,
            sstreet: state.sstreet,
            zip: state.zip,
            house: state.house,
            appartment: state.appartment,
            isRecipient: state.isRecipient,
            isDiscountsAndNews: state.isDiscountsAndNews,
            privacypolicy: state.privacypolicy,
            deliveryActive: state.deliveryActive,
            paymentActive: state.paymentActive,
            personActive: state.personActive,
            selectedOption: state.selectedOption,
            deliveryPrice: state.deliveryPrice,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phoneNumber: state.phoneNumber,
            recipientFirstName: state.recipientFirstName,
            recipientLastName: state.recipientLastName,
            recipientEmail: state.recipientEmail,
            recipientPhoneNumber: state.recipientPhoneNumber,
            allTotal: state.allTotal,
            totalPriceEn: state.totalPriceEn,
          }),
        })),
      setCartItems: (value) =>
        set((state) => ({ cartItems: resolveSetter(value, state.cartItems) })),
      addCartItem: (item) =>
        set((state) => {
          const exists = state.cartItems.some((x) => x.id === item.id);
          if (exists) return state;
          return {
            cartItems: [...state.cartItems, item],
            addedToCart: { ...state.addedToCart, [item.id]: true },
            quantities: { ...state.quantities, [item.id]: state.quantities[item.id] || 1 },
          };
        }),
      removeCartItem: (id) =>
        set((state) => {
          const nextQuantities = { ...state.quantities };
          delete nextQuantities[id];
          const nextAdded = { ...state.addedToCart };
          delete nextAdded[id];
          return {
            cartItems: state.cartItems.filter((item) => item.id !== id),
            quantities: nextQuantities,
            addedToCart: nextAdded,
          };
        }),
      setAddedToCart: (value) =>
        set((state) => ({ addedToCart: resolveSetter(value, state.addedToCart) })),
      setQuantities: (value) =>
        set((state) => ({ quantities: resolveSetter(value, state.quantities) })),
      setTotalPrice: (value) =>
        set((state) => ({ totalPrice: resolveSetter(value, state.totalPrice) })),
      setPromoCode: (value) =>
        set((state) => ({ promoCode: resolveSetter(value, state.promoCode) })),
      setPromoCodePartner: (value) =>
        set((state) => ({
          promoCodePartner: resolveSetter(value, state.promoCodePartner),
        })),
      setIsValid: (value) =>
        set((state) => ({ isValid: resolveSetter(value, state.isValid) })),
      setIsInputOpen: (value) =>
        set((state) => ({ isInputOpen: resolveSetter(value, state.isInputOpen) })),
      setIsButtonClicked: (value) =>
        set((state) => ({
          isButtonClicked: resolveSetter(value, state.isButtonClicked),
        })),
      setDiscountAmount: (value) =>
        set((state) => ({
          discountAmount: resolveSetter(value, state.discountAmount),
        })),
      setIsPromoCodeValid: (value) =>
        set((state) => ({
          isPromoCodeValid: resolveSetter(value, state.isPromoCodeValid),
        })),
      setDeliveryCompleted: (value) =>
        set((state) => ({
          deliveryCompleted: resolveSetter(value, state.deliveryCompleted),
        })),
      setError: (value) => set((state) => ({ error: resolveSetter(value, state.error) })),
      setStreet: (value) =>
        set((state) => ({ street: resolveSetter(value, state.street) })),
      setExternalId: (value) =>
        set((state) => ({ externalId: resolveSetter(value, state.externalId) })),
      setHouseNumber: (value) =>
        set((state) => ({
          houseNumber: resolveSetter(value, state.houseNumber),
        })),
      setCity: (value) =>
        set((state) => ({ city: resolveSetter(value, state.city) })),
      setCountry: (value) =>
        set((state) => ({ country: resolveSetter(value, state.country) })),
      setNumposhtmat: (value) =>
        set((state) => ({
          numposhtmat: resolveSetter(value, state.numposhtmat),
        })),
      setNumnp: (value) =>
        set((state) => ({ numnp: resolveSetter(value, state.numnp) })),
      setIndex: (value) =>
        set((state) => ({ index: resolveSetter(value, state.index) })),
      setSstreet: (value) =>
        set((state) => ({ sstreet: resolveSetter(value, state.sstreet) })),
      setZip: (value) =>
        set((state) => ({ zip: resolveSetter(value, state.zip) })),
      setHouse: (value) =>
        set((state) => ({ house: resolveSetter(value, state.house) })),
      setAppartment: (value) =>
        set((state) => ({
          appartment: resolveSetter(value, state.appartment),
        })),
      setIsRecipient: (value) =>
        set((state) => ({ isRecipient: resolveSetter(value, state.isRecipient) })),
      setIsDiscountsAndNews: (value) =>
        set((state) => ({
          isDiscountsAndNews: resolveSetter(value, state.isDiscountsAndNews),
        })),
      setPrivacypolicy: (value) =>
        set((state) => ({
          privacypolicy: resolveSetter(value, state.privacypolicy),
        })),
      setDeliveryActive: (value) =>
        set((state) => ({
          deliveryActive: resolveSetter(value, state.deliveryActive),
        })),
      setPaymentActive: (value) =>
        set((state) => ({
          paymentActive: resolveSetter(value, state.paymentActive),
        })),
      setPersonActive: (value) =>
        set((state) => ({ personActive: resolveSetter(value, state.personActive) })),
      setSelectedOption: (value) =>
        set((state) => ({
          selectedOption: resolveSetter(value, state.selectedOption),
        })),
      setDeliveryPrice: (value) =>
        set((state) => ({
          deliveryPrice: resolveSetter(value, state.deliveryPrice),
        })),
      setFirstName: (value) =>
        set((state) => ({ firstName: resolveSetter(value, state.firstName) })),
      setLastName: (value) =>
        set((state) => ({ lastName: resolveSetter(value, state.lastName) })),
      setEmail: (value) =>
        set((state) => ({ email: resolveSetter(value, state.email) })),
      setPhoneNumber: (value) =>
        set((state) => ({
          phoneNumber: resolveSetter(value, state.phoneNumber),
        })),
      setRecipientFirstName: (value) =>
        set((state) => ({
          recipientFirstName: resolveSetter(value, state.recipientFirstName),
        })),
      setRecipientLastName: (value) =>
        set((state) => ({
          recipientLastName: resolveSetter(value, state.recipientLastName),
        })),
      setRecipientEmail: (value) =>
        set((state) => ({
          recipientEmail: resolveSetter(value, state.recipientEmail),
        })),
      setRecipientPhoneNumber: (value) =>
        set((state) => ({
          recipientPhoneNumber: resolveSetter(value, state.recipientPhoneNumber),
        })),
      setAllTotal: (value) =>
        set((state) => ({ allTotal: resolveSetter(value, state.allTotal) })),
      setTotalPriceEn: (value) =>
        set((state) => ({
          totalPriceEn: resolveSetter(value, state.totalPriceEn),
        })),
      resetCheckout: () => set(initialState),
    }),
    {
      name: "checkout-store-v1",
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
