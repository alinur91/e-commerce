import { useAppSelector, useAppDispatch } from "@hooks/index";
import { selectCartData } from "@features/cart/slices/selector";
import {
  formatNumberWithCommas,
  totalAmount,
  calculateDiscountValue,
  hasCouponApplied,
} from "@utils/helpers";
import { removeCoupon } from "@features/cart/api/index";

const TotalAmount = () => {
  const {
    cartProducts,
    coupon: { discountInfo },
  } = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();

  const totalAmountValue = totalAmount(cartProducts);
  let newEvalTotalAmountValue;
  const couponApplied = hasCouponApplied(discountInfo);
  let discountValue;

  if (couponApplied) {
    discountValue = calculateDiscountValue(totalAmountValue, discountInfo);
    newEvalTotalAmountValue = eval(`${totalAmountValue}-${discountValue}`);
  }

  if (couponApplied && totalAmountValue < discountInfo.minOrderForDiscount) {
    dispatch(removeCoupon());
  }

  return (
    <div className="space-y-2 rounded-sm bg-gray-100 p-4">
      {couponApplied && (
        <div className="text-md flex items-center justify-between">
          <h3 className="text-gray-400">Coupon discounts:</h3>
          <div className="font-semibold">
            <span className="text-gray-500">{totalAmountValue}</span>
            <span className="text-green-500"> - {discountValue}</span>
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500">Total Amount:</h3>
        <span className="text-xl font-bold">
          💲
          {formatNumberWithCommas(
            couponApplied ? newEvalTotalAmountValue : totalAmountValue,
          )}
        </span>
      </div>
    </div>
  );
};

export default TotalAmount;
