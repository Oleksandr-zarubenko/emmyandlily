export interface CartStorageItem {
  id: string;
  productName: string;
  price: number | string;
  capacity: string;
  photo: string;
}

export type AddedToCartMap = Record<string, boolean>;
