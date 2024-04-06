import { ProductsData } from "@features/products/lib/types";

export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const dataString = localStorage.getItem(key);
    if (dataString) {
      return JSON.parse(dataString) as T;
    }
    return null;
  } catch (error) {
    console.error("Error while getting data from localStorage:", error);
    return null;
  }
};

export const setLocalStorageItem = <T extends string | object | boolean>(
  key: string,
  data: T,
): void => {
  const dataToString =
    typeof data === "object" ? JSON.stringify(data) : data.toString();
  try {
    localStorage.setItem(key, dataToString);
  } catch (error) {
    console.error("Error while saving data to localStorage:", error);
  }
};

export const removeLocalStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error while removing data from localStorage:", error);
  }
};

export const getMaxPrice = (products: ProductsData) => {
  return products.reduce(
    (maxPrice, product) =>
      maxPrice > product.price ? maxPrice : product.price,
    0,
  );
};

export const formatNumberWithCommas = (number: number) =>
  number.toLocaleString("en-US");
