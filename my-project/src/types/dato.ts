export interface DatoImage {
  alt: string | null;
  url: string;
}

export interface DatoImageWithId extends DatoImage {
  id: string;
}

export interface DatoImageWithWidth extends DatoImage {
  width: number;
}

export interface DatoCategory {
  id: string;
  name: string;
}

export interface DatoProductCapacity {
  ml: string;
  idCrm: string;
  price?: string | number | null;
}

export interface DatoProduct {
  id: string;
  preview?: string | null;
  heading: string;
  description: string;
  category?: DatoCategory[];
  productpicture: DatoImage;
  method?: string | null;
  composit?: string | null;
  activecomp?: string | null;
  advantage1?: string | null;
  advantage2?: string | null;
  advantage3?: string | null;
  activeComponents?: string | null;
  composition?: string | null;
  productSlider: DatoImageWithId[];
  methodOfUse?: string | null;
  capacity: DatoProductCapacity[];
}

export interface DatoSecondModal {
  goToCart: string;
  itemAddedToCart: string;
  returnToShopping: string;
}

export interface DatoPromoCodeItem {
  promocod: string;
  namePartner: string;
  discount: number;
}

export interface DatoPromocode {
  promoCodName: DatoPromoCodeItem[];
}

export interface DatoProductsSection {
  heading: string;
  text: string;
}

export interface DatoMainSection {
  bigtext: string;
  heading: string;
  text: string;
  btn: string;
  inCart: string;
  productId: string;
  bottles: DatoImage;
}

export interface DatoVideoSection {
  heading: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  videolink: string;
}

export interface DatoAboutUsSection {
  heading: string;
  text1: string;
  text2: string;
  text3: string;
  image1: DatoImage;
  image2: DatoImage;
  image3: DatoImage;
}

export interface DatoContactsSection {
  heading: string;
  text: string;
  phone1: string;
  email: string;
  text2: string;
  phone2: string;
  socialsphrase: string;
  tiktoklink: string;
  instagramlink: string;
}

export interface DatoPromoOffer {
  title: string;
}

export interface DatoBasketSection {
  additionalInformation: string;
  payment: string;
  delivery: string;
  guarantee: string;
  heading: string;
  name: string;
  number: string;
  price: string;
  privacy: string;
  sum: string;
  delete: string;
  toOrder: string;
  total: string;
  dropdown: string;
  dropdown1: string;
  dropdown2: string;
  dropdown3: string;
}

export interface DatoOrderSection {
  order: string;
  confirmTheOrder: string;
  confirmTheOrderBtn: string;
  delivery: string;
  deliveryMethod: string;
  deliveryTime: string;
  deliveryTime2: string;
  discount: string;
  eMail: string;
  enterYourDetails: string;
  fillInTheDetails: string;
  freeDel: string;
  heading: string;
  lastName: string;
  next: string;
  noDelivery: string;
  payment: string;
  personalData: string;
  phoneNumber: string;
  receiver: string;
  recipientData: string;
  selectCountryAndCity: string;
  total: string;
  totalAmountToBePaid: string;
  wantToReceive: string;
  yourName: string;
  yourOrder: string;
}

export interface DatoDeliveryMethod {
  description: string;
  id: string;
  idD: string;
  name: string;
  price: string;
  img: DatoImageWithWidth;
}

export interface DatoDeliverySection {
  deliveryMethod: DatoDeliveryMethod[];
}

export interface DatoNavigation {
  whoweare: string;
  ourproducts: string;
  aboutus: string;
  contacts: string;
  policy: string;
  offer: string;
}

export interface DatoLayoutData {
  navigation: DatoNavigation;
}

export interface DatoHomeData {
  mainSection: DatoMainSection;
  videosection: DatoVideoSection;
  allCategories: DatoCategory[];
  aboutUsSection: DatoAboutUsSection;
  promoOffer: DatoPromoOffer;
  contactssection: DatoContactsSection;
  productsSection: DatoProductsSection;
  allProducts: DatoProduct[];
  secondmodal: DatoSecondModal;
}

export interface DatoBasketData {
  basket: DatoBasketSection;
  productsSection: DatoProductsSection;
  allProducts: DatoProduct[];
  allPromocods: DatoPromocode[];
  secondmodal: DatoSecondModal;
}

export interface DatoOrderData {
  order: DatoOrderSection;
  productsSection: DatoProductsSection;
  allProducts: DatoProduct[];
  delivery: DatoDeliverySection;
  allPromocods: DatoPromocode[];
}
