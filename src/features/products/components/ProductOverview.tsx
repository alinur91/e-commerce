import { ProductData } from "@features/products/lib/types";
import { ButtonEnum, StarRatingSizeEnum } from "@ts-types/enums";
import { AddRemoveQuantityButtons, Button, StarRating } from "@ui/index";
import { IoMdClose, MoonLoader } from "@utils/icons";
import { useState } from "react";

type ProductProps = {
  product: ProductData;
};

const ProductOverview = ({ product }: ProductProps) => {
  const { title, images, description, category, brand, stock, rating, price } =
    product;
  const [isLoading, setIsLoading] = useState(false);

  const handleIsLoading = (value: boolean) => setIsLoading(value);

  return (
    <div className="relative flex flex-col items-center justify-center gap-10 px-10 lg:flex-row">
      <Button to="/">
        <IoMdClose className="absolute right-[5%] text-4xl text-red-600 lg:right-[3%] lg:top-[-15%]" />
      </Button>
      <div className="h-[250px] lg:h-[400px]">
        <img
          className="h-full rounded-lg object-cover"
          src={images[0]}
          alt=""
        />
      </div>
      <div className="space-y-4 md:w-[600px] lg:w-[800px]">
        <h1 className="flex h-8 items-center  gap-2 text-xl font-bold lg:text-2xl">
          {title} {isLoading && <MoonLoader size={24} color="#915c0d" />}{" "}
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
        <AddRemoveQuantityButtons
          handleIsLoading={handleIsLoading}
          isLoading={isLoading}
          product={product}
          type={ButtonEnum.LIGHT}
        />
      </div>
    </div>
  );
};

export default ProductOverview;
