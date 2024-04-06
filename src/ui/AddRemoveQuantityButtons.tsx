import { ButtonEnum } from "@ts-types/enums";
import { Button } from ".";
import { FaMinusCircle, FaPlusCircle } from "@utils/icons";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { addProductToCart, removeProductFromCart } from "@features/cart/api";
import { selectCartData } from "@features/cart/slices/selector";
import { ProductData } from "@features/products/lib/types";
import { DecreaseQuantityEnum } from "@features/cart/lib/types";

type AddRemoveQuantityButtonsProps = {
  type: ButtonEnum;
  className?: string;
  product: ProductData;
  handleIsLoading?: (value: boolean) => void;
  isLoading?: boolean;
};

const AddRemoveQuantityButtons = ({
  type,
  product,
  className,
  handleIsLoading = () => {},
  isLoading = false,
}: AddRemoveQuantityButtonsProps) => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(selectCartData);

  const foundProduct = cartProducts.find(
    (cartProduct) => cartProduct.productId === product.productId,
  );

  const handleAddOrRemove = async () => {
    handleIsLoading(true);
    if (foundProduct) {
      await dispatch(
        removeProductFromCart({
          productId: product.productId,
          operation: DecreaseQuantityEnum.REMOVE,
        }),
      );
    } else {
      await dispatch(addProductToCart(product));
    }
    handleIsLoading(false);
  };

  const increaseQuantityOfProduct = async () => {
    handleIsLoading(true);
    await dispatch(addProductToCart(foundProduct || product));
    handleIsLoading(false);
  };

  const decreaseQuantityOfProduct = async () => {
    handleIsLoading(true);
    if (foundProduct?.productId)
      await dispatch(
        removeProductFromCart({ productId: foundProduct?.productId }),
      );
    handleIsLoading(false);
  };

  return (
    <>
      <div className={`flex ${className} justify-center`}>
        <Button
          onClick={decreaseQuantityOfProduct}
          disabled={!foundProduct}
          type={type}
        >
          -
        </Button>
        <Button type={type} className="cursor-default">
          {foundProduct?.quantity || 0}
        </Button>
        <Button onClick={increaseQuantityOfProduct} type={type}>
          +
        </Button>
      </div>
      {type === ButtonEnum.LIGHT && (
        <Button
          disabled={isLoading}
          onClick={handleAddOrRemove}
          className="h-8 w-full rounded-lg border-2 capitalize"
          type={foundProduct ? ButtonEnum.DANGER : ButtonEnum.PRIMARY}
        >
          {foundProduct ? (
            <div className="flex items-center gap-1">
              Remove <FaMinusCircle className="" />
            </div>
          ) : (
            <div className="flex items-center gap-1">
              Add to Cart <FaPlusCircle className="" />
            </div>
          )}
        </Button>
      )}
    </>
  );
};

export default AddRemoveQuantityButtons;
