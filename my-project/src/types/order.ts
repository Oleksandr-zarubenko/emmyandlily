export type PersonalInfoFieldKey =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "recipientFirstName"
  | "recipientLastName"
  | "recipientEmail"
  | "recipientPhoneNumber";

export type DeliveryFieldKey =
  | "country"
  | "city"
  | "street"
  | "houseNumber"
  | "sstreet"
  | "zip"
  | "house"
  | "appartment"
  | "numnp"
  | "numposhtmat"
  | "index";

export type OrderErrorKey = PersonalInfoFieldKey | DeliveryFieldKey;
export type OrderErrorState = Partial<Record<OrderErrorKey, string>>;

export interface OrderProductPayload {
  id: string;
  name: string;
  costPerItem: string | number;
  amount: number;
  description: string;
  discount: string;
}

export interface FormPostBody {
  products: OrderProductPayload[];
  isDiscountsAndNews: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectePaymentMethod: string;
  selectedOption: string;
  street: string;
  recipientData: string;
  apiPromocod: string;
  apiPromocodPartner: string;
  externalId: string;
  city: string;
  numnp: string;
  numposhtmat: string;
  houseNumber: string;
  index: string;
}
