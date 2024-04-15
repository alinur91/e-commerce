import { ProductsData } from "@features/products/lib/types";

export type CartState = {
  cartProducts: ProductsData | [];
  loading: boolean;
  error: string | null;
  coupon: Coupon;
};

export enum DecreaseQuantityEnum {
  DECREASE = "decrease",
  REMOVE = "remove",
}

export enum DiscountTypeEnum {
  PERCENT = "percent",
  FLAT = "flat",
}

export type Coupon = {
  error: null | string;
  discountInfo: DiscountsInfo;
  loading: boolean;
};

export type DiscountsInfo = {
  value: number;
  minOrderForDiscount: number;
  discountType: DiscountTypeEnum;
};

export type MinThresholdInfoError = {
  isError: boolean;
  value: number;
};

export enum ShowNotificationOnAllProductsRemovalEnum {
  YES = "yes",
  NO = "no",
}
