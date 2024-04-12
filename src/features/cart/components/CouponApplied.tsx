import { useAppDispatch, useAppSelector } from "@hooks/index";
import { selectCartData } from "@features/cart/slices/selector";
import { DiscountTypeEnum } from "@features/cart/lib/types";
import { Button } from "@ui/index";
import { ButtonEnum } from "@ts-types/enums";
import { removeCoupon } from "@features/cart/api/index";
import { useState } from "react";

const CouponApplied = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    coupon: { discountInfo },
  } = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();

  const handleRemoveCoupon = async () => {
    setIsLoading(true);
    await dispatch(removeCoupon());
    setIsLoading(false);
  };

  if (!discountInfo) return;

  return (
    <div className="flex items-center justify-between p-3 outline outline-1 outline-gray-200">
      <div>
        <p className="font-semibold text-green-500">
          {discountInfo.discountType === DiscountTypeEnum.FLAT
            ? `$${discountInfo.value}`
            : `${discountInfo.value * 100}%`}{" "}
          OFF
        </p>
        <p className="text-sm text-gray-400">Offer applied on the bill</p>
      </div>
      <Button
        disabled={isLoading}
        onClick={handleRemoveCoupon}
        className="font-semibold capitalize"
        type={ButtonEnum.WARNING}
      >
        {isLoading ? "Removing" : "Remove"}
      </Button>
    </div>
  );
};

export default CouponApplied;
