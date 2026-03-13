// priceUtils.ts
export const convertPrice = (price: string | number, rate: number): string => {
  const convertedPrice = Number(price) / rate;
  return convertedPrice.toFixed(2);
};
