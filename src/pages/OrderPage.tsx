import { ecommerce3 } from "@data/index";
import { selectOrderData } from "@features/order/slices/selector";
import { useAppSelector } from "@hooks/index";
import { BackgroundWithBlur } from "@ui/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderForm } from "@features/order/components";

const OrderPage = () => {
  const { orderSuccess, orderId } = useAppSelector(selectOrderData);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderSuccess) navigate(`/order/${orderId}`);
  }, [navigate, orderId, orderSuccess]);

  return (
    <BackgroundWithBlur imageUrl={ecommerce3}>
      <div className="space-y-4 rounded-lg border-2 border-gray-200 bg-white px-4 py-5 sm:w-[570px] sm:px-10 sm:py-11">
        <div>
          <h3 className="text-lg font-bold uppercase sm:text-2xl">
            place your order
          </h3>
          <p className="sm:text-md text-sm font-semibold text-gray-400">
            Only one step away to enjoy the purchase...
          </p>
        </div>
        <OrderForm />
      </div>
    </BackgroundWithBlur>
  );
};

export default OrderPage;
