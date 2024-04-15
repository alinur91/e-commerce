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
      <div className="w-[450px] space-y-4 rounded-lg border-2 border-gray-200 bg-white px-10 py-11 sm:w-[570px]">
        <div>
          <h3 className="text-2xl font-bold uppercase">place your order</h3>
          <p className="font-semibold text-gray-400">
            Only one step away to enjoy the purchase...
          </p>
        </div>
        <OrderForm />
      </div>
    </BackgroundWithBlur>
  );
};

export default OrderPage;
