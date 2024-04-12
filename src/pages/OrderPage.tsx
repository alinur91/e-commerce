import { ecommerce3 } from "@data/index";
import { selectCartData } from "@features/cart/slices/selector";
import { useAppSelector } from "@hooks/index";
import { BackgroundWithBlur } from "@ui/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { cartProducts } = useAppSelector(selectCartData);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartProducts.length <= 0) {
      navigate("/");
    }
  }, [cartProducts, navigate]);

  return (
    <BackgroundWithBlur imageUrl={ecommerce3}>
      <div className="bg-white px-10 py-11">
        <h3 className="text-2xl font-bold uppercase">place your order</h3>
        <p className="font-semibold text-gray-400">
          Only one step away to enjoy the purchase...
        </p>
      </div>
    </BackgroundWithBlur>
  );
};

export default OrderPage;
