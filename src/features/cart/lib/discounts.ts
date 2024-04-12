import { DiscountTypeEnum, type DiscountsInfo } from "./types";

export const discounts: DiscountsInfo[] = [
  { value: 50, minOrderForDiscount: 600, discountType: DiscountTypeEnum.FLAT },
  {
    value: 0.15,
    minOrderForDiscount: 1200,
    discountType: DiscountTypeEnum.PERCENT,
  },
  {
    value: 299,
    minOrderForDiscount: 1999,
    discountType: DiscountTypeEnum.FLAT,
  },
  {
    value: 0.1,
    minOrderForDiscount: 400,
    discountType: DiscountTypeEnum.PERCENT,
  },
  {
    value: 0.3,
    minOrderForDiscount: 4000,
    discountType: DiscountTypeEnum.PERCENT,
  },
];
