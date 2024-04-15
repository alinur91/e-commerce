import { ProductData } from "@features/products/lib/types";
import { formatNumberWithCommas } from "@utils/helpers";

type OrderedProductProps = {
  orderedProduct: ProductData;
};

const OrderedProduct = ({
  orderedProduct: { price, quantity = 1, brand, title },
}: OrderedProductProps) => {
  const formatedPrice = formatNumberWithCommas(price);
  let totalAmount;
  let productsTotalAmountPrice;

  if (quantity > 1) {
    totalAmount = eval(`${price}*${quantity}`);
    const formatedTotalAmountPrice = formatNumberWithCommas(totalAmount);
    productsTotalAmountPrice = (
      <>
        {" "}
        {formatedPrice} X {quantity} ={" "}
        <span className="font-semibold text-gray-700">
          {formatedTotalAmountPrice}
        </span>
      </>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-[-2px]">
        <h5 className="flex gap-2 font-bold">
          {title} <span className="text-gray-400">X{quantity}</span>{" "}
        </h5>
        <p className="text-gray-500">{brand}</p>
      </div>
      <div className="text-gray-400">
        {quantity === 1 && (
          <span className="font-semibold text-gray-700">${formatedPrice}</span>
        )}
        {quantity !== 1 && productsTotalAmountPrice}
      </div>
    </div>
  );
};

export default OrderedProduct;
