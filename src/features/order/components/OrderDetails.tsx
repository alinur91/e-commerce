import { selectOrderData } from "@features/order/slices/selector";
import { OrderedProductsList } from "@features/order/components";
import { useAppSelector, useCouponDiscount } from "@hooks/index";
import { formatNumberWithCommas, totalAmount } from "@utils/helpers";

const OrderDetails = () => {
  const { orderId } = useAppSelector(selectOrderData);
  const { discountInfo, orderedProducts } = useAppSelector(selectOrderData);
  const orderedProductsTotalPrice = totalAmount(orderedProducts);
  const { isCouponApplied, discountValue, newEvalTotalAmountValue } =
    useCouponDiscount(discountInfo, orderedProductsTotalPrice);

  return (
    <section>
      <h1 className="mb-4 text-center text-lg font-bold uppercase text-green-400 md:text-xl">
        order details
      </h1>
      <h4 className="mb-2 font-semibold">
        Order ID: <span className="font-semibold text-red-400">#{orderId}</span>{" "}
      </h4>
      <OrderedProductsList />
      <div className="mt-2 space-y-2">
        {isCouponApplied && (
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-400">Coupon Discount:</h3>{" "}
            <p className="font-bold text-gray-400">
              ${formatNumberWithCommas(orderedProductsTotalPrice)} -
              <span className="font-bold text-green-400"> {discountValue}</span>
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-400">Total Amount:</h3>{" "}
          <p className="text-xl font-bold text-orange-400">
            $
            {formatNumberWithCommas(
              isCouponApplied
                ? newEvalTotalAmountValue
                : orderedProductsTotalPrice,
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
