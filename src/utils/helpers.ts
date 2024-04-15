import { DiscountTypeEnum, type DiscountsInfo } from "@features/cart/lib/types";
import { ProductsData } from "@features/products/lib/types";
import {
  ToastNotificationsMessageEnum,
  ToastPositionNotificationsEnum,
  ToastTypeNotificationsEnum,
} from "@ts-types/enums";
import { toast } from "react-toastify";

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

export const mostExpensivePrice = (products: ProductsData) => {
  return products.reduce(
    (maxPrice, product) =>
      maxPrice > product.price ? maxPrice : product.price,
    0,
  );
};

export const totalAmount = (cartProducts: ProductsData) => {
  return cartProducts.reduce(
    (totalAmount, product) => totalAmount + product.price * product.quantity!,
    0,
  );
};

export const hasCouponApplied = (discountInfo: DiscountsInfo) =>
  Object.keys(discountInfo).length > 0;

export const calculateDiscountValue = (
  totalAmountValue: number,
  { discountType, value }: DiscountsInfo,
) => {
  let discountValue;

  if (discountType === DiscountTypeEnum.FLAT) {
    discountValue = value;
  }
  if (discountType === DiscountTypeEnum.PERCENT) {
    discountValue = Math.floor(totalAmountValue * value);
  }

  return discountValue;
};

export const formatNumberWithCommas = (number: number) =>
  number.toLocaleString("en-US");

export const showToastNotificationMessage = (
  type: ToastTypeNotificationsEnum,
  message: ToastNotificationsMessageEnum | string,
  position:
    | ToastPositionNotificationsEnum
    | undefined = ToastPositionNotificationsEnum.TOP_CENTER,
  autoClose: number | undefined = 2500,
) => {
  toast[type](message, {
    position,
    autoClose,
  });
};
