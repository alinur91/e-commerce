import { Button, StarRating } from "@ui/index";
import { ProductData } from "../lib/types";
import { ButtonEnum, StarRatingSize } from "@ts-types/enums";
import { Link } from "react-router-dom";

type ProductProps = {
  product: ProductData;
};

const Product = ({ product }: ProductProps) => {
  return (
    <Link
      to={`/products/${product.id}`}
      className="w-44 transform cursor-pointer space-y-2 rounded-lg border-2 p-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <img className="h-28 w-40 object-cover" src={product.thumbnail} alt="" />
      <h4 className="text-xs font-semibold">{product.title}</h4>
      <StarRating
        maxRating={5}
        size={StarRatingSize.small}
        defaultRating={product.rating}
      />
      <p className="text-2xl font-bold">${product.price}</p>
      <Button type={ButtonEnum.Primary}>Add to Cart</Button>
    </Link>
  );
};

export default Product;
