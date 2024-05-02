// priceUtils.ts
export const convertPrice = (price: any, rate: any): string => {
    const convertedPrice = parseFloat(price) / rate;
    return convertedPrice.toFixed(2);
};


