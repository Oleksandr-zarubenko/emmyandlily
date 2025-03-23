// priceUtils.ts
export const convertPrice = (price: any, rate: any): any => {
  const convertedPrice = parseFloat(price) / rate;
  return convertedPrice.toFixed(2);
};
