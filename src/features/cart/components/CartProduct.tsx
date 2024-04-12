import { ProductData } from "@features/products/lib/types";
import { useAppDispatch } from "@hooks/index";
import { ButtonEnum } from "@ts-types/enums";
import { AddRemoveQuantityButtons } from "@ui/index";
import { formatNumberWithCommas } from "@utils/helpers";
import { FaMinusCircle } from "@utils/icons";
import { removeProductFromCart } from "@features/cart/api/index";
import { DecreaseQuantityEnum } from "@features/cart/lib/types";

type CartProductProps = {
  cartProduct: ProductData;
};

const CartProduct = ({ cartProduct }: CartProductProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveProductFromCart = async () => {
    await dispatch(
      removeProductFromCart({
        productId: cartProduct.productId,
        operation: DecreaseQuantityEnum.REMOVE,
      }),
    );
  };

  return (
    <div
      key={cartProduct.productId}
      className="flex items-center justify-between gap-3 rounded-md p-2 outline outline-1 outline-gray-200"
    >
      <div className="basis-44 space-y-1">
        <h3 className="text-xs font-bold">{cartProduct.title}</h3>
        <p className=" text-xs font-medium text-gray-400">
          ${formatNumberWithCommas(cartProduct.price)}
        </p>
      </div>
      <div className="basis-14 rounded-sm border-2 border-orange-300 bg-orange-100">
        <AddRemoveQuantityButtons
          product={cartProduct}
          type={ButtonEnum.WARNING}
          className="gap-2"
        />
      </div>
      <div className="flex justify-end basis-20 items-center gap-2 font-bold">
        ${formatNumberWithCommas(cartProduct.price * cartProduct.quantity!)}{" "}
        <FaMinusCircle
          onClick={handleRemoveProductFromCart}
          className="cursor-pointer text-orange-500"
        />{" "}
      </div>
    </div>
  );
};

export default CartProduct;
