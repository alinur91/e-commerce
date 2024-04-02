import { addProductToCart, removeProductFromCart } from "@features/cart/api";
import { selectCartData } from "@features/cart/slices/selector";
import { ProductData } from "@features/products/lib/types";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { ButtonEnum, StarRatingSizeEnum } from "@ts-types/enums";
import { Button, StarRating } from "@ui/index";
import {
  FaMinusCircle,
  FaPlusCircle,
  IoMdClose,
  MoonLoader,
} from "@utils/icons";

type ProductProps = {
  product: ProductData;
};

const ProductOverview = ({ product }: ProductProps) => {
  const { title, images, description, category, brand, stock, rating, price } =
    product;

  const dispatch = useAppDispatch();
  const { loading, cartProducts } = useAppSelector(selectCartData);

  const foundProduct = cartProducts.find(
    (cartProduct) => cartProduct.productId === product.productId,
  );

  const handleClick = () => {
    if (foundProduct) {
      dispatch(removeProductFromCart(product.productId));
    } else {
      dispatch(addProductToCart(product));
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 px-10 lg:flex-row">
      <Button to="/">
        <IoMdClose className="absolute right-[5%] text-4xl text-red-600 lg:right-[3%] lg:top-[-15%]" />
      </Button>
      <div className="h-[250px] lg:h-[400px]">
        <img className="h-full object-cover" src={images[0]} alt="" />
      </div>
      <div className="space-y-4 md:w-[600px] lg:w-[800px]">
        <h1 className="flex h-8 items-center  gap-2 text-xl font-bold lg:text-2xl">
          {title} {loading && <MoonLoader size={24} color="#915c0d" />}{" "}
        </h1>
        <p className="lg:text-md text-sm font-semibold text-gray-500">
          {description}
        </p>
        <p className="lg:text-md text-sm font-semibold text-gray-400">
          {category}
        </p>
        <div className="lg:text-md flex items-center gap-4 text-sm">
          <span className="font-semibold text-red-400">{brand}</span>
          <span className="font-semibold text-gray-400">
            {stock} in stock
          </span>{" "}
          <StarRating rating={rating} size={StarRatingSizeEnum.small} />{" "}
        </div>
        <p className="text-2xl font-bold lg:text-3xl">💲{price}</p>
        <div className="flex">
          <Button
            className="h-8 flex-1 rounded-lg border-2 border-gray-300 text-xl"
            type={ButtonEnum.LIGHT}
          >
            -
          </Button>
          <Button
            className="h-8 flex-1 rounded-lg border-2 border-gray-300 text-xl"
            type={ButtonEnum.LIGHT}
          >
            0
          </Button>
          <Button
            className="h-8 flex-1 rounded-lg border-2 border-gray-300 text-xl"
            type={ButtonEnum.LIGHT}
          >
            +
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={handleClick}
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
      </div>
    </div>
  );
};

export default ProductOverview;
