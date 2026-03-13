export interface SalesDriveProduct {
  id: string;
  price: string;
  oldprice?: string[];
  available: string;
}

export interface SalesDriveCurrency {
  id: string;
  rate: number;
}

export interface SalesDriveData {
  products: SalesDriveProduct[];
  currencies: SalesDriveCurrency[];
}

export interface SalesDriveOfferXml {
  $: {
    id: string;
    available: string;
  };
  price?: string[];
  oldprice?: string[];
}

export interface SalesDriveCurrencyXml {
  $: {
    id: string;
    rate: string;
  };
}

export interface SalesDriveXml {
  yml_catalog?: {
    shop?: Array<{
      offers?: Array<{
        offer?: SalesDriveOfferXml[];
      }>;
      currencies?: Array<{
        currency?: SalesDriveCurrencyXml[];
      }>;
    }>;
  };
}
