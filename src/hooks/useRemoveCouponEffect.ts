import { useEffect } from "react";
import { useAppDispatch } from "@hooks/index";
import { DiscountsInfo } from "@features/cart/lib/types";
import { removeCoupon } from "@features/cart/api";

const useRemoveCouponEffect = (
  couponApplied: boolean,
  discountInfo: DiscountsInfo,
  totalAmountValue: number,
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (couponApplied && totalAmountValue <= discountInfo.minOrderForDiscount) {
      dispatch(removeCoupon());
    }
  }, [
    couponApplied,
    discountInfo.minOrderForDiscount,
    dispatch,
    totalAmountValue,
  ]);
};

export default useRemoveCouponEffect;
