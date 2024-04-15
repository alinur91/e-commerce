import { useEffect, useState } from "react";
import { DiscountsInfo } from "@features/cart/lib/types";
import { calculateDiscountValue, hasCouponApplied } from "@utils/helpers";

const useCouponDiscount = (
  discountInfo: DiscountsInfo,
  totalAmountValue: number,
) => {
  const isCouponApplied = hasCouponApplied(discountInfo);
  const [discountValue, setDiscountValue] = useState(0);
  const [newEvalTotalAmountValue, setNewEvalTotalAmountValue] =
    useState(totalAmountValue);

  useEffect(() => {
    if (isCouponApplied) {
      const calculatedDiscountValue = calculateDiscountValue(
        totalAmountValue,
        discountInfo,
      )!;
      setDiscountValue(calculatedDiscountValue);
      setNewEvalTotalAmountValue(totalAmountValue - calculatedDiscountValue);
    }
  }, [discountInfo, isCouponApplied, totalAmountValue]);

  return { isCouponApplied, discountValue, newEvalTotalAmountValue };
};

export default useCouponDiscount;
