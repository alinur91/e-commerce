import { ProductsData } from "@features/products/lib/types";
import { Product } from "@features/products/components/index";
import { productsNotFound } from "@data/index";

type ProductsListProps = {
  productsList: ProductsData;
};

const ProductsList = ({ productsList }: ProductsListProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {productsList?.length > 0 ? (
        productsList?.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <img src={productsNotFound} alt="" />
      )}
    </div>
  );
};

export default ProductsList;
