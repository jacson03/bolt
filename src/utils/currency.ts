// Currency conversion utilities
const USD_TO_RWF_RATE = 1350; // 1 USD = 1350 RWF (approximate rate)

export const convertToRWF = (usdAmount: number): number => {
  return usdAmount * USD_TO_RWF_RATE;
};

export const formatRWF = (amount: number): string => {
  return `${Math.round(amount).toLocaleString()} RWF`;
};

export const formatPrice = (usdPrice: number): string => {
  const rwfAmount = convertToRWF(usdPrice);
  return formatRWF(rwfAmount);
};