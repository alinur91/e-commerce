import {
  DiscountTypeEnum,
  type MinThresholdInfoError,
  type DiscountsInfo,
} from "@features/cart/lib/types";
import { ButtonEnum } from "@ts-types/enums";
import { Button } from "@ui/index";
import { BiSolidCoupon } from "@utils/icons";
import { useAppSelector, useAppDispatch } from "@hooks/index";
import { selectCartData } from "@features/cart/slices/selector";
import { totalAmount } from "@utils/helpers";
import { useState } from "react";
import { setCoupon } from "@features/cart/api/index";

type DiscountType = {
  discount: DiscountsInfo;
  handleCouponError: (info: MinThresholdInfoError) => void;
};

const Discount = ({ discount, handleCouponError }: DiscountType) => {
  const [isLoading, setIsLoading] = useState(false);
  const { value, discountType, minOrderForDiscount } = discount;
  const { cartProducts } = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();
  const totalAmountValue = totalAmount(cartProducts);

  let discountValueInPercent = value;

  if (discountType === DiscountTypeEnum.PERCENT) {
    discountValueInPercent = value * 100;
  }

  const handleApplyCouponClick = async (
    discount: DiscountsInfo,
    totalAmountValue: number,
  ) => {
    setIsLoading(true);
    if (discount.minOrderForDiscount > totalAmountValue) {
      handleCouponError({ isError: true, value: discount.minOrderForDiscount });
    } else {
      handleCouponError({ isError: false, value: 0 });
      await dispatch(setCoupon(discount));
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between px-4 py-5">
      <div>
        <h3 className="font-semibold text-green-400">
          Get
          {discountType === DiscountTypeEnum.FLAT
            ? ` flat $${discountValueInPercent} `
            : ` ${discountValueInPercent}% `}
          OFF
        </h3>
        <p className="text-xs text-gray-600">
          Flat
          {discountType === DiscountTypeEnum.FLAT
            ? ` $${discountValueInPercent} `
            : ` ${discountValueInPercent}% `}
          discount on orders above ${minOrderForDiscount}
        </p>
      </div>
      <Button
        disabled={isLoading}
        onClick={() => handleApplyCouponClick(discount, totalAmountValue)}
        className="outline-solid w-20 rounded-sm py-1 text-xs capitalize outline-2 outline-gray-400 transition-all duration-200 ease-in-out hover:text-orange-400 hover:outline-orange-400"
        type={ButtonEnum.SECONDARY}
      >
        <BiSolidCoupon />
        {isLoading ? "Applying" : "Apply"}
      </Button>
    </div>
  );
};

export default Discount;
