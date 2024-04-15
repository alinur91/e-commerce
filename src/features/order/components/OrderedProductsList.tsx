import { useAppSelector } from "@hooks/useAppSelector";
import { selectOrderData } from "@features/order/slices/selector";
import { OrderedProduct } from "@features/order/components";

const OrderedProductsList = () => {
  const { orderedProducts } = useAppSelector(selectOrderData);

  return (
    <div className="space-y-2">
      {orderedProducts.map((orderedProduct) => (
        <OrderedProduct
          key={orderedProduct.productId}
          orderedProduct={orderedProduct}
        />
      ))}
    </div>
  );
};

export default OrderedProductsList;
