import {
  CartProductsList,
  CouponApplied,
  CouponsList,
  TotalAmount,
} from "@features/cart/components";
import { hasCouponApplied } from "@utils/helpers";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { selectCartData } from "@features/cart/slices/selector";
import { Button } from "@ui/index";
import { ButtonEnum } from "@ts-types/enums";
import { FaLongArrowAltRight, MdDelete } from "@utils/icons";
import { removeAllProductsAndCoupon } from "@features/cart/api/removeAllProductsAndCoupon.api";
import { useNavigate } from "react-router-dom";

const CartProductsContent = () => {
  const {
    cartProducts,
    coupon: { discountInfo },
  } = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const couponApplied = hasCouponApplied(discountInfo);

  const handleRemoveCouponAndAllProducts = () => {
    dispatch(removeAllProductsAndCoupon());
  };

  const handleCheckout = () => {
    navigate('/order')
  };

  return (
    <div className="space-y-8">
      <CartProductsList cartProducts={cartProducts} />
      {couponApplied ? <CouponApplied /> : <CouponsList />}
      <TotalAmount />
      <div className="space-y-5">
        <Button
          onClick={handleCheckout}
          className="flex h-12 items-center gap-3 border-2 border-green-900 hover:bg-green-600"
          type={ButtonEnum.PRIMARY}
        >
          Checkout <FaLongArrowAltRight />
        </Button>
        <Button
          onClick={handleRemoveCouponAndAllProducts}
          className="flex h-12 w-full items-center gap-1 border-2 border-orange-600 hover:border-orange-400 hover:text-orange-400"
          type={ButtonEnum.WARNING}
        >
          Clear <MdDelete className="text-lg" />
        </Button>
      </div>
    </div>
  );
};

export default CartProductsContent;
