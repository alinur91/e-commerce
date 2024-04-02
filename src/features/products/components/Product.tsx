import { Button, StarRating } from "@ui/index";
import { ProductData } from "../lib/types";
import { ButtonEnum, StarRatingSizeEnum } from "@ts-types/enums";
import { Link } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "@features/cart/api";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { FaPlusCircle, FaMinusCircle } from "@utils/icons";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectCartData } from "@features/cart/slices/selector";
import { useState } from "react";

type ProductProps = {
  product: ProductData;
};

const Product = ({ product }: ProductProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { cartProducts } = useAppSelector(selectCartData);

  const foundProduct = cartProducts.find(
    (cartProduct) => cartProduct.productId === product.productId,
  );

  const handleClick = async () => {
    setIsLoading(true);

    if (foundProduct) {
      await dispatch(removeProductFromCart(product.productId));
      setIsLoading(false);
    } else {
      await dispatch(addProductToCart(product));
      setIsLoading(false);
    }
  };

  return (
    <div className="w-40 transform  cursor-pointer  space-y-2  rounded-lg border-2 p-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl sm:w-[180px]">
      <Link className="space-y-1.5" to={`/products/${product.productId}`}>
        <div className="h-[125px] w-auto overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover"
            src={product.thumbnail}
            alt=""
          />
        </div>
        <div className="h-24 space-y-1.5">
          <h4 className="text-xs font-semibold">{product.title}</h4>
          <StarRating size={StarRatingSizeEnum.small} rating={product.rating} />
          <p className="text-2xl font-bold">
            <span className="text-yellow-400">$</span>
            {product.price}
          </p>
        </div>
      </Link>
      <Button
        disabled={isLoading}
        onClick={handleClick}
        className="h-8 w-full font-semibold capitalize"
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
    </div>
  );
};

export default Product;
