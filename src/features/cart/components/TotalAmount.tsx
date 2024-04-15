import { useAppSelector, useCouponDiscount } from "@hooks/index";
import { selectCartData } from "@features/cart/slices/selector";
import { formatNumberWithCommas, totalAmount } from "@utils/helpers";

const TotalAmount = () => {
  const {
    cartProducts,
    coupon: { discountInfo },
  } = useAppSelector(selectCartData);

  const totalAmountValue = totalAmount(cartProducts);
  const { isCouponApplied, discountValue, newEvalTotalAmountValue } =
    useCouponDiscount(discountInfo, totalAmountValue);

  return (
    <div className="space-y-2 rounded-sm bg-gray-100 p-4">
      {isCouponApplied && (
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
          {formatNumberWithCommas(newEvalTotalAmountValue)}
        </span>
      </div>
    </div>
  );
};

export default TotalAmount;
