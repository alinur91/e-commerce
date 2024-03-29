import { ProductData } from "@features/products/lib/types";
import { ButtonEnum, StarRatingSizeEnum } from "@ts-types/enums";
import { Button, StarRating } from "@ui/index";
import { IoMdClose } from "@utils/icons";

type ProductProps = {
  product: ProductData;
};

const ProductOverview = ({ product }: ProductProps) => {
  const { title, images, description, category, brand, stock, rating, price } =
    product;

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 px-10 lg:flex-row">
      <Button to="/">
        <IoMdClose className="absolute right-[5%] top-[-10%] text-4xl text-red-600 lg:right-[3%]" />
      </Button>
      <img
        className="max-h-[300px] object-cover lg:max-h-[400px]"
        src={images[0]}
        alt=""
      />
      <div className="space-y-4 md:w-[600px] lg:w-[800px]">
        <h1 className="text-xl font-bold lg:text-2xl">{title}</h1>
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
          <StarRating
            defaultRating={rating}
            size={StarRatingSizeEnum.small}
          />{" "}
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
          className="h-8 rounded-lg border-2 capitalize"
          type={ButtonEnum.PRIMARY}
        >
          Add to cart +
        </Button>
      </div>
    </div>
  );
};

export default ProductOverview;
